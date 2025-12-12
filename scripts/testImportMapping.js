/**
 * DRY RUN - Test import mapping
 * Vérifie le mapping sans insérer en base
 */

import { allLumbarExercises } from '../data/lumbarExercises.js';

// Copy mapping function from import script
function mapExerciseToSchema(exercise, index) {
  const id = exercise.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  return {
    id: id,
    name: exercise.name,
    name_fr: exercise.name_fr,
    name_en: exercise.name,
    body_region: exercise.body_region,
    muscle_groups: exercise.muscle_groups || [],
    joint_actions: exercise.joint_actions || [],
    exercise_type: exercise.exercise_type,
    equipment_required: exercise.tags?.equipment ? [exercise.tags.equipment] : [],
    difficulty_level: exercise.difficulty_level,
    primary_indications: exercise.indications?.primary || [],
    secondary_indications: exercise.indications?.secondary || [],
    absolute_contraindications: exercise.contraindications || [],
    relative_contraindications: [],
    precautions: [],
    red_flags: [],
    reps_min: parseInt(exercise.dosage_reps?.split('-')[0]) || null,
    reps_max: parseInt(exercise.dosage_reps?.split('-')[1]) || null,
    reps_optimal: exercise.reps_optimal || null,
    sets_min: parseInt(exercise.dosage_sets?.split('-')[0]) || null,
    sets_max: parseInt(exercise.dosage_sets?.split('-')[1]) || null,
    sets_optimal: exercise.sets_optimal || null,
    frequency_per_week: parseInt(exercise.dosage_frequency) || null,
    duration_weeks: 4,
    rest_seconds: null,
    tempo: null,
    regression_exercise_id: null,
    progression_exercise_id: null,
    description: exercise.description,
    instructions_patient: exercise.instructions_patient,
    instructions_professional: exercise.instructions_professional,
    key_points: exercise.key_points,
    common_errors: [],
    evidence_level: exercise.evidence_level,
    effectiveness_score: exercise.effectiveness_score,
    confidence_interval: null,
    image_url: null,
    video_url: null,
    thumbnail_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 'physioconcept-ai',
    reviewed_by: null,
    last_reviewed_date: new Date().toISOString().split('T')[0],
    next_review_date: null,
    version: 1,
    status: exercise.status || 'active'
  };
}

console.log('🧪 DRY RUN - Testing Exercise Mapping\n');
console.log(`Total exercises: ${allLumbarExercises.length}\n`);

// Test first 3 exercises
const testExercises = allLumbarExercises.slice(0, 3);

testExercises.forEach((exercise, index) => {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`EXERCISE ${index + 1}: ${exercise.name}`);
  console.log('='.repeat(80));
  
  const mapped = mapExerciseToSchema(exercise, index);
  
  // Show key fields
  console.log('\n📋 Mapped Fields:');
  console.log(`  ID: ${mapped.id}`);
  console.log(`  Name: ${mapped.name}`);
  console.log(`  Name FR: ${mapped.name_fr}`);
  console.log(`  Body Region: ${mapped.body_region}`);
  console.log(`  Type: ${mapped.exercise_type}`);
  console.log(`  Difficulty: ${mapped.difficulty_level}`);
  console.log(`  Evidence: ${mapped.evidence_level}`);
  console.log(`  Effectiveness: ${mapped.effectiveness_score}/100`);
  
  console.log(`\n📊 Dosage:`);
  console.log(`  Reps: ${mapped.reps_min}-${mapped.reps_max}`);
  console.log(`  Sets: ${mapped.sets_min}-${mapped.sets_max}`);
  console.log(`  Frequency: ${mapped.frequency_per_week}x/week`);
  
  console.log(`\n🎯 Clinical:`);
  console.log(`  Primary Indications: [${mapped.primary_indications.length}] ${mapped.primary_indications.slice(0, 2).join(', ')}...`);
  console.log(`  Contraindications: [${mapped.absolute_contraindications.length}] ${mapped.absolute_contraindications.slice(0, 2).join(', ')}...`);
  console.log(`  Key Points: [${mapped.key_points.length}] ${mapped.key_points[0]?.substring(0, 60)}...`);
  
  console.log(`\n📝 Instructions:`);
  console.log(`  Patient: ${mapped.instructions_patient.substring(0, 100)}...`);
  console.log(`  Professional: ${mapped.instructions_professional.substring(0, 100)}...`);
});

console.log(`\n\n${'='.repeat(80)}`);
console.log('✅ Mapping test complete!');
console.log(`Ready to import ${allLumbarExercises.length} exercises.`);
console.log('='.repeat(80));
console.log('\n🚀 Next: node scripts/importExercisesToSupabase.js\n');
