# 🚀 IMPORT EXERCICES - GUIDE RAPIDE

## Problème actuel

L'import des 62 exercices échoue à cause de **Row Level Security (RLS)** Supabase:
```
❌ new row violates row-level security policy for table "exercises"
```

## Solution rapide (2 options)

### Option A: Ajouter SERVICE_ROLE_KEY (recommandé, sécurisé)

1. Ouvrir Supabase Dashboard → Settings → API
2. Copier **service_role key** (⚠️ secret!)
3. Ajouter dans `.env.local`:
   ```bash
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...votre_service_role_key...
   ```
4. Relancer import:
   ```bash
   node scripts/importExercisesToSupabase.js
   ```

**Pourquoi?** Service role key bypass RLS (droits admin).

---

### Option B: Autoriser inserts temporairement (rapide, moins sécurisé)

1. Ouvrir **Supabase SQL Editor**
2. Coller et exécuter:
   ```sql
   CREATE POLICY "Allow public insert for import" 
     ON exercises 
     FOR INSERT 
     WITH CHECK (true);
   ```
3. Relancer import:
   ```bash
   node scripts/importExercisesToSupabase.js
   ```
4. **IMPORTANT:** Après import, supprimer la policy:
   ```sql
   DROP POLICY "Allow public insert for import" ON exercises;
   ```

**Pourquoi?** Autorise temporairement inserts publics.

---

## Vérification après import

```bash
# Test connection et count
node scripts/testSupabaseConnection.js

# Devrait afficher:
# ⚠️ Found 62 existing lumbar exercises
```

---

## État actuel

✅ **Script import créé:** `scripts/importExercisesToSupabase.js`
✅ **Mapping validé:** 62 exercices prêts
✅ **Connection OK:** Supabase accessible
❌ **Bloqué par:** RLS policies (pas de droits INSERT)

**Next:** Choisir Option A ou B → Relancer import → ✅ 62/62 en base!

---

## Commandes utiles

```bash
# Test connexion
node scripts/testSupabaseConnection.js

# Test mapping (dry run)
node scripts/testImportMapping.js

# Import réel
node scripts/importExercisesToSupabase.js

# Après import: test algorithm
node scripts/testExerciseSelection.js
```
