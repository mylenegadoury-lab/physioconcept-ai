/**
 * Script pour générer toutes les images de la bibliothèque d'exercices
 * 
 * Usage: node scripts/generateMediaLibrary.js
 * 
 * Fonctionnalités:
 * - Génère 3 images par exercice (main, starting, commonError)
 * - Style uniforme DALL-E 3
 * - Sauvegarde URLs dans mediaLibrary.js
 * - Cache pour éviter régénération
 * - Coût estimé: 19 exercices × 3 images × $0.04 = ~$2.28
 */

import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Configuration
const DALLE_MODEL = "dall-e-3";
const IMAGE_SIZE = "1024x1024";
const IMAGE_QUALITY = "standard"; // ou "hd" pour qualité supérieure (+$0.04/image)
const LIBRARY_PATH = path.join(__dirname, "../data/mediaLibrary.js");
const OUTPUT_DIR = path.join(__dirname, "../public/images/exercises");
const CACHE_FILE = path.join(__dirname, "../data/imageGenerationCache.json");

// Délai entre générations pour éviter rate limits
const DELAY_MS = 2000;

/**
 * Charge la bibliothèque d'exercices
 */
async function loadLibrary() {
  try {
    const module = await import("../data/mediaLibrary.js");
    return module.mediaLibrary;
  } catch (error) {
    console.error("❌ Erreur chargement bibliothèque:", error.message);
    process.exit(1);
  }
}

/**
 * Charge le cache de génération
 */
async function loadCache() {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Cache n'existe pas encore
    return { generated: {}, errors: {} };
  }
}

/**
 * Sauvegarde le cache
 */
async function saveCache(cache) {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

/**
 * Crée le dossier de sortie si nécessaire
 */
async function ensureOutputDir() {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    console.error("❌ Erreur création dossier:", error.message);
  }
}

/**
 * Génère une image avec DALL-E 3
 */
async function generateImage(prompt, exerciseId, imageType) {
  console.log(`\n🎨 Génération: ${exerciseId} - ${imageType}`);
  console.log(`📝 Prompt: ${prompt.substring(0, 100)}...`);

  try {
    const response = await openai.images.generate({
      model: DALLE_MODEL,
      prompt: prompt,
      size: IMAGE_SIZE,
      quality: IMAGE_QUALITY,
      n: 1,
    });

    const imageUrl = response.data[0].url;
    console.log(`✅ Généré: ${imageUrl}`);

    return imageUrl;
  } catch (error) {
    console.error(`❌ Erreur génération: ${error.message}`);
    throw error;
  }
}

/**
 * Délai entre générations
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Génère toutes les images pour un exercice
 */
async function generateExerciseImages(exerciseId, exerciseData, cache) {
  const results = { success: [], errors: [] };

  if (!exerciseData.images) {
    console.log(`⚠️  ${exerciseId}: Pas d'images définies`);
    return results;
  }

  for (const [imageType, imageData] of Object.entries(exerciseData.images)) {
    const cacheKey = `${exerciseId}-${imageType}`;

    // Vérifier si déjà généré
    if (imageData.generated && imageData.url) {
      console.log(`✓ ${exerciseId} - ${imageType}: Déjà généré (${imageData.url})`);
      results.success.push({ exerciseId, imageType, url: imageData.url, cached: true });
      continue;
    }

    // Vérifier cache d'erreurs (ne pas réessayer avant 24h)
    if (cache.errors[cacheKey]) {
      const errorTime = new Date(cache.errors[cacheKey].timestamp);
      const hoursSince = (Date.now() - errorTime.getTime()) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        console.log(`⏭️  ${exerciseId} - ${imageType}: Erreur récente (${Math.round(hoursSince)}h ago), skip`);
        continue;
      }
    }

    try {
      // Générer l'image
      const url = await generateImage(imageData.prompt, exerciseId, imageType);

      // Marquer comme généré dans le cache
      cache.generated[cacheKey] = {
        url,
        timestamp: new Date().toISOString(),
        prompt: imageData.prompt,
      };

      results.success.push({ exerciseId, imageType, url, cached: false });

      // Délai entre générations
      await delay(DELAY_MS);
    } catch (error) {
      // Enregistrer l'erreur dans le cache
      cache.errors[cacheKey] = {
        error: error.message,
        timestamp: new Date().toISOString(),
      };

      results.errors.push({ exerciseId, imageType, error: error.message });
    }
  }

  return results;
}

/**
 * Met à jour le fichier mediaLibrary.js avec les URLs générées
 */
async function updateLibraryFile(cache) {
  console.log("\n📝 Mise à jour de mediaLibrary.js...");

  try {
    let content = await fs.readFile(LIBRARY_PATH, "utf-8");

    // Pour chaque image générée, remplacer url: null par la vraie URL
    for (const [cacheKey, data] of Object.entries(cache.generated)) {
      const [exerciseId, imageType] = cacheKey.split("-");

      // Pattern de recherche: "exercise-id": { ... imageType: { url: null, ...
      const pattern = new RegExp(
        `("${exerciseId}":[\\s\\S]*?${imageType}:[\\s\\S]*?url:\\s*)(null)(,)`,
        "g"
      );

      const replacement = `$1"${data.url}"$3`;
      const newContent = content.replace(pattern, replacement);

      if (newContent !== content) {
        console.log(`✓ Mise à jour: ${exerciseId} - ${imageType}`);
        content = newContent;
      }
    }

    // Écrire le fichier mis à jour
    await fs.writeFile(LIBRARY_PATH, content);
    console.log("✅ mediaLibrary.js mis à jour!");
  } catch (error) {
    console.error("❌ Erreur mise à jour fichier:", error.message);
  }
}

/**
 * Affiche les statistiques de génération
 */
function displayStats(allResults) {
  console.log("\n" + "=".repeat(60));
  console.log("📊 STATISTIQUES DE GÉNÉRATION");
  console.log("=".repeat(60));

  const totalSuccess = allResults.reduce((sum, r) => sum + r.success.length, 0);
  const totalErrors = allResults.reduce((sum, r) => sum + r.errors.length, 0);
  const totalCached = allResults.reduce(
    (sum, r) => sum + r.success.filter((s) => s.cached).length,
    0
  );
  const totalNew = totalSuccess - totalCached;

  console.log(`✅ Images générées avec succès: ${totalSuccess}`);
  console.log(`   - Nouvelles: ${totalNew}`);
  console.log(`   - Déjà en cache: ${totalCached}`);
  console.log(`❌ Échecs: ${totalErrors}`);

  if (totalNew > 0) {
    const cost = totalNew * 0.04;
    console.log(`💰 Coût estimé (nouvelles images): $${cost.toFixed(2)}`);
  }

  if (totalErrors > 0) {
    console.log("\n❌ ERREURS:");
    allResults.forEach((result) => {
      result.errors.forEach((err) => {
        console.log(`   - ${err.exerciseId} (${err.imageType}): ${err.error}`);
      });
    });
  }

  console.log("=".repeat(60) + "\n");
}

/**
 * Fonction principale
 */
async function main() {
  console.log("🚀 Démarrage génération bibliothèque d'images...\n");

  // Vérifier la clé API
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY non configurée!");
    process.exit(1);
  }

  // Charger la bibliothèque et le cache
  const library = await loadLibrary();
  const cache = await loadCache();

  // Créer le dossier de sortie
  await ensureOutputDir();

  // Compter les exercices et images à générer
  const exerciseCount = Object.keys(library).length;
  let totalImages = 0;
  let alreadyGenerated = 0;

  Object.values(library).forEach((ex) => {
    if (ex.images) {
      Object.values(ex.images).forEach((img) => {
        totalImages++;
        if (img.generated && img.url) alreadyGenerated++;
      });
    }
  });

  console.log(`📚 ${exerciseCount} exercices trouvés`);
  console.log(`🖼️  ${totalImages} images à générer`);
  console.log(`✓ ${alreadyGenerated} déjà générées`);
  console.log(`⏳ ${totalImages - alreadyGenerated} restantes\n`);

  if (totalImages - alreadyGenerated === 0) {
    console.log("✅ Toutes les images sont déjà générées!");
    return;
  }

  // Estimer coût et temps
  const remaining = totalImages - alreadyGenerated;
  const estimatedCost = remaining * 0.04;
  const estimatedTime = (remaining * (DELAY_MS + 5000)) / 1000 / 60; // +5s par génération

  console.log(`💰 Coût estimé: $${estimatedCost.toFixed(2)}`);
  console.log(`⏱️  Temps estimé: ${Math.round(estimatedTime)} minutes\n`);

  // Demander confirmation
  console.log("⚠️  Appuyez sur Ctrl+C pour annuler, ou attendez 5 secondes...");
  await delay(5000);

  console.log("\n🎨 Génération en cours...\n");

  // Générer pour chaque exercice
  const allResults = [];
  for (const [exerciseId, exerciseData] of Object.entries(library)) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`📋 EXERCICE: ${exerciseId} - ${exerciseData.exerciseName}`);
    console.log("=".repeat(60));

    const result = await generateExerciseImages(exerciseId, exerciseData, cache);
    allResults.push(result);

    // Sauvegarder le cache après chaque exercice
    await saveCache(cache);
  }

  // Mettre à jour le fichier mediaLibrary.js
  await updateLibraryFile(cache);

  // Afficher les statistiques
  displayStats(allResults);

  console.log("✅ Génération terminée!");
}

// Exécuter
main().catch((error) => {
  console.error("❌ Erreur fatale:", error);
  process.exit(1);
});
