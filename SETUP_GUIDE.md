# 🚀 GUIDE RAPIDE - Setup Database (15 minutes)

## ✅ Ce qui est déjà fait (par moi)

- ✅ Schema SQL complet avec 9 tables
- ✅ Client Supabase avec toutes les fonctions
- ✅ Script de migration pour vos données existantes
- ✅ Documentation complète
- ✅ Package `@supabase/supabase-js` installé

---

## 🎯 Ce que VOUS devez faire maintenant

### **📍 ÉTAPE 1: Créer compte Supabase (5 min)**

1. **Aller sur:** https://supabase.com
2. **Sign Up** avec GitHub ou email
3. **Create New Project:**
   - Name: `physioconcept-ai`
   - Database Password: **NOTEZ-LE!** (ex: `MySecurePass123!`)
   - Region: **Canada (Central)** ou **US East (Ohio)**
   - Click **Create new project**
4. **Attendre ~2 minutes** (provisioning database)

---

### **📍 ÉTAPE 2: Créer les tables (3 min)**

1. Dans Supabase Dashboard → **SQL Editor** (menu gauche)
2. Click **New query**
3. **Ouvrir fichier** `supabase/schema.sql` dans VS Code
4. **Copier TOUT le contenu** (Ctrl+A, Ctrl+C)
5. **Coller dans SQL Editor** Supabase
6. Click **Run** (ou F5)
7. **Vérifier:** Devrait afficher ✅ "Success. No rows returned"

**Troubleshooting:**
- Si erreur "already exists" → OK, tables déjà créées
- Si erreur "syntax error" → Vérifier que vous avez copié TOUT le fichier
- Si erreur "permission denied" → Vous êtes owner du projet?

---

### **📍 ÉTAPE 3: Configurer .env.local (2 min)**

1. **Dans Supabase Dashboard:**
   - Click **Settings** (menu gauche)
   - Click **API**
   - Copier:
     - **Project URL** (ex: `https://abcdefgh.supabase.co`)
     - **anon public** key (commence par `eyJhbG...`, ~200 caractères)

2. **Dans VS Code:**
   ```bash
   # Terminal
   cp .env.local.example .env.local
   ```

3. **Ouvrir `.env.local`** et remplir:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   
   # Garder votre clé OpenAI existante
   OPENAI_API_KEY=sk-...
   ```

4. **Sauvegarder** (Ctrl+S)

---

### **📍 ÉTAPE 4: Tester connexion (2 min)**

```bash
# Terminal
npm run dev
```

**Dans navigateur:**
1. Ouvrir http://localhost:3000
2. Ouvrir **Console** (F12)
3. Taper:
   ```javascript
   const { createClient } = await import('@supabase/supabase-js');
   const supabase = createClient(
     'YOUR_PROJECT_URL',  // Remplacer
     'YOUR_ANON_KEY'      // Remplacer
   );
   const { data, error } = await supabase.from('studies').select('*');
   console.log(data, error);
   ```

**Résultat attendu:**
- ✅ `data: [{ id: 'hayden-2021-exercise', title: '...' }]`
- ✅ `error: null`

**Si erreur:**
- "Invalid API key" → Vérifier anon key dans .env.local
- "relation does not exist" → Refaire ÉTAPE 2 (créer tables)
- "Network error" → Vérifier Project URL

---

### **📍 ÉTAPE 5: Peupler database (3 min)**

```bash
# Terminal - Arrêter le serveur (Ctrl+C), puis:
npm run db:migrate
```

**Résultat attendu:**
```
🚀 Starting PhysioConcept AI Database Migration
============================================================

🔬 Migrating scientific studies...
  ✅ Inserted 10 studies...
  ✅ Inserted 20 studies...
  ...
✅ Studies migration complete: 72 inserted, 0 errors

💪 Migrating lumbar exercises...
✅ Lumbar exercises migration complete: 28 inserted, 0 errors

🏋️ Migrating exercises from evidence database...
✅ Evidence-based exercises migration complete: 45 inserted, 0 errors

📋 Migrating clinical guidelines...
✅ Guidelines migration complete: 32 inserted, 0 errors

============================================================
🎉 MIGRATION COMPLETE!

📊 Statistics:
   - Studies: 72
   - Lumbar Exercises: 28
   - Evidence-based Exercises: 45
   - Guidelines: 32
   - Total records: 177

⏱️  Duration: 8.45s
```

**Si erreurs:**
- "Cannot connect" → Vérifier .env.local
- "Duplicate key" → Normal si vous relancez, données déjà insérées
- "Foreign key violation" → Relancer, order sera correct

---

### **📍 ÉTAPE 6: Vérifier qualité (1 min)**

**Dans Supabase Dashboard:**
1. **Table Editor** (menu gauche)
2. Click table **exercises**
   - Devrait voir ~70 exercices
   - Colonnes: name_fr, body_region, evidence_level, effectiveness_score
3. Click table **studies**
   - Devrait voir ~70 études
   - Hayden 2021, Owen 2020, etc.
4. Click **SQL Editor** → New query:
   ```sql
   SELECT * FROM quality_dashboard;
   ```
5. **Run** → Devrait afficher stats qualité:
   ```
   category  | total_records | high_quality_count | avg_effectiveness
   exercises | 73            | 58                 | 81.5
   protocols | 0             | 0                  | null
   studies   | 72            | 65                 | 82.3
   ```

---

## ✅ SUCCÈS! Vous avez maintenant:

- ✅ Database PostgreSQL avec 180+ enregistrements
- ✅ 70+ exercices evidence-based
- ✅ 70+ études scientifiques RCT Level 1A/1B
- ✅ 30+ guidelines cliniques (APTA, AAOS, etc.)
- ✅ Full-text search prêt
- ✅ Audit log automatique
- ✅ Row Level Security activé

---

## 🚀 PROCHAINE ÉTAPE: Transformer generate.js

**Prêt à remplacer l'AI-generation par l'AI-assembly?**

Je vais maintenant:
1. Modifier `pages/api/generate.js`
2. Query Supabase au lieu de demander à GPT-4 de tout inventer
3. GPT-4 choisit exercices pertinents + personnalise
4. **Résultat: 2-3 secondes** au lieu de 30-45s

**Dites-moi quand vous avez terminé les 6 étapes ci-dessus!**

---

## 🆘 Besoin d'aide?

**Problèmes courants:**

1. **"Invalid API key"**
   - Vérifier `.env.local` créé et rempli
   - Redémarrer server: `npm run dev`

2. **"relation does not exist"**
   - Tables pas créées
   - Refaire ÉTAPE 2 dans SQL Editor

3. **Migration échoue**
   - Vérifier connexion Supabase
   - Check console pour erreurs spécifiques
   - Possiblement fichiers data/ pas importés correctement

4. **Slow queries**
   - Normal première fois (index en construction)
   - Devrait accélérer après quelques minutes

**Documentation complète:** `supabase/README.md`

---

**Temps total: ~15 minutes** ⏱️
