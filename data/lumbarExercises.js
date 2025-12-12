/**
 * EXERCICES LOMBAIRES - CONSOLIDATION COMPLÈTE
 * 60 exercices evidence-based pour lombalgie
 * 
 * Structure:
 * - Niveau 1 (Débutant/Aigu): 15 exercices
 * - Niveau 2 (Intermédiaire/Subaigu): 20 exercices  
 * - Niveau 3 (Avancé/Chronic/Sport): 25 exercices
 * 
 * Qualité:
 * - Evidence levels: 1A-5 avec citations RCT
 * - Instructions patient (simple) + professionnel (biomécanique, EMG, dosage)
 * - Clinical reasoning complet
 * - Progressions 3-6 niveaux
 * - Tags intelligents (phase, pattern, mécanisme, niveau, équipement)
 * - Contre-indications spécifiques
 * 
 * Auteur: PhysioConcept AI
 * Date: Décembre 2024
 */

// IMPORTS
import { lumbarExercisesLevel1 } from './lumbarExercises_level1.js';
import { lumbarExercisesLevel1Part2 } from './lumbarExercises_level1_part2.js';
import { lumbarExercisesLevel2 } from './lumbarExercises_level2.js';
import { lumbarExercisesLevel2Part2 } from './lumbarExercises_level2_part2.js';
import { lumbarExercisesLevel2Part3 } from './lumbarExercises_level2_part3.js';
import { lumbarExercisesLevel2Part4 } from './lumbarExercises_level2_part4.js';
import { lumbarExercisesLevel3 } from './lumbarExercises_level3.js';

// CONSOLIDATION
export const allLumbarExercises = [
  // NIVEAU 1: Débutant/Aigu (15 exercices)
  ...lumbarExercisesLevel1,           // 6 exercices
  ...lumbarExercisesLevel1Part2,      // 9 exercices

  // NIVEAU 2: Intermédiaire/Subaigu (20 exercices)
  ...lumbarExercisesLevel2,           // 5 exercices
  ...lumbarExercisesLevel2Part2,      // 5 exercices
  ...lumbarExercisesLevel2Part3,      // 7 exercices
  ...lumbarExercisesLevel2Part4,      // 3 exercices (dont 1 complet + 2 à compléter)

  // NIVEAU 3: Avancé/Chronic/Sport (25 exercices)
  ...lumbarExercisesLevel3            // 25 exercices
];

// LEGACY EXPORT (for backward compatibility)
export const lumbarExercises = [
  {
    id: "mckenzie-elbows",
    name: "Extension en appui sur les coudes (McKenzie)",
    tags: ["extension", "centralisation", "preference-extension"],
    description: "Laissez tomber les genoux d'un côté puis de l'autre.",
    image: "/images/lumbar-rotation.png",
    video: "https://youtu.be/TcZyZDTxgPI",
    progression: "Maintien 10 secondes"
  }
];

// STATISTIQUES
export const lumbarExercisesStats = {
  total: allLumbarExercises.length,
  byLevel: {
    beginner: lumbarExercisesLevel1.length + lumbarExercisesLevel1Part2.length,
    intermediate: lumbarExercisesLevel2.length + lumbarExercisesLevel2Part2.length + lumbarExercisesLevel2Part3.length + lumbarExercisesLevel2Part4.length,
    advanced: lumbarExercisesLevel3.length
  },
  byPhase: {
    acute: allLumbarExercises.filter(ex => ex.tags?.phase?.includes('acute')).length,
    subacute: allLumbarExercises.filter(ex => ex.tags?.phase?.includes('subacute')).length,
    chronic: allLumbarExercises.filter(ex => ex.tags?.phase?.includes('chronic')).length,
    return_sport: allLumbarExercises.filter(ex => ex.tags?.phase?.includes('return_sport')).length,
    prevention: allLumbarExercises.filter(ex => ex.tags?.phase?.includes('prevention')).length
  },
  byMechanism: {
    motor_control: allLumbarExercises.filter(ex => ex.tags?.mechanism?.includes('motor_control')).length,
    stabilization: allLumbarExercises.filter(ex => ex.tags?.mechanism?.includes('stabilization')).length,
    strengthening: allLumbarExercises.filter(ex => ex.tags?.mechanism?.includes('strengthening')).length,
    flexibility: allLumbarExercises.filter(ex => ex.tags?.mechanism?.includes('flexibility')).length,
    mobility: allLumbarExercises.filter(ex => ex.tags?.mechanism?.includes('mobility')).length,
    power: allLumbarExercises.filter(ex => ex.tags?.mechanism?.includes('power')).length,
    functional: allLumbarExercises.filter(ex => ex.tags?.mechanism?.includes('functional')).length
  },
  byEvidenceLevel: {
    '1A': allLumbarExercises.filter(ex => ex.evidence_level === '1A').length,
    '1B': allLumbarExercises.filter(ex => ex.evidence_level === '1B').length,
    '2A': allLumbarExercises.filter(ex => ex.evidence_level === '2A').length,
    '2B': allLumbarExercises.filter(ex => ex.evidence_level === '2B').length,
    '3': allLumbarExercises.filter(ex => ex.evidence_level === '3').length,
    '4': allLumbarExercises.filter(ex => ex.evidence_level === '4').length,
    '5': allLumbarExercises.filter(ex => ex.evidence_level === '5').length
  },
  averageEffectiveness: Math.round(
    allLumbarExercises.reduce((sum, ex) => sum + (ex.effectiveness_score || 0), 0) / allLumbarExercises.length
  )
};

// VALIDATION QUALITY
export const validateExerciseQuality = (exercise) => {
  const requiredFields = [
    'name',
    'name_fr',
    'body_region',
    'exercise_type',
    'description',
    'instructions_patient',
    'instructions_professional',
    'dosage_reps',
    'dosage_sets',
    'dosage_frequency',
    'difficulty_level',
    'evidence_level',
    'effectiveness_score',
    'key_points',
    'contraindications',
    'tags',
    'indications',
    'clinical_reasoning',
    'progression_levels',
    'status'
  ];

  const issues = [];

  // Check required fields
  requiredFields.forEach(field => {
    if (!exercise[field]) {
      issues.push(`Missing field: ${field}`);
    }
  });

  // Check instructions length
  if (exercise.instructions_patient && exercise.instructions_patient.length < 150) {
    issues.push('Instructions patient too short (<150 chars)');
  }
  if (exercise.instructions_professional && exercise.instructions_professional.length < 250) {
    issues.push('Instructions professional too short (<250 chars)');
  }

  // Check progressions
  if (exercise.progression_levels && exercise.progression_levels.length < 3) {
    issues.push('Insufficient progression levels (<3)');
  }

  // Check key points
  if (exercise.key_points && exercise.key_points.length < 3) {
    issues.push('Insufficient key points (<3)');
  }

  // Check contraindications
  if (exercise.contraindications && exercise.contraindications.length < 2) {
    issues.push('Insufficient contraindications (<2)');
  }

  // Check clinical reasoning
  if (exercise.clinical_reasoning && exercise.clinical_reasoning.length < 80) {
    issues.push('Clinical reasoning too short (<80 chars)');
  }

  return {
    valid: issues.length === 0,
    issues,
    exercise: exercise.name
  };
};

// QUALITY REPORT
export const generateQualityReport = () => {
  const results = allLumbarExercises.map(validateExerciseQuality);
  const failed = results.filter(r => !r.valid);

  return {
    total: allLumbarExercises.length,
    passed: results.length - failed.length,
    failed: failed.length,
    passRate: Math.round(((results.length - failed.length) / results.length) * 100),
    issues: failed
  };
};

// SEARCH FUNCTIONS
export const findExerciseByName = (name) => {
  return allLumbarExercises.find(ex => 
    ex.name.toLowerCase().includes(name.toLowerCase()) ||
    ex.name_fr.toLowerCase().includes(name.toLowerCase())
  );
};

export const findExercisesByLevel = (level) => {
  return allLumbarExercises.filter(ex => ex.difficulty_level === level);
};

export const findExercisesByPhase = (phase) => {
  return allLumbarExercises.filter(ex => ex.tags?.phase?.includes(phase));
};

export const findExercisesByPattern = (pattern) => {
  return allLumbarExercises.filter(ex => ex.tags?.pattern?.includes(pattern));
};

export const findExercisesByMechanism = (mechanism) => {
  return allLumbarExercises.filter(ex => ex.tags?.mechanism?.includes(mechanism));
};

export const findExercisesByEvidenceLevel = (level) => {
  return allLumbarExercises.filter(ex => ex.evidence_level === level);
};

export const findExercisesMinEffectiveness = (minScore) => {
  return allLumbarExercises.filter(ex => ex.effectiveness_score >= minScore);
};

// SELECTION ALGORITHM (pour future intégration avec formulaires)
export const selectExercises = (patientProfile) => {
  /*
   * Algorithm 4-step (future implementation):
   * 1. Safety filter (red flags, contraindications)
   * 2. Pattern selection (directional preference, movement intolerance)
   * 3. Goal prioritization (pain, strength, function, sport)
   * 4. Scoring & ranking (evidence level, effectiveness, phase match)
   * 
   * Returns: 8-12 exercises ranked by suitability
   */
  
  // Placeholder - to implement with forms integration
  return {
    message: 'Selection algorithm to be implemented with diagnostic forms',
    profileReceived: patientProfile,
    nextSteps: [
      'Integrate ODI, STarT Back, TBC forms',
      'Implement safety filter (red flags)',
      'Implement pattern selection (directional preference)',
      'Implement goal prioritization',
      'Implement scoring algorithm',
      'Return top 8-12 exercises with justification'
    ]
  };
};

// EXPORT DEFAULT
export default allLumbarExercises;

// CONSOLE LOG SUMMARY
if (typeof console !== 'undefined') {
  console.log('📚 LUMBAR EXERCISES DATABASE LOADED');
  console.log(`✅ Total exercises: ${lumbarExercisesStats.total}`);
  console.log(`   - Niveau 1 (Débutant): ${lumbarExercisesStats.byLevel.beginner}`);
  console.log(`   - Niveau 2 (Intermédiaire): ${lumbarExercisesStats.byLevel.intermediate}`);
  console.log(`   - Niveau 3 (Avancé): ${lumbarExercisesStats.byLevel.advanced}`);
  console.log(`   - Score moyen efficacité: ${lumbarExercisesStats.averageEffectiveness}/100`);
  console.log(`   - Evidence Level 1A-1B: ${lumbarExercisesStats.byEvidenceLevel['1A'] + lumbarExercisesStats.byEvidenceLevel['1B']} exercices`);
  
  const qualityReport = generateQualityReport();
  console.log(`\n🔍 QUALITY CHECK: ${qualityReport.passRate}% pass rate (${qualityReport.passed}/${qualityReport.total})`);
  
  if (qualityReport.failed > 0) {
    console.warn(`⚠️  ${qualityReport.failed} exercises with quality issues - see report for details`);
  } else {
    console.log('✅ ALL EXERCISES PASS QUALITY STANDARDS!');
  }
}
