/**
 * Module d'évaluation des drapeaux rouges (Red Flags)
 * Détection automatique des signes d'alerte nécessitant référence médicale
 */

import { redFlags } from '../data/evidence';

/**
 * Évalue la présence de drapeaux rouges selon les données patient
 * @param {Object} patientData - Données patient
 * @returns {Object} Résultat évaluation avec drapeaux identifiés
 */
export function evaluateRedFlags(patientData) {
  const {
    problematique = '',
    patientAge = 0,
    painIntensity = 0,
    painDuration = '',
    painLocation = '',
    comorbidities = '',
    treatmentHistory = '',
    patientFolderText = '',
  } = patientData;

  // Texte complet à analyser
  const fullText = `${patientFolderText} ${comorbidities} ${treatmentHistory} ${painLocation}`.toLowerCase();

  // Mapper problématique → condition key
  const conditionKey = getConditionKey(problematique);
  if (!conditionKey || !redFlags[conditionKey]) {
    return { present: false, items: [], priority: 'AUCUNE', recommendation: 'Pas de drapeaux identifiés' };
  }

  const conditionRedFlags = redFlags[conditionKey];
  const identified = [];

  // Évaluer drapeaux critiques
  if (conditionRedFlags.critical) {
    conditionRedFlags.critical.forEach((flag) => {
      const score = checkRedFlag(flag, fullText, patientData);
      if (score.matched) {
        identified.push({
          ...flag,
          matchedSymptoms: score.matchedSymptoms,
          severity: 'CRITIQUE',
        });
      }
    });
  }

  // Évaluer drapeaux modérés
  if (conditionRedFlags.moderate) {
    conditionRedFlags.moderate.forEach((flag) => {
      const score = checkRedFlag(flag, fullText, patientData);
      if (score.matched) {
        identified.push({
          ...flag,
          matchedSymptoms: score.matchedSymptoms,
          severity: 'MODÉRÉE',
        });
      }
    });
  }

  // Déterminer priorité globale (la plus élevée)
  const priority = identified.length === 0
    ? 'AUCUNE'
    : identified.some((f) => f.severity === 'CRITIQUE')
      ? 'CRITIQUE'
      : identified.some((f) => f.priority === 'HAUTE')
        ? 'HAUTE'
        : 'MODÉRÉE';

  // Recommandation globale
  const recommendation = identified.length === 0
    ? 'Pas de drapeaux rouges identifiés - traitement conservateur approprié'
    : identified
        .map(
          (f) =>
            `⚠️ ${f.name}: ${f.action} (Délai: ${f.timeframe})`
        )
        .join('\n');

  return {
    present: identified.length > 0,
    items: identified.map((f) => ({
      name: f.name,
      matchedSymptoms: f.matchedSymptoms,
      action: f.action,
      priority: f.priority,
      timeframe: f.timeframe,
    })),
    priority,
    recommendation,
  };
}

/**
 * Vérifie si un drapeau rouge est présent
 * @param {Object} flag - Drapeau rouge à vérifier
 * @param {string} fullText - Texte complet patient
 * @param {Object} patientData - Données structurées patient
 * @returns {Object} Score et symptômes matchés
 */
function checkRedFlag(flag, fullText, patientData) {
  const matchedSymptoms = [];
  let score = 0;

  flag.symptoms.forEach((symptom) => {
    const keywords = extractKeywords(symptom);
    const matched = keywords.some((kw) => fullText.includes(kw.toLowerCase()));
    if (matched) {
      matchedSymptoms.push(symptom);
      score++;
    }
  });

  // Évaluation contextuelle supplémentaire
  const contextualMatch = checkContextualFactors(flag, patientData);
  if (contextualMatch) {
    matchedSymptoms.push(contextualMatch);
    score++;
  }

  // Seuil: au moins 2 symptômes pour flag critique, 1 pour modéré
  const threshold = flag.priority === 'CRITIQUE' ? 2 : 1;
  const matched = score >= threshold;

  return { matched, matchedSymptoms };
}

/**
 * Extrait mots-clés d'un symptôme pour recherche
 * @param {string} symptom - Description symptôme
 * @returns {string[]} Mots-clés
 */
function extractKeywords(symptom) {
  const keywords = [];
  const text = symptom.toLowerCase();

  // Patterns spécifiques
  if (text.includes('selle')) keywords.push('selle', 'périnée', 'périné', 'saddle');
  if (text.includes('vésical') || text.includes('urinaire')) keywords.push('urine', 'vessie', 'incontinence urinaire', 'rétention');
  if (text.includes('intestin') || text.includes('fécal')) keywords.push('selles', 'incontinence fécale', 'intestin');
  if (text.includes('faiblesse bilatérale')) keywords.push('jambes faibles', 'membres inférieurs faibles', 'bilateral weakness');
  if (text.includes('fracture')) keywords.push('fracture', 'cassé', 'fracturé', 'broken');
  if (text.includes('cancer')) keywords.push('cancer', 'tumeur', 'métastase', 'tumor', 'metastasis');
  if (text.includes('perte de poids')) keywords.push('perte poids', 'amaigrissement', 'weight loss');
  if (text.includes('fièvre')) keywords.push('fièvre', 'fever', 'température', 'chaud');
  if (text.includes('infection')) keywords.push('infection', 'infecté', 'infected');
  if (text.includes('trauma')) keywords.push('trauma', 'accident', 'chute', 'fall', 'injury');
  if (text.includes('instabilité')) keywords.push('instable', 'instability', 'dérobe', 'giving way');
  if (text.includes('rouge')) keywords.push('rouge', 'red', 'rougeur');
  if (text.includes('chaud')) keywords.push('chaud', 'chaleur', 'hot', 'warmth');
  if (text.includes('gonfl')) keywords.push('gonflé', 'gonflement', 'swelling', 'enflé');

  return keywords.length > 0 ? keywords : [text];
}

/**
 * Vérifie facteurs contextuels (âge, durée, intensité)
 * @param {Object} flag - Drapeau rouge
 * @param {Object} patientData - Données patient
 * @returns {string|null} Facteur contextuel matché
 */
function checkContextualFactors(flag, patientData) {
  const { patientAge, painIntensity, painDuration } = patientData;

  // Âge > 50 pour cancer/fracture
  if (flag.name.toLowerCase().includes('cancer') || flag.name.toLowerCase().includes('métastase')) {
    if (parseInt(patientAge) > 50) return 'Âge > 50 ans (facteur risque cancer)';
  }

  if (flag.name.toLowerCase().includes('fracture')) {
    if (parseInt(patientAge) > 50) return 'Âge > 50 ans (risque fracture ostéoporotique)';
  }

  // Douleur nocturne sévère
  if (flag.symptoms.some((s) => s.toLowerCase().includes('nocturne'))) {
    if (parseInt(painIntensity) >= 7) return 'Douleur nocturne sévère rapportée';
  }

  return null;
}

/**
 * Mapper problématique → condition key
 * @param {string} problematique - Problématique patient
 * @returns {string|null} Clé condition
 */
function getConditionKey(problematique) {
  const map = {
    lombalgie: 'lumbar',
    'douleur au dos': 'lumbar',
    'mal de dos': 'lumbar',
    'lower back pain': 'lumbar',

    genou: 'knee',
    'douleur au genou': 'knee',
    'knee pain': 'knee',

    épaule: 'shoulder',
    'douleur à l\'épaule': 'shoulder',
    'shoulder pain': 'shoulder',

    cou: 'neck',
    cervical: 'neck',
    'douleur au cou': 'neck',
    'neck pain': 'neck',

    hanche: 'hip',
    'douleur à la hanche': 'hip',
    'hip pain': 'hip',

    cheville: 'ankle',
    'douleur à la cheville': 'ankle',
    'ankle pain': 'ankle',
  };

  const key = problematique.toLowerCase();
  return map[key] || null;
}

/**
 * Génère recommandation clinique formatée
 * @param {Object} redFlagResult - Résultat évaluation red flags
 * @returns {string} Recommandation formatée
 */
export function formatRedFlagRecommendation(redFlagResult) {
  if (!redFlagResult.present) {
    return '✅ Pas de drapeaux rouges identifiés - traitement conservateur approprié';
  }

  let output = '⚠️ DRAPEAUX ROUGES IDENTIFIÉS:\n\n';

  redFlagResult.items.forEach((item, idx) => {
    output += `${idx + 1}. ${item.name}\n`;
    output += `   Symptômes: ${item.matchedSymptoms.join(', ')}\n`;
    output += `   Action: ${item.action}\n`;
    output += `   Priorité: ${item.priority} (Délai: ${item.timeframe})\n\n`;
  });

  return output;
}

export default {
  evaluateRedFlags,
  formatRedFlagRecommendation,
};
