/**
 * API ENDPOINT: /api/enrich-program (ENHANCED)
 * Enrichit les exercices sélectionnés avec contenu personnalisé généré par IA
 * Inclut l'analyse clinique approfondie pour personnalisation maximale
 * 
 * POST /api/enrich-program
 * Body: { 
 *   selectedExercises: [...], 
 *   patientProfile: {...},
 *   justifications: [...],
 *   clinicalAnalysis: {...} // NOUVEAU
 * }
 * Response: { enrichedProgram: {...} }
 */

import { generateEnrichedProgram } from '../../lib/programEnrichment';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { selectedExercises, patientProfile, justifications, clinicalAnalysis } = req.body;

    if (!selectedExercises || !patientProfile) {
      return res.status(400).json({ 
        error: 'Missing selectedExercises or patientProfile' 
      });
    }

    console.log('\n🎨 API /enrich-program - Starting enrichment');
    console.log(`   Exercises to enrich: ${selectedExercises.length}`);
    console.log(`   Patient ODI: ${patientProfile.odi}`);
    console.log(`   Phase: ${patientProfile.phase}`);
    if (clinicalAnalysis) {
      console.log(`   Phenotype: ${clinicalAnalysis.phenotype?.primaryPhenotype}`);
      console.log(`   Capacity: ${clinicalAnalysis.capacity?.level}`);
    }

    // Generate enriched program with AI (including clinical analysis)
    const enrichedProgram = await generateEnrichedProgram({
      selectedExercises,
      patientProfile,
      justifications: justifications || [],
      clinicalAnalysis // Pass clinical analysis to enrichment
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
