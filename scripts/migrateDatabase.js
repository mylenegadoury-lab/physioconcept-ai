/**
 * Migration Script - Existing Data → Supabase (CommonJS version)
 * Transforme evidence.js et exercices.js en database structurée
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const ADMIN_USER = 'Dr. Mylène Gadoury';

// ============================================
// UTILITY FUNCTIONS
// ============================================

function extractSampleSize(n) {
  if (!n) return null;
  if (typeof n === 'number') return n;
  
  const match = n.match(/(\d+[,\d]*)\s*(participants|patients)/i);
  if (match) {
    return parseInt(match[1].replace(/,/g, ''));
  }
  
  const nMatch = n.match(/n\s*=?\s*(\d+)/i);
  if (nMatch) {
    return parseInt(nMatch[1]);
  }
  
  return null;
}

function mapEvidenceLevel(level) {
  // Map various evidence formats to valid schema values
  const validLevels = ['1A', '1B', '2A', '2B', '3A', '3B', '4', '5'];
  
  if (!level) return '2A'; // Default
  
  const levelStr = String(level).toUpperCase().trim();
  
  // Direct match
  if (validLevels.includes(levelStr)) return levelStr;
  
  // Fuzzy matching
  if (levelStr.includes('META') || levelStr.includes('SYSTEMATIC')) return '1A';
  if (levelStr.includes('RCT') || levelStr.includes('HIGH')) return '1B';
  if (levelStr.includes('COHORT') || levelStr.includes('MODERATE')) return '2A';
  if (levelStr.includes('CASE-CONTROL')) return '2B';
  if (levelStr.includes('CASE SERIES')) return '3A';
  if (levelStr.includes('EXPERT')) return '4';
  
  return '2A'; // Safe default
}

function mapStudyType(type) {
  // Valid types from schema: RCT, Meta-Analysis, Systematic Review, Cohort Study, 
  // Case-Control Study, Case Series, Expert Opinion, Clinical Practice Guideline
  const validTypes = [
    'RCT', 
    'Meta-Analysis', 
    'Systematic Review', 
    'Cohort Study', 
    'Case-Control Study', 
    'Case Series', 
    'Expert Opinion', 
    'Clinical Practice Guideline'
  ];
  
  if (!type) return 'RCT';
  
  const typeStr = String(type).trim();
  
  // Direct match
  if (validTypes.includes(typeStr)) return typeStr;
  
  // Fuzzy matching
  const typeLower = typeStr.toLowerCase();
  if (typeLower.includes('meta')) return 'Meta-Analysis';
  if (typeLower.includes('systematic')) return 'Systematic Review';
  if (typeLower.includes('rct') || typeLower.includes('randomized')) return 'RCT';
  if (typeLower.includes('cohort')) return 'Cohort Study';
  if (typeLower.includes('case-control')) return 'Case-Control Study';
  if (typeLower.includes('case series')) return 'Case Series';
  if (typeLower.includes('expert') || typeLower.includes('opinion')) return 'Expert Opinion';
  if (typeLower.includes('guideline')) return 'Clinical Practice Guideline';
  
  return 'RCT'; // Safe default
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
// 1. MIGRATE STUDIES
// ============================================

async function migrateStudies() {
  console.log('🔬 Migrating scientific studies...');
  
  // Import data files - using dynamic require for CommonJS
  const { evidenceDatabase } = require('../data/evidence.js');
  const { verifiedStudies } = require('../data/clinicalStudies.js');
  
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
  
  let inserted = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const study of uniqueStudies) {
    try {
      // Check if already exists
      const { data: existing } = await supabase
        .from('studies')
        .select('id')
        .eq('id', study.id)
        .single();
      
      if (existing) {
        skipped++;
        continue;
      }
      
      const { error } = await supabase.from('studies').insert({
        id: study.id,
        title: study.title,
        authors: study.author || study.authors,
        year: study.year,
        journal: study.journal,
        doi: study.doi || null,
        pmid: study.pmid || null,
        
        study_type: mapStudyType(study.study_type || study.type),
        evidence_level: mapEvidenceLevel(study.evidence || study.evidenceLevel),
        pedro_score: study.qualityScore || study.pedroScore || null,
        sample_size: extractSampleSize(study.n),
        
        effectiveness_score: study.effectiveness || null,
        nnt: study.NNT || study.nnt || null,
        conclusion: study.conclusion || study.findings || study.title || 'Evidence-based study on physiotherapy interventions',
        statistical_significance: study.qualityEvidence || null,
        
        quality_evidence: study.qualityEvidence || null,
        risk_of_bias: null,
        
        reviewed_by: ADMIN_USER,
        last_reviewed_date: new Date().toISOString().split('T')[0],
        next_review_date: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      
      if (error) {
        console.error(`  ❌ Failed: ${study.id} - ${error.message}`);
        errors++;
      } else {
        inserted++;
        if (inserted % 10 === 0) {
          console.log(`  ✅ Inserted ${inserted} studies...`);
        }
      }
    } catch (err) {
      console.error(`  ❌ Exception: ${study.id} - ${err.message}`);
      errors++;
    }
  }
  
  console.log(`✅ Studies: ${inserted} inserted, ${skipped} skipped, ${errors} errors\n`);
  return inserted;
}

// ============================================
// 2. MIGRATE EXERCISES - FROM EVIDENCE
// ============================================

async function migrateExercisesFromEvidence() {
  console.log('💪 Migrating exercises from evidence database...');
  
  const { evidenceDatabase } = require('../data/evidence.js');
  
  let inserted = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const [region, data] of Object.entries(evidenceDatabase)) {
    if (!data.exerciseEfficacy) continue;
    
    for (const [exerciseKey, efficacy] of Object.entries(data.exerciseEfficacy)) {
      try {
        const exerciseId = `${region}-${exerciseKey}`;
        
        // Check if exists
        const { data: existing } = await supabase
          .from('exercises')
          .select('id')
          .eq('id', exerciseId)
          .single();
        
        if (existing) {
          skipped++;
          continue;
        }
        
        const { error } = await supabase.from('exercises').insert({
          id: exerciseId,
          name: formatExerciseName(exerciseKey),
          name_fr: formatExerciseName(exerciseKey),
          name_en: exerciseKey,
          
          body_region: region,
          muscle_groups: [],
          joint_actions: [],
          
          exercise_type: 'strength',
          equipment_required: ['none'],
          difficulty_level: 'intermediate',
          
          primary_indications: [efficacy.indication || `${region} pain`],
          secondary_indications: [],
          
          absolute_contraindications: efficacy.contraindications || [],
          relative_contraindications: [],
          precautions: [],
          red_flags: [],
          
          description: efficacy.indication || formatExerciseName(exerciseKey),
          instructions_patient: efficacy.indication || formatExerciseName(exerciseKey),
          instructions_professional: efficacy.indication || formatExerciseName(exerciseKey),
          key_points: [],
          common_errors: [],
          
          evidence_level: mapEvidenceLevel(efficacy.evidence),
          effectiveness_score: efficacy.effectiveness || null,
          confidence_interval: null,
          
          created_by: ADMIN_USER,
          reviewed_by: ADMIN_USER,
          last_reviewed_date: new Date().toISOString().split('T')[0],
          next_review_date: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          version: 1,
          status: 'active',
        });
        
        if (error) {
          errors++;
        } else {
          inserted++;
          if (inserted % 10 === 0) {
            console.log(`  ✅ Inserted ${inserted} exercises...`);
          }
        }
      } catch (err) {
        errors++;
      }
    }
  }
  
  console.log(`✅ Exercises: ${inserted} inserted, ${skipped} skipped, ${errors} errors\n`);
  return inserted;
}

// ============================================
// 3. MIGRATE CLINICAL GUIDELINES
// ============================================

async function migrateGuidelines() {
  console.log('📋 Migrating clinical guidelines...');
  
  const { evidenceDatabase } = require('../data/evidence.js');
  
  let inserted = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const [region, data] of Object.entries(evidenceDatabase)) {
    if (!data.guidelines) continue;
    
    for (const guideline of data.guidelines) {
      try {
        const guidelineId = `${region}-${guideline.organization}-${guideline.year}`
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[()]/g, '');
        
        // Check if exists
        const { data: existing } = await supabase
          .from('clinical_guidelines')
          .select('id')
          .eq('id', guidelineId)
          .single();
        
        if (existing) {
          skipped++;
          continue;
        }
        
        const { error } = await supabase.from('clinical_guidelines').insert({
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
          errors++;
        } else {
          inserted++;
        }
      } catch (err) {
        errors++;
      }
    }
  }
  
  console.log(`✅ Guidelines: ${inserted} inserted, ${skipped} skipped, ${errors} errors\n`);
  return inserted;
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
    const { error: testError } = await supabase.from('studies').select('count');
    if (testError) {
      throw new Error(`Cannot connect to Supabase: ${testError.message}`);
    }
    console.log('✅ Supabase connection successful\n');
    
    // Run migrations
    const stats = {
      studies: await migrateStudies(),
      exercises: await migrateExercisesFromEvidence(),
      guidelines: await migrateGuidelines(),
    };
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n');
    console.log('='.repeat(60));
    console.log('🎉 MIGRATION COMPLETE!\n');
    console.log(`📊 Statistics:`);
    console.log(`   - Studies: ${stats.studies}`);
    console.log(`   - Exercises: ${stats.exercises}`);
    console.log(`   - Guidelines: ${stats.guidelines}`);
    console.log(`   - Total records: ${Object.values(stats).reduce((a, b) => a + b, 0)}`);
    console.log(`\n⏱️  Duration: ${duration}s`);
    console.log('='.repeat(60));
    console.log('\n');
    
    // Show quality dashboard
    const { data: dashboard } = await supabase.from('quality_dashboard').select('*');
    if (dashboard && dashboard.length > 0) {
      console.log('📈 Quality Dashboard:\n');
      dashboard.forEach(row => {
        console.log(`   ${row.category}:`);
        console.log(`     - Total: ${row.total_records}`);
        console.log(`     - High Quality (1A/1B): ${row.high_quality_count}`);
        console.log(`     - Avg Effectiveness: ${row.avg_effectiveness?.toFixed(1) || 'N/A'}`);
      });
      console.log('\n');
    }
    
    console.log('✅ Your database is ready! Next step: Transform generate.js\n');
    
  } catch (error) {
    console.error('\n❌ MIGRATION FAILED:\n', error);
    process.exit(1);
  }
}

// Run migration
runMigration();
