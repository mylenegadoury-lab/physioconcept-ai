/**
 * PROGRAMME ENRICHMENT ENGINE
 * Utilise GPT-4 pour personnaliser les exercices selon le profil patient
 * Basé sur les données probantes et adapté au niveau de compréhension
 */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Génère un programme enrichi avec instructions personnalisées et éducation
 */
export async function generateEnrichedProgram({ selectedExercises, patientProfile, justifications }) {
  console.log('\n🎨 PROGRAMME ENRICHMENT - Starting...\n');

  // Build context for AI
  const context = buildPatientContext(patientProfile);
  
  // Enrich each exercise
  const enrichedExercises = await Promise.all(
    selectedExercises.map((exercise, index) => 
      enrichExercise(exercise, patientProfile, context, justifications[index])
    )
  );

  // Generate global education and recommendations
  const globalGuidance = await generateGlobalGuidance(patientProfile, enrichedExercises);

  return {
    exercises: enrichedExercises,
    globalGuidance,
    patientContext: context,
    generatedAt: new Date().toISOString()
  };
}

/**
 * Construit le contexte patient pour l'IA
 */
function buildPatientContext(profile) {
  const context = {
    odi: profile.odi,
    odiCategory: profile.odi <= 20 ? 'minimal' : profile.odi <= 40 ? 'modéré' : 'sévère',
    phase: profile.phase === 'acute' ? 'aigüe' : profile.phase === 'subacute' ? 'subaigüe' : 'chronique',
    startBack: profile.startBack,
    goals: profile.primaryGoals || [],
    directionalPreference: profile.directionalPreference,
    movementIntolerance: profile.movementIntolerance || [],
    legPain: profile.legPain,
    dominantPattern: profile.dominantPattern
  };

  // Build plain text description
  context.description = `Patient avec douleur lombaire ${context.phase}, ODI ${context.odi}/100 (${context.odiCategory}). `;
  context.description += `Profil STarT Back: ${context.startBack}. `;
  
  if (context.goals.length > 0) {
    context.description += `Objectifs: ${context.goals.join(', ')}. `;
  }
  
  if (context.directionalPreference) {
    context.description += `Préférence directionnelle: ${context.directionalPreference}. `;
  }
  
  if (context.movementIntolerance.length > 0) {
    context.description += `Intolérances: ${context.movementIntolerance.join(', ')}. `;
  }

  return context;
}

/**
 * Enrichit un exercice spécifique avec contenu personnalisé
 * Mode PROFESSIONNEL si patientProfile.isProfessional === true
 */
async function enrichExercise(exercise, patientProfile, context, justification) {
  console.log(`   🎯 Enriching: ${exercise.name}...`);

  const isProfessional = patientProfile.isProfessional === true;

  // Different prompts for patient vs professional mode
  const prompt = isProfessional ? getProfessionalPrompt(exercise, context, justification) : getPatientPrompt(exercise, context, justification);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: isProfessional ? 2500 : 1500, // More tokens for professional mode
    });

    const content = response.choices[0].message.content.trim();
    const enrichedData = JSON.parse(content);

    console.log(`   ✅ Enriched: ${exercise.name} (${isProfessional ? 'PROFESSIONAL' : 'patient'} mode)`);

    return {
      ...exercise,
      enriched: {
        ...enrichedData,
        mode: isProfessional ? 'professional' : 'patient',
        generatedAt: new Date().toISOString()
      }
    };

  } catch (error) {
    console.error(`   ❌ Error enriching ${exercise.name}:`, error.message);
    
    // Fallback: return exercise with basic enrichment
    return {
      ...exercise,
      enriched: {
        patientInstructions: exercise.description,
        parameters: {
          sets: 3,
          reps: '10 répétitions',
          frequency: '3 fois par semaine',
          progression: 'Augmente progressivement les répétitions'
        },
        education: {
          why: 'Exercice sélectionné selon votre profil clinique',
          evidenceBased: `Niveau de preuve: ${exercise.evidence_level}`,
          expectedBenefits: ['Renforcement musculaire', 'Amélioration de la fonction']
        },
        precautions: {
          dosDonts: ['✅ Respecte ton rythme', '❌ Ne force pas si douleur'],
          painGuidance: 'Arrête si douleur intense',
          progressionCriteria: 'Augmente quand tu te sens prêt'
        },
        timing: {
          bestTime: 'Matin ou soir selon préférence',
          duration: '5-10 minutes'
        },
        error: true
      }
    };
  }
}

/**
 * Prompt pour MODE PATIENT (simplifié, accessible)
 */
function getPatientPrompt(exercise, context, justification) {
  return `Tu es un physiothérapeute expert spécialisé en lombalgie. Tu dois personnaliser cet exercice pour un patient spécifique.

PROFIL PATIENT:
${context.description}

EXERCICE À PERSONNALISER:
- Nom: ${exercise.name}
- Type: ${exercise.exercise_type}
- Niveau de preuve: ${exercise.evidence_level}
- Description technique: ${exercise.description}

JUSTIFICATION DE SÉLECTION:
${justification || 'Exercice sélectionné selon le profil clinique'}

TÂCHE:
Génère un JSON avec les éléments suivants (EN FRANÇAIS, langage accessible aux patients):

1. "patientInstructions": Instructions simplifiées et personnalisées (2-3 phrases courtes, tutoiement)
2. "parameters": Objet avec:
   - "sets": nombre de séries (nombre)
   - "reps": répétitions ou durée (string, ex: "10 répétitions" ou "30 secondes")
   - "frequency": fréquence hebdomadaire (string, ex: "3-4 fois par semaine")
   - "progression": comment progresser (string, 1 phrase)
3. "education": Object avec:
   - "why": Pourquoi CET exercice pour CE patient (2-3 phrases, contextualisé au profil)
   - "evidenceBased": Résumé des preuves scientifiques (1-2 phrases accessibles)
   - "expectedBenefits": Bénéfices attendus pour CE patient (liste de 2-3 items courts)
4. "precautions": Object avec:
   - "dosDonts": Liste de 2-3 points (format: "✅ Fais..." ou "❌ Évite...")
   - "painGuidance": Que faire si douleur (1-2 phrases)
   - "progressionCriteria": Quand augmenter l'intensité (1 phrase)
5. "timing": Object avec:
   - "bestTime": Meilleur moment de la journée (string + raison courte)
   - "duration": Durée totale de l'exercice (string)

IMPORTANT:
- Langage SIMPLE et ACCESSIBLE (niveau grand public)
- PERSONNALISÉ au profil du patient (pas générique!)
- Basé sur les DONNÉES PROBANTES
- CONCRET et ACTIONNABLE
- Tutoiement (tu/toi)

Réponds UNIQUEMENT avec le JSON, sans markdown ni explications.`;
}

/**
 * Prompt pour MODE PROFESSIONNEL (détaillé, clinique)
 */
function getProfessionalPrompt(exercise, context, justification) {
  return `Tu es un physiothérapeute expert clinicien spécialisé en lombalgie. Tu dois générer des recommandations détaillées POUR UN PROFESSIONNEL (physiothérapeute/kinésithérapeute) qui va prescrire cet exercice.

PROFIL PATIENT:
${context.description}

EXERCICE À PERSONNALISER:
- Nom: ${exercise.name}
- Type: ${exercise.exercise_type}
- Niveau de preuve: ${exercise.evidence_level}
- Description technique: ${exercise.description}
- Efficacité: ${exercise.effectiveness || 'N/A'}

JUSTIFICATION DE SÉLECTION:
${justification || 'Exercice sélectionné selon le profil clinique'}

TÂCHE:
Génère un JSON DÉTAILLÉ pour usage PROFESSIONNEL (EN FRANÇAIS):

1. "clinicalRationale": Raisonnement clinique approfondi (3-4 phrases expliquant POURQUOI cet exercice pour CE profil spécifique, références aux patterns biomécaniques, considérations neurophysiologiques)

2. "patientInstructions": Instructions que le thérapeute donnera au patient (2-3 phrases, langage accessible mais précis)

3. "parameters": Dosage précis basé sur Delphi consensus:
   - "sets": nombre exact de séries (nombre)
   - "reps": répétitions ou temps de maintien (string précis, ex: "3x10 répétitions" ou "3x30s")
   - "rest": temps de repos inter-séries (string, ex: "60-90 secondes")
   - "frequency": fréquence hebdomadaire optimale (string, ex: "3 sessions/semaine avec 48h repos")
   - "intensity": intensité cible (string, ex: "60-70% 1RM" ou "RPE 6-7/10")
   - "tempo": tempo d'exécution si pertinent (string, ex: "3-0-1-0: 3s excentrique, 1s concentrique")
   - "progression": protocole de progression détaillé (2-3 phases avec critères précis)

4. "evidence": Revue des preuves:
   - "level": Niveau de preuve détaillé (ex: "1A - RCT de haute qualité, Cochrane 2023")
   - "keyStudies": Liste de 2-3 études clés (format: "Auteur et al., année: findings")
   - "effectSize": Taille d'effet si disponible (string, ex: "ES=0.65, IC95% [0.45-0.85]")
   - "clinicalSignificance": Signification clinique (MCID, NNT si pertinent)
   - "guidelines": Référence aux CPG (ex: "Recommandé par CPG NICE 2020, Grade A")

5. "clinicalConsiderations": Object avec:
   - "contraindications": Contre-indications absolues et relatives (liste)
   - "precautions": Précautions spécifiques à ce profil patient (liste de 3-4 points techniques)
   - "modifications": Variations possibles selon tolérance/progression (liste)
   - "redFlags": Signes d'alerte pendant l'exercice (liste)
   - "assessmentTools": Outils de mesure pour suivre progression (ex: "PSFS, ODI, test de Sorensen")

6. "biomechanics": Analyse biomécanique:
   - "primaryMuscles": Muscles principaux (liste avec % activation si pertinent)
   - "kinematicChain": Chaîne cinétique impliquée
   - "commonErrors": Erreurs techniques fréquentes à corriger (liste de 2-3)
   - "cuingStrategies": Stratégies de cueing efficaces (liste de 2-3 cues internes/externes)

7. "integration": Intégration au plan de traitement:
   - "sessionTiming": Place dans la séance (ex: "Après échauffement, avant exercices fonctionnels")
   - "combinationWith": Exercices complémentaires recommandés
   - "expectedTimeline": Timeline réaliste de progression (semaines 1-2, 3-4, 5-8, etc.)

EXIGENCES:
- Langage PROFESSIONNEL et PRÉCIS (pour cliniciens)
- Références aux DONNÉES PROBANTES (études, CPG)
- DOSAGE SPÉCIFIQUE au profil clinique (ODI, phase, STarT Back)
- ACTIONNABLE avec critères mesurables
- Raisonnement clinique EXPLICITE

Réponds UNIQUEMENT avec le JSON, sans markdown ni explications.`;
}

/**
 * Génère les recommandations globales du programme
 */
async function generateGlobalGuidance(patientProfile, enrichedExercises) {
  console.log('\n   🌍 Generating global guidance...');

  const context = buildPatientContext(patientProfile);
  const exerciseNames = enrichedExercises.map(e => e.name).join(', ');

  const prompt = `Tu es un physiothérapeute expert. Génère des recommandations globales pour ce patient.

PROFIL PATIENT:
${context.description}

EXERCICES DU PROGRAMME:
${exerciseNames}

TÂCHE:
Génère un JSON avec:

1. "programOverview": Vue d'ensemble du programme (2-3 phrases expliquant la logique globale)
2. "weeklySchedule": Planning hebdomadaire suggéré (objet avec jours et exercices)
3. "progressionTimeline": Timeline de progression (objet avec semaines et objectifs)
4. "educationPoints": 4-5 points d'éducation thérapeutique essentiels (array de strings)
5. "redFlagsToWatch": Signes d'alerte nécessitant consultation (array de 3-4 strings)
6. "motivationalTips": 3 conseils motivationnels personnalisés (array)
7. "lifestyle": Recommandations style de vie (objet avec sommeil, activité, ergonomie)

Langage SIMPLE, ACCESSIBLE, PERSONNALISÉ, tutoiement.

Réponds UNIQUEMENT avec le JSON.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content.trim();
    const guidance = JSON.parse(content);

    console.log('   ✅ Global guidance generated');

    return guidance;

  } catch (error) {
    console.error('   ❌ Error generating global guidance:', error.message);
    
    return {
      programOverview: 'Programme personnalisé basé sur votre profil clinique.',
      weeklySchedule: {
        'Lundi-Mercredi-Vendredi': 'Programme complet',
        'Mardi-Jeudi': 'Exercices de récupération'
      },
      progressionTimeline: {
        'Semaine 1-2': 'Familiarisation avec les exercices',
        'Semaine 3-4': 'Augmentation progressive',
        'Semaine 5+': 'Maintien et progression'
      },
      educationPoints: [
        'La douleur peut fluctuer, c\'est normal',
        'La progression est progressive',
        'L\'activité est bénéfique',
        'Écoute ton corps'
      ],
      redFlagsToWatch: [
        'Douleur intense soudaine',
        'Perte de force dans les jambes',
        'Engourdissement important'
      ],
      motivationalTips: [
        'Chaque mouvement compte',
        'La régularité est clé',
        'Tu es sur la bonne voie'
      ],
      lifestyle: {
        sommeil: 'Vise 7-9h de sommeil',
        activité: 'Reste actif au quotidien',
        ergonomie: 'Adapte ton environnement'
      },
      error: true
    };
  }
}
