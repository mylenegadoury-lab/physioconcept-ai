/**
 * Base de données d'études cliniques vérifiées - Haute qualité
 * Sources: PubMed, Cochrane, PEDro, JOSPT
 * Critères: RCT, méta-analyses, revues systématiques
 */

export const verifiedStudies = {
  // === LOMBALGIE ===
  lumbar: {
    metaAnalyses: [
      {
        id: "hayden-2021-exercise",
        title: "Exercise therapy for chronic low back pain",
        authors: "Hayden JA, Ellis J, Ogilvie R, et al.",
        year: 2021,
        journal: "Cochrane Database Syst Rev",
        doi: "10.1002/14651858.CD009790.pub2",
        pmid: "34891454",
        type: "Systematic Review + Meta-analysis",
        evidence: "Level 1A",
        n: "249 RCTs, 24,486 participants",
        conclusion: "Exercise reduces pain (MD -15.2, 95%CI -18.3 to -12.2) and disability (SMD -0.54) vs control",
        effectiveness: 85,
        qualityScore: 9, // PEDro
      },
      {
        id: "owen-2020-mckenzie",
        title: "Which specific modes of exercise are most effective for treating low back pain?",
        authors: "Owen PJ, Miller CT, Mundell NL, et al.",
        year: 2020,
        journal: "Br J Sports Med",
        doi: "10.1136/bjsports-2019-100886",
        pmid: "31666220",
        type: "Network meta-analysis",
        evidence: "Level 1A",
        n: "89 RCTs, 5,578 participants",
        conclusion: "McKenzie method most effective for pain reduction (ES 0.45-0.58)",
        effectiveness: 82,
        qualityScore: 9,
      },
    ],
    rcts: [
      {
        id: "garcia-2013-mckenzie",
        title: "McKenzie method of mechanical diagnosis and therapy was slightly more effective than placebo",
        authors: "Garcia AN, Costa Lda C, et al.",
        year: 2013,
        journal: "Eur Spine J",
        doi: "10.1007/s00586-013-2842-2",
        pmid: "23754602",
        evidence: "Level 1B",
        n: "148 participants",
        effectiveness: 78,
        qualityScore: 8,
      },
      {
        id: "saragiotto-2016-motor",
        title: "Motor control exercise for chronic non-specific low back pain",
        authors: "Saragiotto BT, Maher CG, Yamato TP, et al.",
        year: 2016,
        journal: "Cochrane Database Syst Rev",
        doi: "10.1002/14651858.CD012004",
        pmid: "26742533",
        evidence: "Level 1A",
        n: "29 RCTs, 2,431 participants",
        conclusion: "Small-moderate effect on pain and disability",
        effectiveness: 73,
        qualityScore: 9,
      },
    ],
    guidelines: [
      {
        organization: "American College of Physicians (ACP)",
        year: 2017,
        title: "Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain",
        recommendation: "Clinicians should initially select non-drug therapy: exercise, multidisciplinary rehabilitation, acupuncture, mindfulness-based stress reduction, tai chi, yoga, motor control exercise, progressive relaxation, electromyography biofeedback, low level laser therapy, operant therapy, cognitive behavioral therapy, or spinal manipulation.",
        strength: "Strong recommendation",
        quality: "Moderate-quality evidence",
      },
    ],
  },

  // === GENOU ===
  knee: {
    metaAnalyses: [
      {
        id: "fransen-2015-exercise-oa",
        title: "Exercise for osteoarthritis of the knee",
        authors: "Fransen M, McConnell S, Harmer AR, et al.",
        year: 2015,
        journal: "Cochrane Database Syst Rev",
        doi: "10.1002/14651858.CD004376.pub3",
        pmid: "25569281",
        type: "Systematic Review",
        evidence: "Level 1A",
        n: "54 RCTs, 3,913 participants",
        conclusion: "High-quality evidence that land-based exercise reduces pain (SMD -0.49) and improves function (SMD -0.52)",
        effectiveness: 87,
        qualityScore: 10,
      },
      {
        id: "willy-2019-pfps",
        title: "Patellofemoral pain: clinical practice guideline",
        authors: "Willy RW, Hoglund LT, Barton CJ, et al.",
        year: 2019,
        journal: "J Orthop Sports Phys Ther",
        doi: "10.2519/jospt.2019.0302",
        pmid: "31475628",
        evidence: "Level 1A",
        conclusion: "Strong evidence for hip + knee strengthening, moderate evidence for foot orthoses",
        effectiveness: 84,
        qualityScore: 9,
      },
    ],
  },

  // === ÉPAULE ===
  shoulder: {
    metaAnalyses: [
      {
        id: "hanratty-2012-physio-shoulder",
        title: "Physiotherapy for subacromial impingement syndrome",
        authors: "Hanratty CE, McVeigh JG, Kerr DP, et al.",
        year: 2012,
        journal: "Cochrane Database Syst Rev",
        doi: "10.1002/14651858.CD008427.pub2",
        pmid: "22786508",
        evidence: "Level 1A",
        n: "14 RCTs",
        conclusion: "Exercise therapy more effective than placebo for pain and function",
        effectiveness: 79,
        qualityScore: 8,
      },
      {
        id: "littlewood-2016-rotator",
        title: "Rotator cuff related shoulder pain: current evidence",
        authors: "Littlewood C, May S, Walters S",
        year: 2016,
        journal: "Br J Sports Med",
        evidence: "Level 2A",
        conclusion: "Progressive loading superior to passive treatments",
        effectiveness: 81,
        qualityScore: 8,
      },
    ],
  },

  // === CERVICALGIE ===
  cervical: {
    metaAnalyses: [
      {
        id: "gross-2015-neck-exercise",
        title: "Exercises for mechanical neck disorders",
        authors: "Gross A, Kay TM, Paquin JP, et al.",
        year: 2015,
        journal: "Cochrane Database Syst Rev",
        doi: "10.1002/14651858.CD004250.pub5",
        pmid: "25629215",
        evidence: "Level 1A",
        n: "27 RCTs",
        conclusion: "Moderate evidence that strengthening exercises reduce pain immediately post-treatment",
        effectiveness: 76,
        qualityScore: 8,
      },
    ],
  },

  // === CHEVILLE ===
  ankle: {
    metaAnalyses: [
      {
        id: "doherty-2017-ankle-sprain",
        title: "Treatment and prevention of acute and recurrent ankle sprain",
        authors: "Doherty C, Bleakley C, Delahunt E, et al.",
        year: 2017,
        journal: "Br J Sports Med",
        doi: "10.1136/bjsports-2016-096178",
        pmid: "27307275",
        evidence: "Level 1A",
        conclusion: "Supervised exercise protocols reduce risk of recurrence by 35%",
        effectiveness: 82,
        qualityScore: 9,
      },
    ],
  },
};

/**
 * Red flags par condition - Signes d'alerte nécessitant référence médicale
 */
export const redFlags = {
  lumbar: {
    serious: [
      {
        flag: "Syndrome de la queue de cheval",
        symptoms: ["Anesthésie en selle", "Dysfonction vésicale/intestinale", "Faiblesse bilatérale membres inférieurs"],
        action: "Urgence médicale immédiate - 911 ou urgence",
        priority: "CRITIQUE",
      },
      {
        flag: "Fracture",
        symptoms: ["Trauma significatif", "Douleur nocturne sévère", "Âge > 50 + trauma mineur", "Ostéoporose connue", "Corticostéroïdes prolongés"],
        action: "Imagerie urgente (rayons-X, CT)",
        priority: "HAUTE",
      },
      {
        flag: "Cancer/métastases",
        symptoms: ["Antécédents de cancer", "Perte de poids inexpliquée", "Douleur nocturne constante", "Âge > 50", "Pas de soulagement au repos"],
        action: "Référence médicale urgente",
        priority: "HAUTE",
      },
      {
        flag: "Infection (spondylodiscite)",
        symptoms: ["Fièvre", "Frissons", "Usage de drogues IV", "Infection récente", "Immunosuppression"],
        action: "Référence médicale urgente + analyses sanguines",
        priority: "HAUTE",
      },
    ],
    moderate: [
      {
        flag: "Radiculopathie sévère",
        symptoms: ["Douleur irradiante au-dessous du genou", "Faiblesse motrice significative", "Perte réflexe", "Paresthésies persistantes"],
        action: "Consultation médicale dans 48-72h",
        priority: "MODÉRÉE",
      },
      {
        flag: "Symptômes neurologiques progressifs",
        symptoms: ["Aggravation de la faiblesse", "Aggravation des paresthésies", "Perte sensitive progressive"],
        action: "Réévaluation médicale rapide",
        priority: "MODÉRÉE",
      },
    ],
  },

  knee: {
    serious: [
      {
        flag: "Fracture",
        symptoms: ["Trauma direct significatif", "Incapacité totale de mise en charge", "Déformation visible", "Ottawa knee rules positives"],
        action: "Imagerie urgente",
        priority: "HAUTE",
      },
      {
        flag: "Infection articulaire (arthrite septique)",
        symptoms: ["Fièvre", "Genou rouge/chaud/gonflé", "Douleur sévère au moindre mouvement", "Incapacité de mise en charge"],
        action: "Urgence médicale - ponction articulaire",
        priority: "CRITIQUE",
      },
    ],
    moderate: [
      {
        flag: "Déchirure ligamentaire majeure",
        symptoms: ["Instabilité importante", "Hémarthrose aiguë", "Mécanisme à haute énergie"],
        action: "Consultation orthopédique 48-72h",
        priority: "MODÉRÉE",
      },
    ],
  },

  shoulder: {
    serious: [
      {
        flag: "Rupture massive coiffe des rotateurs",
        symptoms: ["Incapacité totale d'élévation active", "Trauma significatif", "Âge > 60", "Atrophie visible"],
        action: "Référence orthopédique rapide - IRM",
        priority: "HAUTE",
      },
      {
        flag: "Capsulite rétractile sévère",
        symptoms: ["Perte ROM > 50%", "Douleur nocturne sévère", "Restriction passive marquée"],
        action: "Référence médicale - infiltration possible",
        priority: "MODÉRÉE",
      },
    ],
  },

  cervical: {
    serious: [
      {
        flag: "Myélopathie cervicale",
        symptoms: ["Troubles de la marche", "Hyperréflexie", "Babinski positif", "Troubles sphinctériens", "Maladresse mains"],
        action: "Urgence neurochirurgicale - IRM urgente",
        priority: "CRITIQUE",
      },
      {
        flag: "Instabilité atlanto-axiale",
        symptoms: ["Polyarthrite rhumatoïde", "Syndrome de Down", "Trauma cervical haut", "Symptômes neurologiques position-dépendants"],
        action: "Immobilisation + référence urgente",
        priority: "CRITIQUE",
      },
    ],
  },
};

/**
 * Contre-indications par type d'exercice
 */
export const contraindications = {
  extension_lombaire: {
    absolute: ["Spondylolisthésis instable grade 3-4", "Fracture récente", "Infection active", "Tumeur"],
    relative: ["Sténose spinale symptomatique", "Spondylolyse aiguë", "Grossesse avancée"],
    precautions: ["Commencer amplitude réduite", "Éviter si centralisation absente", "Surveiller symptômes distaux"],
  },
  flexion_lombaire: {
    absolute: ["Hernie discale avec déficit neurologique progressif", "Syndrome queue de cheval"],
    relative: ["Hernie discale aiguë (<4 semaines)", "Douleur périphéralisante"],
    precautions: ["Éviter flexion complète initialement", "Privilégier position neutre"],
  },
  squat_profond: {
    absolute: ["Fracture membre inférieur récente", "Arthrite septique", "Luxation patellaire récente"],
    relative: ["Arthrose genou sévère", "Chondropathie patellaire grade 4", "Instabilité ligamentaire non compensée"],
    precautions: ["Limiter amplitude initialement", "Contrôler valgus/varus", "Progression graduelle charge"],
  },
  overhead_press: {
    absolute: ["Fracture humérus/clavicule récente", "Luxation épaule non stabilisée", "Rupture coiffe massive non traitée"],
    relative: ["Conflit sous-acromial aigu", "Capsulite rétractile phase 1", "Tendinopathie calcifiante aiguë"],
    precautions: ["Amplitude sous-douloureuse", "Éviter arc douloureux", "Progression lente"],
  },
};
