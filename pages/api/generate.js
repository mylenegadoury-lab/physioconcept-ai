import client from "../../lib/openai.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const form = req.body;

    const systemPrompt = `
Tu es une IA clinicienne experte en physiothérapie lombaire.
Tu vas CRÉER toi-même des exercices personnalisés pour ce patient.

RÈGLES IMPORTANTES :
- Les exercices doivent être sécuritaires, evidence-based, adaptés à la lombalgie.
- Maximum 5 exercices, minimum 3.
- Aucun vocabulaire alarmiste.
- Toujours inclure :
  * un exercice de mobilité douce
  * un exercice de stabilisation/contrôle moteur
  * un exercice de renforcement ou d'exposition graduée
- Adapter pour :
  * douleur en flexion → favoriser extension / dérotation / décompression
  * douleur en extension → favoriser flexion douce / ouverture postérieure
  * radiculopathie → mouvements de glissement neural doux + positions permissives
  * faible tolérance → amplitudes limitées + consignes rassurantes
  * sportif → variations plus stimulantes mais contrôlées

FORMAT STRICT À RESPECTER :
Réponds UNIQUEMENT en JSON, jamais en texte libre.
Un tableau "exercises" contenant :
- name
- description
- dosage
- justification
- imagePrompt (description textuelle pour générer plus tard une image)
- videoPrompt (description textuelle pour générer plus tard une animation)

EXEMPLE DU FORMAT (ne pas réutiliser ces exercices) :

{
  "exercises": [
    {
      "name": "Mobilité pelvienne douce",
      "description": "Allongé sur le dos, basculez lentement le bassin...",
      "dosage": "2 séries de 15 mouvements",
      "justification": "Améliore la mobilité sans provocation.",
      "imagePrompt": "vue latérale, personne allongée, bassin en bascule douce",
      "videoPrompt": "animation simple montrant la bascule du bassin"
    }
  ]
}
    `;

    const userPrompt = `
Données du patient :
${JSON.stringify(form, null, 2)}

Crée 3 à 5 exercices UNIQUES, adaptés au profil ci-dessus.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.4,
      response_format: { type: "json_object" }
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
