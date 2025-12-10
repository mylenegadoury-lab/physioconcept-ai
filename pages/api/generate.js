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

    const prompt = `Tu es un physiothérapeute expert. Génère un programme de réadaptation de 6 semaines, progressif et sécuritaire.

${dossierSection}
${structuredSection}

GUIDE RAPIDE:

1. RED FLAGS: Vérifie syndrome queue cheval, infection, fracture, cancer. Si présent:
   "redFlags": {"present": true, "items": ["..."], "priority": "CRITIQUE|HAUTE", "recommendation": "Référence médicale urgente"}

2. EXERCICES: 4-5 exercices progressifs basés sur la problématique. Chaque exercice:
   - Nom, description claire
   - Dosage: {"reps": "10-12", "sets": "3", "frequency": "3-4x/semaine", "tempo": "2-1-2", "rest": "60s", "load": "poids corps"}
   - Justification clinique
   - Critères progression mesurables

3. PLAN 6 SEMAINES (3 phases):
   Phase 1 (sem 1-2): Contrôle douleur, ROM, éducation
   Phase 2 (sem 3-4): Renforcement progressif  
   Phase 3 (sem 5-6): Optimisation, retour activités

4. ÉDUCATION: Vulgarisation condition, progression attendue, auto-gestion

FORMAT JSON REQUIS:
{
  "redFlags": {"present": false, "items": [], "priority": "AUCUNE", "recommendation": "..."},
  "education": {"understanding": "...", "meaning": "...", "helpful": "...", "avoid": "...", "progression": "..."},
  "exercises": [
    {
      "name": "Nom exercice",
      "description": "Description détaillée position/mouvement",
      "dosage": {"reps": "10-12", "sets": "3", "frequency": "3x/semaine", "tempo": "2-1-2", "rest": "60s", "load": "..."},
      "justification": "Pourquoi cet exercice pour ce patient",
      "patientInstructions": "Instructions simples patient",
      "clinicianChecklist": ["Point vérification 1", "Point 2"]
    }
  ],
  "weeklyProgression": [
    {"phase": "Phase 1: ...", "weeks": "1-2", "goals": ["..."], "exercises": ["..."], "frequency": "...", "progressionCriteria": "..."},
    {"phase": "Phase 2: ...", "weeks": "3-4", "goals": ["..."], "exercises": ["..."], "frequency": "...", "progressionCriteria": "..."},
    {"phase": "Phase 3: ...", "weeks": "5-6", "goals": ["..."], "exercises": ["..."], "frequency": "...", "progressionCriteria": "..."}
  ]
}

IMPORTANT: Réponds STRICTEMENT en JSON valide.`;

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

    // Attach evidence only (images disabled for performance)
    try {
      if (programData && Array.isArray(programData.exercises)) {
        // Attach condition-level evidence if available
        const conditionEvidence = req.body.problematique
          ? getEvidenceForCondition(req.body.problematique)
          : null;
        if (conditionEvidence) programData.evidence = conditionEvidence;

        // Images disabled for performance - skip media generation completely
        if (false) { // DISABLED FOR SPEED
          console.log(`🖼️ Début génération images pour ${programData.exercises.length} exercices`);
          const exercisesWithMedia = await Promise.all(
            programData.exercises.map(async (ex) => {
              // Preserve existing fields
              const out = { ...ex };
              console.log(`📋 Traitement exercice: ${ex.name}`);

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

    // Evidence citation generation disabled for performance (was adding 20-40s)
    try {
      if (false && programData && Array.isArray(programData.exercises)) { // DISABLED FOR SPEED
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
