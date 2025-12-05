import client from "../../lib/openai.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const form = req.body;

    // -------------------------------
    // 🔥 SYSTEM PROMPT (règles IA)
    // -------------------------------
    const systemPrompt = `
Tu es une IA clinicienne experte en physiothérapie musculosquelettique.

Tu dois générer un JSON contenant OBLIGATOIREMENT :

1) "redFlags": {
      "present": true/false,
      "items": [ ... ],
      "recommendation": ""
   }

2) "education": {
      "understanding": "",
      "meaning": "",
      "helpful": "",
      "avoid": "",
      "progression": ""
   }

3) "exercises": [
      {
        "name": "",
        "description": "",
        "dosage": "",
        "justification": "",
        "imagePrompt": "",
        "videoPrompt": ""
      }
   ]

🧠 RÈGLES CLÉS :

- "redFlags" doit TOUJOURS exister.
- Si aucun drapeau rouge : 
    "redFlags": { "present": false, "items": [], "recommendation": "" }

- Éducation : ton rassurant, clinique, personnalisé.

- Exercices : 3 à 5 exercices, adaptés au patient, créés par toi-même.
  → PAS d’exercices génériques, mais une justification clinique claire.

Répond STRICTEMENT avec un JSON VALIDE.
`;

    // -------------------------------
    // 🔥 USER PROMPT (données patient)
    // -------------------------------
    const userPrompt = `
Données du patient reçues :
${JSON.stringify(form, null, 2)}

Crée les trois sections obligatoires :
- redFlags
- education
- exercises

Le JSON DOIT contenir ces trois sections, toujours.
Répond STRICTEMENT en JSON.
`;

    // -------------------------------
    // 🔥 APPEL OPENAI
    // -------------------------------
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3
    });

    const raw = completion.choices[0].message.content;

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error("Erreur parse JSON:", raw);
      return res.status(500).json({
        error: "Réponse JSON invalide",
        raw
      });
    }

    return res.status(200).json(parsed);

  } catch (err) {
    console.error("Erreur génération programme:", err);
    return res.status(500).json({
      error: "Erreur interne API",
      details: err.message
    });
  }
}
