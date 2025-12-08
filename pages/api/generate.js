import client from "../../lib/openai";

export default async function handler(req, res) {
  // API pour générer des programmes de physiothérapie personnalisés
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      language,
      painLocation,
      painDirection,
      movementTolerance,
      fearLevel,
      duration,
      legWeakness,
      numbness,
      nightPain,
      fever,
      trauma,
    } = req.body;

    // Validation basique
    if (
      !painLocation ||
      !painDirection ||
      !movementTolerance ||
      !fearLevel ||
      !duration
    ) {
      return res.status(400).json({ error: "Données incomplètes" });
    }

    const prompt = `Tu es un physiothérapeute expert en lombalgie. Analyse les informations du patient et génère un programme d'exercices personnalisé.

DONNÉES DU PATIENT:
- Langue: ${language}
- Localisation douleur: ${painLocation}
- Mouvement aggravant: ${painDirection}
- Tolérance au mouvement: ${movementTolerance}
- Niveau d'appréhension: ${fearLevel}
- Durée: ${duration}
- Faiblesse jambe: ${legWeakness}
- Engourdissements: ${numbness}
- Douleur nocturne: ${nightPain}
- Fièvre: ${fever}
- Trauma récent: ${trauma}

RÉPONSE EN JSON VALIDE UNIQUEMENT (sans markdown):
{
  "redFlags": {
    "present": boolean,
    "items": ["drapeau1", "drapeau2"],
    "recommendation": "Recommandation médicale si drapeaux"
  },
  "education": {
    "understanding": "Explication simple de la condition",
    "meaning": "Ce que signifient les symptômes",
    "helpful": "Ce qui aide généralement",
    "avoid": "Ce qu'il faut éviter",
    "progression": "Attentes de progression"
  },
  "exercises": [
    {
      "name": "Nom exercice",
      "description": "Description détaillée",
      "dosage": "Répétitions/durée/fréquence",
      "justification": "Pourquoi cet exercice",
      "imagePrompt": "Description pour illustration",
      "videoPrompt": "Description pour vidéo"
    }
  ]
}`;

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Tu es un physiothérapeute spécialisé en lombalgie. Réponds TOUJOURS en JSON valide.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    let programData;
    try {
      const content = response.choices[0].message.content;
      // Nettoyer le JSON si encadré par des backticks
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/({[\s\S]*})/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      programData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Erreur parsing réponse OpenAI:", parseError);
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
