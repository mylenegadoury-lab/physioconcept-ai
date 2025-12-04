import client from "../../lib/openai.js";
import { lumbarExercises } from "../../data/lumbarExercises.js";

function selectExercises(form) {
  let selected = [];

  if (
    form.painDirection === "flexion" ||
    form.directionalPreference === "extension"
  ) {
    selected.push(lumbarExercises.find((e) => e.tags.includes("extension")));
    selected.push(lumbarExercises.find((e) => e.id === "bridge"));
  }

  if (
    form.painDirection === "extension" ||
    form.directionalPreference === "flexion"
  ) {
    selected.push(lumbarExercises.find((e) => e.id === "lumbar-rotation"));
    selected.push(lumbarExercises.find((e) => e.id === "cat-cow"));
  }

  if (form.stiffness === "morning") {
    selected.push(lumbarExercises.find((e) => e.id === "cat-cow"));
    selected.push(lumbarExercises.find((e) => e.id === "lumbar-rotation"));
  }

  if (form.instability === "yes") {
    selected.push(lumbarExercises.find((e) => e.id === "dead-bug"));
    selected.push(lumbarExercises.find((e) => e.id === "bird-dog"));
  }

  if (form.activityLevel === "low") {
    selected.push(lumbarExercises.find((e) => e.id === "lumbar-rotation"));
    selected.push(lumbarExercises.find((e) => e.id === "cat-cow"));
  }

  const unique = [...new Set(selected)].filter((x) => x !== undefined);
  return unique.slice(0, 6);
}

export default async function handler(req, res) {
  try {
    const form = req.body;
    const chosenExercises = selectExercises(form);

    const prompt = `
Tu es une IA clinicienne experte.
Répond STRICTEMENT en JSON sans backticks.

Exercices sélectionnés :
${JSON.stringify(chosenExercises, null, 2)}

Pour chaque exercice :
- garder image, vidéo, progression
- ajouter "dosage"
- ajouter "justification"
    `;

    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    const textOutput = completion.output_text;

    res.status(200).json({
      program: JSON.parse(textOutput),
    });
  } catch (error) {
    console.error("Erreur API lombalgie:", error);
    res.status(500).json({
      error: "Erreur lors de la génération du programme.",
    });
  }
}

