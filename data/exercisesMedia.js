/**
 * Base de données d'exercices avec médias
 * Structure: { id, name, description, problematique, dosage, difficulty, mediaPrompts }
 */

export const exercisesDatabase = {
  // LOMBALGIE
  lumbar: [
    {
      id: "mckenzie-elbows",
      name: "Extension en appui sur les coudes (McKenzie)",
      description:
        "Allongez-vous sur le ventre, placez vos coudes sous les épaules et poussez doucement votre poitrine vers le haut en gardant le bassin au sol.",
      problematique: "Lombalgie",
      category: "Extension",
      dosage: "3 séries de 10 répétitions, 2-3 fois par jour",
      difficulty: "Débutant",
      safetyTips:
        "Arrêtez si douleur accrue. Effectuez lentement. Respiration continue.",
      contraindications: [
        "Spondylolisthésis instable grade 3-4",
        "Sténose spinale symptomatique sévère",
        "Fracture vertébrale récente (< 3 mois)",
      ],
      precautions: [
        "Commencer amplitude réduite (prone on elbows)",
        "Éviter si centralisation absente après 3-5 répétitions",
        "Surveiller aggravation symptômes distaux",
      ],
      evidence: {
        level: "Level 1A",
        effectiveness: 82,
        source: "Owen et al. 2020, Br J Sports Med",
      },
      imagePrompt:
        "Person lying prone doing McKenzie extension exercise, elbows supporting upper body",
      videoKeywords: ["McKenzie extension", "prone extension", "lower back"],
      progression: "Extension bras tendus",
      benefits: "Soulage la douleur de flexion, centralise les symptômes",
    },
    {
      id: "cat-cow",
      name: "Chat-vache",
      description:
        "À quatre pattes, alternez entre arrondir le dos (chat) et creuser le dos (vache) dans un mouvement fluide.",
      problematique: "Lombalgie",
      category: "Mobilité",
      dosage: "3 séries de 12 répétitions, quotidien",
      difficulty: "Débutant",
      safetyTips: "Mouvements lents et contrôlés",
      contraindications: [
        "Hernie discale aiguë si périphéralisation",
      ],
      precautions: [
        "Éviter flexion complète si douleur irradiante",
        "Mouvements doux, sans forcing",
      ],
      evidence: {
        level: "Level 2",
        effectiveness: 71,
        source: "Mobilité segmentaire générale",
      },
      imagePrompt:
        "Woman doing cat-cow stretch on yoga mat, showing both positions",
      videoKeywords: ["cat cow stretch", "spinal mobility", "back flexibility"],
      progression: "Ajouter des rotations",
      benefits: "Améliore la mobilité spinale, soulage les tensions",
    },
    {
      id: "dead-bug",
      name: "Dead Bug",
      description:
        "Sur le dos, levez bras et jambes, puis abaissez bras droit + jambe gauche alternativement sans cambrer le bas du dos.",
      problematique: "Lombalgie",
      category: "Stabilité",
      dosage: "3 séries de 12 répétitions, 3-4 fois par semaine",
      difficulty: "Intermédiaire",
      contraindications: [],
      precautions: [
        "Maintenir contact lombaire avec sol",
        "Commencer amplitude réduite si difficile",
      ],
      evidence: {
        level: "Level 1B",
        effectiveness: 76,
        source: "Motor control exercises, Saragiotto 2016",
      },
      safetyTips: "Gardez le bas du dos plaqué au sol",
      imagePrompt:
        "Person lying on back performing dead bug exercise with alternating limbs",
      videoKeywords: ["dead bug exercise", "core stability", "pilates"],
      progression: "Dead bug avec poids",
      benefits: "Renforce les stabilisateurs spinaux",
    },
    {
      id: "bridge",
      name: "Pont fessier",
      description:
        "Allongé sur le dos, genoux fléchis, poussez le bassin vers le haut en serrant les fessiers.",
      problematique: "Lombalgie",
      category: "Renforcement",
      dosage: "3 séries de 12 répétitions, 3-4 fois par semaine",
      difficulty: "Débutant",
      contraindications: [
        "Grossesse avancée 3e trimestre (préférer sur côté)",
        "Hernie discale avec extension-intolérante",
      ],
      precautions: [
        "Éviter hyperextension lombaire",
        "Activer transverse abdominal avant mouvement",
      ],
      evidence: {
        level: "Level 1B",
        effectiveness: 77,
        source: "Strengthening exercises, Hayden 2021",
      },
      safetyTips: "Contractez les fessiers, pas le dos",
      imagePrompt: "Person lying on back performing glute bridge exercise",
      videoKeywords: ["glute bridge", "hip extension", "lumbar stability"],
      progression: "Pont sur une jambe",
      benefits: "Renforce les fessiers et stabilise le bassin",
    },
  ],

  // GENOU
  knee: [
    {
      id: "quad-sets",
      name: "Isométrie quadriceps",
      description:
        "Assis ou couché, placez une serviette roulée sous le genou et contractez le quadriceps en redressant la jambe.",
      problematique: "Douleur au genou",
      category: "Renforcement",
      dosage: "3 séries de 15 répétitions (10 sec chaque), quotidien",
      difficulty: "Débutant",
      safetyTips: "Pas de mouvement, contraction isométrique seulement",
      contraindications: [
        "Fracture patellaire récente",
        "Arthrite septique",
      ],
      precautions: [
        "Arrêter si douleur > 3/10",
        "Progression graduelle intensité contraction",
      ],
      evidence: {
        level: "Level 1A",
        effectiveness: 82,
        source: "Fransen 2015, Cochrane - Quad strengthening for knee OA",
      },
      imagePrompt:
        "Person sitting performing quadriceps isometric exercise with towel",
      videoKeywords: ["quad sets", "quadriceps isometric", "knee strengthening"],
      progression: "Ajouter résistance avec élastique",
      benefits: "Renforce sans stress articulaire",
    },
    {
      id: "clamshells",
      name: "Coquille (Clamshells)",
      description:
        "Allongé sur le côté, genoux fléchis, écartez le genou du dessus en gardant les pieds joints.",
      problematique: "Douleur au genou",
      category: "Stabilité",
      dosage: "3 séries de 15 répétitions par côté, 3 fois par semaine",
      difficulty: "Débutant",
      safetyTips: "Gardez les pieds en contact",
      contraindications: [],
      precautions: [
        "Éviter rotation excessive tronc",
        "Maintenir bassin stable",
      ],
      evidence: {
        level: "Level 1B",
        effectiveness: 79,
        source: "Baldon 2022 - Hip abductor strengthening for PFPS",
      },
      imagePrompt: "Person lying on side doing clamshell hip abduction exercise",
      videoKeywords: ["clamshells", "hip abduction", "gluteus medius"],
      progression: "Clamshells avec élastique résistance",
      benefits: "Stabilise la hanche, réduit le stress du genou",
    },
    {
      id: "straight-leg-raise",
      name: "Relevé de jambe tendue",
      description:
        "Allongé sur le dos, une jambe fléchie, relevez l'autre jambe tendue à 45°.",
      problematique: "Douleur au genou",
      category: "Renforcement",
      dosage: "3 séries de 12 répétitions par jambe, 3-4 fois par semaine",
      difficulty: "Intermédiaire",
      safetyTips: "Gardez la jambe tendue, pas de balancement",
      imagePrompt:
        "Person lying on back performing straight leg raise exercise",
      videoKeywords: ["straight leg raise", "quadriceps strengthening"],
      progression: "Ajouter poids à la cheville",
      benefits: "Renforce le quadriceps sans fléchir le genou",
    },
  ],

  // ÉPAULE
  shoulder: [
    {
      id: "pendulum-circles",
      name: "Mouvements pendulaires",
      description:
        "Penché en avant à 90°, effectuez des mouvements circulaires avec le bras affecté.",
      problematique: "Douleur à l'épaule",
      category: "Mobilité",
      dosage: "3 séries de 20 rotations, quotidien",
      difficulty: "Débutant",
      safetyTips: "Laissez la gravité faire le travail, relaxez",
      imagePrompt:
        "Person bent forward performing pendulum shoulder exercise circles",
      videoKeywords: ["pendulum exercises", "shoulder mobility", "frozen shoulder"],
      progression: "Augmenter amplitude et vitesse",
      benefits: "Augmente la mobilité sans douleur",
    },
    {
      id: "wall-slides",
      name: "Glissements contre le mur",
      description:
        "Dos contre le mur, bras fléchis 90°, glissez les bras vers le haut le long du mur.",
      problematique: "Douleur à l'épaule",
      category: "Mobilité",
      dosage: "3 séries de 12 répétitions, 3-4 fois par semaine",
      difficulty: "Débutant",
      contraindications: ["Capsulite rétractile phase 1 aiguë", "Conflit sous-acromial sévère non traité"],
      precautions: ["Limiter amplitude si douleur arc 60-120°", "Progression lente"],
      evidence: {
        level: "Level 1B",
        effectiveness: 80,
        source: "Scapular mobilization for shoulder pain",
      },
      safetyTips: "Gardez les lombaires contre le mur",
      imagePrompt:
        "Person standing against wall doing arm slides shoulder exercise",
      videoKeywords: ["wall slides", "shoulder flexion", "scapular mobility"],
      progression: "Réduire contact avec le mur",
      benefits: "Restaure la flexion d'épaule",
    },
    {
      id: "resistance-band-rows",
      name: "Tractions élastique",
      description:
        "Bouclez un élastique, tirez vers vous en pliant les coudes, en ramenant les omoplates vers l'arrière.",
      problematique: "Douleur à l'épaule",
      category: "Renforcement",
      dosage: "3 séries de 12-15 répétitions, 3 fois par semaine",
      difficulty: "Intermédiaire",
      contraindications: ["Rupture massive coiffe non stabilisée", "Instabilité multidirectionnelle non contrôlée"],
      precautions: ["Commencer résistance très légère", "Maintenir rétraction scapulaire"],
      evidence: {
        level: "Level 1B",
        effectiveness: 82,
        source: "Scapular stabilization exercises, Hopman 2013",
      },
      safetyTips: "Gardez la tension dans l'élastique, mouvements contrôlés",
      imagePrompt:
        "Person doing resistance band rows, proper form with scapular retraction",
      videoKeywords: ["band rows", "shoulder strengthening", "scapular stability"],
      progression: "Augmenter résistance de l'élastique",
      benefits: "Renforce les stabilisateurs de l'épaule",
    },
  ],

  // HANCHE
  hip: [
    {
      id: "hip-flexor-stretch",
      name: "Étirement des fléchisseurs de la hanche",
      description:
        "Position fente avant, gardez le bassin rentré et poussez les hanches vers l'avant.",
      problematique: "Douleur à la hanche",
      category: "Étirement",
      dosage: "3 séries de 30 secondes par côté, quotidien",
      difficulty: "Débutant",
      safetyTips: "Pas de douleur, sensibilité d'étirement seulement",
      imagePrompt: "Person in hip flexor stretch lunge position",
      videoKeywords: ["hip flexor stretch", "psoas stretch", "hip tightness"],
      progression: "Augmenter l'amplitude de l'étirement",
      benefits: "Soulage les tensions au fléchisseur de la hanche",
    },
    {
      id: "clamshells-hip",
      name: "Coquilles pour la hanche",
      description:
        "Allongé sur le côté, écartez le genou du dessus tout en gardant les pieds joints.",
      problematique: "Douleur à la hanche",
      category: "Renforcement",
      dosage: "3 séries de 15 répétitions par côté, 3 fois par semaine",
      difficulty: "Débutant",
      contraindications: ["Fracture col fémoral récente", "Prothèse totale hanche < 6 semaines"],
      precautions: ["Respecter précautions post-chirurgie si applicable", "Éviter rotation externe excessive"],
      evidence: {
        level: "Level 1B",
        effectiveness: 75,
        source: "Hip abductor strengthening, Kemp 2020",
      },
      safetyTips: "Mouvement contrôlé, pas d'élan",
      imagePrompt: "Person performing clamshell hip abduction exercise",
      videoKeywords: ["hip abduction", "gluteus medius", "hip stability"],
      progression: "Ajouter élastique de résistance",
      benefits: "Renforce les abducteurs de la hanche",
    },
    {
      id: "single-leg-stance",
      name: "Équilibre sur une jambe",
      description:
        "Tenez-vous sur une jambe, stabilisez-vous. Augmentez progressivement la durée.",
      problematique: "Douleur à la hanche",
      category: "Équilibre",
      dosage: "3 séries de 30-60 secondes par jambe, 5 fois par semaine",
      difficulty: "Intermédiaire",
      safetyTips: "Restez près d'un support",
      imagePrompt: "Person demonstrating single leg stance balance exercise",
      videoKeywords: ["single leg stance", "balance training", "proprioception"],
      progression: "Fermez les yeux, ajoutez mouvements",
      benefits: "Améliore l'équilibre et la proprioception",
    },
  ],

  // CHEVILLE
  ankle: [
    {
      id: "ankle-alphabet",
      name: "Alphabet à la cheville",
      description:
        "Soulevez une jambe et tracez les lettres de l'alphabet dans l'air avec votre pied.",
      problematique: "Douleur à la cheville",
      category: "Mobilité",
      dosage: "3 séries, quotidien",
      difficulty: "Débutant",
      safetyTips: "Lent et contrôlé",
      imagePrompt: "Person seated performing ankle alphabet mobility exercise",
      videoKeywords: ["ankle alphabet", "ankle mobility", "proprioception"],
      progression: "Augmenter la vitesse",
      benefits: "Améliore la mobilité et le contrôle de la cheville",
    },
    {
      id: "calf-raises",
      name: "Relevés de mollets",
      description:
        "Tenez-vous debout, relevez-vous sur les orteils, maintenez, puis revenez.",
      problematique: "Douleur à la cheville",
      category: "Renforcement",
      dosage: "3 séries de 15 répétitions, 3-4 fois par semaine",
      difficulty: "Débutant",
      contraindications: ["Rupture tendon Achille récente", "Fracture cheville non consolidée"],
      precautions: ["Commencer amplitude réduite si tendinopathie Achille", "Progression très graduelle"],
      evidence: {
        level: "Level 1B",
        effectiveness: 79,
        source: "Calf strengthening for ankle stability",
      },
      safetyTips: "Gardez équilibre, mouvements lisses",
      imagePrompt: "Person performing calf raises for ankle strengthening",
      videoKeywords: ["calf raises", "ankle strengthening", "plantarflexion"],
      progression: "Sur une jambe, sur surface instable",
      benefits: "Renforce les mollets et les stabilisateurs de la cheville",
    },
    {
      id: "resistance-band-ankle",
      name: "Flexion/extension avec élastique",
      description:
        "Assis, bouclez un élastique autour du pied et effectuez des mouvements de flexion/extension.",
      problematique: "Douleur à la cheville",
      category: "Renforcement",
      dosage: "3 séries de 15 répétitions par direction, 3 fois par semaine",
      difficulty: "Débutant",
      safetyTips: "Gardez la résistance modérée",
      imagePrompt:
        "Person sitting performing ankle resistance band exercises dorsi and plantarflexion",
      videoKeywords: ["ankle strengthening", "resistance band", "dorsiflexion"],
      progression: "Augmenter résistance de l'élastique",
      benefits: "Renforce tous les muscles de la cheville",
    },
  ],

  // COU
  neck: [
    {
      id: "neck-isometric",
      name: "Isométrie du cou",
      description:
        "Placez votre main contre votre tête et résistez sans bouger la tête (4 directions: avant, arrière, côtés).",
      problematique: "Douleur au cou",
      category: "Renforcement",
      dosage: "3 séries de 10 secondes par direction, quotidien",
      difficulty: "Débutant",
      safetyTips: "Pas de mouvement, pas de douleur",
      imagePrompt: "Person performing neck isometric exercise with hand resistance",
      videoKeywords: ["neck isometric", "cervical strengthening", "neck pain"],
      progression: "Augmenter durée de contraction",
      benefits: "Renforce les muscles du cou stabilisateurs",
    },
    {
      id: "neck-stretch",
      name: "Étirements du cou",
      description:
        "Inclinez lentement la tête vers les côtés, maintenez l'étirement 30 secondes.",
      problematique: "Douleur au cou",
      category: "Étirement",
      dosage: "3 séries de 30 secondes par direction, quotidien",
      difficulty: "Débutant",
      safetyTips: "Mouvements lents et doux",
      imagePrompt: "Person performing gentle neck stretching exercise",
      videoKeywords: ["neck stretches", "cervical mobility", "tension relief"],
      progression: "Augmenter amplitude légèrement",
      benefits: "Soulage la tension musculaire du cou",
    },
    {
      id: "chin-tucks",
      name: "Rentrage du menton",
      description:
        "Assis droit, rentrez le menton légèrement en gardant les yeux droits.",
      problematique: "Douleur au cou",
      category: "Renforcement",
      dosage: "3 séries de 12 répétitions, 3-4 fois par semaine",
      difficulty: "Débutant",
      contraindications: ["Instabilité atlanto-axiale", "Polyarthrite rhumatoïde non stabilisée cervicale"],
      precautions: ["Mouvement très subtil (pas flexion complète)", "Arrêter si vertige ou nausée"],
      evidence: {
        level: "Level 1B",
        effectiveness: 81,
        source: "Deep cervical flexor training, Gross 2015",
      },
      safetyTips: "Mouvement subtil, pas excessif",
      imagePrompt:
        "Person demonstrating chin tucks exercise for neck posture correction",
      videoKeywords: ["chin tucks", "neck posture", "deep neck flexors"],
      progression: "Ajouter résistance avec bande",
      benefits: "Améliore la posture et renforce les fléchisseurs profonds",
    },
  ],
};

/**
 * Fonction helper pour obtenir tous les exercices d'une problématique
 */
export function getExercisesByProblematique(problematique) {
  const keyMap = {
    lombalgie: "lumbar",
    "douleur au dos": "lumbar",
    "douleur au genou": "knee",
    genou: "knee",
    "douleur à l'épaule": "shoulder",
    épaule: "shoulder",
    "douleur à la hanche": "hip",
    hanche: "hip",
    "douleur à la cheville": "ankle",
    cheville: "ankle",
    "douleur au cou": "neck",
    cou: "neck",
  };

  const key = keyMap[problematique.toLowerCase()];
  return key ? exercisesDatabase[key] : [];
}

/**
 * Fonction helper pour obtenir toutes les problématiques
 */
export function getAllProblematiques() {
  return [
    "Lombalgie",
    "Douleur au genou",
    "Douleur à l'épaule",
    "Douleur à la hanche",
    "Douleur à la cheville",
    "Douleur au cou",
  ];
}

/**
 * Obtenir un exercice par ID
 */
export function getExerciseById(exerciseId) {
  for (const category of Object.values(exercisesDatabase)) {
    const exercise = category.find((ex) => ex.id === exerciseId);
    if (exercise) return exercise;
  }
  return null;
}

export default exercisesDatabase;
