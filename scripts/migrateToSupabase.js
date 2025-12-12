/**
 * Migration Script - Existing Data → Supabase
 * Transforme evidence.js et exercices.js en database structurée
 * 
 * Usage: node scripts/migrateToSupabase.js
 */

import { supabase, createExercise, linkExerciseToStudy } from '../lib/supabase.js';
import { evidenceDatabase } from '../data/evidence.js';
import { verifiedStudies } from '../data/clinicalStudies.js';
import lumbarExercises from '../data/lumbarExercises.js';

const ADMIN_USER = 'Dr. Mylène Gadoury';

// ============================================
// 1. MIGRATE STUDIES
// ============================================

async function migrateStudies() {
  console.log('🔬 Migrating scientific studies...');
  
  const allStudies = [];
  
  // Extract from evidenceDatabase
  for (const [region, data] of Object.entries(evidenceDatabase)) {
    if (data.keyResearch) {
      for (const study of data.keyResearch) {
        allStudies.push({
          ...study,
          body_region: region,
        });
      }
    }
  }
  
  // Extract from verifiedStudies
  for (const [region, data] of Object.entries(verifiedStudies)) {
    if (data.metaAnalyses) {
      for (const study of data.metaAnalyses) {
        allStudies.push({
          ...study,
          body_region: region,
          study_type: study.type || 'Meta-Analysis',
        });
      }
    }
    if (data.rcts) {
      for (const study of data.rcts) {
        allStudies.push({
          ...study,
          body_region: region,
          study_type: 'RCT',
        });
      }
    }
  }
  
  // Deduplicate by ID
  const uniqueStudies = [...new Map(allStudies.map(s => [s.id, s])).values()];
  
  console.log(`📊 Found ${uniqueStudies.length} unique studies`);
  
  // Insert into database
  let inserted = 0;
  let errors = 0;
  
  for (const study of uniqueStudies) {
    try {
      const { data, error } = await supabase.from('studies').insert({
        id: study.id,
        title: study.title,
        authors: study.author || study.authors,
        year: study.year,
        journal: study.journal,
        doi: study.doi || null,
        pmid: study.pmid || null,
        
        study_type: study.study_type || study.type || 'RCT',
        evidence_level: study.evidence || '2A',
        pedro_score: study.qualityScore || study.pedroScore || null,
        sample_size: extractSampleSize(study.n),
        
        effectiveness_score: study.effectiveness || null,
        nnt: study.NNT || study.nnt || null,
        conclusion: study.conclusion,
        statistical_significance: study.qualityEvidence || null,
        
        quality_evidence: study.qualityEvidence || null,
        risk_of_bias: null, // Could extract from conclusion
        
        reviewed_by: ADMIN_USER,
        last_reviewed_date: new Date().toISOString().split('T')[0],
        next_review_date: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 12 months
      });
      
      if (error) {
        console.error(`  ❌ Failed to insert ${study.id}:`, error.message);
        errors++;
      } else {
        inserted++;
        if (inserted % 10 === 0) {
          console.log(`  ✅ Inserted ${inserted} studies...`);
        }
      }
    } catch (err) {
      console.error(`  ❌ Exception for ${study.id}:`, err.message);
      errors++;
    }
  }
  
  console.log(`✅ Studies migration complete: ${inserted} inserted, ${errors} errors\n`);
  return inserted;
}

// ============================================
// 2. MIGRATE EXERCISES - LUMBAR
// ============================================

async function migrateLumbarExercises() {
  console.log('💪 Migrating lumbar exercises...');
  
  let inserted = 0;
  let errors = 0;
  
  for (const ex of lumbarExercises) {
    try {
      // Map to new schema
      const exercise = {
        id: ex.id,
        name: ex.name,
        name_fr: ex.name,
        name_en: ex.name, // TODO: Translate
        
        body_region: 'lumbar',
        muscle_groups: ex.muscleGroups || [],
        joint_actions: [],
        
        exercise_type: mapExerciseType(ex.type),
        equipment_required: ex.equipment || ['none'],
        difficulty_level: ex.difficulty || 'beginner',
        
        primary_indications: ex.indications || ['Lombalgie chronique'],
        secondary_indications: [],
        
        absolute_contraindications: ex.contraindications?.absolute || [],
        relative_contraindications: ex.contraindications?.relative || [],
        precautions: ex.contraindications?.precautions || [],
        red_flags: [],
        
        reps_min: ex.dosage?.reps?.min || null,
        reps_max: ex.dosage?.reps?.max || null,
        reps_optimal: ex.dosage?.reps?.optimal || null,
        sets_min: ex.dosage?.sets?.min || null,
        sets_max: ex.dosage?.sets?.max || null,
        sets_optimal: ex.dosage?.sets?.optimal || null,
        frequency_per_week: ex.dosage?.frequency || null,
        duration_weeks: ex.dosage?.duration || 6,
        rest_seconds: ex.dosage?.rest || null,
        tempo: ex.dosage?.tempo || null,
        
        description: ex.description || ex.name,
        instructions_patient: ex.instructions?.patient || ex.description || '',
        instructions_professional: ex.instructions?.professional || ex.description || '',
        key_points: ex.keyPoints || [],
        common_errors: ex.commonErrors || [],
        
        evidence_level: ex.evidence?.level || '2A',
        effectiveness_score: ex.evidence?.effectiveness || null,
        confidence_interval: null,
        
        image_url: ex.image || null,
        video_url: ex.video || null,
        thumbnail_url: null,
        
        created_by: ADMIN_USER,
        reviewed_by: ADMIN_USER,
        last_reviewed_date: new Date().toISOString().split('T')[0],
        next_review_date: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        version: 1,
        status: 'active',
      };
      
      const { data, error } = await supabase.from('exercises').insert(exercise);
      
      if (error) {
        console.error(`  ❌ Failed to insert ${ex.id}:`, error.message);
        errors++;
      } else {
        inserted++;
        
        // Link to studies if specified
        if (ex.evidence?.studies && Array.isArray(ex.evidence.studies)) {
          for (const studyId of ex.evidence.studies) {
            await linkExerciseToStudy(ex.id, studyId, 10).catch(err => {
              console.log(`  ⚠️  Could not link ${ex.id} to ${studyId}`);
            });
          }
        }
      }
    } catch (err) {
      console.error(`  ❌ Exception for ${ex.id}:`, err.message);
      errors++;
    }
  }
  
  console.log(`✅ Lumbar exercises migration complete: ${inserted} inserted, ${errors} errors\n`);
  return inserted;
}

// ============================================
// 3. MIGRATE EXERCISES - FROM EVIDENCE DATABASE
// ============================================

async function migrateExercisesFromEvidence() {
  console.log('🏋️ Migrating exercises from evidence database...');
  
  let inserted = 0;
  let errors = 0;
  
  for (const [region, data] of Object.entries(evidenceDatabase)) {
    if (!data.exerciseEfficacy) continue;
    
    for (const [exerciseKey, efficacy] of Object.entries(data.exerciseEfficacy)) {
      try {
        const exerciseId = `${region}-${exerciseKey}`;
        
        // Check if already exists
        const { data: existing } = await supabase
          .from('exercises')
          .select('id')
          .eq('id', exerciseId)
          .single();
        
        if (existing) {
          console.log(`  ⏭️  Skipping ${exerciseId} (already exists)`);
          continue;
        }
        
        const exercise = {
          id: exerciseId,
          name: formatExerciseName(exerciseKey),
          name_fr: formatExerciseName(exerciseKey),
          name_en: exerciseKey,
          
          body_region: region,
          muscle_groups: [],
          joint_actions: [],
          
          exercise_type: 'strength', // Default
          equipment_required: ['none'],
          difficulty_level: 'intermediate',
          
          primary_indications: [efficacy.indication || `${region} pain`],
          secondary_indications: [],
          
          absolute_contraindications: efficacy.contraindications || [],
          relative_contraindications: [],
          precautions: [],
          red_flags: [],
          
          description: efficacy.indication || '',
          instructions_patient: efficacy.indication || '',
          instructions_professional: efficacy.indication || '',
          key_points: [],
          common_errors: [],
          
          evidence_level: efficacy.evidence || '2A',
          effectiveness_score: efficacy.effectiveness || null,
          confidence_interval: null,
          
          created_by: ADMIN_USER,
          reviewed_by: ADMIN_USER,
          last_reviewed_date: new Date().toISOString().split('T')[0],
          next_review_date: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          version: 1,
          status: 'active',
        };
        
        const { data: inserted_data, error } = await supabase.from('exercises').insert(exercise);
        
        if (error) {
          console.error(`  ❌ Failed to insert ${exerciseId}:`, error.message);
          errors++;
        } else {
          inserted++;
        }
      } catch (err) {
        console.error(`  ❌ Exception:`, err.message);
        errors++;
      }
    }
  }
  
  console.log(`✅ Evidence-based exercises migration complete: ${inserted} inserted, ${errors} errors\n`);
  return inserted;
}

// ============================================
// 4. MIGRATE CLINICAL GUIDELINES
// ============================================

async function migrateGuidelines() {
  console.log('📋 Migrating clinical guidelines...');
  
  let inserted = 0;
  let errors = 0;
  
  for (const [region, data] of Object.entries(evidenceDatabase)) {
    if (!data.guidelines) continue;
    
    for (const guideline of data.guidelines) {
      try {
        const guidelineId = `${region}-${guideline.organization}-${guideline.year}`.toLowerCase().replace(/\s+/g, '-');
        
        const { data: inserted_data, error } = await supabase.from('clinical_guidelines').insert({
          id: guidelineId,
          organization: guideline.organization,
          year: guideline.year,
          title: guideline.title || guideline.recommendation,
          condition: region,
          
          recommendation: guideline.recommendation,
          strength: guideline.strength || 'Moderate',
          quality_of_evidence: guideline.quality || guideline.qualityEvidence || null,
          
          url: null,
          doi: null,
          citation: `${guideline.organization} (${guideline.year}). ${guideline.recommendation}`,
        });
        
        if (error) {
          console.error(`  ❌ Failed to insert guideline:`, error.message);
          errors++;
        } else {
          inserted++;
        }
      } catch (err) {
        console.error(`  ❌ Exception:`, err.message);
        errors++;
      }
    }
  }
  
  console.log(`✅ Guidelines migration complete: ${inserted} inserted, ${errors} errors\n`);
  return inserted;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function extractSampleSize(n) {
  if (!n) return null;
  if (typeof n === 'number') return n;
  
  // Extract number from strings like "249 RCTs, 24,486 participants"
  const match = n.match(/(\d+[,\d]*)\s*(participants|patients)/i);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''));
  }
  
  // Extract from "n=123"
  const nMatch = n.match(/n\s*=?\s*(\d+)/i);
  if (nMatch) {
    return parseInt(nMatch[1]);
  }
  
  return null;
}

function mapExerciseType(type) {
  const mapping = {
    'strength': 'strength',
    'stretching': 'flexibility',
    'mobility': 'mobility',
    'stability': 'stability',
    'core': 'stability',
    'proprioception': 'proprioception',
    'cardio': 'cardiovascular',
    'neuromuscular': 'neuromuscular-control',
  };
  
  return mapping[type?.toLowerCase()] || 'strength';
}

function formatExerciseName(key) {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// ============================================
// MAIN MIGRATION RUNNER
// ============================================

async function runMigration() {
  console.log('🚀 Starting PhysioConcept AI Database Migration\n');
  console.log('='.repeat(60));
  console.log('\n');
  
  const startTime = Date.now();
  
  try {
    // Test connection
    const { data, error } = await supabase.from('studies').select('count');
    if (error) {
      throw new Error(`Cannot connect to Supabase: ${error.message}`);
    }
    console.log('✅ Supabase connection successful\n');
    
    // Run migrations
    const stats = {
      studies: await migrateStudies(),
      lumbarExercises: await migrateLumbarExercises(),
      evidenceExercises: await migrateExercisesFromEvidence(),
      guidelines: await migrateGuidelines(),
    };
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n');
    console.log('='.repeat(60));
    console.log('🎉 MIGRATION COMPLETE!\n');
    console.log(`📊 Statistics:`);
    console.log(`   - Studies: ${stats.studies}`);
    console.log(`   - Lumbar Exercises: ${stats.lumbarExercises}`);
    console.log(`   - Evidence-based Exercises: ${stats.evidenceExercises}`);
    console.log(`   - Guidelines: ${stats.guidelines}`);
    console.log(`   - Total records: ${Object.values(stats).reduce((a, b) => a + b, 0)}`);
    console.log(`\n⏱️  Duration: ${duration}s`);
    console.log('='.repeat(60));
    console.log('\n');
    
    // Show quality dashboard
    const { data: dashboard } = await supabase.from('quality_dashboard').select('*');
    if (dashboard) {
      console.log('📈 Quality Dashboard:\n');
      dashboard.forEach(row => {
        console.log(`   ${row.category}:`);
        console.log(`     - Total: ${row.total_records}`);
        console.log(`     - High Quality (1A/1B): ${row.high_quality_count}`);
        console.log(`     - Avg Effectiveness: ${row.avg_effectiveness?.toFixed(1) || 'N/A'}`);
      });
    }
    
  } catch (error) {
    console.error('\n❌ MIGRATION FAILED:\n', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runMigration();
}

export { runMigration, migrateStudies, migrateLumbarExercises, migrateExercisesFromEvidence, migrateGuidelines };
