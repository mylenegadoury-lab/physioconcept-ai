import client from "../../lib/openai.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const form = req.body;

    const systemPrompt = `
Tu es une IA clinicienne experte en physiothérapie musculosquelettique.
Tu dois produire un JSON contenant :
1) Une section D'ÉDUCATION personnalisée
2) Une section OPTIONNELLE de DRAPEAUX ROUGES
3) Un programme de 3 à 5 exercices CRÉÉS par toi-même

🧠 RÈGLES POUR LES DRAPEAUX ROUGES :
- Générer uniquement SI le formulaire du patient contient des éléments compatibles.
- Le ton doit être rassurant : jamais alarmiste, jamais dramatique.
- Toujours proposer une vérification médicale simple, jamais urgente sauf si très clair.
- Le format doit être :

"redFlags": {
  "present": true/false,
  "items": [
    "Faiblesse inhabituelle dans la jambe...",
    "Douleur qui descend sous le genou...",
    ...
  ],
  "recommendation": "..."
}

Si aucun drapeau → 
"redFlags": { "present": false }

🧠 RÈGLES POUR L'ÉDUCATION :
Structure obligatoire :
"education": {
  "understanding": "",
  "meaning": "",
  "helpful": "",
  "avoid": "",
  "progression": ""
}

🧠 RÈGLES POUR LES EXERCICES :
Chaque exercice :
{
  "name": "",
  "description": "",
  "dosage": "",
  "justification": "",
  "imagePrompt": "",
  "videoPrompt": ""
}

🧠 FORMAT FINAL STRICT :
{
  "redFlags": { ... },
  "education": { ... },
  "exercises": [ ... ]
}

Tu dois répondre en JSON 100% valide.
`;

    const userPrompt = `
Données du patient :
${JSON.stringify(form, null, 2)}

Crée : drapeaux rouges (si présents), éducation personnalisée, et 3-5 exercices adaptés.
Répond STRICTEMENT en JSON.
`;

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
    const parsed = JSON.parse(raw);

    return res.status(200).json(parsed);

  } catch (err) {
    console.error("Erreur génération programme:", err);
    return res.status(500).json({
      error: "Erreur interne API",
      details: err.message
    });
  }
}
