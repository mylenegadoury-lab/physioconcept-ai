/**
 * API ENDPOINT: /api/select-exercises
 * Utilise l'algorithme 4-step pour sélectionner exercices personnalisés
 * 
 * POST /api/select-exercises
 * Body: { patientProfile: {...} }
 * Response: { selectedExercises: [...], justifications: [...] }
 */

import { selectExercises, generateJustification } from '../../lib/exerciseSelection.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { patientProfile } = req.body;

    if (!patientProfile) {
      return res.status(400).json({ 
        error: 'Missing patientProfile in request body' 
      });
    }

    console.log('\n🎯 API /select-exercises - Received request');
    console.log('   Patient phase:', patientProfile.phase);
    console.log('   Primary goals:', patientProfile.primaryGoals);
    console.log('   Directional preference:', patientProfile.directionalPreference);

    // Run selection algorithm
    const result = await selectExercises(patientProfile);

    if (result.error) {
      console.error('❌ Selection error:', result.error);
      return res.status(500).json({ 
        error: 'Exercise selection failed', 
        details: result.error 
      });
    }

    // Generate justifications
    const justifications = generateJustification(
      result.selectedExercises, 
      patientProfile
    );

    // Prepare response
    const response = {
      success: true,
      selectedExercises: result.selectedExercises.map(ex => ({
        id: ex.id,
        name: ex.name,
        name_fr: ex.name_fr,
        description: ex.description,
        instructions_patient: ex.instructions_patient,
        dosage_reps: ex.dosage_reps,
        dosage_sets: ex.dosage_sets,
        dosage_frequency: ex.dosage_frequency,
        difficulty_level: ex.difficulty_level,
        evidence_level: ex.evidence_level,
        effectiveness_score: ex.effectiveness_score,
        key_points: ex.key_points,
        contraindications: ex.contraindications,
        progression_levels: ex.progression_levels,
        totalScore: ex.totalScore
      })),
      justifications,
      metadata: {
        totalAvailable: result.totalAvailable,
        afterSafety: result.afterSafety,
        selected: result.selectedExercises.length,
        timestamp: result.timestamp
      }
    };

    console.log('✅ Selection completed:', response.selectedExercises.length, 'exercises');
    
    return res.status(200).json(response);

  } catch (error) {
    console.error('❌ API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
}
