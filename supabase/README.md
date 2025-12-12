# 🗄️ Supabase Database Setup - PhysioConcept AI

## 📋 Vue d'ensemble

Database PostgreSQL hébergée sur Supabase avec:
- **9 tables principales** pour exercices, protocoles, études scientifiques
- **Row Level Security (RLS)** pour sécurité données
- **Full-text search** en français et anglais
- **Audit log complet** avec version control
- **Triggers automatiques** pour timestamps et audit
- **Views optimisées** pour queries fréquentes

---

## 🚀 Setup Initial (15 minutes)

### **Étape 1: Créer projet Supabase**

1. Aller sur [supabase.com](https://supabase.com)
2. Créer compte gratuit (500 MB database, 50,000 rows)
3. Créer nouveau projet:
   - **Nom:** physioconcept-ai
   - **Database Password:** (noter le mot de passe!)
   - **Région:** Montreal (ca-central-1) ou US East (us-east-1)
4. Attendre ~2 minutes pour provisioning

### **Étape 2: Exécuter le schéma**

1. Dans Supabase Dashboard → **SQL Editor**
2. Cliquer **New Query**
3. Copier-coller le contenu de `supabase/schema.sql`
4. Cliquer **Run** (F5)
5. Vérifier: ✅ "Success. No rows returned"

### **Étape 3: Configuration environnement**

1. Dans Supabase Dashboard → **Settings** → **API**
2. Copier:
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **anon public key** (commence par `eyJhbG...`)
3. Créer fichier `.env.local` à la racine du projet:

```bash
cp .env.local.example .env.local
```

4. Remplir les valeurs:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Étape 4: Vérifier connexion**

```bash
npm run dev
```

Test dans console navigateur:
```javascript
import { supabase } from './lib/supabase';
const { data } = await supabase.from('studies').select('*');
console.log(data); // Devrait afficher l'étude Hayden 2021
```

---

## 📊 Structure Database

### **Tables Principales**

| Table | Description | Nombre d'enregistrements cibles |
|-------|-------------|--------------------------------|
| `studies` | Études scientifiques (RCT, méta-analyses) | 100+ |
| `exercises` | Bibliothèque exercices validés | 500+ |
| `protocols` | Protocoles traitement par condition | 50+ |
| `progressions` | Plans progression 6 semaines | 300+ |
| `clinical_guidelines` | Guidelines organisations (APTA, AAOS) | 50+ |
| `exercise_studies` | Liens exercices ↔ études | 1,000+ |
| `protocol_exercises` | Exercices dans protocoles | 500+ |
| `audit_log` | Journal modifications (auto) | Illimité |
| `quality_metrics` | Métriques qualité (auto) | Auto-calculé |

### **Views Optimisées**

- `exercises_with_evidence` - Exercices avec statistiques études
- `protocols_with_exercises` - Protocoles avec liste exercices
- `quality_dashboard` - Métriques qualité globales

---

## 🔍 Exemples de Queries

### **1. Obtenir exercices pour lombalgie**

```javascript
import { getExercisesByRegion } from './lib/supabase';

const exercises = await getExercisesByRegion('lumbar', {
  difficulty: 'beginner',
  minEffectiveness: 75,
  evidenceLevel: ['1A', '1B']
});
```

### **2. Chercher protocole pour condition**

```javascript
import { getProtocolByCondition } from './lib/supabase';

const protocol = await getProtocolByCondition('lumbar_chronic_pain', {
  phase: 'chronic',
  severity: 'moderate'
});

// Retourne protocole avec exercices et progressions
console.log(protocol.exercises); // Exercices par semaine
console.log(protocol.progressions); // Plan 6 semaines
```

### **3. Recherche full-text**

```javascript
import { searchExercises } from './lib/supabase';

const results = await searchExercises('renforcement quadriceps', {
  bodyRegion: 'knee'
});
```

### **4. Obtenir études pour citation**

```javascript
import { getStudies } from './lib/supabase';

const studies = await getStudies('low back pain', {
  evidenceLevel: ['1A'],
  minYear: 2015,
  minPedroScore: 7
});
```

---

## 🛡️ Sécurité (Row Level Security)

### **Règles RLS actives:**

1. **Public read** - Tout le monde peut lire contenu `status='active'`
2. **Admin full access** - Admins peuvent tout modifier
3. **Audit log read-only** - Admins peuvent consulter historique

### **Authentification admin:**

```javascript
import { supabase } from './lib/supabase';

// Login admin
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@physioconcept.ca',
  password: 'your-secure-password'
});

// Maintenant accès complet pour INSERT/UPDATE/DELETE
```

---

## 📈 Métriques Qualité

### **Dashboard qualité automatique:**

```javascript
import { getQualityDashboard } from './lib/supabase';

const metrics = await getQualityDashboard();

console.log(metrics.exercises);
// {
//   total_records: 500,
//   high_quality_count: 380, // Evidence 1A/1B
//   avg_effectiveness: 82,
//   needs_review_count: 12,
//   overdue_review_count: 3
// }
```

### **Items nécessitant review:**

```javascript
import { getItemsNeedingReview } from './lib/supabase';

const needsReview = await getItemsNeedingReview();
console.log(needsReview.exercises); // Exercices à reviewer
console.log(needsReview.protocols); // Protocoles > 6 mois
```

---

## 🔄 Migrations & Updates

### **Ajouter nouvelle colonne:**

```sql
-- Dans Supabase SQL Editor
ALTER TABLE exercises 
ADD COLUMN pain_level_indication TEXT CHECK (pain_level_indication IN ('acute', 'chronic', 'both'));

-- Audit log va capturer ce changement automatiquement
```

### **Version control automatique:**

Chaque modification `UPDATE` sur `exercises`, `protocols`, `studies` crée automatiquement:
- Entrée dans `audit_log`
- Incrémentation `version` column
- Timestamp `updated_at`

---

## 🚨 Troubleshooting

### **Erreur: "row-level security policy"**

**Cause:** Tentative INSERT/UPDATE sans authentification admin

**Solution:**
```javascript
// Login admin d'abord
await supabase.auth.signInWithPassword({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD
});
```

### **Erreur: "invalid text search"**

**Cause:** Text search sur colonne sans index tsvector

**Solution:** Utiliser colonnes avec index `tsv`:
```javascript
// ✅ BON
.textSearch('tsv', 'search term')

// ❌ MAUVAIS  
.textSearch('description', 'search term')
```

### **Slow queries**

**Vérifier index:**
```sql
-- Dans SQL Editor
EXPLAIN ANALYZE 
SELECT * FROM exercises WHERE body_region = 'lumbar';

-- Si "Seq Scan" → manque index, créer:
CREATE INDEX idx_custom ON table_name(column_name);
```

---

## 📦 Backup & Restore

### **Backup automatique (Supabase):**

- **Daily backups** (rétention 7 jours - plan gratuit)
- **Point-in-time recovery** (plan payant)

### **Backup manuel:**

```bash
# Exporter toutes les données
pg_dump -h db.your-project.supabase.co -U postgres -d postgres > backup.sql

# Restaurer
psql -h db.your-project.supabase.co -U postgres -d postgres < backup.sql
```

---

## 🎯 Prochaines Étapes

1. ✅ **Setup Supabase** (terminé)
2. ⏭️ **Peupler exercises table** (prochaine étape - script migration)
3. ⏭️ **Créer protocols** (basé sur evidence.js existant)
4. ⏭️ **Build AI assembly engine** (query DB + GPT-4 personnalisation)
5. ⏭️ **Admin dashboard** (ajouter/éditer contenu)

---

## 📚 Ressources

- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Full-Text Search:** https://www.postgresql.org/docs/current/textsearch.html
- **Row Level Security:** https://supabase.com/docs/guides/auth/row-level-security
- **PEDro Scale:** https://pedro.org.au/english/resources/pedro-scale/

---

**Questions?** Voir `DATABASE_EXPANSION.md` pour stratégie complète.
