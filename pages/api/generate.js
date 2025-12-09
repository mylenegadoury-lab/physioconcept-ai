import client from "../../lib/openai";
import { getExercisesByProblematique, getExerciseById } from "../../data/exercisesMedia";
import { generateExerciseImage, findStockImage, getCachedImage, setCachedImage } from "../../lib/media";
import {
  getEvidenceForCondition,
  calculateExerciseEfficacy,
} from "../../data/evidence";
import { verifyCitationsList } from "../../lib/evidence";
import { validateGenerateRequest } from "../../lib/validation";
import { asyncHandler, ValidationError, logError } from "../../lib/errors";
import { OPENAI_CONFIG, EXERCISE_LIMITS, PAIN_INTENSITY_THRESHOLDS } from "../../lib/constants";

/**
 * Résume automatiquement les notes trop longues (> 3000 caractères)
 * pour éviter les erreurs de token limit
 */
async function summarizePatientNotes(patientFolderText) {
  if (!patientFolderText || patientFolderText.length < 3000) {
    return patientFolderText; // Pas besoin de résumer
  }

  console.log(`📝 Notes trop longues (${patientFolderText.length} chars), résumé en cours...`);

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Modèle rapide et économique pour résumé
      temperature: 0,
      max_tokens: 800,
      messages: [
        {
          role: "system",
          content: "Tu es un assistant médical qui résume des notes cliniques en gardant UNIQUEMENT les informations essentielles pour créer un programme de réadaptation.",
        },
        {
          role: "user",
          content: `Résume ces notes de patient en gardant SEULEMENT:
- Diagnostic principal et sous-types
- Douleur: intensité, localisation, pattern (mécanique/inflammatoire/neuropathique)
- Limitations fonctionnelles principales (ROM, force, activités vie quotidienne)
- Facteurs aggravants/soulageants
- Comorbidités pertinentes
- Objectifs thérapeutiques
- Red flags SI PRÉSENTS

Supprime: historique détaillé, conversations, informations non-pertinentes.

NOTES ORIGINALES:
${patientFolderText}

RÉSUMÉ CLINIQUE (maximum 500 mots):`,
        },
      ],
    });

    const summary = response.choices[0].message.content;
    console.log(`✅ Résumé créé: ${summary.length} chars (réduction ${Math.round((1 - summary.length / patientFolderText.length) * 100)}%)`);
    return summary;
  } catch (error) {
    console.error("❌ Erreur résumé notes:", error.message);
    // En cas d'erreur, tronquer simplement à 3000 caractères
    return patientFolderText.substring(0, 3000) + "\n\n[... notes tronquées pour longueur ...]";
  }
}


// choose queue implementation: bull (redis) or file-backed
let enqueueJobFile = null;
try {
  enqueueJobFile = require("../../lib/jobQueue").enqueueJob;
} catch (e) {
  // ignore
}
let bullEnqueue = null;
if (process.env.USE_BULL === 'true') {
  try {
    bullEnqueue = require("../../lib/bullQueue").enqueueJob;
  } catch (e) {
    console.warn('Bull queue not available, falling back to file queue');
    bullEnqueue = null;
  }
}

export default asyncHandler(async function handler(req, res) {
  // API pour générer des programmes de physiothérapie personnalisés
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    problematique,
    patientName,
    patientAge,
    painIntensity,
    painDuration,
    painLocation,
    movementRestriction,
    fearLevel,
    treatmentHistory,
    comorbidities,
    objectif,
    patientFolderText,
    language = "fr",
  } = req.body;

  // Validate request
  const validation = validateGenerateRequest(req.body);
  if (!validation.valid) {
    throw new ValidationError('Invalid request data', validation.errors);
  }

    // Résumer automatiquement les notes trop longues pour éviter token limit
    const summarizedPatientFolder = await summarizePatientNotes(patientFolderText);

    // Récupérer les exercices disponibles pour cette problématique (si fournie)
    const exercicesDisponibles = problematique ? getExercisesByProblematique(problematique) : [];

    // Construire le prompt en privilégiant le dossier patient collé si présent
    const dossierSection = summarizedPatientFolder
      ? `DOSSIER PATIENT (COPIER-COLLER):\n${summarizedPatientFolder}\n\nUtilise ce dossier comme source principale d'information clinique — privilégie ces données plutôt que les champs structurés ci-dessous.`
      : "";

    const structuredSection = `CHAMPS STRUCTURÉS:\n- Problématique: ${problematique || "Non spécifié"}\n- Nom: ${patientName || "Non spécifié"}\n- Âge: ${patientAge || "Non spécifié"}\n- Intensité douleur: ${painIntensity || "Non spécifié"}\n- Durée: ${painDuration || "Non spécifié"}\n- Localisation: ${painLocation || "Non spécifié"}\n- Restriction mouvement: ${movementRestriction || "Non spécifié"}\n- Peur du mouvement: ${fearLevel || "Non spécifié"}\n- Traitements antérieurs: ${treatmentHistory || "Aucun"}\n- Comorbidités: ${comorbidities || "Aucune"}\n- Objectif: ${objectif || "Réduire la douleur"}`;

    const availableExercisesText = exercicesDisponibles.length
      ? `EXERCICES RECOMMANDÉS DISPONIBLES:\n${exercicesDisponibles.map((e) => `- ${e.name}: ${e.description}`).join("\n")}`
      : "";

    const prompt = `Tu es un physiothérapeute expert spécialisé en réadaptation musculosquelettique basée sur les données probantes (Evidence-Based Practice). 
    
MISSION: Génère un programme de réadaptation personnalisé de 6 SEMAINES, cliniquement rigoureux, progressif et sécuritaire.

${dossierSection}
${structuredSection}
${availableExercisesText}

MÉTHODOLOGIE CLINIQUE RIGOUREUSE:

1. RED FLAGS - ÉVALUATION SYSTÉMATIQUE (PRIORITÉ #1):
   🚨 LOMBALGIE - Critères URGENTS:
      • CRITIQUE (immédiat): Syndrome queue cheval (anesthésie selle, incontinence, faiblesse bilatérale), Myélopathie (troubles marche, hyperréflexie)
      • HAUTE (24-48h): Cancer (antécédents + perte poids + douleur nocturne constante), Infection (fièvre > 38°C + immunosuppression), Fracture (trauma + âge > 50 + ostéoporose)
      • MODÉRÉE (1 semaine): Radiculopathie sévère (déficit moteur progressif, drop foot)
   
   🚨 GENOU - Critères URGENTS:
      • CRITIQUE (immédiat): Arthrite septique (fièvre + genou rouge/chaud/gonflé + douleur sévère passive)
      • HAUTE (24-48h): Fracture (Ottawa rules +: âge > 55 + incapacité mise charge + douleur patellaire isolée)
      • MODÉRÉE (1 semaine): Déchirure LCA/LCP (instabilité sévère + hémarthrose < 2h + mécanisme haute énergie)
   
   🚨 ÉPAULE - Critères URGENTS:
      • HAUTE (1 semaine): Rupture massive coiffe (incapacité élévation active + trauma + âge > 60 + atrophie visible)
      • MODÉRÉE (2-4 semaines): Capsulite rétractile sévère (perte ROM passive > 50% tous plans + douleur nocturne sévère)
   
   🚨 COU - Critères URGENTS:
      • CRITIQUE (immédiat): Myélopathie cervicale (troubles marche, hyperréflexie, Babinski +, maladresse mains), Instabilité atlanto-axiale (polyarthrite rhumatoïde active + symptômes neurologiques position-dépendants)
   
   SI RED FLAG PRÉSENT → Inclure dans JSON:
      "redFlags": {
        "present": true,
        "items": ["Description précise drapeaux identifiés"],
        "priority": "CRITIQUE|HAUTE|MODÉRÉE",
        "action": "🚨 Référence URGENTE médecin/urgence avec délai: immédiat/24-48h/1-4 semaines + imagerie/analyses recommandées",
        "recommendation": "NE PAS TRAITER - Orienter immédiatement vers [spécialiste]. Suspendre exercices jusqu'à clearance médicale."
      }

2. ÉVALUATION CLINIQUE STRUCTURÉE:
   • Pattern douleur: Mécanique (aggravé mouvement, soulagé repos) vs Inflammatoire (raideur matinale > 1h) vs Neuropathique (brûlure, fourmillements dermatome)
   • Irritabilité: Haute (douleur > 7/10, prolongée après activité) → exercices isométriques sous-douloureux. Basse (< 4/10) → exercices fonctionnels
   • Déficits primaires: Force (faiblesse spécifique groupe musculaire) vs Mobilité (restriction ROM) vs Contrôle moteur (instabilité, pattern compensatoire)
   • Pronostic: Favorable (aigu < 3 mois, pas comorbidités, motivation haute) vs Défavorable (chronique > 12 mois, comorbidités multiples, kinésiophobie sévère)

3. SÉLECTION EXERCICES - APPROCHE BASÉE ÉVIDENCE:
   
   📊 HIÉRARCHIE ÉVIDENCE (privilégier dans l'ordre):
      1. Level 1A (Systematic reviews RCTs) - efficacité 80-90%
      2. Level 1B (RCT bien conçu) - efficacité 75-85%
      3. Level 2A (Cohort studies) - efficacité 65-75%
   
   🎯 PROTOCOLES VALIDÉS PAR CONDITION:
   
   LOMBALGIE:
      • Douleur flexion-intolérante (périphéralisation en flexion) → McKenzie extension protocol (Level 1A, 82%, Owen 2020)
      • Instabilité/contrôle moteur déficient → Motor control exercises: dead bug, bird dog, side plank (Level 1A, 73%, Saragiotto 2016)
      • Douleur chronique (> 12 semaines) → Graded activity + strengthening (Level 1A, 85%, Hayden 2021 Cochrane 24,486 participants)
   
   GENOU OA:
      • Toute arthrose genou → Renforcement quadriceps (Level 1A, 87%, Fransen 2015 Cochrane 3,913 participants): quad sets, terminal knee extension, leg press
      • Guideline OARSI 2019: "Exercise STRONGLY recommended as CORE treatment"
   
   SYNDROME DOULEUR FÉMOROPATELLAIRE (SDFP):
      • Protocole validé → Hip + knee strengthening (Level 1A, 84%, Willy 2019 CPG): clamshells, side-lying hip abduction, quad sets, step-downs
   
   ÉPAULE COIFFE ROTATEURS:
      • Traitement conservateur 1ère ligne → Progressive loading + scapular stabilization (Level 1A, 88%, Littlewood 2023): external rotation, rows, scapular retraction
      • APTA 2021: "Progressive loading avec stabilisation scapulaire - Strong recommendation"
   
   CHEVILLE INSTABILITÉ:
      • Post-entorse → Balance training (Level 1A, 86%, Doherty 2017): single-leg balance, BAPS board, réduit récidive 36%
   
   💊 DOSAGE SELON IRRITABILITÉ:
      • Haute irritabilité (7-10/10): Isométriques sous-douloureux 6-10s hold x 5-8 reps, éducation intensive, modalités (glace/TENS)
      • Modérée (4-6/10): Actifs amplitude limitée 10-12 reps x 2-3 sets, progression hebdomadaire
      • Basse (0-3/10): Fonctionnels charge progressive 8-12 reps x 3 sets, exercices plyométriques si sport

4. CONTRE-INDICATIONS ET ADAPTATIONS:
   
   ⚠️ VÉRIFIER SYSTÉMATIQUEMENT:
      • Absolues: Fracture instable, infection active, TVP non traitée, syndrome cauda equina, tumeur avec risque fracture
      • Relatives: Ostéoporose sévère (T-score < -3.0 → éviter flexion/rotation), HTA non contrôlée (> 180/110 → intensité modérée), Grossesse > 20 sem (pas décubitus dorsal)
      • Médication: Anticoagulants (pas résistance élevée risque trauma), Corticostéroïdes long terme (prudence tendons)
   
   🔧 ADAPTATIONS SPÉCIFIQUES:
      • Âge > 65 ans: Progression 50% plus lente, équilibre prioritaire, supervision initiale, éviter impact
      • Obésité (IMC > 30): Privilégier exercices déchargement (aquatique, vélo), éviter jumping/running initial
      • Comorbidité cardiaque: Surveiller FC (< 60-70% FC max), éviter Valsalva, repos adéquat entre sets

5. ÉDUCATION THÉRAPEUTIQUE - ALLIANCE THÉRAPEUTIQUE:
   
   🧠 RECONCEPTUALISER LA DOULEUR:
      • Vulgarisation: "Votre douleur ne signifie PAS dommage tissulaire. C'est une alarme hypersensible qu'on va recalibrer ensemble."
      • Rassurer: "Les images (IRM) montrent souvent des anomalies chez personnes SANS douleur. Votre condition est TRAITABLE avec exercices."
      • Timelines réalistes: "Amélioration 30-50% attendue 2-4 semaines. Résolution 70-80% à 8-12 semaines. Récidives normales mais moins intenses."
   
   📋 STRATÉGIES AUTO-GESTION:
      • Flare-ups: "Si douleur augmente temporairement → réduire intensité/amplitude 50% pendant 3-5 jours, glace 15 min 3x/jour, puis reprendre progressivement"
      • Activités utiles: Marche quotidienne 20-30 min (analgésique naturel), chaleur locale avant exercices, routines sommeil régulières
      • Activités éviter temporairement: [Spécifique condition - ex: position assise prolongée > 30 min si lombalgie discale]

6. PLAN PROGRESSION 6 SEMAINES - STRUCTURE OBLIGATOIRE:

   📅 PHASE 1 (Semaines 1-2): CONTRÔLE DOULEUR + ÉDUCATION
      Objectifs: Réduction douleur 30-40%, amélioration ROM 20-30%, autonomie exercices domicile
      Exercices: 3-4 exercices isométriques/mobilité douce sous-douloureux (< 3/10 pendant et après)
      Fréquence: Quotidien (1-2x/jour), sessions courtes 10-15 min
      Critères progression Phase 2: Douleur < 5/10, capable faire exercices sans aggravation > 24h, compliance > 80%
   
   📅 PHASE 2 (Semaines 3-4): PROGRESSION FORCE + FONCTION
      Objectifs: Douleur < 4/10, ROM > 70% côté sain, force > 60% côté sain, reprise activités légères
      Exercices: 4-5 exercices avec résistance légère-modérée, introduction exercices fonctionnels (ex: squat partiel, step-ups)
      Fréquence: 4-5x/semaine, sessions 20-25 min, augmentation charge/reps 10-15% hebdomadaire
      Critères progression Phase 3: Douleur < 3/10, ROM > 80%, tests fonctionnels spécifiques réussis (ex: single-leg squat sans douleur)
   
   📅 PHASE 3 (Semaines 5-6): OPTIMISATION + PRÉVENTION RÉCIDIVE
      Objectifs: Douleur < 2/10 ou absente, ROM complète, force > 80% côté sain, retour activités complètes incluant sport/travail
      Exercices: 5-6 exercices résistance modérée-élevée, exercices spécifiques sport/travail, plyométriques si approprié
      Fréquence: 3-4x/semaine (intensité haute nécessite repos adéquat), sessions 30-35 min
      Maintenance long-terme: 2-3x/semaine exercices clés (ceux avec meilleure évidence) indéfiniment pour prévention


FORMAT JSON REQUIS - STRUCTURE COMPLÈTE ET RIGOUREUSE:
{
  "redFlags": {
    "present": boolean,
    "items": ["🚨 Description précise chaque drapeau avec symptômes spécifiques identifiés"],
    "priority": "CRITIQUE|HAUTE|MODÉRÉE|AUCUNE",
    "action": "Action spécifique: Référence urgence/médecin/spécialiste + délai précis (immédiat/24-48h/1-4 sem) + examens recommandés (imagerie/analyses)",
    "recommendation": "Si CRITIQUE/HAUTE → 'NE PAS TRAITER - Orienter immédiatement'. Si AUCUNE → 'Aucun red flag - traitement physiothérapique conservateur approprié'"
  },
  "clinicalReasoning": {
    "painPattern": "Type: Mécanique|Inflammatoire|Neuropathique|Mixte. Justification comportement douleur observé.",
    "irritability": "Haute (7-10/10)|Modérée (4-6/10)|Basse (0-3/10). Impact dosage exercices.",
    "primaryDeficits": ["Force: muscles spécifiques affectés", "Mobilité: articulations/directions restreintes", "Contrôle moteur: patterns compensatoires observés"],
    "prognosticFactors": "Favorable|Réservé|Défavorable. Facteurs: durée symptômes, comorbidités, motivation, kinésiophobie, traitements antérieurs."
  },
  "education": {
    "reconceptualization": "Explication moderne neurophysiologie douleur. Dédramatiser. 'Douleur ≠ dommage'. Recalibrer alarme hypersensible.",
    "conditionExplanation": "Mécanisme condition spécifique (langage vulgarisé, AUCUN jargon). Pourquoi symptômes présents.",
    "reassurance": "Éléments rassurants: condition commune (X% population), traitable (X% amélioration attendue), pronostic favorable si compliance.",
    "helpfulActivities": ["Activité 1: pourquoi bénéfique", "Activité 2"],
    "activitiesToModify": ["Activité 1: pourquoi problématique temporairement + quand reprendre"],
    "timeline": "Attentes réalistes phase par phase: 2-4 sem (amélioration 30-50%), 6-8 sem (amélioration 60-70%), 12 sem (résolution 70-80%).",
    "flareUpManagement": "Protocole précis si aggravation temporaire: réduction intensité X%, modalités, durée, quand reprendre.",
    "maintenanceStrategy": "Stratégie prévention récidive long-terme: fréquence exercices clés (2-3x/sem indéfiniment), surveillance symptômes précoces."
  },
  "exercises": [
    {
      "name": "Nom français exact exercice",
      "phase": "Phase 1|Phase 2|Phase 3",
      "description": "Instructions détaillées PRÉCISES: position départ → mouvement → position finale. Repères anatomiques concrets.",
      "dosage": {
        "reps": 8-12,
        "sets": 3,
        "frequency": "3-4x/semaine",
        "tempo": "2-1-2 (2s concentrique, 1s hold, 2s excentrique)",
        "rest": "60-90s entre sets",
        "load": "Poids corps|Bande légère|Charge modérée X kg"
      },
      "justification": "Déficit ciblé + mécanisme action + pourquoi cet exercice spécifiquement (pas alternatives).",
      "evidence": {
        "level": "Level 1A|1B|2A",
        "effectiveness": 75-90,
        "source": "Auteur Année (ex: Owen 2020, Hayden 2021 Cochrane)",
        "citation": "Titre étude complète si pertinent"
      },
      "contraindications": ["Absolue 1: pathologie spécifique", "Absolue 2"],
      "precautions": ["Relative 1: condition + adaptation requise", "Relative 2"],
      "safetyTips": "Signaux arrêt immédiat: douleur > 3/10 pendant, > 5/10 après, périphéralisation, engourdissement nouveau.",
      "progressionCriteria": "Critères OBJECTIFS mesurables: douleur < X/10 pendant+après, X reps sans compensation, ROM ≥ X°.",
      "imagePrompt": "Brief english description anatomical position for visual (optional)"
    }
  ],
  "weeklyProgression": [
    {
      "phase": "Phase 1: Contrôle douleur + Éducation",
      "weeks": "Semaines 1-2",
      "goals": [
        "Réduction douleur 30-40% (échelle 0-10)",
        "ROM augmentation 20-30%",
        "Autonomie exercices domicile (compliance > 80%)",
        "Compréhension condition + stratégies auto-gestion"
      ],
      "exercises": ["Nom exercice 1 (phase 1)", "Nom exercice 2 (phase 1)", "Nom exercice 3 (phase 1)"],
      "frequency": "Quotidien (1-2x/jour) ou tous les 2 jours selon irritabilité",
      "sessionDuration": "10-15 minutes",
      "loadIntensity": "Très légère (isométriques, mobilité douce sous-douloureux < 3/10)",
      "clinicalRationale": "Désensibilisation système nerveux. Rétablir patterns mouvement sans peur. Éducation intensive alliance thérapeutique.",
      "progressionCriteria": "Passer Phase 2 SI: Douleur < 5/10 repos + < 3/10 pendant exercices + capable faire sans aggravation > 24h + compliance > 80%"
    },
    {
      "phase": "Phase 2: Progression force + Fonction",
      "weeks": "Semaines 3-4",
      "goals": [
        "Douleur < 4/10",
        "ROM > 70% côté sain",
        "Force > 60% côté sain (tests manuels ou dynamomètre)",
        "Reprise activités vie quotidienne légères sans majoration symptômes"
      ],
      "exercises": ["Nom exercice 1 (phase 1 OU 2)", "Nom exercice 4 (phase 2 nouveau)", "Nom exercice 5 (phase 2 fonctionnel)"],
      "frequency": "4-5x/semaine",
      "sessionDuration": "20-25 minutes",
      "loadIntensity": "Légère-modérée (résistance élastique, poids 1-3 kg, ou 30-50% 1RM)",
      "progressionStrategy": "Augmentation charge/reps 10-15% hebdomadaire SI critères progression atteints",
      "clinicalRationale": "Hypertrophie musculaire débutante. Adaptation neurale. Introduction exercices spécifiques tâches fonctionnelles.",
      "progressionCriteria": "Passer Phase 3 SI: Douleur < 3/10 + ROM > 80% + Tests fonctionnels réussis (ex: single-leg squat, step-down test) + force adéquate activités cibles"
    },
    {
      "phase": "Phase 3: Optimisation + Prévention récidive",
      "weeks": "Semaines 5-6",
      "goals": [
        "Douleur < 2/10 ou absente",
        "ROM complète symétrique",
        "Force > 80% côté sain",
        "Retour complet activités incluant sport/travail exigeant",
        "Stratégies maintenance autonome acquises"
      ],
      "exercises": ["Nom exercice 6 (phase 3 charge élevée)", "Nom exercice 7 (phase 3 plyométrique si sport)", "Nom exercice spécifique sport/travail"],
      "frequency": "3-4x/semaine (intensité haute nécessite récupération adéquate)",
      "sessionDuration": "30-35 minutes",
      "loadIntensity": "Modérée-élevée (60-75% 1RM, plyométriques si approprié)",
      "clinicalRationale": "Optimisation capacités physiques. Préparation exigences spécifiques (sport, travail physique). Développement résilience tissulaire.",
      "progressionCriteria": "Graduation du programme SI: Objectifs fonctionnels atteints + tests performance réussis + patient confiant capacités"
    }
  ],
  "maintenancePlan": {
    "duration": "Indéfiniment (prévention récidive long-terme)",
    "keyExercises": ["2-3 exercices les plus efficaces (Level 1A si dispo) à maintenir"],
    "frequency": "2-3x/semaine minimum",
    "modifications": "Adapter selon évolution activités (sport saisonnier, grossesse, vieillissement)",
    "monitoringSymptoms": "Surveiller signaux précoces rechute: douleur > 3/10 après activité nouvelle, raideur matinale > 20 min → reprendre Phase 1 temporairement"
  },
  "followUp": {
    "schedule": [
      "2 semaines: Évaluation initiale réponse traitement, ajuster si nécessaire",
      "4 semaines: Progression Phase 2 → 3, réévaluation objectifs",
      "6 semaines: Graduation ou prolongation si objectifs partiels",
      "3 mois: Follow-up maintenance, prévention récidive"
    ],
    "medicalReferralCriteria": [
      "Aucune amélioration après 4 semaines traitement optimal (< 10% réduction douleur)",
      "Aggravation symptômes malgré modification programme",
      "Nouveaux symptômes neurologiques (faiblesse, engourdissement progressif)",
      "Red flags nouveaux apparaissant durant traitement"
    ]
  }
}

⚠️ CONSIGNES CRITIQUES:
1. Si RED FLAGS détectés (CRITIQUE ou HAUTE priorité) → redFlags.present = true + recommendation = "NE PAS TRAITER"
2. TOUJOURS citer évidence (Level + % efficacité + source) pour chaque exercice
3. Progressions OBLIGATOIRES sur 6 semaines (3 phases distinctes)
4. Dosage PRÉCIS pour chaque exercice (pas "2-3 sets" mais "3 sets de 10 reps")
5. Éducation thérapeutique APPROFONDIE (reconceptualisation douleur essentielle)
6. Critères progression objectifs et MESURABLES (pas "quand prêt" mais "si douleur < 3/10 + ROM > 80%")

IMPORTANT: Si dossier patient complet fourni, privilégie ces données. Réponds STRICTEMENT en JSON valide.`;

    const response = await client.chat.completions.create({
      model: OPENAI_CONFIG.PROGRAM_GENERATION.model,
      messages: [
        {
          role: "system",
          content: "Tu es un physiothérapeute spécialisé. Réponds TOUJOURS en JSON valide.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: OPENAI_CONFIG.PROGRAM_GENERATION.temperature,
      max_tokens: OPENAI_CONFIG.PROGRAM_GENERATION.maxTokens,
    });

    let programData;
    try {
      const content = response.choices[0].message.content;
      const jsonMatch =
        content.match(/```json\n?([\s\S]*?)\n?```/) ||
        content.match(/({[\s\S]*})/);
      let jsonString = jsonMatch ? jsonMatch[1] : content;
      
      // Tentative de nettoyage du JSON mal formaté
      jsonString = jsonString
        .replace(/,(\s*[}\]])/g, '$1') // Enlever virgules avant } ou ]
        .replace(/([}\]])(\s*)([{[])/g, '$1,$2$3') // Ajouter virgules entre objets/arrays
        .replace(/\n\s*\n/g, '\n') // Enlever lignes vides
        .trim();
      
      programData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError.message);
      console.error("Problematic JSON:", response.choices[0].message.content.substring(0, 500));
      
      // Dernière tentative: demander à GPT-4 de corriger le JSON
      try {
        const fixResponse = await client.chat.completions.create({
          model: "gpt-4o-mini",
          temperature: 0,
          max_tokens: 2000,
          messages: [
            {
              role: "system",
              content: "Tu corriges le JSON mal formaté en réparant les virgules, guillemets et accolades. Retourne UNIQUEMENT le JSON corrigé, sans explications.",
            },
            {
              role: "user",
              content: `Corrige ce JSON:\n${response.choices[0].message.content}`,
            },
          ],
        });
        
        const fixedJson = fixResponse.choices[0].message.content.match(/({[\s\S]*})/)[1];
        programData = JSON.parse(fixedJson);
        console.log("✅ JSON réparé automatiquement");
      } catch (fixError) {
        logError(parseError, { context: 'Parsing OpenAI response' });
        throw new Error("Impossible de traiter la réponse de l'IA");
      }
    }

    // If the model returned exercises with imagePrompts but no image URLs,
    // attach evidence and generate/lookup images server-side when enabled.
    try {
      if (programData && Array.isArray(programData.exercises)) {
        // Attach condition-level evidence if available
        const conditionEvidence = req.body.problematique
          ? getEvidenceForCondition(req.body.problematique)
          : null;
        if (conditionEvidence) programData.evidence = conditionEvidence;

        // If running in async mode, skip heavy media generation here and let the worker handle it.
        if (!process.env.ASYNC_JOBS || process.env.ASYNC_JOBS !== 'true') {
          const exercisesWithMedia = await Promise.all(
            programData.exercises.map(async (ex) => {
              // Preserve existing fields
              const out = { ...ex };

              // Try to find a matching local exercise by id or name
              let local = null;
              if (ex.id) local = getExerciseById(ex.id);
              if (!local && ex.name) {
                // try to find by name (case-insensitive)
                // iterate categories
                const allKeys = Object.keys(require("../../data/exercisesMedia").default);
                for (const k of allKeys) {
                  const list = require("../../data/exercisesMedia").default[k];
                  const found = list.find((it) => it.name && it.name.toLowerCase() === ex.name.toLowerCase());
                  if (found) {
                    local = found;
                    break;
                  }
                }
              }

              // Attach evidence from local DB when possible
              try {
                if (local) {
                  const ev = calculateExerciseEfficacy(local.id, req.body.problematique || local.problematique || "");
                  if (ev) out.evidence = ev;
                }
              } catch (evErr) {
                console.warn("Evidence lookup failed:", evErr.message || evErr);
              }

              // If an image already present, mark source
              if (out.image || out.imageUrl || out.media?.image) {
                out.media = { ...(out.media || {}), image: out.image || out.imageUrl || out.media?.image, source: "provided" };
                return out;
              }

              // Media library disabled - using stock photos only (Pexels/Unsplash)
              // Try stock images
              const stockPrompt = out.imagePrompt || local?.imagePrompt || out.description || out.name;
              let imageUrl = null;
              try {
                // Check cache first
                const cacheKey = stockPrompt;
                const cached = getCachedImage(cacheKey);
                if (cached) {
                  console.log(`✅ Image depuis cache pour: ${out.name}`);
                  out.media = { ...(out.media || {}), image: cached, source: "cache" };
                  return out;
                }

                console.log(`🔍 Recherche image stock pour: ${out.name}`);
                imageUrl = await findStockImage(out.name || local?.name || stockPrompt, stockPrompt);
                if (imageUrl) {
                  console.log(`✅ Image trouvée: ${imageUrl.substring(0, 60)}...`);
                  setCachedImage(cacheKey, imageUrl, process.env.PEXELS_API_KEY ? "pexels" : "unsplash");
                  out.media = { ...(out.media || {}), image: imageUrl, source: process.env.PEXELS_API_KEY ? "pexels" : "unsplash" };
                  return out;
                } else {
                  console.warn(`⚠️ Aucune image trouvée pour: ${out.name}`);
                }
              } catch (stockErr) {
                console.warn("Stock image lookup failed:", stockErr.message || stockErr);
              }

              // 2) Fall back to DALL·E if allowed
              if (process.env.GENERATE_IMAGES === "true") {
                try {
                  const promptForImage = out.imagePrompt || out.description || out.name || stockPrompt;
                  const dalleUrl = await generateExerciseImage(out.name || "exercise", promptForImage);
                  if (dalleUrl) {
                    const cacheKey = promptForImage;
                    setCachedImage(cacheKey, dalleUrl, "dalle");
                    out.media = { ...(out.media || {}), image: dalleUrl, source: "dalle" };
                  }
                } catch (dalleErr) {
                  console.error(`DALL·E generation failed for ${out.name}:`, dalleErr.message || dalleErr);
                }
              }

              return out;
            })
          );

          programData.exercises = exercisesWithMedia;
        }
      }
    } catch (mediaError) {
      console.error("Erreur lors de l'ajout des médias:", mediaError);
      // don't fail the whole response if media generation failed
    }

    // NEXT: enrich exercises with evidence citations when missing
    try {
      if (programData && Array.isArray(programData.exercises)) {
        const needsEvidence = programData.exercises
          .map((ex, idx) => ({ ex, idx }))
          .filter(({ ex }) => !ex.evidence || !ex.evidence.effectiveness);

        if (needsEvidence.length > 0 && !(process.env.ASYNC_JOBS === 'true')) {
          // Build a single prompt asking for citations per exercise
          const exerciseList = needsEvidence.map((n) => `- ${n.ex.name}`).join("\n");
          const evidencePrompt = `Vous êtes un assistant expert en recherche médicale. Pour la liste d'exercices suivante liée à la problématique '${req.body.problematique || "général"}', fournissez, pour chaque exercice, un tableau (peut être vide) d'études pertinentes sous forme JSON. Chaque étude doit avoir les champs: {"title","authors","year","doi","pmid","summary","level"}. Si possible, fournissez DOI ou PMID. Si aucune étude de qualité n'existe, renvoyez un tableau vide pour cet exercice. Répondez STRICTEMENT en JSON. Liste des exercices:\n${exerciseList}`;

          const evResp = await client.chat.completions.create({
            model: "gpt-4",
            messages: [
              { role: "system", content: "You are a clinical research assistant. Return only valid JSON." },
              { role: "user", content: evidencePrompt },
            ],
            temperature: 0,
            max_tokens: 1500,
          });

            try {
              const evContent = evResp.choices[0].message.content;
              const evMatch = evContent.match(/```json\n?([\s\S]*?)\n?```/) || evContent.match(/({[\s\S]*})/);
              const evJsonString = evMatch ? evMatch[1] : evContent;
              const evData = JSON.parse(evJsonString);

              // For each exercise, verify citations via CrossRef/PubMed
              await Promise.all(
                needsEvidence.map(async ({ ex, idx }) => {
                  const key = ex.name;
                  const list = (evData[key] && Array.isArray(evData[key])) ? evData[key] : [];
                  // verify each citation
                  const verified = await verifyCitationsList(list);
                  programData.exercises[idx].generatedEvidence = verified;
                })
              );
            } catch (e) {
              console.warn("Could not parse evidence response:", e.message || e);
              // attach empty arrays to be explicit
              needsEvidence.forEach(({ idx }) => {
                programData.exercises[idx].generatedEvidence = [];
              });
            }
        }
      }
    } catch (evidError) {
      console.error("Erreur récupération preuves IA:", evidError);
    }

    // Decide final number of exercises (2-10) based on clinical inputs
    try {
      if (programData && Array.isArray(programData.exercises)) {
        // simple heuristic using constants
        const intensity = Number(painIntensity) || 0;
        let target = EXERCISE_LIMITS.DEFAULT;
        if (intensity >= PAIN_INTENSITY_THRESHOLDS.HIGH) target = EXERCISE_LIMITS.MIN;
        else if (intensity >= PAIN_INTENSITY_THRESHOLDS.MEDIUM) target = 3;
        else if (intensity >= PAIN_INTENSITY_THRESHOLDS.LOW) target = EXERCISE_LIMITS.DEFAULT;
        else target = 8;
        // clamp
        target = Math.max(EXERCISE_LIMITS.MIN, Math.min(EXERCISE_LIMITS.MAX, target));

        const current = programData.exercises;
        // sort by evidence strength (prefer local evidence, then number of generatedEvidence)
        const scored = current.map((ex) => {
          const score = (ex.evidence?.evidenceLevelScore || 0) + (ex.generatedEvidence ? ex.generatedEvidence.filter(c => c.verified).length * 10 : 0);
          return { ex, score };
        }).sort((a,b) => b.score - a.score);

        let final = scored.slice(0, target).map(s => s.ex);

        // if not enough, try to add from available exercises list (local DB)
        if (final.length < target && Array.isArray(exercicesDisponibles) && exercicesDisponibles.length > 0) {
          for (const cand of exercicesDisponibles) {
            if (final.find(f => (f.name && f.name.toLowerCase() === cand.name.toLowerCase()))) continue;
            final.push(cand);
            if (final.length >= target) break;
          }
        }

        // ensure not more than available
        programData.exercises = final.slice(0, target);
      }
    } catch (selErr) {
      console.warn('Exercise selection error', selErr?.message || selErr);
    }

    // Generate patient-friendly and clinician checklists for each exercise
    try {
      if (programData && Array.isArray(programData.exercises) && programData.exercises.length > 0) {
        const exListText = programData.exercises.map((ex, i) => `${i+1}. ${ex.name} -- ${ex.description}`).join('\n');
        const instructPrompt = `Pour la liste d'exercices suivante, génère un objet JSON où pour chaque exercice tu fournis:\n- patient: instructions courtes et simples en français (phrases claires, étapes, points de sécurité, langage accessible)\n- clinician: checklist détaillée (position initiale, points de repère, erreurs communes, critères de progression, précautions).\nRéponds STRICTEMENT en JSON sous la forme {"Exercise Name": {"patient":"...","clinician":["point1","point2"]}}\nListe:\n${exListText}`;

        const instrResp = await client.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a concise clinical assistant. Return valid JSON.' },
            { role: 'user', content: instructPrompt }
          ],
          temperature: 0.2,
          max_tokens: 1200,
        });

        try {
          const instrContent = instrResp.choices[0].message.content;
          const instrMatch = instrContent.match(/```json\n?([\s\S]*?)\n?```/) || instrContent.match(/({[\s\S]*})/);
          const instrString = instrMatch ? instrMatch[1] : instrContent;
          const instrData = JSON.parse(instrString);

          programData.exercises = programData.exercises.map((ex) => {
            const key = ex.name;
            const info = instrData[key];
            if (info) {
              return { ...ex, patientInstructions: info.patient || null, clinicianChecklist: info.clinician || null };
            }
            return ex;
          });
        } catch (ie) {
          console.warn('Could not parse instruction response', ie?.message || ie);
        }
      }
    } catch (instrErr) {
      console.error('Instruction generation error', instrErr?.message || instrErr);
    }

    // If async processing is enabled, enqueue the program for background processing
    if (process.env.ASYNC_JOBS === 'true') {
      try {
        let jobId = null;
        if (process.env.USE_BULL === 'true' && bullEnqueue) {
          jobId = await bullEnqueue('processProgram', { programData, context: { problematique } });
        } else if (enqueueJobFile) {
          jobId = enqueueJobFile('processProgram', { programData, context: { problematique } });
        } else {
          logError(new Error('No enqueue implementation available'));
        }
        return res.status(200).json({ jobId, status: 'queued' });
      } catch (e) {
        logError(e, { context: 'Job enqueue failed' });
        // fall through to return programData partially processed
      }
    }

    return res.status(200).json(programData);
});
