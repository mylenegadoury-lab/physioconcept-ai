#!/bin/bash

echo ""
echo "🚀 TEST DE VITESSE - GÉNÉRATION DE PROGRAMME"
echo "============================================================"
echo ""
echo "📋 Test: Lombalgie chronique, douleur 6/10"
echo "🎯 Objectif: < 5 secondes"
echo ""
echo "⏱️  Démarrage chronométrage..."
echo ""

START_TIME=$(date +%s.%N)

# Test API call
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "problematique": "lombalgie",
    "patientName": "Test Patient",
    "patientAge": 45,
    "painIntensity": 6,
    "painDuration": "3 mois",
    "painLocation": "Lombaire centrale",
    "movementRestriction": "Flexion limitée",
    "fearLevel": 5,
    "treatmentHistory": "Aucun",
    "comorbidities": "Aucune",
    "objectif": "Réduire douleur",
    "language": "fr"
  }')

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

END_TIME=$(date +%s.%N)
DURATION=$(echo "$END_TIME - $START_TIME" | bc)

echo "============================================================"
echo ""

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ SUCCÈS!"
    echo ""
    echo "⚡ Temps total: ${DURATION}s"
    
    # Extract metadata if available
    EXERCISES_COUNT=$(echo "$BODY" | grep -o '"exercises"' | wc -l)
    echo "💪 Exercices générés: $EXERCISES_COUNT"
    
    # Check speed
    if (( $(echo "$DURATION < 5" | bc -l) )); then
        echo "🎯 OBJECTIF ATTEINT! (< 5s)"
    elif (( $(echo "$DURATION < 10" | bc -l) )); then
        echo "⚠️  Bon mais peut être optimisé"
    else
        echo "❌ Trop lent - optimisation nécessaire"
    fi
else
    echo "❌ ERREUR!"
    echo "   Status: $HTTP_CODE"
    if [ "$HTTP_CODE" = "000" ]; then
        echo "   ⚠️  Serveur non démarré"
        echo "   💡 Exécutez: npm run dev"
    else
        echo "   Réponse: $BODY"
    fi
fi

echo ""
echo "============================================================"
echo ""
