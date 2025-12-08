import client from "../../lib/openai";
import { generateExerciseImage, generateVideoPrompts, createVideoScript } from "../../lib/media";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { exercises, generateImages = false } = req.body;

    if (!exercises || !Array.isArray(exercises)) {
      return res.status(400).json({ error: "Invalid exercises format" });
    }

    // Ajouter les médias à chaque exercice
    const exercisesWithMedia = await Promise.all(
      exercises.map(async (exercise) => {
        try {
          // Générer image si activé (DALL-E - optionnel, coûteux)
          let imageUrl = null;
          if (generateImages && process.env.GENERATE_IMAGES === "true") {
            imageUrl = await generateExerciseImage(
              exercise.name,
              exercise.description
            );
          }

          // Générer prompts vidéo (gratuit)
          const videoInfo = generateVideoPrompts(
            exercise.name,
            exercise.problematique || "Physiotherapy"
          );

          // Créer script vidéo
          const videoScript = createVideoScript(
            exercise.name,
            exercise.description,
            exercise.dosage
          );

          return {
            ...exercise,
            media: {
              image: imageUrl,
              imagePrompt: `${exercise.description}. Clinical physiotherapy demonstration. Professional form.`,
              youtube: videoInfo.youtube,
              pexels: videoInfo.pexels,
              videoDescription: videoInfo.videoDescription,
              videoScript: videoScript,
              thumbnailPrompt: videoInfo.thumbnailPrompt,
            },
          };
        } catch (error) {
          console.error(`Erreur média pour ${exercise.name}:`, error);
          // Retourner l'exercice sans média en cas d'erreur
          return exercise;
        }
      })
    );

    return res.status(200).json({
      success: true,
      exercisesCount: exercisesWithMedia.length,
      exercises: exercisesWithMedia,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erreur API media:", error);
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}
