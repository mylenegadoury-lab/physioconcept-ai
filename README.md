# 🏥 PhysioConcept Pro - Plateforme de Génération d'Exercices

**L'IA au service de la physiothérapie** - Générez des programmes d'exercices personnalisés en secondes, peu importe la problématique de votre patient.

## 🎯 Ce que vous pouvez faire

Générez des exercices personnalisés pour:

- 🔴 **Colonne vertébrale:** Lombalgie, Cervicalgie, Dorsalgie
- 💪 **Membre supérieur:** Épaule, Coude, Poignet
- 🦵 **Membre inférieur:** Hanche, Genou, Cheville, Pied

## 🚀 Démarrage rapide

### 1. Installation

```bash
git clone <votre-repo>
cd physioconcept-ai
npm install
```

### 2. Configuration

Créez `.env.local`:
```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
```

### 3. Lancer

```bash
npm run dev
# Accès: http://localhost:3000
```

## 📊 Flux d'utilisation

```
1. Dashboard (/dashboard)
   ↓ Sélectionner une problématique
2. Formulaire (/formulaire)
   ↓ Remplir l'évaluation patient
3. API (/api/generate)
   ↓ OpenAI génère le programme
4. Résultats (/result)
   ↓ Affichage + Impression + Export
```

## ✨ Fonctionnalités principales

✅ **10 domaines de rééducation**
✅ **Formulaires dynamiques** adaptés à chaque problématique
✅ **Évaluation complète** du patient (douleur, limitation, antécédents)
✅ **Exercices spécifiques** contextualisés
✅ **Plan de traitement** phasé
✅ **Impression PDF** intégrée
✅ **Interface moderne** et responsive
✅ **API robuste** avec gestion d'erreurs complète

## 📁 Structure du projet

```
physioconcept-ai/
├── pages/
│   ├── index.js              # Redirect → dashboard
│   ├── dashboard.js          # Sélection problématiques
│   ├── formulaire.js         # Formulaire d'évaluation
│   ├── result.js             # Affichage résultats
│   └── api/generate.js       # API OpenAI
├── components/Layout.js      # Layout + CSS
├── data/
│   ├── problematiques.js     # 10 domaines
│   └── exercices.js          # Exercices par domaine
├── styles/globals.css        # Styles CSS
└── package.json
```

## 🔧 Configuration

### Variables d'environnement

```env
OPENAI_API_KEY=sk-...          # Clé API OpenAI (OBLIGATOIRE)
```

### package.json

```json
{
  "dependencies": {
    "next": "14.0.4",
    "react": "18.2.0",
    "openai": "^4.0.0"
  }
}
```

## 🏗️ Build & Production

### Développement

```bash
npm run dev      # Hot-reload local
```

### Production

```bash
npm run build    # Build optimisé
npm start        # Serveur production
npm run lint     # Vérifier erreurs
```

## 📱 Utilisation

### Pour les physios en clinique:
1. Accédez à `/dashboard`
2. Sélectionnez la problématique du patient
3. Remplissez le formulaire d'évaluation
4. Cliquez "Générer le programme"
5. Imprimez et donnez au patient

### Pour le suivi à distance:
1. Envoyez le lien du dashboard
2. Patient remplit le formulaire
3. Reçoit le programme automatiquement
4. Export possible en PDF

## 🔒 Sécurité

- ✅ Clés API **côté serveur uniquement**
- ✅ Validation complète des données
- ✅ Pas d'exposition de secrets en production
- ✅ Gestion d'erreurs robuste
- ✅ HTTPS recommandé en production

## 📊 API Endpoint

### POST /api/generate

**Payload:**
```json
{
  "problematique": "genou",
  "patientName": "Jean",
  "patientAge": "35",
  "painIntensity": "7",
  "painDuration": "subacute",
  "painLocation": "Antérieur",
  "movementRestriction": "moderate",
  "fearLevel": "low",
  "treatmentHistory": "Aucun",
  "comorbidities": "Aucun",
  "objectif": "Reprendre le sport"
}
```

**Réponse:**
```json
{
  "redFlags": { "present": false, "items": [] },
  "education": { "understanding": "...", "meaning": "..." },
  "exercises": [ { "name": "...", "dosage": "..." } ],
  "plan": { "phase": "Phase 1", "duration": "4 semaines" }
}
```

## 🛠️ Dépannage

### Erreur: "OPENAI_API_KEY is not defined"
→ Vérifiez que `.env.local` existe avec votre clé API

### Erreur: "Impossible de charger le programme"
→ Vérifiez les logs: `npm run dev` affiche les erreurs

### Page blanche ou chargement infini
→ Ouvrez la console (F12) et cherchez les erreurs rouges

Voir `TROUBLESHOOTING.md` pour plus de solutions.

## 📚 Documentation

- `README.md` - Ce fichier
- `FEATURES.md` - Nouvelles fonctionnalités détaillées
- `CORRECTIONS.md` - Corrections et améliorations apportées
- `TROUBLESHOOTING.md` - Guide de dépannage complet
- `PROJECT_STATUS.md` - État du projet

## 🎯 Cas d'usage

### Clinique physio
- Générez des programmes en 30 secondes
- Adaptez à chaque patient
- Imprimez facilement
- Améliorez votre efficacité

### Télé-rééducation
- Envoyez le lien au patient
- Il remplit le questionnaire
- Reçoit son programme automatiquement

### Enseignement
- Montrez aux étudiants comment utiliser l'IA
- Générez des cas d'étude
- Adaptez l'apprentissage

## 🚀 Prochaines étapes

- [ ] Authentification utilisateur
- [ ] Historique des programmes
- [ ] Téléchargement PDF
- [ ] Vidéos d'exercices
- [ ] App mobile

## 📦 Déploiement

### Vercel (Recommandé)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
```

## 💡 Tips

- Utilisez des **navigateurs modernes** (Chrome, Firefox, Safari, Edge)
- **Testez sur mobile** avec F12 → Device mode
- **Imprimez en PDF** avec Ctrl+P
- **Exportez les données** depuis l'API

## 🤝 Contribution

Des idées pour améliorer? N'hésitez pas à contribuer!

## 📄 Licence

MIT

## 📞 Support

- Consultez la documentation d'abord
- Vérifiez `TROUBLESHOOTING.md`
- Vérifiez votre clé OpenAI

---

**PhysioConcept Pro** - Transformez votre pratique physio avec l'IA 🚀

**Version:** 2.0.0
**Status:** Production Ready ✅
**Dernière mise à jour:** 2025-12-08
