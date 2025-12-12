# 🏥 PhysioConcept AI - Prescription Personnalisée d'Exercices

**Système intelligent de prescription d'exercices basé sur l'evidence-based medicine** - Évaluations cliniques standardisées + Algorithme de sélection + Base de données d'exercices validés.

---

## ✅ SYSTÈME OPÉRATIONNEL

**Version actuelle:** 1.0 - MVP Complet  
**Région disponible:** Lombalgie (62 exercices)  
**Statut:** Prêt pour tests utilisateur

---

## 🎯 Fonctionnalités

### Pour les patients
- **Évaluation simplifiée** en ~5 minutes (emojis, tooltips)
- **Exercices personnalisés** (8-12 sélectionnés automatiquement)
- **Instructions claires** en français
- **Programme imprimable/téléchargeable**

### Pour les professionnels
- **Évaluation clinique complète** (ODI, STarT Back, TBC)
- **Scoring en temps réel** (disability, risk stratification)
- **Justifications evidence-based** pour chaque exercice
- **Export rapport clinique** (à venir)

---

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
# Supabase (base de données)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### 3. Import exercices (première fois)

```bash
node scripts/importExercisesToSupabase.js
# ✅ Doit afficher: "62/62 exercises imported"
```

### 4. Lancer

```bash
npm run dev
# Accès: http://localhost:3000 (ou 3001 si occupé)
```

### 5. Tester

```bash
# Tests système automatisés
./test-system.sh

# Ou manuellement dans le navigateur:
# → http://localhost:3001/assessment
# → Choisir "Patient" ou "Professionnel"
# → Remplir formulaire
# → Voir résultats
```

**Guide détaillé:** Voir `READY_TO_TEST.md`

---

## 📊 Architecture

```
┌─────────────────────┐
│   UTILISATEUR       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  /assessment        │  ← Sélection rôle
│  (Role Selection)   │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌──────────┐  ┌───────────┐
│ Patient  │  │Professional│
│  Form    │  │   Form     │
│3 sections│  │5 sections │
└────┬─────┘  └─────┬─────┘
     │              │
     └──────┬───────┘
            │
            ▼
   ┌────────────────┐
   │ POST /api/     │
   │ select-        │
   │ exercises      │
   └────────┬───────┘
            │
            ▼
   ┌────────────────┐
   │  4-Step        │
   │  Algorithm     │
   │  ├ Safety      │
   │  ├ Pattern     │
   │  ├ Goals       │
   │  └ Scoring     │
   └────────┬───────┘
            │
            ▼
   ┌────────────────┐
   │  Supabase DB   │
   │  62 exercises  │
   └────────┬───────┘
            │
            ▼
   ┌────────────────┐
   │ /exercise-     │
   │  results       │
   │ ├ Grid cards   │
   │ ├ Modal        │
   │ └ Actions      │
   └────────────────┘
```

---

## 🏗️ Composants clés

### Formulaires
- **`components/forms/PatientAssessmentForm.jsx`**
  - 3 sections: Douleur, Psycho, Mouvements
  - Emoji scales, tooltips, auto-save
  - ~5 minutes completion
  
- **`components/forms/ProfessionalAssessmentForm.jsx`**
  - 5 sections: ODI, STarT Back, TBC, Safety, Goals
  - Real-time scoring, red flags validation
  - ~10-15 minutes completion

### API
- **`pages/api/select-exercises.js`**
  - Endpoint: POST `/api/select-exercises`
  - Input: `patientProfile` (phase, ODI, goals, etc.)
  - Output: 8-12 `selectedExercises` + `justifications`

### Algorithme
- **`lib/exerciseSelection.js`**
  - 4 steps: Safety filter → Pattern matching → Goal alignment → Evidence scoring
  - Guidelines: NICE 2020, APTA 2021, McKenzie
  - Evidence weights: 1A/1B (×1.5), 2A/2B (×1.3), 3A/3B (×1.1)

### Base de données
- **Supabase PostgreSQL**
  - 62 lumbar exercises
  - 47 colonnes (FR/EN, dosage, scoring, contraindications)
  - Evidence levels: 1A→5
  - Avg effectiveness: 82/100

---

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
