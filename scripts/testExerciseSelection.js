/**
 * SCRIPT TEST: Algorithme sélection exercices
 * Test des 4 steps avec différents profils patients
 * 
 * Usage: node scripts/testExerciseSelection.js
 */

import { selectExercises, generateJustification } from '../lib/exerciseSelection.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Test profiles
const testProfiles = [
  {
    name: 'Acute LBP - Low risk',
    profile: {
      phase: 'acute',
      acuteLBP: true,
      primaryGoals: ['pain_reduction'],
      directionalPreference: null,
      movementIntolerance: ['flexion_intolerant'],
      dominantPattern: 'motor_control',
      odi: 40,
      startBack: 'low',
      redFlags: [],
      contraindications: []
    }
  },
  {
    name: 'Chronic LBP - Return to sport',
    profile: {
      phase: 'chronic',
      acuteLBP: false,
      primaryGoals: ['strength', 'return_sport'],
      directionalPreference: null,
      movementIntolerance: [],
      dominantPattern: 'strengthening',
      odi: 20,
      startBack: 'low',
      redFlags: [],
      contraindications: []
    }
  },
  {
    name: 'Subacute - Extension preference',
    profile: {
      phase: 'subacute',
      acuteLBP: false,
      primaryGoals: ['pain_reduction', 'function'],
      directionalPreference: 'extension',
      movementIntolerance: ['flexion_intolerant'],
      dominantPattern: 'stabilization',
      specificNeeds: ['hamstring_tightness'],
      odi: 35,
      startBack: 'medium',
      redFlags: [],
      contraindications: []
    }
  },
  {
    name: 'Chronic - High psychosocial risk',
    profile: {
      phase: 'chronic',
      acuteLBP: false,
      primaryGoals: ['pain_reduction', 'function'],
      directionalPreference: null,
      movementIntolerance: [],
      dominantPattern: 'motor_control',
      odi: 50,
      startBack: 'high',
      redFlags: [],
      contraindications: []
    }
  },
  {
    name: 'Return to sport - Athlete',
    profile: {
      phase: 'return_sport',
      acuteLBP: false,
      primaryGoals: ['return_sport', 'strength'],
      directionalPreference: null,
      movementIntolerance: [],
      dominantPattern: 'power',
      odi: 10,
      startBack: 'low',
      redFlags: [],
      contraindications: []
    }
  }
];

async function testSelection() {
  console.log('================================================================================');
  console.log('🧪 TEST ALGORITHME SÉLECTION EXERCICES');
  console.log('================================================================================\n');

  for (const test of testProfiles) {
    console.log('\n' + '='.repeat(80));
    console.log(`📋 TEST: ${test.name}`);
    console.log('='.repeat(80));
    
    console.log('\n📊 Profil patient:');
    console.log('   Phase:', test.profile.phase);
    console.log('   ODI:', test.profile.odi);
    console.log('   STarT Back:', test.profile.startBack);
    console.log('   Goals:', test.profile.primaryGoals.join(', '));
    console.log('   Pattern:', test.profile.dominantPattern);
    if (test.profile.directionalPreference) {
      console.log('   Directional pref:', test.profile.directionalPreference);
    }
    if (test.profile.movementIntolerance.length > 0) {
      console.log('   Intolerance:', test.profile.movementIntolerance.join(', '));
    }

    try {
      const result = await selectExercises(test.profile);
      
      if (result.error) {
        console.error('\n❌ Erreur:', result.error);
        continue;
      }

      const justifications = generateJustification(
        result.selectedExercises,
        test.profile
      );

      console.log('\n✅ Résultats sélection:');
      console.log('   Exercices sélectionnés:', result.selectedExercises.length);
      console.log('   Disponibles (after safety):', result.afterSafety);
      console.log('   Total database:', result.totalAvailable);

      console.log('\n📋 Top 8 exercices recommandés:\n');
      result.selectedExercises.slice(0, 8).forEach((ex, i) => {
        console.log(`   ${i+1}. ${ex.name}`);
        console.log(`      Score: ${ex.totalScore.toFixed(1)} (Evidence: ${ex.evidenceScore}, Effectiveness: ${ex.effectivenessScore.toFixed(1)}, Pattern: ${ex.patternScore}, Goal: ${ex.goalScore})`);
        console.log(`      Level: ${ex.evidence_level} | Difficulty: ${ex.difficulty_level} | Effectiveness: ${ex.effectiveness_score}/100`);
        
        const just = justifications.find(j => j.exercise === ex.name);
        if (just && just.reasons.length > 0) {
          console.log(`      Why: ${just.reasons[0]}`);
        }
        console.log('');
      });

      // Analyze distribution
      const difficulties = result.selectedExercises.reduce((acc, ex) => {
        acc[ex.difficulty_level] = (acc[ex.difficulty_level] || 0) + 1;
        return acc;
      }, {});

      const mechanisms = result.selectedExercises.reduce((acc, ex) => {
        ex.tags?.mechanism?.forEach(m => {
          acc[m] = (acc[m] || 0) + 1;
        });
        return acc;
      }, {});

      console.log('📊 Distribution sélection:');
      console.log('   Par difficulté:', JSON.stringify(difficulties));
      console.log('   Par mécanisme (top 3):', 
        Object.entries(mechanisms)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([m, c]) => `${m}(${c})`)
          .join(', ')
      );

    } catch (error) {
      console.error('\n❌ Erreur test:', error.message);
      console.error(error.stack);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ Tests terminés');
  console.log('='.repeat(80) + '\n');
}

// Run tests
testSelection()
  .then(() => {
    console.log('✅ Script test terminé avec succès');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error.message);
    process.exit(1);
  });
