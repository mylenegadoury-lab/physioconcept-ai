/**
 * FORMULAIRE DIAGNOSTIQUE LOMBALGIE
 * Basé sur : ODI (Oswestry Disability Index), STarT Back Tool, Treatment-Based Classification
 * Guidelines : NICE 2020, APTA 2021, Cochrane 2023
 */

export const lumbarFormQuestions = {
  // ============================================
  // SECTION 1: RED FLAGS (Dépistage urgence)
  // ============================================
  redFlags: {
    title: "Dépistage - Signes d'alarme",
    description: "Ces questions permettent d'identifier si une référence médicale urgente est nécessaire.",
    questions: [
      {
        id: "rf_cauda_equina",
        text: "Avez-vous une perte de contrôle de votre vessie ou de vos intestins?",
        type: "boolean",
        critical: true,
        weight: 5
      },
      {
        id: "rf_saddle_anesthesia",
        text: "Avez-vous une perte de sensation dans la région génitale ou anale (zone en selle)?",
        type: "boolean",
        critical: true,
        weight: 5
      },
      {
        id: "rf_progressive_weakness",
        text: "Avez-vous une faiblesse progressive dans les jambes (difficulté à marcher qui empire)?",
        type: "boolean",
        critical: true,
        weight: 4
      },
      {
        id: "rf_trauma",
        text: "Avez-vous eu un traumatisme majeur récent (chute importante, accident)?",
        type: "boolean",
        critical: true,
        weight: 3
      },
      {
        id: "rf_cancer_history",
        text: "Avez-vous des antécédents de cancer?",
        type: "boolean",
        critical: true,
        weight: 3
      },
      {
        id: "rf_unexplained_weight_loss",
        text: "Avez-vous perdu du poids sans raison apparente (>5kg en 3 mois)?",
        type: "boolean",
        critical: true,
        weight: 3
      },
      {
        id: "rf_fever",
        text: "Avez-vous de la fièvre ou des frissons?",
        type: "boolean",
        critical: true,
        weight: 3
      },
      {
        id: "rf_night_pain",
        text: "Avez-vous une douleur constante la nuit qui ne s'améliore avec aucune position?",
        type: "boolean",
        critical: false,
        weight: 2
      },
      {
        id: "rf_age",
        text: "Quel est votre âge?",
        type: "number",
        critical: false,
        riskFactors: [
          { condition: "age < 20", weight: 1, reason: "Risque pathologie développementale" },
          { condition: "age > 70", weight: 1, reason: "Risque fracture ostéoporotique" }
        ]
      }
    ],
    interpretation: {
      score_0_2: { level: "AUCUN", action: "Continuer évaluation", color: "green" },
      score_3_5: { level: "MODÉRÉ", action: "Surveillance, questionnaire médical détaillé", color: "yellow" },
      score_6_plus: { level: "CRITIQUE", action: "RÉFÉRENCE MÉDICALE URGENTE", color: "red" }
    }
  },

  // ============================================
  // SECTION 2: ODI - Oswestry Disability Index (version 2.1)
  // ============================================
  odi: {
    title: "Évaluation de l'impact fonctionnel (ODI)",
    description: "Questionnaire validé pour mesurer l'impact de la lombalgie sur vos activités quotidiennes.",
    citation: "Fairbank JC, Pynsent PB. The Oswestry Disability Index. Spine 2000;25(22):2940-53.",
    questions: [
      {
        id: "odi_1_pain_intensity",
        text: "Intensité de la douleur",
        type: "scale",
        options: [
          { value: 0, label: "Je n'ai pas de douleur en ce moment" },
          { value: 1, label: "La douleur est très légère en ce moment" },
          { value: 2, label: "La douleur est modérée en ce moment" },
          { value: 3, label: "La douleur est assez importante en ce moment" },
          { value: 4, label: "La douleur est très importante en ce moment" },
          { value: 5, label: "La douleur est la pire imaginable en ce moment" }
        ]
      },
      {
        id: "odi_2_personal_care",
        text: "Soins personnels (se laver, s'habiller)",
        type: "scale",
        options: [
          { value: 0, label: "Je peux m'occuper de moi normalement sans causer de douleur supplémentaire" },
          { value: 1, label: "Je peux m'occuper de moi normalement mais cela cause une douleur supplémentaire" },
          { value: 2, label: "Prendre soin de moi est douloureux et je dois le faire lentement et avec précaution" },
          { value: 3, label: "J'ai besoin d'aide mais je peux faire la plupart de mes soins personnels" },
          { value: 4, label: "J'ai besoin d'aide chaque jour pour la plupart de mes soins personnels" },
          { value: 5, label: "Je ne peux pas m'habiller, me laver avec difficulté et reste au lit" }
        ]
      },
      {
        id: "odi_3_lifting",
        text: "Soulever des objets",
        type: "scale",
        options: [
          { value: 0, label: "Je peux soulever des objets lourds sans douleur supplémentaire" },
          { value: 1, label: "Je peux soulever des objets lourds mais cela provoque une douleur supplémentaire" },
          { value: 2, label: "La douleur m'empêche de soulever des objets lourds du sol, mais je peux les manipuler s'ils sont bien positionnés" },
          { value: 3, label: "La douleur m'empêche de soulever des objets lourds, mais je peux manipuler des objets légers à moyens s'ils sont bien positionnés" },
          { value: 4, label: "Je ne peux soulever ou porter que des objets très légers" },
          { value: 5, label: "Je ne peux rien soulever ou porter du tout" }
        ]
      },
      {
        id: "odi_4_walking",
        text: "Marche",
        type: "scale",
        options: [
          { value: 0, label: "La douleur ne m'empêche pas de marcher quelle que soit la distance" },
          { value: 1, label: "La douleur m'empêche de marcher plus de 1,6 km (1 mile)" },
          { value: 2, label: "La douleur m'empêche de marcher plus de 800 mètres (1/2 mile)" },
          { value: 3, label: "La douleur m'empêche de marcher plus de 400 mètres (1/4 mile)" },
          { value: 4, label: "Je ne peux marcher qu'avec une canne ou des béquilles" },
          { value: 5, label: "Je suis au lit la plupart du temps et dois ramper pour aller aux toilettes" }
        ]
      },
      {
        id: "odi_5_sitting",
        text: "Position assise",
        type: "scale",
        options: [
          { value: 0, label: "Je peux m'asseoir sur n'importe quelle chaise aussi longtemps que je veux" },
          { value: 1, label: "Je peux m'asseoir sur ma chaise favorite aussi longtemps que je veux" },
          { value: 2, label: "La douleur m'empêche de rester assis plus d'une heure" },
          { value: 3, label: "La douleur m'empêche de rester assis plus d'une demi-heure" },
          { value: 4, label: "La douleur m'empêche de rester assis plus de 10 minutes" },
          { value: 5, label: "La douleur m'empêche de m'asseoir du tout" }
        ]
      },
      {
        id: "odi_6_standing",
        text: "Position debout",
        type: "scale",
        options: [
          { value: 0, label: "Je peux rester debout aussi longtemps que je veux sans douleur supplémentaire" },
          { value: 1, label: "Je peux rester debout aussi longtemps que je veux mais cela augmente la douleur" },
          { value: 2, label: "La douleur m'empêche de rester debout plus d'une heure" },
          { value: 3, label: "La douleur m'empêche de rester debout plus d'une demi-heure" },
          { value: 4, label: "La douleur m'empêche de rester debout plus de 10 minutes" },
          { value: 5, label: "La douleur m'empêche de rester debout du tout" }
        ]
      },
      {
        id: "odi_7_sleeping",
        text: "Sommeil",
        type: "scale",
        options: [
          { value: 0, label: "Mon sommeil n'est jamais perturbé par la douleur" },
          { value: 1, label: "Mon sommeil est occasionnellement perturbé par la douleur" },
          { value: 2, label: "À cause de la douleur, je dors moins de 6 heures" },
          { value: 3, label: "À cause de la douleur, je dors moins de 4 heures" },
          { value: 4, label: "À cause de la douleur, je dors moins de 2 heures" },
          { value: 5, label: "La douleur m'empêche complètement de dormir" }
        ]
      },
      {
        id: "odi_8_social_life",
        text: "Vie sociale",
        type: "scale",
        options: [
          { value: 0, label: "Ma vie sociale est normale et ne me cause pas de douleur supplémentaire" },
          { value: 1, label: "Ma vie sociale est normale mais augmente le degré de douleur" },
          { value: 2, label: "La douleur n'a aucun effet significatif sur ma vie sociale sauf qu'elle limite mes activités plus énergiques comme le sport" },
          { value: 3, label: "La douleur a restreint ma vie sociale et je ne sors pas souvent" },
          { value: 4, label: "La douleur a restreint ma vie sociale à mon domicile" },
          { value: 5, label: "Je n'ai pratiquement pas de vie sociale à cause de la douleur" }
        ]
      },
      {
        id: "odi_9_traveling",
        text: "Voyager",
        type: "scale",
        options: [
          { value: 0, label: "Je peux voyager n'importe où sans douleur" },
          { value: 1, label: "Je peux voyager n'importe où mais cela augmente la douleur" },
          { value: 2, label: "La douleur est importante mais je peux supporter des voyages de plus de 2 heures" },
          { value: 3, label: "La douleur limite mes voyages à moins d'une heure" },
          { value: 4, label: "La douleur limite mes voyages aux trajets nécessaires de moins de 30 minutes" },
          { value: 5, label: "La douleur m'empêche de voyager sauf pour recevoir un traitement" }
        ]
      },
      {
        id: "odi_10_employment",
        text: "Travail/Tâches ménagères",
        type: "scale",
        options: [
          { value: 0, label: "Mon activité normale de travail/ménage ne cause pas de douleur" },
          { value: 1, label: "Mon activité normale de travail/ménage augmente la douleur mais je peux tout faire" },
          { value: 2, label: "Je peux faire la plupart de mon travail/ménage mais la douleur m'empêche de faire des activités plus physiques" },
          { value: 3, label: "La douleur m'empêche de faire autre chose que des tâches légères" },
          { value: 4, label: "La douleur m'empêche de faire même des tâches légères" },
          { value: 5, label: "La douleur m'empêche de faire tout type de travail" }
        ]
      }
    ],
    scoring: {
      formula: "(somme des scores / 50) * 100",
      interpretation: {
        "0-20": { level: "Minimal", disability: "Minimal disability", recommendation: "Programme auto-gestion, exercices" },
        "21-40": { level: "Modéré", disability: "Moderate disability", recommendation: "Physiothérapie active, exercices supervisés" },
        "41-60": { level: "Sévère", disability: "Severe disability", recommendation: "Physiothérapie intensive + approche multidisciplinaire" },
        "61-80": { level: "Incapacitant", disability: "Crippled", recommendation: "Évaluation complète, considérer interventions avancées" },
        "81-100": { level: "Alité", disability: "Bed-bound", recommendation: "Référence spécialisée urgente" }
      },
      mcid: 10 // Minimal Clinically Important Difference (points)
    }
  },

  // ============================================
  // SECTION 3: TREATMENT-BASED CLASSIFICATION (Delitto)
  // ============================================
  treatmentClassification: {
    title: "Classification pour le traitement",
    description: "Identification du sous-groupe de lombalgie pour orienter le traitement (Delitto et al., TBC)",
    questions: [
      {
        id: "tbc_duration",
        text: "Depuis combien de temps avez-vous cette douleur au dos?",
        type: "select",
        options: [
          { value: "acute", label: "Moins de 4 semaines", phase: "acute" },
          { value: "subacute", label: "4 à 12 semaines", phase: "subacute" },
          { value: "chronic", label: "Plus de 12 semaines", phase: "chronic" },
          { value: "recurrent", label: "Épisodes récurrents", phase: "recurrent" }
        ]
      },
      {
        id: "tbc_leg_pain",
        text: "Avez-vous de la douleur qui descend dans la jambe?",
        type: "select",
        options: [
          { value: "none", label: "Non, seulement dans le dos", radiculopathy: false },
          { value: "thigh", label: "Oui, jusqu'à la cuisse", radiculopathy: false },
          { value: "below_knee", label: "Oui, sous le genou", radiculopathy: true },
          { value: "foot", label: "Oui, jusqu'au pied", radiculopathy: true }
        ]
      },
      {
        id: "tbc_neurological",
        text: "Avez-vous des engourdissements, picotements ou faiblesse dans la jambe?",
        type: "boolean",
        weight: { true: "radiculopathy_likely", false: "mechanical" }
      },
      {
        id: "tbc_flexion_aggravating",
        text: "Qu'est-ce qui aggrave votre douleur? - Se pencher vers l'avant (flexion)",
        type: "scale_0_10",
        interpretation: { ">7": "flexion_intolerant", "<3": "flexion_tolerant" }
      },
      {
        id: "tbc_extension_aggravating",
        text: "Qu'est-ce qui aggrave votre douleur? - Se cambrer vers l'arrière (extension)",
        type: "scale_0_10",
        interpretation: { ">7": "extension_intolerant", "<3": "extension_tolerant" }
      },
      {
        id: "tbc_rotation_aggravating",
        text: "Qu'est-ce qui aggrave votre douleur? - Rotation/torsion du tronc",
        type: "scale_0_10",
        interpretation: { ">7": "rotation_sensitive", "<3": "rotation_tolerant" }
      },
      {
        id: "tbc_directional_preference",
        text: "Y a-t-il une position ou un mouvement qui soulage votre douleur?",
        type: "select",
        options: [
          { value: "extension", label: "Me cambrer vers l'arrière", mckenzie: "extension_preference" },
          { value: "flexion", label: "Me pencher vers l'avant", mckenzie: "flexion_preference" },
          { value: "lateral_shift", label: "Me décaler sur le côté", mckenzie: "lateral_shift" },
          { value: "none", label: "Aucune position ne soulage", mckenzie: "no_preference" }
        ]
      },
      {
        id: "tbc_instability_symptoms",
        text: "Avez-vous une sensation d'instabilité ou que votre dos va 'lâcher'?",
        type: "boolean",
        weight: { true: "stabilization_needed", false: "no_instability" }
      },
      {
        id: "tbc_morning_stiffness",
        text: "Avez-vous une raideur importante le matin (>30 minutes)?",
        type: "boolean",
        weight: { true: "mobility_focus", false: "normal" }
      }
    ],
    classification_algorithm: {
      manipulation: {
        criteria: [
          "duration < 16 days",
          "no symptoms distal to knee",
          "FABQ work subscale < 19",
          "≥1 hip IR >35°",
          "hypomobility lumbar"
        ],
        confidence: "4+ criteria = 95% success rate"
      },
      stabilization: {
        criteria: [
          "age < 40",
          "instability symptoms",
          "positive prone instability test",
          "aberrant movements"
        ],
        confidence: "Clinical reasoning"
      },
      specific_exercise: {
        criteria: [
          "directional preference identified",
          "centralization with repeated movements",
          "McKenzie derangement syndrome"
        ],
        confidence: "Directional preference = strong predictor"
      },
      traction: {
        criteria: [
          "signs nerve root compression",
          "peripheralization with extension",
          "positive crossed SLR"
        ],
        confidence: "Limited evidence"
      }
    }
  },

  // ============================================
  // SECTION 4: STarT BACK TOOL (Psychosocial Screening)
  // ============================================
  startBack: {
    title: "Évaluation des facteurs psychosociaux (STarT Back)",
    description: "Questionnaire validé pour stratifier le risque de chronicité et guider l'intensité du traitement.",
    citation: "Hill JC et al. A primary care back pain screening tool. Lancet 2011;377:2226-35.",
    questions: [
      {
        id: "sb_1_bothersomeness",
        text: "En pensant à la semaine passée, cochez si d'accord: Ma douleur au dos m'a gêné",
        type: "boolean",
        points: { agree: 1, disagree: 0 },
        subscale: "overall"
      },
      {
        id: "sb_2_shoulder_pain",
        text: "En pensant à la semaine passée, cochez si d'accord: J'ai aussi eu de la douleur dans l'épaule ou au cou",
        type: "boolean",
        points: { agree: 1, disagree: 0 },
        subscale: "overall"
      },
      {
        id: "sb_3_walking_carefully",
        text: "En pensant à la semaine passée, cochez si d'accord: Je n'ai marché que de courtes distances à cause de mon dos",
        type: "boolean",
        points: { agree: 1, disagree: 0 },
        subscale: "overall"
      },
      {
        id: "sb_4_dressing",
        text: "En pensant à la semaine passée, cochez si d'accord: À cause de mon dos, je me suis habillé plus lentement que d'habitude",
        type: "boolean",
        points: { agree: 1, disagree: 0 },
        subscale: "overall"
      },
      {
        id: "sb_5_not_safe",
        text: "En pensant à la semaine passée, cochez si d'accord: Ce n'est vraiment pas sécuritaire pour moi d'être physiquement actif",
        type: "boolean",
        points: { agree: 1, disagree: 0 },
        subscale: "psychosocial"
      },
      {
        id: "sb_6_worrying_thoughts",
        text: "En pensant à la semaine passée, cochez si d'accord: Des pensées inquiétantes me passent souvent par la tête",
        type: "boolean",
        points: { agree: 1, disagree: 0 },
        subscale: "psychosocial"
      },
      {
        id: "sb_7_terrible",
        text: "En pensant à la semaine passée, cochez si d'accord: Je sens que mon mal de dos est terrible et qu'il ne s'améliorera jamais",
        type: "boolean",
        points: { agree: 1, disagree: 0 },
        subscale: "psychosocial"
      },
      {
        id: "sb_8_not_enjoyable",
        text: "En pensant à la semaine passée, cochez si d'accord: En général, je n'ai pas pris autant de plaisir dans les choses que d'habitude",
        type: "boolean",
        points: { agree: 1, disagree: 0 },
        subscale: "psychosocial"
      },
      {
        id: "sb_9_bothersomeness_numeric",
        text: "Dans l'ensemble, à quel point votre mal de dos vous a-t-il gêné cette dernière semaine?",
        type: "scale_0_10",
        points: { ">=4": 1, "<4": 0 },
        subscale: "overall"
      }
    ],
    scoring: {
      overall_score: {
        range: "0-9 points",
        calculation: "Somme des 9 questions"
      },
      psychosocial_subscore: {
        range: "0-5 points",
        calculation: "Somme questions 5-9 seulement"
      },
      risk_stratification: {
        low_risk: {
          criteria: "Overall score ≤3",
          prevalence: "~50% patients",
          recommendation: "Minimal intervention: Conseil + information + auto-gestion",
          prognosis: "Excellent"
        },
        medium_risk: {
          criteria: "Overall score ≥4 ET psychosocial <4",
          prevalence: "~30% patients",
          recommendation: "Physiothérapie standard: Exercices + éducation + traitement manuel si indiqué",
          prognosis: "Bon"
        },
        high_risk: {
          criteria: "Overall score ≥4 ET psychosocial ≥4",
          prevalence: "~20% patients",
          recommendation: "Approche intensive: Physiothérapie + approche psychologique + considérer multidisciplinaire",
          prognosis: "Réservé - Risque chronicité élevé"
        }
      }
    }
  },

  // ============================================
  // SECTION 5: OBJECTIFS & ATTENTES
  // ============================================
  goals: {
    title: "Vos objectifs de traitement",
    description: "Définir des objectifs clairs et mesurables pour personnaliser votre programme.",
    questions: [
      {
        id: "goal_primary",
        text: "Quel est votre objectif principal?",
        type: "select_multiple",
        max_selections: 3,
        options: [
          { value: "pain_reduction", label: "Réduire la douleur", priority: "high" },
          { value: "increase_mobility", label: "Améliorer ma mobilité/flexibilité", priority: "medium" },
          { value: "increase_strength", label: "Renforcer mon dos", priority: "medium" },
          { value: "return_work", label: "Retourner au travail", priority: "high" },
          { value: "return_sport", label: "Retourner au sport", priority: "high" },
          { value: "daily_activities", label: "Faire mes activités quotidiennes sans douleur", priority: "high" },
          { value: "prevent_recurrence", label: "Prévenir les récidives", priority: "medium" },
          { value: "reduce_medication", label: "Réduire ma médication", priority: "medium" },
          { value: "improve_sleep", label: "Mieux dormir", priority: "medium" },
          { value: "reduce_fear", label: "Avoir moins peur de bouger", priority: "high" }
        ]
      },
      {
        id: "goal_specific_activity",
        text: "Y a-t-il une activité spécifique que vous voulez pouvoir faire à nouveau?",
        type: "text",
        placeholder: "Ex: Jouer avec mes enfants, jardiner, jouer au golf..."
      },
      {
        id: "goal_timeline",
        text: "Dans combien de temps aimeriez-vous atteindre votre objectif?",
        type: "select",
        options: [
          { value: "2_weeks", label: "2 semaines", realistic: "pain_reduction_only" },
          { value: "4_weeks", label: "4 semaines (1 mois)", realistic: "acute_conditions" },
          { value: "8_weeks", label: "8 semaines (2 mois)", realistic: "most_conditions" },
          { value: "12_weeks", label: "12 semaines (3 mois)", realistic: "chronic_conditions" },
          { value: "6_months", label: "6 mois", realistic: "complex_cases" }
        ]
      },
      {
        id: "goal_barriers",
        text: "Qu'est-ce qui pourrait vous empêcher de faire vos exercices régulièrement?",
        type: "select_multiple",
        options: [
          { value: "time", label: "Manque de temps", solution: "Programme court 10-15 min" },
          { value: "pain", label: "Peur que ça augmente ma douleur", solution: "Progression très graduelle + éducation" },
          { value: "motivation", label: "Difficulté à rester motivé", solution: "Objectifs courts + suivi régulier" },
          { value: "understanding", label: "Ne pas bien comprendre les exercices", solution: "Instructions détaillées + vidéos" },
          { value: "equipment", label: "Manque d'équipement", solution: "Exercices au poids du corps" },
          { value: "space", label: "Manque d'espace à la maison", solution: "Exercices nécessitant peu d'espace" },
          { value: "work", label: "Horaires de travail irréguliers", solution: "Flexibilité dans la routine" },
          { value: "none", label: "Aucun obstacle majeur", solution: "Programme standard" }
        ]
      }
    ]
  }
};

/**
 * ALGORITHME DE SÉLECTION D'EXERCICES
 * Basé sur les réponses du formulaire
 */
export const exerciseSelectionAlgorithm = {
  
  // Étape 1: Filtrage par tags de sécurité
  step1_safety_filter: (formData) => {
    const filters = {
      exclude_tags: [],
      phase: null,
      max_intensity: 10
    };
    
    // Red flags
    if (formData.redFlags.score >= 6) {
      return { error: "RÉFÉRENCE MÉDICALE URGENTE REQUISE" };
    }
    
    // Phase (acute/subacute/chronic)
    filters.phase = formData.treatmentClassification.duration;
    
    // Radiculopathy
    if (formData.treatmentClassification.leg_pain === 'below_knee') {
      filters.exclude_tags.push('high_compression');
      filters.max_intensity = 6;
    }
    
    // High psychosocial risk
    if (formData.startBack.risk === 'high_risk') {
      filters.exclude_tags.push('high_load');
      filters.max_intensity = 5;
      filters.require_tags = ['low_fear', 'gradual_progression'];
    }
    
    return filters;
  },
  
  // Étape 2: Sélection par pattern biomécanique
  step2_pattern_selection: (formData) => {
    const patterns = [];
    
    // Directional preference (McKenzie)
    if (formData.treatmentClassification.directional_preference === 'extension') {
      patterns.push('extension_bias');
      patterns.push('avoid_flexion');
    } else if (formData.treatmentClassification.directional_preference === 'flexion') {
      patterns.push('flexion_bias');
      patterns.push('avoid_extension');
    }
    
    // Movement intolerance
    if (formData.treatmentClassification.flexion_aggravating >= 7) {
      patterns.push('flexion_intolerant');
    }
    if (formData.treatmentClassification.extension_aggravating >= 7) {
      patterns.push('extension_intolerant');
    }
    if (formData.treatmentClassification.rotation_aggravating >= 7) {
      patterns.push('rotation_sensitive');
    }
    
    // Instability
    if (formData.treatmentClassification.instability_symptoms) {
      patterns.push('stabilization_focus');
    }
    
    return patterns;
  },
  
  // Étape 3: Priorisation par objectifs
  step3_goal_prioritization: (formData) => {
    const priorities = [];
    
    formData.goals.primary.forEach(goal => {
      switch(goal) {
        case 'pain_reduction':
          priorities.push({ mechanism: 'motor_control', weight: 10 });
          priorities.push({ mechanism: 'mobility', weight: 8 });
          break;
        case 'increase_strength':
          priorities.push({ mechanism: 'strengthening', weight: 10 });
          priorities.push({ mechanism: 'functional', weight: 8 });
          break;
        case 'return_sport':
          priorities.push({ mechanism: 'functional', weight: 10 });
          priorities.push({ mechanism: 'strengthening', weight: 9 });
          break;
        case 'reduce_fear':
          priorities.push({ mechanism: 'gradual_exposure', weight: 10 });
          priorities.push({ mechanism: 'motor_control', weight: 7 });
          break;
      }
    });
    
    return priorities;
  },
  
  // Étape 4: Requête database
  step4_database_query: async (filters, patterns, priorities, supabase) => {
    let query = supabase
      .from('exercises')
      .select('*')
      .eq('body_region', 'lumbar')
      .eq('status', 'active');
    
    // Apply filters
    if (filters.phase) {
      query = query.contains('tags', { phase: [filters.phase, 'all_phases'] });
    }
    
    if (filters.exclude_tags.length > 0) {
      // Logic to exclude
    }
    
    // Pattern matching
    if (patterns.length > 0) {
      query = query.contains('tags', { pattern: patterns });
    }
    
    const { data: exercises, error } = await query;
    
    // Score and rank exercises based on priorities
    const scored = exercises.map(ex => {
      let score = ex.effectiveness_score || 70;
      
      // Bonus for matching priorities
      priorities.forEach(p => {
        if (ex.tags?.mechanism?.includes(p.mechanism)) {
          score += p.weight;
        }
      });
      
      return { ...ex, selection_score: score };
    });
    
    // Sort and return top 8-12
    return scored
      .sort((a, b) => b.selection_score - a.selection_score)
      .slice(0, 12);
  }
};

export default lumbarFormQuestions;
