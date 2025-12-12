# 🧪 GUIDE DE TEST - Système Complet

## ⚡ Tests Rapides (5-10 minutes)

### 1. Test Formulaire Patient

**URL:** http://localhost:3001/assessment

**Étapes:**
1. Cliquer sur "🏠 Je suis un patient"
2. **Section 1 - Douleur:**
   - Répondre aux 10 questions (cliquer emojis)
   - Vérifier progress bar avance
   - Cliquer "Suivant"
3. **Section 2 - Psychologique:**
   - Répondre Yes/No et sliders
   - Cliquer "Suivant"
4. **Section 3 - Mouvements:**
   - Sélectionner Mieux/Pareil/Pire
   - Cocher objectifs
   - Choisir timeline
   - Cliquer "Obtenir mes exercices"
5. **Vérifier:**
   - ✅ Loading apparaît
   - ✅ Redirection vers `/exercise-results`
   - ✅ 8-12 exercices affichés
   - ✅ Badges (Evidence, Difficulté, Efficacité)
   - ✅ Dosage visible
   - ✅ Justifications présentes

**Scénario test rapide:**
```
Douleur: Modérée (niveau 2-3)
Fonction: Légère difficulté (niveau 1-2)
Psycho: Bothersomeness Yes, Fear avoidance Medium
Mouvement: Flexion → Mieux, Extension → Pire
Objectifs: Pain reduction + Mobility
Timeline: 3 mois
```

**Résultat attendu:**
- Exercices flexion dominants (Cat-Cow, Child Pose, Pelvic Tilts)
- Niveau Beginner/Intermediate
- Evidence 2A-3A principalement
- 8-10 exercices

---

### 2. Test Formulaire Professionnel

**URL:** http://localhost:3001/assessment

**Étapes:**
1. Cliquer sur "🩺 Je suis un professionnel"
2. **Section 1 - ODI:**
   - Remplir 10 questions (0-5)
   - Vérifier score temps réel (sidebar)
3. **Section 2 - STarT Back:**
   - 5 Yes/No + 4 Likert
   - Vérifier risk level (Low/Medium/High)
4. **Section 3 - TBC:**
   - Préférence directionnelle: Extension
   - Centralisation: Yes
   - Pattern: Stabilization
5. **Section 4 - Sécurité:**
   - Cocher/décocher red flags
   - Vérifier alertes
6. **Section 5 - Objectifs:**
   - Sélectionner goals
   - Prioriser (primary, secondary)
   - Timeline
7. Cliquer "Générer le programme"
8. **Vérifier résultats**

**Scénario test rapide:**
```
ODI: 30% (moderate disability)
STarT Back: Total 5 (Medium risk), Psycho 2
TBC: Extension preference, Centralization Yes
Pattern: Stabilization
Red flags: None
Goals: Improve function, Prevent recurrence
```

**Résultat attendu:**
- Exercices extension + stabilisation (Bird Dog, Planks, Bridges)
- Niveau Intermediate
- Evidence 2A-3A
- 9-11 exercices

---

### 3. Test Modal Détails

**Sur page résultats:**
1. Cliquer "Voir détails" sur un exercice
2. **Vérifier modal contient:**
   - ✅ Nom exercice
   - ✅ Badges (Evidence, Difficulté, Efficacité)
   - ✅ Instructions complètes
   - ✅ Dosage détaillé
   - ✅ Points clés (✓)
   - ✅ Contre-indications (⚠️)
3. Cliquer "✕" pour fermer
4. Tester sur 2-3 exercices différents

---

### 4. Test Actions

**Sur page résultats:**

#### Print
1. Cliquer "🖨️ Imprimer le programme"
2. Vérifier preview print:
   - ✅ Grid exercices visible
   - ✅ Boutons/actions cachés
   - ✅ Format lisible
3. Annuler impression

#### Download
1. Cliquer "💾 Télécharger"
2. Vérifier fichier `programme-exercices.json` téléchargé
3. Ouvrir JSON, vérifier structure:
   ```json
   {
     "exercises": [...],
     "justifications": [...],
     "profile": {...}
   }
   ```

#### Nouvelle évaluation
1. Cliquer "🔄 Nouvelle évaluation"
2. Vérifier redirection vers `/assessment`
3. Vérifier sélection role réapparaît

---

## 🔍 Tests Approfondis (30-60 minutes)

### Test 1: Profil Aigu (High ODI)

**Paramètres:**
```
Patient Form:
- Douleur: 4-5 (très forte)
- Fonction: 3-4 (grande difficulté)
- Psycho: High bothersomeness, High fear
- Mouvement: Tous Pire
- Objectif: Pain reduction primarily
- Timeline: 2 semaines
```

**Résultat attendu:**
- Exercices ultra-doux (Beginner only)
- Pas de rotation/flexion extrême
- Focus neuromuscular control
- 8-9 exercices
- Evidence prioritaire (1A, 2A)

---

### Test 2: Profil Sportif (Low ODI)

**Paramètres:**
```
Professional Form:
- ODI: 15% (minimal)
- STarT Back: Low (score 2)
- TBC: Extension preference, Mobility pattern
- No red flags
- Goals: Return to sport, Increase strength
- Timeline: 6 mois
```

**Résultat attendu:**
- Exercices Advanced (Deadlifts, Single-leg)
- Strength + Mobility mix
- 10-12 exercices
- Dosage intense (3-4 séries, 12-15 reps)

---

### Test 3: Red Flags

**Paramètres:**
```
Professional Form:
- Red flags: Cauda equina symptoms checked
- Essayer de soumettre
```

**Résultat attendu:**
- ⚠️ Alert popup: "Référence médicale urgente"
- Soumission bloquée
- Message clair pour consultation

---

### Test 4: Contre-indications

**Paramètres:**
```
Professional Form:
- ODI: 40%
- Contraindications: Osteoporosis (confirmed)
- Goals: Increase strength
```

**Résultat attendu:**
- Pas d'exercices high-impact (jumping, weighted)
- Focus low-load stabilization
- Sécurité prioritaire sur performance
- Justifications mentionnent adaptations

---

### Test 5: Patterns TBC

**Test A - Flexion Preference:**
```
Movement: Flexion → Mieux, Extension → Pire
```
**Attendu:** Cat-Cow, Child Pose, Knee-to-Chest, Pelvic Tilts

**Test B - Extension Preference:**
```
Movement: Extension → Mieux, Flexion → Pire
```
**Attendu:** Bird Dog, Prone Press-Up, Superman, Cobra

**Test C - No Preference:**
```
Movement: Tous Pareil
```
**Attendu:** Mix balanced, focus goals

---

## 🐛 Tests de Régression

### Vérifier après chaque changement:
- [ ] Formulaire patient soumis correctement
- [ ] Formulaire pro soumis correctement
- [ ] API retourne 8-12 exercices
- [ ] Justifications présentes (1 par exercice)
- [ ] Scores calculés correctement
- [ ] Modal détails s'ouvre/ferme
- [ ] Actions fonctionnent (print, download, new assessment)
- [ ] Responsive mobile (tester viewport 375px)

---

## 📱 Test Mobile

### Simuler mobile (Chrome DevTools):
1. F12 → Toggle device toolbar
2. iPhone 12 Pro (390x844)
3. **Tester:**
   - ✅ Grid exercices stacked (1 colonne)
   - ✅ Boutons accessibles (min 44px height)
   - ✅ Modal scrollable
   - ✅ Texte lisible (min 16px)
   - ✅ Pas de scroll horizontal
   - ✅ Touch targets suffisants

---

## ⚠️ Erreurs Courantes

### "Cannot read property 'map' of undefined"
**Cause:** `sessionStorage` vide (refresh page résultats)  
**Fix:** Redirection automatique vers `/assessment`

### "API Error: 500"
**Cause:** Supabase connexion ou schéma mismatch  
**Fix:** Vérifier `.env.local`, tester `node scripts/testSupabaseConnection.js`

### Exercices vides
**Cause:** Import non fait ou RLS bloque  
**Fix:** `node scripts/importExercisesToSupabase.js`

### Formulaire ne soumet pas
**Cause:** Validation bloque (champs requis manquants)  
**Fix:** Console browser → Vérifier erreurs React

---

## ✅ Checklist Test Complet

### Fonctionnalités
- [ ] Formulaire patient soumis → résultats affichés
- [ ] Formulaire pro soumis → résultats affichés
- [ ] Modal détails fonctionne
- [ ] Print layout correct
- [ ] Download JSON valide
- [ ] Nouvelle évaluation redirige
- [ ] Scores calculés (ODI, STarT Back)
- [ ] Patterns détectés (flexion/extension)
- [ ] Red flags bloquent soumission
- [ ] Contre-indications respectées

### Qualité
- [ ] Pas d'erreurs console
- [ ] Temps chargement <2s
- [ ] Responsive mobile OK
- [ ] Accessibilité (tab navigation)
- [ ] Textes français corrects
- [ ] Tooltips affichent correctement

### Données
- [ ] 8-12 exercices retournés
- [ ] Evidence levels présents
- [ ] Effectiveness scores affichés
- [ ] Dosage cohérent (reps, sets, freq)
- [ ] Justifications textuelles
- [ ] PatientProfile sauvegardé sessionStorage

---

## 🎯 Résultats Attendus Globaux

### Performance
- **Load time:** <1.5s (formulaire)
- **API response:** <1s (select-exercises)
- **Modal open:** <100ms

### Qualité UX
- **Patient form:** Complété en ~5 min
- **Pro form:** Complété en ~10-15 min
- **Zero clicks inutiles:** Workflow direct
- **Messages clairs:** Erreurs explicites

### Données
- **Exercices:** 8-12 par soumission
- **Evidence:** Distribution réaliste (plus de 2A/3A que 1A)
- **Justifications:** 3-5 raisons par exercice
- **Score algorithm:** Cohérent avec guidelines

---

## 📊 Métriques à Tracker

### User Flow
```
Assessment page → 100%
  ↓
Role selection → 100%
  ↓
Form completion → ~60-80% (abandons normaux)
  ↓
Submit → 100%
  ↓
Results page → 100%
  ↓
Modal viewed → ~40-60%
Actions (print/download) → ~20-30%
```

### API
- **Success rate:** >98%
- **Avg response time:** <1s
- **Errors:** <2%

### Database
- **Exercises returned:** 8-12
- **Empty results:** 0%
- **Duplicate exercises:** 0%

---

**Tests mis à jour:** Session actuelle  
**Statut système:** ✅ OPÉRATIONNEL
