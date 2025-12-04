import client from "../../lib/openai.js";
import { lumbarExercises } from "../../data/lumbarExercises.js";

// -----------------------------
// Utile : fonction de sélection intelligente
// -----------------------------
function selectExercises(form) {
  let selected = [];

  // Préférence directionnelle -> EXTENSION
  if (
    form.painDirection === "flexion" ||
    form.directionalPreference === "extension"
  ) {
    selected.push(
      lumbarExercises.find((e) => e.tags.includes("extension"))
    );
    selected.push(
      lumbarExercises.find((e) => e.id === "bridge")
    );
  }

  // Préférence directionnelle -> FLEXION
  if (
    form.painDirection === "extension" ||
    form.directionalPreference === "flexion"
  ) {
    selected.push(
      lumbarExercises.find((e) => e.id === "lumbar-rotation")
    );
    selected.push(
      lumbarExercises.find((e) => e.id === "cat-cow")
    );
  }

  // Raideur matinale
  if (form.stiffness === "morning") {
    selected.push(
      lumbarExercises.find((e) => e.id === "cat-cow")
    );
    selected.push(
      lumbarExercises.find((e) => e.id === "lumbar-rotation")
    );
  }

  // Instabilité lombaire
  if (form.instability === "yes") {
    selected.push(
      lumbarExercises.find((e) => e.id === "dead-bug")
    );
    selected.push(
      lumbarExercises.find((e) => e.id === "bird-dog")
    );
  }

  // Niveau d’activité très bas -> exercices simples et doux
  if (form.activityLevel === "low") {
    selected.push(
      lumbarExercises.find((e) => e.id === "lumbar-rotation")
    );
    selected.push(
      lumbarExercises.find((e) => e.id === "cat-cow")
    );
  }

  // Nettoyage : retirer doubles + limiter à 6
  const unique = [...new Set(selected)].filter((x) => x !== undefined);

  return unique.slice(0, 6);
}

// -----------------------------
// API principal : combine AI + logique clinique
// -----------------------------
export default async function handler(req, res) {
  try {
    const form = req.body;

    // 1) Sélectionner les exercices selon logique clinique
    const chosenExercises = selectExercises(form);

    // 2) Préparer le message pour OpenAI pour : 
    // - améliorer texte
    // - produire explications patient
    const openaiPrompt = `
Tu es une IA clinicienne experte en physiothérapie lombaire. 
Tu vas transformer la liste d’exercices sélectionnés automatiquement en un programme clair pour le patient.

Langue : ${form.language}

Détails du patient :
- Localisation : ${form.painLocation}
- Direction aggravante : ${form.painDirection}
- Tolérance : ${form.movementTolerance}
- Activité : ${form.activityLevel}

Voici les exercices choisis (structure JSON à garder EXACTEMENT) :

${JSON.stringify(chosenExercises, null, 2)}

Pour chaque exercice :
- produire une version du texte claire, simple et motivante
- conserver les champs image, vidéo, progression
- ajouter un champ "dosage" (ex : "10 répétitions, 2 séries")
- ajouter un champ "justification" pour expliquer pourquoi l’exercice aide ce patient

Répond STRICTEMENT en JSON.
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: openaiPrompt }],
      temperature: 0.4,
    });

    const output = response.choices[0].message.content;

    res.status(200).json({ program: JSON.parse(output) });
  } catch (error) {
    console.error("Erreur API lombalgie:", error);
    res.status(500).json({ error: "Erreur lors de la génération du programme." });
  }
}
