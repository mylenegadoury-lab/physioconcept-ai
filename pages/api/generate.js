import client from "../../lib/openai.js";
import { lumbarExercises } from "../../data/lumbarExercises.js";

function selectExercises(form) {
  let selected = [];

  if (form.painDirection === "flexion") {
    selected.push(lumbarExercises.find(e => e.tags.includes("extension")));
  }

  if (form.painDirection === "extension") {
    selected.push(lumbarExercises.find(e => e.id === "lumbar-rotation"));
  }

  const unique = [...new Set(selected)].filter(Boolean);
  return unique.slice(0, 6);
}

export default async function handler(req, res) {
  try {
    console.log("---- API CALLED ----");
    console.log("Received body:", req.body);

    const form = req.body;
    const chosen = selectExercises(form);

    console.log("Exercises:", chosen);

    const prompt = `
Réponds strictement en JSON valide.

Voici les exercices :
${JSON.stringify(chosen, null, 2)}

Format attendu :
{
  "exercises": [
    {
      "id": "",
      "name": "",
      "description": "",
      "image": "",
      "video": "",
      "dosage": "",
      "justification": ""
    }
  ]
}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    const output = completion.choices[0].message.content;
    console.log("Raw output:", output);

    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (err) {
      console.log("⚠️ JSON Parse error:", err);
      return res.status(500).json({
        error: "Réponse non-JSON",
        raw: output,
      });
    }

    return res.status(200).json(parsed);

  } catch (error) {
    console.error("Erreur API lombalgie:", error);
    return res.status(500).json({ error: "Erreur interne API" });
  }
}
