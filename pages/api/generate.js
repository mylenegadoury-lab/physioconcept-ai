import client from "../../lib/openai";


export default async function handler(req, res) {
  try {
    const form = req.body;

    const openai = createOpenAI(process.env.OPENAI_API_KEY);

    const prompt = `
    Tu es une IA clinique spécialisée en physiothérapie, 100% evidence-based.
    Tu génères un programme d'exercices personnalisé pour la lombalgie.
    La langue du programme doit être : ${form.language}

    Voici les données du patient :
    - Localisation: ${form.painLocation}
    - Direction aggravante: ${form.painDirection}
    - Tolérance au mouvement: ${form.movementTolerance}
    - Niveau d’activité: ${form.activityLevel}

    Règles cliniques à respecter :
    - Se baser sur la littérature evidence-based moderne.
    - Intégrer activation, contrôle moteur, exposition graduée, renforcement.
    - Choisir 3 à 5 exercices pertinents selon le profil du patient.
    - Fournir des instructions très claires.
    - Retourner un plan structuré.

    Réponds en JSON strict :
    {
      "exercises": [
        {
          "name": "",
          "reason": "",
          "instructions": "",
          "progression": "",
          "reps_sets": ""
        }
      ],
      "education": ""
    }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    });

    const output = completion.choices[0].message.content;
    const parsed = JSON.parse(output);

    res.status(200).json(parsed);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
