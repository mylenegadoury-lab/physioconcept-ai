# 🏥 PhysioConcept-AI

Programme intelligent de génération d'exercices de physiothérapie pour la lombalgie, alimenté par l'IA OpenAI.

## 🚀 Démarrage rapide

### Installation

```bash
# Installer les dépendances
npm install

# Créer un fichier .env.local avec votre clé OpenAI
echo "OPENAI_API_KEY=sk-your-key" > .env.local
```

### Développement

```bash
npm run dev
```

L'app est accessible à `http://localhost:3000`

### Production

```bash
npm run build
npm start
```

## 📋 Structure du projet

```
├── pages/
│   ├── index.js              # Formulaire d'entrée
│   ├── result.js             # Page de résultats
│   └── api/
│       └── generate.js       # API qui appelle OpenAI
├── components/
│   └── Layout.js             # Composant de mise en page
├── lib/
│   └── openai.js             # Configuration OpenAI
├── data/
│   └── lumbarExercises.js    # Base de données d'exercices
├── styles/
│   └── globals.css           # Styles globaux
└── package.json
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env.local`:

```env
OPENAI_API_KEY=sk-xxxxx
```

## 📖 Utilisation

1. **Remplir le formulaire** avec les informations du patient:
   - Localisation de la douleur
   - Mouvement aggravant
   - Tolérance au mouvement
   - Drapeaux rouges (sécurité)
   - Durée des symptômes

2. **Soumettre** → L'API OpenAI génère un programme personnalisé

3. **Consulter le programme** avec:
   - ⚠️ Drapeaux rouges (si applicables)
   - 📘 Éducation du patient
   - 📌 Exercices recommandés avec dosage

## 🎯 Fonctionnalités

- ✅ Analyse des drapeaux rouges (sécurité médicale)
- 📚 Éducation personnalisée du patient
- 🏋️ Recommandations d'exercices adaptées
- 🌐 Support multilingue (français/anglais)
- 📱 Interface responsive
- ⚡ Génération rapide via OpenAI

## 🛡️ Sécurité

- Les clés API ne sont pas exposées côté client
- Validation des données sur le serveur
- Gestion d'erreur robuste

## 📝 Notes de développement

### Corrections apportées:

1. ✅ **API generate.js** - Convertie en API route authentique
2. ✅ **Error handling** - Gestion complète des erreurs
3. ✅ **Styling** - Layout amélioré avec CSS moderne
4. ✅ **Validation** - Vérification des données incomplètes
5. ✅ **JSON parsing** - Support pour JSON encadré en markdown

## 🔄 Flux d'application

```
Home Page (index.js)
    ↓ (POST /api/generate)
API OpenAI (generate.js)
    ↓
Result Page (result.js)
    ↓
Display Program
```

## 📦 Dépendances principales

- **Next.js 14** - Framework React
- **OpenAI v4** - API IA générative

## 🐛 Dépannage

### "Impossible de lire les données du programme"
→ Vérifiez que le JSON est valide

### "Erreur serveur"
→ Vérifiez votre clé API OpenAI dans `.env.local`

### "Données incomplètes"
→ Remplissez tous les champs obligatoires

## 📄 Licence

MIT

---

**Développé pour améliorer l'accès aux programmes de physiothérapie personnalisés** 🏥💪
