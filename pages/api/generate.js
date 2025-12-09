import client from "../../lib/openai";
import { getExercisesByProblematique, getExerciseById } from "../../data/exercisesMedia";
import { generateExerciseImage, findStockImage, getCachedImage, setCachedImage } from "../../lib/media";
import {
  getEvidenceForCondition,
  calculateExerciseEfficacy,
} from "../../data/evidence";
import { verifyCitationsList } from "../../lib/evidence";
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

export default async function handler(req, res) {
  // API pour générer des programmes de physiothérapie personnalisés
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
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

    // Accept either a pasted full patient dossier OR structured fields.
    if (!patientFolderText && (!problematique || !painIntensity || !painDuration)) {
      return res.status(400).json({ error: "Données incomplètes : fournir la fiche patient ou les champs requis" });
    }

    // Récupérer les exercices disponibles pour cette problématique (si fournie)
    const exercicesDisponibles = problematique ? getExercisesByProblematique(problematique) : [];

    // Construire le prompt en privilégiant le dossier patient collé si présent
    const dossierSection = patientFolderText
      ? `DOSSIER PATIENT (COPIER-COLLER):\n${patientFolderText}\n\nUtilise ce dossier comme source principale d'information clinique — privilégie ces données plutôt que les champs structurés ci-dessous.`
      : "";

    const structuredSection = `CHAMPS STRUCTURÉS:\n- Problématique: ${problematique || "Non spécifié"}\n- Nom: ${patientName || "Non spécifié"}\n- Âge: ${patientAge || "Non spécifié"}\n- Intensité douleur: ${painIntensity || "Non spécifié"}\n- Durée: ${painDuration || "Non spécifié"}\n- Localisation: ${painLocation || "Non spécifié"}\n- Restriction mouvement: ${movementRestriction || "Non spécifié"}\n- Peur du mouvement: ${fearLevel || "Non spécifié"}\n- Traitements antérieurs: ${treatmentHistory || "Aucun"}\n- Comorbidités: ${comorbidities || "Aucune"}\n- Objectif: ${objectif || "Réduire la douleur"}`;

    const availableExercisesText = exercicesDisponibles.length
      ? `EXERCICES RECOMMANDÉS DISPONIBLES:\n${exercicesDisponibles.map((e) => `- ${e.name}: ${e.description}`).join("\n")}`
      : "";

    const prompt = `Tu es un physiothérapeute expert. Génère un programme personnalisé pour ce patient en fonction des informations cliniques fournies.
${dossierSection}
${structuredSection}
${availableExercisesText}

IMPORTANT: Si un dossier patient complet est fourni, utilise-le comme source principale. Si des informations manquent, fais ton jugement clinique.

GÉNÈRE EN JSON VALIDE. Inclue pour chaque exercice si possible les champs optionnels "imagePrompt" (brief pour générer une illustration) et "imageUrl" (URL d'une image existante ou générée). Réponds STRICTEMENT en JSON.
{
  "redFlags": { "present": boolean, "items": ["drapeau1"], "recommendation": "Recommandation si drapeaux" },
  "education": { "understanding": "Explication", "meaning": "Signification", "helpful": "Ce qui aide", "avoid": "À éviter", "progression": "Attentes" },
  "exercises": [ { "name": "Nom", "description": "Description", "dosage": "Reps/durée/fréquence", "justification": "Raison", "imagePrompt": "(optionnel)", "imageUrl": "(optionnel)" } ],
  "plan": { "phase": "Phase 1/2/3", "duration": "Durée en semaines", "frequency": "Fréquence par semaine" }
}`;

    const response = await client.chat.completions.create({
      model: "gpt-4",
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
      temperature: 0.7,
      max_tokens: 2500,
    });

    let programData;
    try {
      const content = response.choices[0].message.content;
      const jsonMatch =
        content.match(/```json\n?([\s\S]*?)\n?```/) ||
        content.match(/({[\s\S]*})/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      programData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Erreur parsing:", parseError);
      return res.status(500).json({
        error: "Erreur traitement réponse IA",
        details: parseError.message,
      });
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

              // 1) Try mapping/local prompt -> look for stock image
              const stockPrompt = out.imagePrompt || local?.imagePrompt || out.description || out.name;
              let imageUrl = null;
              try {
                // Check cache first
                const cacheKey = stockPrompt;
                const cached = getCachedImage(cacheKey);
                if (cached) {
                  out.media = { ...(out.media || {}), image: cached, source: "cache" };
                  return out;
                }

                imageUrl = await findStockImage(out.name || local?.name || stockPrompt, stockPrompt);
                if (imageUrl) {
                  setCachedImage(cacheKey, imageUrl, process.env.PEXELS_API_KEY ? "pexels" : "unsplash");
                  out.media = { ...(out.media || {}), image: imageUrl, source: process.env.PEXELS_API_KEY ? "pexels" : "unsplash" };
                  return out;
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
        // simple heuristic
        const intensity = Number(req.body.painIntensity) || 0;
        let target = 5;
        if (intensity >= 8) target = 2;
        else if (intensity >= 6) target = 3;
        else if (intensity >= 4) target = 5;
        else target = 8;
        // clamp
        target = Math.max(2, Math.min(10, target));

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
            jobId = await bullEnqueue('processProgram', { programData, context: { problematique: req.body.problematique } });
          } else if (enqueueJobFile) {
            jobId = enqueueJobFile('processProgram', { programData, context: { problematique: req.body.problematique } });
          } else {
            console.warn('No enqueue implementation available');
          }
          return res.status(200).json({ jobId, status: 'queued' });
        } catch (e) {
          console.error('Failed to enqueue job', e);
          // fall through to return programData partially processed
        }
      }

    return res.status(200).json(programData);
  } catch (error) {
    console.error("Erreur API:", error);
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}
