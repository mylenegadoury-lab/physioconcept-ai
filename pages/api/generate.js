import client from "../../lib/openai.js";
import lumbarExercises from "../../data/lumbarExercises.js";

// -----------------------------
// Sélection intelligente des exercices
// -----------------------------
function selectExercises(form) {
  let selected = [];

  // Préférence -> EXTENSION
  if (
    form.painDirection === "flexion" ||
    form.directionalPreference === "extension"
  ) {
    selected.push(lumbarExercises.find(e => e.tags.includes("extension")));
    selected.push(lumbarExercises.find(e => e.id === "bridge"));
  }

  // Préférence -> FLEXION
  if (
    form.painDirection === "extension" ||
    form.directionalPreference === "flexion"
  ) {
    selected.push(lumbarExercises.find(e => e.id === "lumbar-rotation"));
    selected.push(lumbarExercises.find(e => e.id === "cat-cow"));
  }

  // Raideur matinale
  if (form.stiffness === "morning") {
    selected.push(lumbarExercises.find(e => e.id === "cat-cow"));
    selected.push(lumbarExercises.find(e => e.id === "lumbar-rotation"));
  }

  // Instabilité lombaire
  if (form.instability === "yes") {
    selected.push(lumbarExercises.find(e => e.id === "dead-bug"));
    selected.push(lumbarExercises.find(e => e.id === "bird-dog"));
  }

  // Activité faible → exercices doux
  if (form.activityLevel === "low") {
    selected.push(lumbarExercises.find(e => e.id === "lumbar-rotation"));
    selected.push(lumbarExercises.find(e => e.id === "cat-cow"));
  }

  // Nettoyage (pas de doublons, jamais plus que 6)
  const unique = [...new Set(selected)].filter(x => x !== undefined);

  return unique.slice(0, 6);
}

// -----------------------------
// API principal
// -----------------------------
export default async function handler(req, res) {
  try {
    const form = req.body;

    // 1) Sélection clinique
    const chosenExercises = selectExercises(form);

    // 2) Préparation du prompt
    const openaiPrompt = `
Tu es une IA clinicienne experte en physiothérapie lombaire.
Transforme la liste d’exercices ci-dessous en un programme clair pour un patient.

Langue : ${form.language}

Détails du patient :
- Douleur : ${form.painLocation}
- Direction aggravante : ${form.painDirection}
- Tolérance : ${form.movementTolerance}
- Niveau d'activité : ${form.activityLevel}

Voici les exercices sélectionnés (à respecter TEL QUEL) :
${JSON.stringify(chosenExercises, null, 2)}

Pour chaque exercice :
- garde les champs image, vidéo, progression
- ajoute un champ "dosage" (ex: 10 répétitions, 2 séries)
- ajoute un champ "justification" expliquant pourquoi l'exercice est pertinent

Répond STRICTEMENT en JSON.
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: openaiPrompt }],
      temperature: 0.3,
    });

    const output = response.choices[0].message.content;

    res.status(200).json({ program: JSON.parse(output) });

  } catch (error) {
    console.error("Erreur API lombalgie:", error);
    res.status(500).json({ error: "Erreur lors de la génération du programme." });
  }
}

