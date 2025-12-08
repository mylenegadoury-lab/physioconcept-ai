import client from "./openai";
import fs from "fs";
import path from "path";

/**
 * Générer une image d'exercice avec DALL-E
 * @param {string} exerciseName - Nom de l'exercice
 * @param {string} description - Description détaillée
 * @returns {Promise<string>} URL de l'image générée
 */
export async function generateExerciseImage(exerciseName, description) {
  try {
    const prompt = `Professional physiotherapy exercise demonstration image: "${exerciseName}". 
    ${description}
    Style: Clear, clinical, high quality photography. Show proper form and technique. 
    Clinical setting, neutral background. Professional lighting.`;

    const response = await client.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url;
  } catch (error) {
    console.error("Erreur génération image DALL-E:", error);
    return null;
  }
}

/**
 * Rechercher une image gratuite via Pexels (si clé fournie) ou Unsplash Source sinon.
 * Retourne une URL directe si trouvée.
 */
export async function findStockImage(exerciseName, prompt) {
  try {
    const query = encodeURIComponent((prompt || exerciseName).replace(/\s+/g, "+"));

    // 1) Pexels (requiert PEXELS_API_KEY dans .env.local)
    if (process.env.PEXELS_API_KEY) {
      try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
          headers: { Authorization: process.env.PEXELS_API_KEY },
        });
        if (res.ok) {
          const j = await res.json();
          if (j.photos && j.photos.length > 0) {
            // Utiliser la meilleure taille disponible
            return j.photos[0].src.large || j.photos[0].src.medium || j.photos[0].src.original;
          }
        }
      } catch (pexErr) {
        console.warn("Pexels lookup failed:", pexErr.message || pexErr);
      }
    }

    // 2) Unsplash Source fallback (sans clé, moins fiable mais gratuit)
    // Retourne une URL directe qui redirigera vers une image correspondant à la requête.
    const unsplashUrl = `https://source.unsplash.com/800x600/?${query}`;
    return unsplashUrl;
  } catch (err) {
    console.error("findStockImage error:", err);
    return null;
  }
}

// Simple JSON cache for prompt -> imageUrl to reduce repeated API calls
const CACHE_PATH = path.resolve(process.cwd(), "data", "imageCache.json");

function readCache() {
  try {
    if (!fs.existsSync(CACHE_PATH)) return {};
    const raw = fs.readFileSync(CACHE_PATH, "utf8");
    return JSON.parse(raw || "{}");
  } catch (err) {
    console.warn("Failed to read image cache:", err.message || err);
    return {};
  }
}

function writeCache(obj) {
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(obj, null, 2), "utf8");
  } catch (err) {
    console.warn("Failed to write image cache:", err.message || err);
  }
}

export function normalizeKey(prompt) {
  if (!prompt) return null;
  return prompt.toString().trim().toLowerCase().replace(/\s+/g, " ");
}

const DEFAULT_TTL_DAYS = Number(process.env.IMAGE_CACHE_TTL_DAYS || 30);

export function getCachedImage(prompt) {
  if (!prompt) return null;
  const key = normalizeKey(prompt);
  if (!key) return null;
  const cache = readCache();
  const entry = cache[key];
  if (!entry) return null;
  try {
    const created = new Date(entry.createdAt);
    const ageDays = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > DEFAULT_TTL_DAYS) {
      // expired
      delete cache[key];
      writeCache(cache);
      return null;
    }
    return entry;
  } catch (err) {
    console.warn("Cache entry parse failed:", err.message || err);
    return null;
  }
}

export function setCachedImage(prompt, url, source = "unknown") {
  if (!prompt || !url) return;
  const key = normalizeKey(prompt);
  if (!key) return;
  const cache = readCache();
  cache[key] = { url, source, createdAt: new Date().toISOString() };
  writeCache(cache);
}

/**
 * Créer un prompt optimisé pour trouver des vidéos sur YouTube
 * @param {string} exerciseName - Nom de l'exercice
 * @param {string} problematique - Type de problématique
 * @returns {object} Objets avec YouTube et Pexels URLs
 */
export function generateVideoPrompts(exerciseName, problematique) {
  // Normaliser le nom pour YouTube search
  const searchTerms = exerciseName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim();

  const youtubeUrl = `https://www.youtube.com/results?search_query=physiotherapy+${searchTerms}+exercise`;

  // Prompts pour Pexels API (nécessite clé API)
  const pexelsSearchTerms = `${exerciseName} physiotherapy exercise`;

  // Création de prompt pour générer description vidéo
  const videoDescription = `Professional physiotherapy video tutorial: 
    Exercise: ${exerciseName}
    Area: ${problematique}
    Duration: 2-3 minutes
    Difficulty: Beginner to Intermediate
    Format: Clear demonstration, proper form, safety tips`;

  return {
    youtube: youtubeUrl,
    pexels: pexelsSearchTerms,
    videoDescription: videoDescription,
    thumbnailPrompt: `Physiotherapy exercise thumbnail: ${exerciseName}. Bold text "HOW TO: ${exerciseName.toUpperCase()}". Clinical setting.`,
  };
}

/**
 * Générer un prompt pour créer une vidéo avec Synthesia ou similaire
 * @param {string} exerciseName - Nom de l'exercice
 * @param {string} description - Description
 * @param {string} dosage - Dosage (répétitions, durée, fréquence)
 * @returns {object} Configuration pour générateur vidéo
 */
export function createVideoScript(exerciseName, description, dosage) {
  return {
    title: exerciseName,
    sections: [
      {
        type: "intro",
        duration: 5,
        text: `Today we'll learn how to properly perform ${exerciseName}.`,
        voiceOver: true,
      },
      {
        type: "setup",
        duration: 10,
        text: `Starting position: ${description.split(".")[0]}.`,
        voiceOver: true,
        showText: true,
      },
      {
        type: "execution",
        duration: 20,
        text: `Execute the movement as follows: ${description}`,
        voiceOver: true,
        showAnimation: true,
      },
      {
        type: "dosage",
        duration: 5,
        text: `Perform: ${dosage}`,
        voiceOver: true,
        showText: true,
      },
      {
        type: "safety",
        duration: 10,
        text: `Safety tips: Keep your core engaged. Stop if you feel sharp pain. Breathe constantly.`,
        voiceOver: true,
        showText: true,
      },
      {
        type: "outro",
        duration: 3,
        text: `Great job! Practice regularly for best results.`,
        voiceOver: true,
      },
    ],
    totalDuration: 53,
    language: "en",
  };
}

/**
 * Créer un album d'exercices avec images
 * @param {array} exercises - Array d'exercices
 * @returns {Promise<array>} Exercices avec images générées
 */
export async function generateExercisesMedia(exercises) {
  const exercisesWithMedia = await Promise.all(
    exercises.map(async (exercise) => {
      // Générer image (optionnel - peut être couteux)
      const imageUrl = process.env.GENERATE_IMAGES === "true" 
        ? await generateExerciseImage(exercise.name, exercise.description)
        : null;

      // Générer prompts vidéo
      const videoInfo = generateVideoPrompts(exercise.name, exercise.problematique);

      return {
        ...exercise,
        media: {
          image: imageUrl,
          imagePrompt: exercise.description + ". High quality clinical photography.",
          youtube: videoInfo.youtube,
          videoDescription: videoInfo.videoDescription,
          videoScript: createVideoScript(
            exercise.name,
            exercise.description,
            exercise.dosage
          ),
        },
      };
    })
  );

  return exercisesWithMedia;
}

/**
 * Créer un PDF avec les exercices et images
 * @param {array} exercises - Exercices avec media
 * @returns {string} URL du PDF généré
 */
export function createExercisePDF(exercises) {
  // Utiliser une librairie comme jsPDF ou html2pdf côté client
  // Ou envoyer à un service comme PDFKit côté serveur
  
  // Exemple structure pour envoi à service externe
  return {
    service: "html2pdf",
    content: exercises.map((ex) => ({
      title: ex.name,
      description: ex.description,
      dosage: ex.dosage,
      imageUrl: ex.media?.image,
      safetyTips: ex.safetyTips || "Consult your physiotherapist if pain occurs.",
    })),
  };
}
