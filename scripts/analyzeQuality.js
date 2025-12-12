const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function analyzeQuality() {
  console.log('📊 ANALYSE DE QUALITÉ ACTUELLE\n');
  console.log('='.repeat(60) + '\n');
  
  // Études
  const { data: studies } = await supabase.from('studies').select('*');
  
  const highQualityStudies = studies.filter(s => ['1A', '1B'].includes(s.evidence_level));
  const avgEffectiveness = studies.reduce((sum, s) => sum + (s.effectiveness_score || 0), 0) / studies.length;
  
  console.log('📚 ÉTUDES (' + studies.length + ' total):');
  console.log('  ✅ Haute qualité (1A/1B): ' + highQualityStudies.length + ' (' + Math.round(highQualityStudies.length/studies.length*100) + '%)');
  console.log('  📈 Efficacité moyenne: ' + avgEffectiveness.toFixed(1) + '/100');
  console.log('  ⚠️  Manque: Plus d\'études 1A/1B par région');
  
  // Exercices
  const { data: exercises } = await supabase.from('exercises').select('*');
  
  const byRegion = (exercises || []).reduce((acc, e) => {
    acc[e.body_region] = (acc[e.body_region] || 0) + 1;
    return acc;
  }, {});
  
  const incompleteExercises = (exercises || []).filter(e => 
    !e.dosage_sets || !e.dosage_reps || 
    !e.instructions_patient || e.instructions_patient.length < 50
  );
  
  console.log('\n💪 EXERCICES (' + (exercises?.length || 0) + ' total):');
  Object.entries(byRegion).forEach(([region, count]) => {
    console.log('  - ' + region + ': ' + count + ' exercices');
  });
  console.log('  ⚠️  Incomplets (dosage/instructions): ' + incompleteExercises.length);
  
  // Guidelines
  const { data: guidelines } = await supabase.from('clinical_guidelines').select('*');
  
  console.log('\n📋 GUIDELINES (' + (guidelines?.length || 0) + ' total):');
  console.log('  ⚠️  Manque: APTA, Cochrane, autres organisations');
  
  console.log('\n' + '='.repeat(60));
  console.log('\n🎯 DEUX OPTIONS:\n');
  console.log('Option A - ENRICHIR MAINTENANT (2-3h):');
  console.log('  • Ajouter 30+ études haute qualité (1A/1B)');
  console.log('  • Compléter dosages/instructions pour 16 exercices');
  console.log('  • Ajouter 10+ guidelines (APTA, Cochrane, etc.)');
  console.log('  ✅ Base PARFAITE pour "référence mondiale"');
  console.log('  ⏱️  Vous voyez résultats dans 3 heures\n');
  
  console.log('Option B - TRANSFORMER generate.js MAINTENANT (30 min):');
  console.log('  • Génération passe de 3-4 min → 3-5 secondes');
  console.log('  • Vous voyez amélioration immédiatement');
  console.log('  • Enrichissement progressif après');
  console.log('  ✅ Valeur rapide, raffinement continu');
  console.log('  ⏱️  Vous voyez résultats dans 30 minutes\n');
  
  console.log('💡 VOUS VISEZ: "Référence mondiale"');
  console.log('   → Je recommande OPTION A');
  console.log('   → Bases ultra-solides AVANT de construire dessus');
}

analyzeQuality();
