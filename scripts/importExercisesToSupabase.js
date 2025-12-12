/**
 * IMPORT EXERCICES LOMBAIRES → SUPABASE
 * Import des 62 exercices parfaits dans la base de données
 * 
 * Usage: node scripts/importExercisesToSupabase.js
 */

import { createClient } from '@supabase/supabase-js';
import { allLumbarExercises } from '../data/lumbarExercises.js';

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
  return {
    // Basic info
    name: exercise.name,
    name_fr: exercise.name_fr,
    body_region: exercise.body_region,
    exercise_type: exercise.exercise_type,
    description: exercise.description,
    
    // Instructions
    instructions_patient: exercise.instructions_patient,
    instructions_professional: exercise.instructions_professional,
    
    // Dosage
    dosage_reps: exercise.dosage_reps,
    dosage_sets: exercise.dosage_sets,
    dosage_frequency: exercise.dosage_frequency,
    reps_optimal: exercise.reps_optimal || null,
    sets_optimal: exercise.sets_optimal || null,
    hold_time: exercise.hold_time || null,
    
    // Classification
    difficulty_level: exercise.difficulty_level,
    evidence_level: exercise.evidence_level,
    effectiveness_score: exercise.effectiveness_score,
    
    // Arrays
    key_points: exercise.key_points,
    contraindications: exercise.contraindications,
    
    // JSON fields
    tags: exercise.tags,
    indications: exercise.indications,
    progression_levels: exercise.progression_levels,
    
    // Clinical
    clinical_reasoning: exercise.clinical_reasoning,
    activation: exercise.activation || null,
    
    // Metadata
    status: exercise.status,
    order_index: index + 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
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
