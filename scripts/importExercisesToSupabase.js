/**
 * IMPORT EXERCICES LOMBAIRES → SUPABASE
 * Import des 62 exercices parfaits dans la base de données
 * 
 * Usage: node scripts/importExercisesToSupabase.js
 */

import { createClient } from '@supabase/supabase-js';
import { allLumbarExercises } from '../data/lumbarExercises.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Missing Supabase credentials');
  console.error('   Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Map exercise object to Supabase schema
 */
function mapExerciseToSchema(exercise, index) {
  // Generate ID from name
  const id = exercise.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Map exercise_type to Supabase allowed values
  // Schema allows: strength, mobility, stability, proprioception, cardiovascular, flexibility, neuromuscular-control
  const typeMapping = {
    'strengthening': 'strength',
    'motor_control': 'neuromuscular-control',
    'functional': 'strength', // Functional exercises are strength-based
    'power': 'strength',
    'stability': 'stability',
    'mobility': 'mobility',
    'flexibility': 'flexibility'
  };
  
  // Map evidence_level to Supabase allowed values
  // Schema allows: 1A, 1B, 2A, 2B, 3A, 3B, 4, 5
  // Our exercises have: 1A, 1B, 2A, 2B, 3, 4, 5
  const evidenceMapping = {
    '3': '3A', // Map generic '3' to '3A' (expert consensus)
  };
  
  return {
    // IDs and names
    id: id,
    name: exercise.name,
    name_fr: exercise.name_fr,
    name_en: exercise.name, // Use English name as default
    
    // Anatomical
    body_region: exercise.body_region,
    muscle_groups: exercise.muscle_groups || [], // Optional field
    joint_actions: exercise.joint_actions || [], // Optional field
    
    // Exercise type - mapped to schema values
    exercise_type: typeMapping[exercise.exercise_type] || exercise.exercise_type,
    equipment_required: exercise.tags?.equipment ? [exercise.tags.equipment] : [],
    difficulty_level: exercise.difficulty_level,
    
    // Clinical indications (from our indications object)
    primary_indications: exercise.indications?.primary || [],
    secondary_indications: exercise.indications?.secondary || [],
    
    // Contraindications (from our contraindications array)
    absolute_contraindications: exercise.contraindications || [],
    relative_contraindications: [],
    precautions: [],
    red_flags: [],
    
    // Dosage - Parse from our string format (handle "2-3" or "3" formats)
    reps_min: parseInt(exercise.dosage_reps?.split('-')[0]) || null,
    reps_max: parseInt(exercise.dosage_reps?.split('-')[1] || exercise.dosage_reps) || null,
    reps_optimal: exercise.reps_optimal || null,
    sets_min: parseInt(exercise.dosage_sets?.split('-')[0]) || null,
    sets_max: parseInt(exercise.dosage_sets?.split('-')[1] || exercise.dosage_sets) || null,
    sets_optimal: exercise.sets_optimal || null,
    frequency_per_week: parseInt(exercise.dosage_frequency) || null,
    duration_weeks: 4, // Default 4 weeks
    rest_seconds: null,
    tempo: null,
    
    // Progressions (we don't have IDs yet, leave null for now)
    regression_exercise_id: null,
    progression_exercise_id: null,
    
    // Instructions
    description: exercise.description,
    instructions_patient: exercise.instructions_patient,
    instructions_professional: exercise.instructions_professional,
    key_points: exercise.key_points,
    common_errors: [],
    
    // Evidence - mapped to schema values
    evidence_level: evidenceMapping[exercise.evidence_level] || exercise.evidence_level,
    effectiveness_score: exercise.effectiveness_score,
    confidence_interval: null,
    
    // Media (we don't have these yet)
    image_url: null,
    video_url: null,
    thumbnail_url: null,
    
    // Metadata
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

/**
 * Main import function
 */
async function importExercises() {
  console.log('================================================================================');
  console.log('🚀 IMPORT EXERCICES LOMBAIRES → SUPABASE');
  console.log('================================================================================\n');
  
  console.log('📊 Préparation:');
  console.log('   Exercices à importer:', allLumbarExercises.length);
  console.log('   Supabase URL:', supabaseUrl);
  console.log('   Using key:', supabaseKey.substring(0, 20) + '...\n');
  
  // Map exercises to schema
  const exercisesToInsert = allLumbarExercises.map(mapExerciseToSchema);
  
  console.log('🔍 Validation mapping:');
  console.log('   Exercices mappés:', exercisesToInsert.length);
  console.log('   Exemple (premier exercice):');
  console.log('   -', exercisesToInsert[0].name);
  console.log('   -', exercisesToInsert[0].evidence_level);
  console.log('   -', exercisesToInsert[0].effectiveness_score + '/100\n');
  
  // Check if exercises table exists and has data
  console.log('🔍 Vérification table exercises...');
  const { data: existingExercises, error: checkError } = await supabase
    .from('exercises')
    .select('id, name')
    .eq('body_region', 'lumbar')
    .limit(5);
  
  if (checkError) {
    console.error('❌ Erreur vérification table:', checkError.message);
    console.log('\n💡 Assurez-vous que:');
    console.log('   1. La table "exercises" existe dans Supabase');
    console.log('   2. Les credentials sont corrects');
    console.log('   3. RLS policies permettent l\'insertion\n');
    process.exit(1);
  }
  
  console.log('✅ Table exercises accessible');
  console.log('   Exercices lombaires existants:', existingExercises?.length || 0);
  
  if (existingExercises && existingExercises.length > 0) {
    console.log('\n⚠️  ATTENTION: Des exercices lombaires existent déjà!');
    console.log('   Exemples:', existingExercises.map(e => e.name).join(', '));
    console.log('\n🗑️  Suppression des exercices existants...');
    
    const { error: deleteError } = await supabase
      .from('exercises')
      .delete()
      .eq('body_region', 'lumbar');
    
    if (deleteError) {
      console.error('❌ Erreur suppression:', deleteError.message);
      process.exit(1);
    }
    
    console.log('✅ Exercices existants supprimés');
  }
  
  // Insert exercises in batches (Supabase recommends batches of 100-1000)
  console.log('\n📥 Insertion exercices...');
  const batchSize = 50;
  let inserted = 0;
  let errors = [];
  
  for (let i = 0; i < exercisesToInsert.length; i += batchSize) {
    const batch = exercisesToInsert.slice(i, i + batchSize);
    console.log(`   Batch ${Math.floor(i/batchSize) + 1}: Insertion ${batch.length} exercices...`);
    
    const { data, error } = await supabase
      .from('exercises')
      .insert(batch)
      .select('id, name, evidence_level');
    
    if (error) {
      console.error(`   ❌ Erreur batch ${Math.floor(i/batchSize) + 1}:`, error.message);
      errors.push({ batch: Math.floor(i/batchSize) + 1, error: error.message });
    } else {
      inserted += data.length;
      console.log(`   ✅ Batch ${Math.floor(i/batchSize) + 1}: ${data.length} exercices insérés`);
    }
  }
  
  console.log('\n================================================================================');
  console.log('📊 RÉSULTATS IMPORT');
  console.log('================================================================================\n');
  
  console.log('✅ Succès:', inserted, '/', allLumbarExercises.length, 'exercices');
  
  if (errors.length > 0) {
    console.log('\n❌ Erreurs:', errors.length, 'batches en erreur');
    errors.forEach(e => {
      console.log('   - Batch', e.batch + ':', e.error);
    });
  }
  
  // Verify final count
  console.log('\n🔍 Vérification finale...');
  const { data: finalExercises, error: finalError } = await supabase
    .from('exercises')
    .select('id, name, evidence_level, effectiveness_score', { count: 'exact' })
    .eq('body_region', 'lumbar');
  
  if (finalError) {
    console.error('❌ Erreur vérification:', finalError.message);
  } else {
    console.log('✅ Total exercices lombaires en DB:', finalExercises.length);
    
    // Statistics
    const evidenceLevels = finalExercises.reduce((acc, ex) => {
      acc[ex.evidence_level] = (acc[ex.evidence_level] || 0) + 1;
      return acc;
    }, {});
    
    const avgScore = Math.round(
      finalExercises.reduce((sum, ex) => sum + ex.effectiveness_score, 0) / finalExercises.length
    );
    
    console.log('\n📚 Distribution Evidence Levels:');
    Object.entries(evidenceLevels).sort().forEach(([level, count]) => {
      console.log('   ' + level + ':', count, 'exercices');
    });
    
    console.log('\n⭐ Score moyen efficacité:', avgScore + '/100');
    
    console.log('\n📖 Exemples exercices insérés:');
    finalExercises.slice(0, 5).forEach((ex, i) => {
      console.log(`   ${i+1}. ${ex.name} (${ex.evidence_level}, ${ex.effectiveness_score}/100)`);
    });
  }
  
  console.log('\n================================================================================');
  if (inserted === allLumbarExercises.length) {
    console.log('✅ ✅ ✅ IMPORT RÉUSSI: 62/62 EXERCICES EN BASE! ✅ ✅ ✅');
    console.log('✅ Base de données prête pour algorithme sélection');
    console.log('✅ Prochaine étape: Intégration formulaires diagnostiques');
  } else {
    console.log('⚠️  IMPORT PARTIEL:', inserted, '/', allLumbarExercises.length);
    console.log('   Vérifiez les erreurs ci-dessus et réessayez');
  }
  console.log('================================================================================\n');
}

// Run import
importExercises()
  .then(() => {
    console.log('✅ Script terminé avec succès');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ ERREUR FATALE:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
