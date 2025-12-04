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
    const chosenExercises = selectExercises(form);

    console.log("Chosen exercises:", chosenExercises);

    const prompt = `
Réponds STRICTEMENT en JSON valide.
Ne mets PAS de \`\`\`json ni de backticks.

Voici la liste :
${JSON.stringify(chosenExercises, null, 2)}

Retourne exactement :
{
  "exercises": [
    {
      "id": "...",
      "name": "...",
      "description": "...",
      "image": "...",
      "video": "...",
      "dosage": "...",
      "justification": "..."
    }
  ]
}
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    });

    console.log("Raw OpenAI output:", response.choices[0].message.content);

    let parsed;
    try {
      parsed = JSON.parse(response.choices[0].message.content);
    } catch (e) {
      console.error("JSON parse failed:", e);
      return res.status(500).json({
        error: "OpenAI a retourné du JSON invalide",
        raw: response.choices[0].message.content,
      });
    }

    return res.status(200).json(parsed);

  } catch (error) {
    console.error("Erreur API lombalgie:", error);
    res.status(500).json({ error: "Erreur interne API" });
  }
}
