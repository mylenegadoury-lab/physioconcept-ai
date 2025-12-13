/**
 * ALGORITHME SÉLECTION EXERCICES
 * Enhanced 5-step clinical decision support algorithm with comprehensive analysis
 * 
 * Input: Patient profile (forms: ODI, STarT Back, TBC)
 * Output: 8-12 exercices ranked by suitability with justification
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { performComprehensiveClinicalAnalysis } from './clinicalAnalysis.js';

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

    // Acute LBP: Prioritize gentle exercises, but don't block all
    // Note: Tags from Supabase JSONB might need special handling
    if (acuteLBP) {
      // Check if exercise has phase tags
      const hasAcuteOrBeginnerSuitability = 
        exercise.tags?.phase?.includes?.('acute') || 
        exercise.tags?.phase?.includes?.('subacute') ||
        exercise.difficulty_level === 'beginner';
      
      // For acute phase, prefer appropriate exercises but don't block everything
      if (!hasAcuteOrBeginnerSuitability) {
        // Penalize in scoring rather than blocking completely
        exercise._acutePenalty = true;
      }
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
 * STEP 2: PATTERN SELECTION (ENHANCED)
 * Select exercises based on clinical phenotype and movement patterns
 */
export function applyPatternSelection(exercises, patientProfile, clinicalAnalysis) {
  const {
    directionalPreference = null,
    movementIntolerance = [],
    dominantPattern = null,
    specificNeeds = []
  } = patientProfile;
  
  const phenotype = clinicalAnalysis?.phenotype;
  const modulation = clinicalAnalysis?.modulation;

  let scored = exercises.map(exercise => {
    let patternScore = 0;

    // PHENOTYPE-BASED SCORING
    if (phenotype) {
      const primaryPhenotype = phenotype.phenotypes.find(p => p.type === phenotype.primaryPhenotype);
      
      if (primaryPhenotype?.implications?.exerciseEmphasis) {
        primaryPhenotype.implications.exerciseEmphasis.forEach(emphasis => {
          // Check if exercise matches emphasis
          if (exercise.tags?.mechanism?.includes(emphasis) ||
              exercise.tags?.pattern?.includes(emphasis) ||
              exercise.exercise_type === emphasis) {
            patternScore += 40 * (primaryPhenotype.confidence || 0.8);
          }
        });
      }
      
      if (primaryPhenotype?.implications?.avoidInitially) {
        primaryPhenotype.implications.avoidInitially.forEach(avoid => {
          if (exercise.tags?.mechanism?.includes(avoid) ||
              exercise.tags?.pattern?.includes(avoid)) {
            patternScore -= 50;
          }
        });
      }
    }

    // DIRECTIONAL PREFERENCE (McKenzie approach)
    if (directionalPreference === 'extension' && 
        exercise.tags?.pattern?.includes('extension_preference')) {
      patternScore += 35;
    }
    if (directionalPreference === 'flexion' && 
        exercise.tags?.pattern?.includes('flexion_tolerant')) {
      patternScore += 35;
    }

    // MOVEMENT INTOLERANCE (strong penalties)
    if (modulation?.biomechanicalIssues) {
      modulation.biomechanicalIssues.forEach(issue => {
        const issueType = typeof issue === 'string' ? issue : issue.issue;
        
        if (issueType === 'flexion_intolerant' && 
            exercise.tags?.mechanism?.includes('flexion')) {
          patternScore -= 60;
        }
        if (issueType === 'extension_intolerant' && 
            exercise.tags?.pattern?.includes('extension_preference')) {
          patternScore -= 60;
        }
        if (issueType === 'rotation_sensitive' && 
            exercise.tags?.mechanism?.includes('rotation')) {
          patternScore -= 60;
        }
      });
    }
    
    // Fallback to basic intolerance if no modulation
    if (movementIntolerance.includes('flexion_intolerant') && 
        exercise.tags?.mechanism?.includes('flexion')) {
      patternScore -= 50;
    }
    if (movementIntolerance.includes('extension_intolerant') && 
        exercise.tags?.pattern?.includes('extension_preference')) {
      patternScore -= 50;
    }
    if (movementIntolerance.includes('rotation_intolerant') && 
        exercise.tags?.mechanism?.includes('rotation')) {
      patternScore -= 50;
    }

    // DOMINANT PATTERN (TBC classification)
    if (dominantPattern) {
      if (dominantPattern === 'motor_control' && 
          exercise.tags?.mechanism?.includes('motor_control')) {
        patternScore += 25;
      }
      if (dominantPattern === 'stabilization' && 
          exercise.tags?.mechanism?.includes('stabilization')) {
        patternScore += 25;
      }
      if (dominantPattern === 'strengthening' && 
          exercise.tags?.mechanism?.includes('strengthening')) {
        patternScore += 25;
      }
      if (dominantPattern === 'mobilization' && 
          exercise.tags?.mechanism?.includes('mobility')) {
        patternScore += 25;
      }
    }

    // SPECIFIC NEEDS (targeted deficits)
    if (specificNeeds.includes('hamstring_tightness') && 
        exercise.tags?.target?.includes('hamstring')) {
      patternScore += 20;
    }
    if (specificNeeds.includes('hip_flexor_tightness') && 
        exercise.tags?.target?.includes('hip_flexor')) {
      patternScore += 20;
    }

    return {
      ...exercise,
      patternScore
    };
  });

  return scored;
}

/**
 * STEP 3: GOAL PRIORITIZATION (ENHANCED)
 * Score exercises based on functional capacity analysis and patient priorities
 */
export function applyGoalPrioritization(exercises, patientProfile, clinicalAnalysis) {
  const {
    primaryGoals = [],
    phase = 'subacute',
    odi = null,
    startBack = null
  } = patientProfile;
  
  const capacity = clinicalAnalysis?.capacity;
  const prescription = clinicalAnalysis?.prescription;

  return exercises.map(exercise => {
    let goalScore = 0;

    // PHASE MATCH (critical for safety and efficacy)
    if (exercise.tags?.phase?.includes(phase)) {
      goalScore += 30;
    } else if (phase === 'acute' && exercise.tags?.phase?.includes('subacute')) {
      goalScore += 15; // Subacute exercises acceptable for late acute
    } else if (phase === 'chronic' && exercise.tags?.phase?.includes('subacute')) {
      goalScore += 10; // Can include subacute exercises in chronic
    }

    // CAPACITY-BASED PRIORITIES
    if (capacity?.priorities) {
      capacity.priorities.forEach((priority, index) => {
        const weight = 25 - (index * 5); // First priority = 25pts, second = 20pts, etc.
        
        // Match exercise characteristics to priorities
        if (priority === 'pain_management' && 
            exercise.tags?.mechanism?.includes('motor_control')) {
          goalScore += weight;
        }
        if (priority === 'function_restoration' && 
            exercise.tags?.mechanism?.includes('functional')) {
          goalScore += weight;
        }
        if (priority === 'strengthening' && 
            exercise.tags?.mechanism?.includes('strengthening')) {
          goalScore += weight;
        }
        if (priority === 'load_tolerance' && 
            exercise.effectiveness_score >= 70) {
          goalScore += weight;
        }
        if (priority === 'sitting_tolerance' && 
            exercise.tags?.mechanism?.includes('endurance')) {
          goalScore += weight;
        }
        if (priority === 'performance' && 
            exercise.tags?.phase?.includes('return_sport')) {
          goalScore += weight;
        }
        if (priority === 'balance' && 
            exercise.tags?.mechanism?.includes('balance')) {
          goalScore += weight;
        }
      });
    }

    // PRIMARY GOALS (patient-selected or clinician-determined)
    primaryGoals.forEach(goal => {
      if (goal === 'pain_reduction' && 
          exercise.tags?.mechanism?.includes('motor_control')) {
        goalScore += 18;
      }
      if (goal === 'strength' && 
          exercise.tags?.mechanism?.includes('strengthening')) {
        goalScore += 18;
      }
      if (goal === 'function' && 
          exercise.tags?.mechanism?.includes('functional')) {
        goalScore += 18;
      }
      if (goal === 'return_sport' && 
          exercise.tags?.phase?.includes('return_sport')) {
        goalScore += 18;
      }
    });

    // FUNCTIONAL CAPACITY ALIGNMENT
    if (capacity) {
      // Severe limitation → focus on basic movements
      if (capacity.level === 'severe_limitation') {
        if (exercise.difficulty_level === 'beginner' && 
            exercise.tags?.mechanism?.includes('motor_control')) {
          goalScore += 20;
        }
        if (exercise.difficulty_level === 'advanced') {
          goalScore -= 30; // Strongly avoid advanced exercises
        }
      }
      
      // Minimal limitation → challenge appropriately
      if (capacity.level === 'minimal_limitation') {
        if (exercise.difficulty_level === 'advanced' || 
            exercise.difficulty_level === 'intermediate') {
          goalScore += 15;
        }
        if (exercise.difficulty_level === 'beginner') {
          goalScore -= 10; // Too easy won't drive adaptation
        }
      }
      
      // Moderate limitation → balanced approach
      if (capacity.level === 'moderate_limitation') {
        if (exercise.difficulty_level === 'beginner' || 
            exercise.difficulty_level === 'intermediate') {
          goalScore += 10;
        }
      }
    }

    // ODI severity adjustment (fallback if no capacity analysis)
    if (odi !== null && !capacity) {
      if (odi >= 60 && exercise.difficulty_level === 'beginner') {
        goalScore += 15;
      }
      if (odi <= 20 && exercise.difficulty_level === 'advanced') {
        goalScore += 15;
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
    
    // Apply acute phase penalty if flagged
    const acutePenalty = exercise._acutePenalty ? -15 : 0;

    const totalScore = evidenceScore + effectivenessScore + patternScore + goalScore + acutePenalty;

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
 * MAIN SELECTION ALGORITHM (ENHANCED)
 * 5-step process with comprehensive clinical analysis
 */
export async function selectExercises(patientProfile) {
  console.log('\n🎯 ALGORITHME SÉLECTION EXERCICES - ENHANCED 5-STEP\n');
  
  // STEP 0: COMPREHENSIVE CLINICAL ANALYSIS
  console.log('🔬 STEP 0: Clinical Analysis...');
  const clinicalAnalysis = performComprehensiveClinicalAnalysis(patientProfile);
  console.log('   Phénotype:', clinicalAnalysis.phenotype.primaryPhenotype);
  console.log('   Capacité:', clinicalAnalysis.capacity.level);
  console.log('   Priorities:', clinicalAnalysis.capacity.priorities.slice(0, 3).join(', '));
  
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

  console.log('\n📊 Total exercices disponibles:', allExercises.length);

  // STEP 1: Safety Filter
  console.log('\n🔒 STEP 1: Safety Filter...');
  let filtered = applySafetyFilter(allExercises, patientProfile);
  console.log('   Après safety filter:', filtered.length, 'exercices');

  // STEP 2: Pattern Selection (with clinical analysis)
  console.log('\n🎯 STEP 2: Pattern Selection (phenotype-based)...');
  filtered = applyPatternSelection(filtered, patientProfile, clinicalAnalysis);
  console.log('   Après pattern selection:', filtered.length, 'exercices');

  // STEP 3: Goal Prioritization (with capacity analysis)
  console.log('\n🎯 STEP 3: Goal Prioritization (capacity-based)...');
  filtered = applyGoalPrioritization(filtered, patientProfile, clinicalAnalysis);
  console.log('   Après goal prioritization:', filtered.length, 'exercices');

  // STEP 4: Final Scoring & Ranking
  console.log('\n📊 STEP 4: Final Scoring & Ranking...');
  const ranked = applyFinalScoring(filtered);
  console.log('   Exercices classés:', ranked.length);

  // STEP 5: Smart Selection (variable count based on capacity and phase)
  let targetCount = 12; // Default
  
  if (clinicalAnalysis.capacity.level === 'severe_limitation' || patientProfile.phase === 'acute') {
    targetCount = 8; // Fewer exercises for acute/severe
  } else if (clinicalAnalysis.capacity.level === 'minimal_limitation' && patientProfile.phase === 'chronic') {
    targetCount = 14; // More exercises for high-functioning chronic
  }
  
  const topCount = Math.min(targetCount, Math.max(6, ranked.length));
  const selectedExercises = ranked.slice(0, topCount);

  console.log('\n✅ Sélection finale:', selectedExercises.length, 'exercices (target:', targetCount, ')');
  console.log('\n📋 Top 5:');
  selectedExercises.slice(0, 5).forEach((ex, i) => {
    console.log(`   ${i+1}. ${ex.name} (Score: ${ex.totalScore.toFixed(1)}, ${ex.evidence_level})`);
  });

  return {
    selectedExercises,
    clinicalAnalysis, // NOUVEAU: Include full analysis
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
