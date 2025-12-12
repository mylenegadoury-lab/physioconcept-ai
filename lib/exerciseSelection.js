/**
 * ALGORITHME SÉLECTION EXERCICES
 * 4-step clinical decision support algorithm
 * 
 * Input: Patient profile (forms: ODI, STarT Back, TBC)
 * Output: 8-12 exercices ranked by suitability with justification
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * STEP 1: SAFETY FILTER
 * Exclude exercises based on red flags and contraindications
 */
export function applySafetyFilter(exercises, patientProfile) {
  const {
    redFlags = [],
    redFlagsSeverity = {}, // Map of redFlag id -> severity
    contraindications = [],
    acuteLBP = false,
    radiculopathy = false,
    spondylolisthesis = null,
    osteoporosis = false,
    recentSurgery = false
  } = patientProfile;

  return exercises.filter(exercise => {
    // Red flags: Only block if EMERGENCY severity
    if (redFlags.length > 0) {
      const hasEmergencyFlag = redFlags.some(flagId => 
        redFlagsSeverity[flagId] === 'emergency'
      );
      
      if (hasEmergencyFlag) {
        console.log('🚨 EMERGENCY red flags present - blocking all exercises');
        return false;
      } else {
        // Non-emergency red flags: just warn but allow exercises
        console.log('⚠️  Red flags present (non-emergency) - proceed with caution');
      }
    }

    // Acute LBP: Only gentle exercises
    if (acuteLBP && !exercise.tags?.phase?.includes('acute')) {
      return false;
    }

    // Radiculopathy: Avoid aggravating movements
    if (radiculopathy && exercise.tags?.pattern?.includes('radiculopathy_provocateur')) {
      return false;
    }

    // Spondylolisthesis: Grade-specific exclusions
    if (spondylolisthesis === 'grade3+' && 
        exercise.contraindications?.some(c => c.includes('spondylolisthesis'))) {
      return false;
    }

    // Osteoporosis: Avoid high-load/flexion
    if (osteoporosis && 
        (exercise.effectiveness_score > 90 || // High load exercises
         exercise.tags?.mechanism?.includes('plyometric'))) {
      return false;
    }

    // Recent surgery: Only post-surgical appropriate
    if (recentSurgery && !exercise.tags?.phase?.includes('post_surgical')) {
      return false;
    }

    // Check exercise-specific contraindications
    const patientContraindications = contraindications.map(c => c.toLowerCase());
    const exerciseContraindications = exercise.contraindications?.map(c => c.toLowerCase()) || [];
    
    const hasContraindication = exerciseContraindications.some(ec => 
      patientContraindications.some(pc => ec.includes(pc) || pc.includes(ec))
    );

    return !hasContraindication;
  });
}

/**
 * STEP 2: PATTERN SELECTION
 * Select exercises based on movement patterns and directional preference
 */
export function applyPatternSelection(exercises, patientProfile) {
  const {
    directionalPreference = null, // 'flexion', 'extension', 'rotation'
    movementIntolerance = [],     // ['flexion_intolerant', 'extension_intolerant', etc.]
    dominantPattern = null,       // 'motor_control', 'stabilization', 'mobility', etc.
    specificNeeds = []            // ['hamstring_tightness', 'hip_flexor_tightness', etc.]
  } = patientProfile;

  let scored = exercises.map(exercise => {
    let patternScore = 0;

    // Directional preference (McKenzie approach)
    if (directionalPreference === 'extension' && 
        exercise.tags?.pattern?.includes('extension_preference')) {
      patternScore += 30;
    }
    if (directionalPreference === 'flexion' && 
        exercise.tags?.pattern?.includes('flexion_tolerant')) {
      patternScore += 30;
    }

    // Movement intolerance (avoid)
    if (movementIntolerance.includes('flexion_intolerant') && 
        exercise.tags?.mechanism?.includes('flexion')) {
      patternScore -= 50; // Strong penalty
    }
    if (movementIntolerance.includes('extension_intolerant') && 
        exercise.tags?.pattern?.includes('extension_preference')) {
      patternScore -= 50;
    }
    if (movementIntolerance.includes('rotation_intolerant') && 
        exercise.tags?.mechanism?.includes('rotation')) {
      patternScore -= 50;
    }

    // Dominant pattern match (TBC classification)
    if (dominantPattern && exercise.tags?.mechanism?.includes(dominantPattern)) {
      patternScore += 20;
    }

    // Specific needs match
    specificNeeds.forEach(need => {
      if (exercise.tags?.pattern?.includes(need)) {
        patternScore += 15;
      }
    });

    return { ...exercise, patternScore };
  });

  // Filter out negative scores (incompatible patterns)
  return scored.filter(ex => ex.patternScore >= 0);
}

/**
 * STEP 3: GOAL PRIORITIZATION
 * Score exercises based on patient goals and treatment phase
 */
export function applyGoalPrioritization(exercises, patientProfile) {
  const {
    primaryGoals = [],    // ['pain_reduction', 'strength', 'function', 'return_sport']
    phase = 'subacute',   // 'acute', 'subacute', 'chronic', 'return_sport'
    odi = null,           // Oswestry score 0-100
    startBack = null      // 'low', 'medium', 'high' risk
  } = patientProfile;

  return exercises.map(exercise => {
    let goalScore = 0;

    // Phase match (critical)
    if (exercise.tags?.phase?.includes(phase)) {
      goalScore += 25;
    }

    // Primary goals
    primaryGoals.forEach(goal => {
      if (goal === 'pain_reduction' && 
          ['acute', 'subacute'].includes(phase) && 
          exercise.tags?.mechanism?.includes('motor_control')) {
        goalScore += 20;
      }
      if (goal === 'strength' && 
          exercise.tags?.mechanism?.includes('strengthening')) {
        goalScore += 20;
      }
      if (goal === 'function' && 
          exercise.tags?.mechanism?.includes('functional')) {
        goalScore += 20;
      }
      if (goal === 'return_sport' && 
          exercise.tags?.phase?.includes('return_sport')) {
        goalScore += 20;
      }
    });

    // ODI severity adjustment
    if (odi !== null) {
      if (odi >= 60 && exercise.difficulty_level === 'beginner') {
        goalScore += 15; // Severe disability → gentle exercises
      }
      if (odi <= 20 && exercise.difficulty_level === 'advanced') {
        goalScore += 15; // Minimal disability → progressive loading
      }
    }

    // STarT Back risk stratification
    if (startBack === 'high' && exercise.tags?.mechanism?.includes('motor_control')) {
      goalScore += 10; // High psychosocial risk → focus motor control
    }
    if (startBack === 'low' && exercise.tags?.mechanism?.includes('strengthening')) {
      goalScore += 10; // Low risk → progressive strengthening
    }

    return { ...exercise, goalScore };
  });
}

/**
 * STEP 4: FINAL SCORING & RANKING
 * Combine all scores + evidence level + effectiveness
 */
export function applyFinalScoring(exercises) {
  const evidenceWeights = {
    '1A': 30,
    '1B': 25,
    '2A': 20,
    '2B': 15,
    '3': 10,
    '4': 5,
    '5': 2
  };

  return exercises.map(exercise => {
    const evidenceScore = evidenceWeights[exercise.evidence_level] || 0;
    const effectivenessScore = (exercise.effectiveness_score / 100) * 20; // Max 20 points
    const patternScore = exercise.patternScore || 0;
    const goalScore = exercise.goalScore || 0;

    const totalScore = evidenceScore + effectivenessScore + patternScore + goalScore;

    return {
      ...exercise,
      evidenceScore,
      effectivenessScore,
      totalScore
    };
  })
  .sort((a, b) => b.totalScore - a.totalScore);
}

/**
 * MAIN SELECTION ALGORITHM
 * 4-step process returning top 8-12 exercises with justification
 */
export async function selectExercises(patientProfile) {
  console.log('\n🎯 ALGORITHME SÉLECTION EXERCICES - 4 STEPS\n');
  
  // Fetch all lumbar exercises from Supabase
  const { data: allExercises, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('body_region', 'lumbar')
    .eq('status', 'active');

  if (error) {
    console.error('❌ Erreur fetch exercises:', error.message);
    return { error: error.message, exercises: [] };
  }

  console.log('📊 Total exercices disponibles:', allExercises.length);

  // STEP 1: Safety Filter
  console.log('\n🔒 STEP 1: Safety Filter...');
  let filtered = applySafetyFilter(allExercises, patientProfile);
  console.log('   Après safety filter:', filtered.length, 'exercices');

  // STEP 2: Pattern Selection
  console.log('\n🎯 STEP 2: Pattern Selection...');
  filtered = applyPatternSelection(filtered, patientProfile);
  console.log('   Après pattern selection:', filtered.length, 'exercices');

  // STEP 3: Goal Prioritization
  console.log('\n🎯 STEP 3: Goal Prioritization...');
  filtered = applyGoalPrioritization(filtered, patientProfile);
  console.log('   Après goal prioritization:', filtered.length, 'exercices');

  // STEP 4: Final Scoring & Ranking
  console.log('\n📊 STEP 4: Final Scoring & Ranking...');
  const ranked = applyFinalScoring(filtered);
  console.log('   Exercices classés:', ranked.length);

  // Select top 8-12 exercises
  const topCount = Math.min(12, Math.max(8, ranked.length));
  const selectedExercises = ranked.slice(0, topCount);

  console.log('\n✅ Sélection finale:', selectedExercises.length, 'exercices');
  console.log('\n📋 Top 5:');
  selectedExercises.slice(0, 5).forEach((ex, i) => {
    console.log(`   ${i+1}. ${ex.name} (Score: ${ex.totalScore.toFixed(1)}, ${ex.evidence_level})`);
  });

  return {
    selectedExercises,
    totalAvailable: allExercises.length,
    afterSafety: filtered.length,
    profile: patientProfile,
    timestamp: new Date().toISOString()
  };
}

/**
 * GENERATE JUSTIFICATION
 * Explain why exercises were selected
 */
export function generateJustification(selectedExercises, patientProfile) {
  const justifications = selectedExercises.map(exercise => {
    const reasons = [];

    // Evidence
    if (['1A', '1B'].includes(exercise.evidence_level)) {
      reasons.push(`Evidence Level ${exercise.evidence_level} (RCT high quality)`);
    }

    // Effectiveness
    if (exercise.effectiveness_score >= 85) {
      reasons.push(`Highly effective (${exercise.effectiveness_score}/100)`);
    }

    // Pattern match
    if (exercise.patternScore > 20) {
      reasons.push('Strong pattern match for your condition');
    }

    // Goal alignment
    if (exercise.goalScore > 20) {
      reasons.push('Aligns with your treatment goals');
    }

    // Phase appropriate
    if (exercise.tags?.phase?.includes(patientProfile.phase)) {
      reasons.push(`Appropriate for ${patientProfile.phase} phase`);
    }

    return {
      exercise: exercise.name,
      score: exercise.totalScore,
      reasons
    };
  });

  return justifications;
}

export default selectExercises;
