/**
 * Test Script - Generation Speed with Supabase
 * Tests the new database-driven approach
 */

const axios = require('axios');

const testPayload = {
  problematique: 'lombalgie',
  patientName: 'Test Patient',
  patientAge: 45,
  painIntensity: 6,
  painDuration: '3 mois',
  painLocation: 'Lombaire centrale avec radiation fesse droite',
  movementRestriction: 'Flexion lombaire limitée à 50%',
  fearLevel: 5,
  treatmentHistory: 'Physiothérapie il y a 1 an',
  comorbidities: 'Aucune',
  objectif: 'Retour au travail (manutention)',
  language: 'fr',
};

async function testGenerationSpeed() {
  console.log('🚀 TEST DE VITESSE - GÉNÉRATION DE PROGRAMME\n');
  console.log('='.repeat(60));
  console.log('\n📋 Payload de test:');
  console.log(`   Problématique: ${testPayload.problematique}`);
  console.log(`   Douleur: ${testPayload.painIntensity}/10`);
  console.log(`   Objectif: ${testPayload.objectif}\n`);
  
  const startTime = Date.now();
  
  try {
    console.log('⏱️  Démarrage chronométrage...\n');
    
    const response = await axios.post('http://localhost:3000/api/generate', testPayload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 60000, // 60 second timeout
    });
    
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('='.repeat(60));
    console.log('\n✅ SUCCÈS!\n');
    console.log(`⚡ Temps total: ${totalTime}s`);
    console.log(`📊 Metadata:`);
    if (response.data.metadata) {
      console.log(`   - Génération: ${response.data.metadata.generationTime}`);
      console.log(`   - Source: ${response.data.metadata.exerciseSource}`);
      console.log(`   - Evidence-based: ${response.data.metadata.evidenceBased}`);
      console.log(`   - Exercices trouvés: ${response.data.metadata.exercisesFound}`);
      console.log(`   - Exercices sélectionnés: ${response.data.metadata.exercisesSelected}`);
    }
    
    console.log(`\n💪 Exercices générés: ${response.data.exercises?.length || 0}`);
    if (response.data.exercises) {
      response.data.exercises.forEach((ex, i) => {
        console.log(`   ${i+1}. ${ex.name} (${ex.evidence_level || 'N/A'}) - Efficacité: ${ex.effectiveness_score || 'N/A'}/100`);
      });
    }
    
    console.log('\n🎯 OBJECTIF: 3-5 secondes');
    console.log(`   Résultat: ${totalTime}s`);
    
    if (parseFloat(totalTime) <= 5) {
      console.log('   ✅ OBJECTIF ATTEINT!');
    } else if (parseFloat(totalTime) <= 10) {
      console.log('   ⚠️  Bon mais peut être optimisé');
    } else {
      console.log('   ❌ Trop lent - optimisation nécessaire');
    }
    
    console.log('\n' + '='.repeat(60));
    
  } catch (error) {
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('='.repeat(60));
    console.log('\n❌ ERREUR!\n');
    console.log(`⏱️  Temps avant erreur: ${totalTime}s`);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('   ⚠️  Serveur non démarré');
      console.log('   💡 Exécutez: npm run dev');
    } else if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Erreur: ${error.response.data?.error || error.response.statusText}`);
    } else {
      console.log(`   ${error.message}`);
    }
    
    console.log('\n' + '='.repeat(60));
    process.exit(1);
  }
}

// Run test
console.log('\n');
testGenerationSpeed();
