import client from "../../lib/openai";
import { getExercisesByProblematique } from "../../data/exercisesMedia";

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
      language = "fr",
    } = req.body;

    // Validation
    if (!problematique || !painIntensity || !painDuration) {
      return res.status(400).json({ error: "Données incomplètes" });
    }

    // Récupérer les exercices disponibles pour cette problématique
    const exercicesDisponibles = getExercisesByProblematique(problematique);

    const prompt = `Tu es un physiothérapeute expert. Génère un programme personnalisé pour ce patient.

DONNÉES DU PATIENT:
- Problématique: ${problematique}
- Nom: ${patientName || "Non spécifié"}
- Âge: ${patientAge || "Non spécifié"}
- Intensité douleur: ${painIntensity}/10
- Durée: ${painDuration}
- Localisation: ${painLocation || "Non spécifié"}
- Restriction mouvement: ${movementRestriction || "Non spécifié"}
- Peur du mouvement: ${fearLevel || "Non spécifié"}
- Traitements antérieurs: ${treatmentHistory || "Aucun"}
- Comorbidités: ${comorbidities || "Aucune"}
- Objectif: ${objectif || "Réduire la douleur"}

EXERCICES RECOMMANDÉS DISPONIBLES:
${exercicesDisponibles.map((e) => `- ${e.name}: ${e.description}`).join("\n")}

GÉNÉRER EN JSON VALIDE:
{
  "redFlags": {
    "present": boolean,
    "items": ["drapeau1"],
    "recommendation": "Recommandation si drapeaux"
  },
  "education": {
    "understanding": "Explication de la condition",
    "meaning": "Signification des symptômes",
    "helpful": "Ce qui aide",
    "avoid": "À éviter",
    "progression": "Attentes de progression"
  },
  "exercises": [
    {
      "name": "Nom de l'exercice",
      "description": "Description",
      "dosage": "Reps/durée/fréquence",
      "justification": "Pourquoi cet exercice"
    }
  ],
  "plan": {
    "phase": "Phase 1/2/3",
    "duration": "Durée en semaines",
    "frequency": "Fréquence par semaine"
  }
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

    return res.status(200).json(programData);
  } catch (error) {
    console.error("Erreur API:", error);
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}
