# 📜 Scripts PhysioConcept AI

Collection de scripts utilitaires pour maintenance et génération de contenu.

---

## 📋 Scripts disponibles

### 1. `generateMediaLibrary.js` - Génération bibliothèque d'images

**Objectif:** Génère toutes les images d'exercices via DALL-E 3 en batch.

**Usage:**
```bash
node scripts/generateMediaLibrary.js
```

**Fonctionnalités:**
- ✅ Génère 57 images (19 exercices × 3 vues)
- ✅ Cache intelligent (skip déjà générées)
- ✅ Retry logic (erreurs <24h skipées)
- ✅ Mise à jour automatique `mediaLibrary.js`
- ✅ Statistiques détaillées (coût, temps, erreurs)

**Coût:** $2.28 (57 images × $0.04)  
**Durée:** 40 minutes (~2 min/exercice)

**Output:**
- URLs sauvegardées dans `data/mediaLibrary.js`
- Cache dans `data/imageGenerationCache.json`
- Logs détaillés dans console

**Exemple output:**
```
🚀 Démarrage génération bibliothèque d'images...

📚 19 exercices trouvés
🖼️  57 images à générer
✓ 0 déjà générées
⏳ 57 restantes

💰 Coût estimé: $2.28
⏱️  Temps estimé: 40 minutes

🎨 Génération en cours...

============================================================
📋 EXERCICE: mckenzie-elbows - Extension en appui sur les coudes
============================================================

🎨 Génération: mckenzie-elbows - main
📝 Prompt: Professional physiotherapy illustration showing...
✅ Généré: https://oaidalleapiprodscus.blob.core.windows.net/...

[...]

============================================================
📊 STATISTIQUES DE GÉNÉRATION
============================================================
✅ Images générées avec succès: 57
   - Nouvelles: 57
   - Déjà en cache: 0
❌ Échecs: 0
💰 Coût estimé (nouvelles images): $2.28
============================================================

✅ Génération terminée!
```

**Sécurité:**
- ⏸️ Pause 5s avant démarrage (Ctrl+C pour annuler)
- 💾 Cache sauvegardé après chaque exercice
- ⏭️ Skip automatique si erreur récente
- 💰 Affichage coût estimé avant lancement

---

### 2. `migrate-to-bull.js` - Migration vers BullMQ

**Objectif:** Migre les jobs de la queue fichier vers BullMQ (Redis).

**Usage:**
```bash
# Nécessite Redis en cours d'exécution
npm run migrate:bull
```

**Fonctionnalités:**
- Lit `data/pendingJobs.json`
- Crée jobs équivalents dans BullMQ
- Préserve metadata (timestamp, status)
- Nettoie ancien fichier après succès

**Note:** Obsolète si vous n'utilisez pas BullMQ (USE_BULL=true).

---

## 🔧 Configuration requise

### Pour `generateMediaLibrary.js`:

**Variables d'environnement:**
```bash
OPENAI_API_KEY=sk-...  # Obligatoire
```

**Dépendances:**
- `openai` package (déjà installé)
- Connexion internet (API OpenAI)
- ~$3-5 crédits OpenAI

**Permissions:**
- Lecture: `data/mediaLibrary.js`
- Écriture: `data/mediaLibrary.js`, `data/imageGenerationCache.json`
- Création: `public/images/exercises/` (si téléchargement local)

### Pour `migrate-to-bull.js`:

**Variables d'environnement:**
```bash
REDIS_URL=redis://localhost:6379  # Optionnel, défaut local
USE_BULL=true
```

**Dépendances:**
- Redis en cours d'exécution
- `bullmq` package installé

---

## 📈 Monitoring et logs

### Logs génération images

```bash
# Pendant génération
node scripts/generateMediaLibrary.js

# Vérifier cache après
cat data/imageGenerationCache.json | jq '.generated | length'
# Output: 57 (si tout généré)

# Vérifier erreurs
cat data/imageGenerationCache.json | jq '.errors'
```

### Statistiques bibliothèque

```bash
# Utiliser fonction utilitaire
node -e "import('./data/mediaLibrary.js').then(m => console.log(m.getLibraryStats()))"

# Output:
# {
#   totalExercises: 19,
#   totalImages: 57,
#   generatedImages: 57,
#   pendingImages: 0,
#   totalVideos: 38,
#   videosWithUrls: 0,
#   pendingVideos: 38,
#   completionRate: 60
# }
```

---

## 🚨 Troubleshooting

### Erreur "Module not found 'openai'"
```bash
npm install openai
```

### Erreur "OPENAI_API_KEY not configured"
```bash
# Créer .env.local depuis .env.example
cp .env.example .env.local
# Ajouter votre clé API OpenAI
```

### Rate limit OpenAI (429 error)
- Script pause 2s entre chaque génération
- Si persistant: augmenter DELAY_MS dans script
- Vérifier quota OpenAI: https://platform.openai.com/usage

### Génération échoue pour certains exercices
- Vérifier cache: `data/imageGenerationCache.json`
- Erreurs récentes (<24h) sont skipées automatiquement
- Supprimer entrée cache pour forcer re-génération
- Ajuster prompt si erreur récurrente (anatomie impossible)

### Coût plus élevé que prévu
- Vérifier nombre d'images dans cache (évite régénération)
- Confirmer qualité "standard" (pas "hd")
- Modèle DALL-E 3: $0.04/image fixe (1024x1024 standard)

---

## 🎯 Bonnes pratiques

### 1. Génération phase par phase

**Phase 1: Test (3-4 exercices)**
```javascript
// Modifier temporairement generateMediaLibrary.js
const LIMIT_EXERCISES = 4;
let count = 0;
for (const [exerciseId, exerciseData] of Object.entries(library)) {
  if (count++ >= LIMIT_EXERCISES) break;
  // ... génération
}
```

**Validation:** Vérifier qualité, anatomie, style avant batch complet.

### 2. Backup avant génération

```bash
# Sauvegarder état actuel
cp data/mediaLibrary.js data/mediaLibrary.backup.js
cp data/imageGenerationCache.json data/imageGenerationCache.backup.json

# Générer
node scripts/generateMediaLibrary.js

# Si problème, restaurer:
cp data/mediaLibrary.backup.js data/mediaLibrary.js
```

### 3. Monitoring coûts

```bash
# Avant génération
node -e "import('./data/mediaLibrary.js').then(m => {
  const stats = m.getLibraryStats();
  console.log('Images à générer:', stats.pendingImages);
  console.log('Coût estimé: $' + (stats.pendingImages * 0.04).toFixed(2));
})"
```

### 4. Ajout d'exercices

```bash
# 1. Ajouter exercice dans data/exercisesMedia.js
# 2. Ajouter prompts dans data/mediaLibrary.js
# 3. Générer seulement nouvel exercice (script skip existants)
node scripts/generateMediaLibrary.js
# Coût: $0.12 (3 images)
```

---

## 📚 Ressources

**Documentation:**
- `MEDIA_LIBRARY.md` - Vue d'ensemble bibliothèque média
- `MEDIA_LIBRARY_SUMMARY.md` - Résumé exécutif
- `.env.example` - Configuration variables d'environnement

**Code source:**
- `data/mediaLibrary.js` - Base de données (945 lignes)
- `scripts/generateMediaLibrary.js` - Script génération (320 lignes)
- `pages/api/generate.js` - Intégration API

**Liens externes:**
- [DALL-E 3 Pricing](https://openai.com/pricing) - $0.04/image 1024x1024
- [OpenAI Usage Dashboard](https://platform.openai.com/usage) - Monitoring crédits
- [Pexels API](https://www.pexels.com/api/) - Alternative images stock

---

## 🎉 Prochaines évolutions scripts

### Court terme
- [ ] `validateMediaLibrary.js` - Vérifier URLs valides, prompts cohérents
- [ ] `downloadImages.js` - Télécharger images DALL-E vers `/public/images/`
- [ ] `generateInfographics.js` - Créer infographies dosage automatiques

### Moyen terme
- [ ] `addWatermark.js` - Ajouter logo PhysioConcept sur images
- [ ] `generateVideos.js` - Scraper/intégrer vidéos YouTube qualité
- [ ] `translateMediaLibrary.js` - Traduire prompts (EN, ES, DE)

### Long terme
- [ ] `generate3DAnimations.js` - Blender automation (exports 360°)
- [ ] `optimizeImages.js` - Compression WebP, responsive sizes
- [ ] `auditMediaUsage.js` - Analytics images utilisées/programmes

---

**Dernière mise à jour:** 9 décembre 2025  
**Maintenu par:** Équipe PhysioConcept AI
