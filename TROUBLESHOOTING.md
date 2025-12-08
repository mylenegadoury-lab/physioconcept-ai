# 🛠️ Guide de dépannage

## ❌ Erreurs courantes et solutions

### 1. "OPENAI_API_KEY is not defined"
**Cause:** La clé API n'est pas configurée

**Solution:**
```bash
# Créer .env.local à la racine du projet
echo "OPENAI_API_KEY=sk-votre-cle-ici" > .env.local

# Redémarrer le serveur
npm run dev
```

---

### 2. "Erreur 405: Method not allowed"
**Cause:** La requête n'utilise pas POST

**Solution:** 
- Vérifier que `handleSubmit` utilise `method: "POST"`
- ✅ Déjà corrigé dans le code

---

### 3. "Impossible de charger le programme" (JSON error)
**Cause:** OpenAI retourne du markdown au lieu de JSON pur

**Solution:**
- ✅ Le code parse déjà le markdown: `` ```json...``` ``
- Si le problème persiste, vérifier le prompt OpenAI

---

### 4. "Aucun exercice généré"
**Causes possibles:**
- Réponse OpenAI incomplète
- Erreur de parsing JSON
- Clé API invalide

**Solutions:**
```bash
# Vérifier les logs du serveur
# npm run dev affiche les erreurs

# Vérifier la réponse OpenAI brute (console du serveur)
# Ajouter console.log() dans generate.js
```

---

### 5. "Erreur de connexion"
**Cause:** API OpenAI non accessible ou timeout

**Solution:**
- Vérifier la connexion internet
- Vérifier que la clé API est valide
- Vérifier les quotas API OpenAI

---

### 6. "Page blanche ou "Chargement..." infini"
**Causes possibles:**
- Erreur de parsing du query string
- Data vide ou invalide
- Erreur JavaScript non loggée

**Solutions:**
```javascript
// Ouvrir la console du navigateur (F12)
// Vérifier s'il y a des erreurs rouges
// Vérifier le query string: http://localhost:3000/result?data=...
```

---

## ✅ Tests de vérification

### Test 1: Vérifier l'API
```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "language": "fr",
    "painLocation": "local",
    "painDirection": "flexion",
    "movementTolerance": "moderate",
    "fearLevel": "low",
    "duration": "acute",
    "legWeakness": "no",
    "numbness": "no",
    "nightPain": "no",
    "fever": "no",
    "trauma": "no"
  }'
```

**Réponse attendue:** JSON avec redFlags, education, exercises

---

### Test 2: Vérifier le formulaire
1. Ouvrir http://localhost:3000
2. Remplir tous les champs
3. Cliquer sur "Générer mon programme"
4. Vérifier que ça charge (bouton grisé)
5. Vérifier la redirection vers /result

---

### Test 3: Vérifier les styles
1. Ouvrir http://localhost:3000
2. Vérifier le gradient de fond bleu
3. Vérifier que le formulaire est bien centré
4. Tester le hover sur les selects
5. Tester le responsive (F12 → Device mode)

---

## 🔧 Commandes utiles

```bash
# Démarrer en développement
npm run dev

# Build optimisé
npm run build

# Lancer en production
npm start

# Vérifier les erreurs (linting)
npm run lint

# Nettoyer le cache
rm -rf .next node_modules
npm install
```

---

## 📋 Checklist avant production

- [ ] OPENAI_API_KEY est défini dans .env.local
- [ ] npm install a fonctionné
- [ ] npm run dev démarre sans erreur
- [ ] Formulaire se charge à http://localhost:3000
- [ ] Soumettre le formulaire fonctionne
- [ ] Résultats s'affichent correctement
- [ ] Pas d'erreur dans la console du navigateur (F12)
- [ ] Pas d'erreur dans les logs serveur
- [ ] Styles CSS appliqués correctement
- [ ] Responsive sur mobile testé
- [ ] .env.local n'est pas commité (voir .gitignore)
- [ ] npm run build réussit

---

## 🔍 Debug avancé

### Activer les logs détaillés
Dans `pages/api/generate.js`:
```javascript
console.log("Requête reçue:", req.body);
console.log("Réponse OpenAI:", response.choices[0].message.content);
```

### Vérifier les headers
Ouvrir DevTools (F12) → Network → Cliquer sur la requête POST

### Vérifier le query string
Ouvrir DevTools → Network → Cliquer sur /result

---

## 🚨 Erreurs de sécurité

❌ **NE PAS FAIRE:**
- Commiter .env.local
- Exposer OPENAI_API_KEY côté client
- Afficher les stack traces en production
- Accepter n'importe quelle donnée

✅ **À FAIRE:**
- Valider toutes les données serveur
- Utiliser des variables d'env
- Logger les erreurs de manière sécurisée
- Utiliser HTTPS en production

---

## 📞 Support

Si vous avez toujours des problèmes:
1. Vérifier les logs: `npm run dev` affiche tout
2. Vérifier la console: F12 dans le navigateur
3. Vérifier .env.local existe et a la bonne clé
4. Redémarrer: Ctrl+C dans le terminal, puis `npm run dev`

---

**Bon débogage! 🚀**
