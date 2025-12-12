#!/bin/bash

# 🧪 Script de test rapide du système
# Usage: ./test-system.sh

echo "🚀 TESTS SYSTÈME PHYSIOCONCEPT-AI"
echo "=================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Variables d'environnement
echo "📋 Test 1: Variables d'environnement"
if [ -f .env.local ]; then
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local && \
       grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local && \
       grep -q "SUPABASE_SERVICE_ROLE_KEY" .env.local; then
        echo -e "${GREEN}✅ .env.local configuré correctement${NC}"
    else
        echo -e "${RED}❌ .env.local incomplet - Vérifier les clés Supabase${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ .env.local manquant${NC}"
    exit 1
fi
echo ""

# Test 2: Dépendances Node
echo "📦 Test 2: Dépendances Node.js"
if [ -d node_modules ]; then
    echo -e "${GREEN}✅ node_modules présent${NC}"
else
    echo -e "${YELLOW}⚠️  node_modules manquant - Installation...${NC}"
    npm install
fi
echo ""

# Test 3: Connexion Supabase
echo "🗄️  Test 3: Connexion Supabase"
node scripts/testSupabaseConnection.js 2>&1 | grep -q "success"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Connexion Supabase OK${NC}"
else
    echo -e "${RED}❌ Échec connexion Supabase${NC}"
    echo "Lancer: node scripts/testSupabaseConnection.js"
    exit 1
fi
echo ""

# Test 4: Exercices en base
echo "💪 Test 4: Exercices dans la base de données"
EXERCISE_COUNT=$(node -e "
const { createClient } = require('@supabase/supabase-js');
require('dotenv/config');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
supabase.from('lumbar_exercises').select('id', { count: 'exact' })
  .then(({ count }) => console.log(count || 0))
  .catch(() => console.log(0));
" 2>/dev/null)

if [ "$EXERCISE_COUNT" -ge 50 ]; then
    echo -e "${GREEN}✅ $EXERCISE_COUNT exercices en base${NC}"
elif [ "$EXERCISE_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Seulement $EXERCISE_COUNT exercices (attendu: 62)${NC}"
    echo "Relancer: node scripts/importExercisesToSupabase.js"
else
    echo -e "${RED}❌ Aucun exercice en base${NC}"
    echo "Lancer: node scripts/importExercisesToSupabase.js"
    exit 1
fi
echo ""

# Test 5: Fichiers critiques
echo "📁 Test 5: Fichiers critiques"
CRITICAL_FILES=(
    "lib/exerciseSelection.js"
    "pages/api/select-exercises.js"
    "pages/assessment.js"
    "pages/exercise-results.js"
    "components/forms/PatientAssessmentForm.jsx"
    "components/forms/ProfessionalAssessmentForm.jsx"
)

MISSING_FILES=0
for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file MANQUANT"
        MISSING_FILES=$((MISSING_FILES+1))
    fi
done

if [ $MISSING_FILES -eq 0 ]; then
    echo -e "${GREEN}✅ Tous les fichiers critiques présents${NC}"
else
    echo -e "${RED}❌ $MISSING_FILES fichier(s) manquant(s)${NC}"
    exit 1
fi
echo ""

# Test 6: Build Next.js
echo "🏗️  Test 6: Build Next.js (optionnel)"
echo -e "${YELLOW}⏭️  Skip build (trop long pour test rapide)${NC}"
echo "Pour tester build: npm run build"
echo ""

# Résumé
echo "=================================="
echo -e "${GREEN}✅ TOUS LES TESTS PASSÉS${NC}"
echo ""
echo "🚀 Prêt à lancer le serveur:"
echo "   npm run dev"
echo ""
echo "📖 Ensuite ouvrir:"
echo "   http://localhost:3000/assessment"
echo "   (ou port 3001 si 3000 occupé)"
echo ""
echo "📋 Scénarios de test:"
echo "   Voir TESTING_GUIDE.md"
echo ""
