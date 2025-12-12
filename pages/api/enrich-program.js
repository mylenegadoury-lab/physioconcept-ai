/**
 * API ENDPOINT: /api/enrich-program
 * Enrichit les exercices sélectionnés avec du contenu personnalisé généré par IA
 * 
 * POST /api/enrich-program
 * Body: { 
 *   selectedExercises: [...], 
 *   patientProfile: {...},
 *   justifications: [...]
 * }
 * Response: { enrichedProgram: {...} }
 */

import { generateEnrichedProgram } from '../../lib/programEnrichment';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { selectedExercises, patientProfile, justifications } = req.body;

    if (!selectedExercises || !patientProfile) {
      return res.status(400).json({ 
        error: 'Missing selectedExercises or patientProfile' 
      });
    }

    console.log('\n🎨 API /enrich-program - Starting enrichment');
    console.log(`   Exercises to enrich: ${selectedExercises.length}`);
    console.log(`   Patient ODI: ${patientProfile.odi}`);
    console.log(`   Phase: ${patientProfile.phase}`);

    // Generate enriched program with AI
    const enrichedProgram = await generateEnrichedProgram({
      selectedExercises,
      patientProfile,
      justifications: justifications || []
    });

    console.log('✅ Enrichment completed');

    return res.status(200).json({
      success: true,
      enrichedProgram
    });

  } catch (error) {
    console.error('❌ Error in /enrich-program:', error);
    return res.status(500).json({ 
      error: 'Program enrichment failed',
      details: error.message 
    });
  }
}
