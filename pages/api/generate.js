import client from "../../lib/openai";
import lumbarExercises from "../../data/lumbarExercises";

// -----------------------------
// Sélection intelligente
// -----------------------------
function selectExercises(form) {
  let selected = [];

  if (form.painDirection === "flexion") {
    selected.push(lumbarExercises.find(e => e.tags.includes("extension")));
    selected.push(lumbarExercises.find(e => e.id === "bridge"));
  }

  if (form.painDirection === "extension") {
    selected.push(lumbarExercises.find(e => e.id === "lumbar-rotation"));
    selected.push(lumbarExercises.find(e => e.id === "cat-cow"));
  }

  if (form.stiffness === "morning") {
    selected.push(lumbarExercises.find(e => e.id === "cat-cow"));
    selected.push(lumbarExercises.find(e => e.id === "lumbar-rotation"));
  }

  if (form.instability === "yes") {
    selected.push(lumbarExercises.find(e => e.id === "dead-bug"));
    selected.push(lumbarExercises.find(e => e.id === "bird-dog"));
  }

  if (form.activityLevel === "low") {
    selected.push(lumbarExercises.find(e => e.id === "lumbar-rotation"));
    selected.push(lumbarExercises.find(e => e.id === "cat-cow"));
  }

  const unique = [...new Set(selected)].filter(x => x !== undefined);
  return unique.slice(0, 6);
}

// -----------------------------
// API Handler
// -----------------------------
export default async function handler(req, res) {
  try {
    const form = req.body;
    const chosenExercises = selectExercises(form);

    const prompt = `
Tu es une IA clinicienne spécialisée.
Répond STRICTEMENT en JSON, sans backticks, sans \`\`\`.
Exercices sélectionnés :
${JSON.stringify(chosenExercises, null, 2)}

Pour chaque exercice :
- garde image, vidéo, progression
- ajoute "dosage"
- ajoute "justification"
`;

    // -----------------------------
    // NOUVELLE MÉTHODE OPENAI
    // (correcte pour le SDK actuel)
    // -----------------------------
    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
    });

    // Le texte de sortie
    const output = completion.output_text;

    // Nettoyage de sécurité (en cas de JSON formaté)
    const cleaned = output.replace(/```json/gi, "").replace(/```/g, "").trim();

    res.status(200).json({
      program: JSON.parse(cleaned),
    });

  } catch (error) {
    console.error("Erreur API lombalgie:", error);
    res.status(500).json({
      error: "Erreur lors de la génération du programme.",
    });
  }
}
