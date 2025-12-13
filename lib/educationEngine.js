/**
 * EDUCATION ENGINE
 * Génère du contenu éducatif hyper-personnalisé basé sur:
 * - Phénotype clinique
 * - Croyances/peurs identifiées
 * - Niveau de littératie en santé
 * - Facteurs psychosociaux
 * 
 * Basé sur: Pain Neuroscience Education (Moseley), Fear-Avoidance Model (Vlaeyen)
 */

/**
 * ANALYSE DES CROYANCES ET PEURS
 * Identifie les croyances dysfonctionnelles à adresser
 */
export function analyzeBeliefs(profile, clinicalAnalysis) {
  const beliefs = {
    identified: [],
    priority: [],
    educational_needs: []
  };
  
  // 1. STarT Back High = High psychosocial component
  if (profile.startBack === 'high' || profile.psychosocialScore >= 4) {
    beliefs.identified.push({
      belief: 'fear_avoidance',
      severity: 'high',
      indicators: ['STarT Back High', 'Psychosocial score elevated'],
      description: 'Peur du mouvement et évitement des activités'
    });
    
    beliefs.educational_needs.push('pain_neuroscience_education');
    beliefs.educational_needs.push('fear_avoidance_reduction');
    beliefs.priority.push('Démystifier la relation douleur-dommage');
  }
  
  // 2. Chronicité = Risque de catastrophisation
  if (profile.phase === 'chronic' && profile.odi > 40) {
    beliefs.identified.push({
      belief: 'catastrophizing',
      severity: 'high',
      indicators: ['Chronic pain', 'High disability'],
      description: 'Pensées catastrophiques sur la douleur'
    });
    
    beliefs.educational_needs.push('cognitive_reframing');
    beliefs.educational_needs.push('realistic_expectations');
    beliefs.priority.push('Établir pronostic réaliste et positif');
  }
  
  // 3. Récurrence = Croyance "dos fragile"
  if (profile.previousEpisodes >= 3) {
    beliefs.identified.push({
      belief: 'structural_vulnerability',
      severity: 'medium',
      indicators: ['Multiple recurrences'],
      description: 'Croyance que le dos est "fragile" ou "abîmé"'
    });
    
    beliefs.educational_needs.push('resilience_education');
    beliefs.educational_needs.push('tissue_healing_timeline');
    beliefs.priority.push('Renforcer confiance en la résilience du dos');
  }
  
  // 4. Onset traumatique = Peur de ré-blessure
  if (profile.onset === 'sudden') {
    beliefs.identified.push({
      belief: 'reinjury_fear',
      severity: 'medium',
      indicators: ['Traumatic onset'],
      description: 'Peur de se re-blesser avec mouvement'
    });
    
    beliefs.educational_needs.push('tissue_healing_education');
    beliefs.educational_needs.push('graded_exposure_rationale');
  }
  
  // 5. Radiculopathie = Peur du nerf "pincé"
  if (profile.neurologicalSigns?.slr === 'positive' || profile.legPain) {
    beliefs.identified.push({
      belief: 'nerve_damage_fear',
      severity: 'high',
      indicators: ['Radicular pain', 'Neurological signs'],
      description: 'Peur du "nerf coincé" ou dommage permanent'
    });
    
    beliefs.educational_needs.push('neurodynamics_education');
    beliefs.educational_needs.push('nerve_resilience');
    beliefs.priority.push('Expliquer neurodynamique et résilience neurale');
  }
  
  // 6. Occupation physique + douleur = Conflit travail-santé
  if (profile.occupation && isPhysicalOccupation(profile.occupation) && profile.odi > 40) {
    beliefs.identified.push({
      belief: 'work_threat',
      severity: 'high',
      indicators: ['Physical occupation', 'High disability'],
      description: 'Inquiétude sur capacité à continuer travail'
    });
    
    beliefs.educational_needs.push('work_capacity_education');
    beliefs.educational_needs.push('pacing_strategies');
    beliefs.educational_needs.push('ergonomic_adaptations');
    beliefs.priority.push('Plan de retour au travail progressif');
  }
  
  // 7. Âge > 60 = Croyances sur vieillissement
  if (profile.age >= 60) {
    beliefs.identified.push({
      belief: 'aging_attribution',
      severity: 'low',
      indicators: ['Age >60'],
      description: 'Attribution de la douleur au vieillissement normal'
    });
    
    beliefs.educational_needs.push('aging_vs_pathology');
    beliefs.educational_needs.push('active_aging_benefits');
  }
  
  return beliefs;
}

/**
 * GÉNÈRE CONTENU ÉDUCATIF PERSONNALISÉ
 * Adapté au phénotype + croyances + niveau de littératie
 */
export function generatePersonalizedEducation(profile, clinicalAnalysis, beliefs) {
  const education = {
    core_concepts: [],
    pain_science: {},
    functional_goals: {},
    self_management: {},
    red_flags_education: {},
    prognosis: {}
  };
  
  const phenotypeObj = clinicalAnalysis?.phenotype?.primaryPhenotype;
  const phenotype = phenotypeObj?.type; // Extract type string from phenotype object
  const capacity = clinicalAnalysis?.capacity;
  
  // ========================================
  // 1. PAIN NEUROSCIENCE EDUCATION
  // ========================================
  
  if (beliefs.educational_needs.includes('pain_neuroscience_education')) {
    education.pain_science = {
      title: '🧠 Comprendre votre douleur',
      
      key_concepts: [
        {
          concept: 'Douleur ≠ Dommage tissulaire',
          explanation: "La douleur est produite par votre cerveau comme signal de protection. Elle ne reflète PAS toujours l'état réel de vos tissus. Même après guérison des tissus (6-12 semaines), le système nerveux peut rester sensibilisé.",
          analogy: "Comme une alarme de maison trop sensible qui se déclenche au moindre mouvement - le système fonctionne, mais il est hypersensible.",
          evidence: "Moseley & Butler 2015: L'éducation sur la neurophysiologie de la douleur réduit la douleur et l'incapacité."
        },
        {
          concept: 'Votre dos est FORT et RÉSILIENT',
          explanation: `À ${profile.age} ans, votre colonne vertébrale a soutenu votre poids pendant des décennies. Les structures sont robustes. La douleur chronique n'indique PAS un dos "abîmé" ou "fragile".`,
          analogy: "Comme un pont qui a transporté des millions de voitures - la structure est conçue pour durer.",
          evidence: "Brinjikji et al. 2015 (NEJM): 80% des gens >50 ans ont des 'anomalies' à l'IRM SANS douleur."
        },
        {
          concept: 'Le mouvement est un traitement, pas un danger',
          explanation: `Dans votre cas (${phenotype}), le mouvement progressif est essentiel pour recalibrer votre système nerveux et renforcer vos tissus. L'évitement prolonge la douleur.`,
          analogy: "Comme remettre la cheville après une entorse - immobiliser longtemps affaiblit, bouger progressivement renforce.",
          evidence: "Cochrane 2023: L'exercice thérapeutique est le traitement #1 evidence-based pour lombalgie."
        }
      ],
      
      fear_avoidance_specific: profile.startBack === 'high' ? {
        message: "Votre questionnaire indique une composante psychosociale importante (STarT Back: High). Cela signifie que vos croyances et peurs sur la douleur jouent un rôle significatif.",
        action: "Nous allons utiliser une approche d'exposition graduelle - augmenter progressivement les activités que vous évitez actuellement, en démontrant que le mouvement est sûr.",
        timeline: "Attendez-vous à des progrès graduels sur 8-12 semaines. Chaque activité réussie renforce votre confiance et recalibre votre système nerveux."
      } : null,
      
      chronic_pain_specific: profile.phase === 'chronic' ? {
        message: "Après 3+ mois, votre douleur est considérée chronique. Cela change la façon dont nous l'abordons.",
        neuroplasticity: "Votre système nerveux s'est adapté et est devenu hypersensible. La BONNE NOUVELLE: la neuroplasticité fonctionne dans les deux sens - nous pouvons 'réentraîner' votre système avec l'exercice et l'éducation.",
        approach: "Notre focus: pas seulement réduire la douleur, mais améliorer votre fonction et votre confiance, même si la douleur persiste initialement."
      } : null
    };
  }
  
  // ========================================
  // 2. EDUCATION SPÉCIFIQUE AU PHÉNOTYPE
  // ========================================
  
  switch(phenotype) {
    case 'motor_control_deficit':
      education.phenotype_specific = {
        title: '🎯 Votre type de lombalgie: Déficit de contrôle moteur',
        explanation: "Vos muscles profonds du dos (transverse abdominal, multifidus) ne se contractent pas au bon moment ou avec la bonne intensité. C'est comme avoir des fondations instables.",
        why_exercises_work: "Les exercices de stabilisation réentraînent ces muscles à se contracter automatiquement et au bon moment. Comme réapprendre un mouvement sportif - répétition avec qualité.",
        timeline: "Phase 1 (2-4 semaines): Apprentissage du pattern moteur, faible charge. Phase 2 (4-8 semaines): Stabilisation avec charge. Phase 3 (8-12+ semaines): Intégration fonctionnelle.",
        key_point: "QUALITÉ > QUANTITÉ. Mieux vaut 5 répétitions parfaites que 20 compensées."
      };
      break;
      
    case 'directional_preference':
      const direction = profile.directionalPreference;
      education.phenotype_specific = {
        title: `🎯 Votre type de lombalgie: Préférence directionnelle (${direction})`,
        explanation: `Votre douleur s'améliore avec les mouvements en ${direction}. Cela suggère un pattern biomécanique spécifique (approche McKenzie).`,
        why_exercises_work: `Les exercices en ${direction} "centralisent" votre douleur (la rapprochent du centre du dos) et peuvent réduire une protrusion discale ou décompresser des structures irritées.`,
        progression: `Nous commençons avec ${direction} répétée, puis neutre, puis progressivement direction opposée une fois symptômes contrôlés.`,
        self_management: `Utilisez ${direction} comme "outil" pendant la journée quand douleur augmente. C'est votre "reset button".`
      };
      break;
      
    case 'neuropathic_component':
      education.phenotype_specific = {
        title: '🎯 Votre type de lombalgie: Composante neuropathique',
        explanation: "Votre douleur à la jambe et vos signes neurologiques suggèrent une irritation du nerf sciatique. Ce n'est PAS un 'nerf pincé' permanent.",
        nerve_education: "Les nerfs sont des structures MOBILES et ÉLASTIQUES. Ils glissent normalement de plusieurs centimètres pendant les mouvements. L'irritation cause une inflammation temporaire qui réduit cette mobilité.",
        why_exercises_work: "La mobilisation neurale douce restaure progressivement le glissement du nerf. Comme étirer une élastique raide - doucement, progressivement.",
        timeline: "Désensibilisation neurale: 2-4 semaines. Restauration mobilité: 4-8 semaines. Renforcement: 8-12+ semaines.",
        pain_guidance: "Douleur légère pendant exercice OK (2-3/10). Douleur qui persiste >1h après = trop. Symptômes doivent 'centraliser' (se rapprocher du dos).",
        reassurance: "90% des radiculopathies lombaires se résorbent sans chirurgie (Weber et al. 1983). Votre pronostic est excellent avec traitement conservateur."
      };
      break;
      
    case 'central_sensitization_risk':
      education.phenotype_specific = {
        title: '🎯 Votre profil: Sensibilisation centrale probable',
        explanation: "Votre questionnaire (STarT Back High) suggère que votre système nerveux est devenu hypersensible - comme un thermostat réglé trop bas. La douleur persiste même après guérison des tissus.",
        why_this_matters: "Cela explique pourquoi vous pouvez avoir beaucoup de douleur avec peu de dommage structurel, et pourquoi les traitements passifs (massage, etc.) n'ont pas fonctionné longtemps.",
        approach_different: "Notre approche est différente: nous n'essayons PAS de 'réparer' votre dos (il n'est pas cassé). Nous réentraînons votre système nerveux à être moins sensible.",
        graded_exposure: "Exposition graduelle: nous augmentons PROGRESSIVEMENT les activités que vous évitez, démontrant à votre cerveau qu'elles sont sûres. Chaque succès recalibre votre système.",
        pacing_critical: "PACING essentiel: éviter le cycle 'boom-bust' (trop un jour, rien le lendemain). Constance > Intensité.",
        timeline: "Progrès graduels sur 12-16 semaines. Les rechutes sont normales et font partie du processus d'apprentissage."
      };
      break;
      
    case 'deconditioning_syndrome':
      education.phenotype_specific = {
        title: '🎯 Votre profil: Syndrome de déconditionnement',
        explanation: `Votre douleur chronique + faible niveau d'activité (${profile.sportLevel}) + handicap modéré suggère un déconditionnement physique général plutôt qu'un problème structurel sévère.`,
        positive_news: "EXCELLENTE NOUVELLE: Votre pronostic est très favorable! Vous avez un grand potentiel d'amélioration avec reconditionnement progressif.",
        approach: "Notre approche: progressive overload (surcharge progressive). Comme un programme d'entraînement - augmenter graduellement la charge pour renforcer.",
        avoid_trap: "ÉVITEZ le piège de la 'fragilité'. Votre dos n'est pas fragile - il a juste besoin de retrouver sa condition. Excessive caution = prolongation du problème.",
        general_fitness: "Nous incluons conditionnement général (cardio, force globale) en plus d'exercices spécifiques. Fitness général = meilleure résilience.",
        timeline: "Progrès rapides possibles: 4-6 semaines pour gains initiaux, 12-16 semaines pour reconditionnement complet."
      };
      break;
      
    case 'non_specific':
    default:
      // Lombalgie non-spécifique ou phénotype non identifié
      education.phenotype_specific = {
        title: '🎯 Votre profil: Lombalgie non-spécifique',
        explanation: "Votre lombalgie ne correspond pas à un pattern biomécanique ou neurologique spécifique. C'est le cas le plus fréquent (85% des lombalgies).",
        positive_news: "EXCELLENTE NOUVELLE: Ce type de lombalgie répond très bien au traitement par exercice thérapeutique et éducation.",
        approach: "Approche équilibrée: mobilité + stabilisation + renforcement progressif. Nous adaptons selon votre réponse.",
        evidence: "Les exercices généraux (stretching, renforcement, stabilisation) sont aussi efficaces que des approches spécifiques pour ce type.",
        key_point: "Focus sur amélioration fonction et réduction peur du mouvement plutôt que sur 'correction' d'un problème structurel.",
        timeline: "Progrès attendus: 4-8 semaines pour amélioration significative, 12-16 semaines pour objectifs fonctionnels."
      };
      break;
  }
  
  // ========================================
  // 3. OBJECTIFS FONCTIONNELS
  // ========================================
  
  education.functional_goals = {
    title: '🎯 Vos objectifs fonctionnels',
    current_limitations: generateLimitationsList(profile, capacity),
    realistic_timeline: generateRealisticTimeline(profile, clinicalAnalysis),
    milestone_progression: generateMilestones(profile, capacity)
  };
  
  // ========================================
  // 4. AUTO-GESTION (SELF-MANAGEMENT)
  // ========================================
  
  education.self_management = {
    title: '🛠️ Stratégies d\'auto-gestion',
    
    pacing: {
      concept: 'Pacing (Dosage d\'activité)',
      why: "Éviter le cycle boom-bust qui aggrave la sensibilisation centrale.",
      how: [
        "Divisez les tâches en segments plus courts",
        `Pour ${profile.occupation || 'votre travail'}: alterner positions toutes les 20-30 min`,
        "Utilisez un timer pour rappels de pause",
        "Augmentez graduellement: Règle 10% (max 10% d'augmentation par semaine)"
      ]
    },
    
    flare_up_management: {
      concept: 'Gestion des poussées douloureuses',
      normal: "Les poussées sont NORMALES et attendues pendant récupération. Elles ne signifient PAS rechute ou dommage.",
      action_plan: [
        "1. Rassurance: rappel que c'est temporaire et normal",
        "2. Retour temporaire aux exercices de base (phase 1)",
        `3. Utilisez ${profile.directionalPreference ? profile.directionalPreference + ' movements' : 'mouvements qui soulagent'} comme reset`,
        "4. Reprenez progression graduelle après 2-3 jours",
        "5. Analysez le déclencheur pour ajuster pacing"
      ]
    },
    
    ergonomics: generateErgonomicAdvice(profile),
    
    lifestyle: {
      sleep: {
        importance: "Sommeil = temps de guérison et consolidation. Douleur chronique ET sommeil insuffisant = cercle vicieux.",
        target: "7-9 heures/nuit",
        tips: [
          "Position: côté avec oreiller entre genoux OU dos avec oreiller sous genoux",
          "Éviter ventre (extension excessive)",
          "Routine pré-sommeil: relaxation, éviter écrans"
        ]
      },
      
      activity: {
        importance: `Pour votre profil (${phenotype}), rester actif est crucial.`,
        target: profile.sportLevel === 'sedentary' ? 
          "150 min/semaine activité modérée (marche rapide, vélo) + exercices du programme" :
          "Maintenir activités actuelles + exercices du programme",
        low_impact_options: ["Marche", "Vélo", "Natation", "Yoga doux (après phase 1)"]
      },
      
      stress_management: profile.startBack === 'high' ? {
        importance: "Votre score STarT Back High indique stress/anxiété élevé. Le stress augmente la tension musculaire et la sensibilité à la douleur.",
        strategies: [
          "Respiration diaphragmatique: 5 min 2x/jour",
          "Relaxation musculaire progressive",
          "Mindfulness/méditation (apps: Calm, Headspace)",
          "Considérez soutien psychologique si stress persistant"
        ]
      } : null
    }
  };
  
  // ========================================
  // 5. RED FLAGS EDUCATION
  // ========================================
  
  education.red_flags_education = {
    title: '🚨 Signes d\'alerte (quand consulter en urgence)',
    reassurance: "Ces signes sont RARES mais importants à connaître.",
    emergency_signs: [
      "Perte de contrôle intestinal/vessie (nouveau)",
      "Engourdissement région génitale/périnée (selle)",
      "Faiblesse progressive des jambes (difficulté à marcher)",
      "Douleur thoracique ou essoufflement inexpliqué"
    ],
    see_doctor_soon: [
      "Douleur nocturne intense non-mécanique (réveille systématiquement)",
      "Perte de poids inexpliquée (>5kg en 1 mois)",
      "Fièvre persistante + douleur dos",
      "Historique de cancer + nouvelle douleur dos"
    ],
    normal_dont_worry: [
      "Douleur qui varie jour après jour (NORMAL)",
      "Douleur après exercice qui diminue en <2h (NORMAL - adaptation)",
      "Craquements/clics sans douleur (NORMAL - mouvement articulaire)",
      `Pour votre âge (${profile.age} ans): 'usure' à l'imagerie est NORMALE et sans lien avec douleur`
    ]
  };
  
  // ========================================
  // 6. PRONOSTIC PERSONNALISÉ
  // ========================================
  
  education.prognosis = generatePersonalizedPrognosis(profile, clinicalAnalysis);
  
  return education;
}

/**
 * HELPERS
 */

function isPhysicalOccupation(occupation) {
  const physical = ['ouvrier', 'construction', 'agriculteur', 'déménageur', 'infirmier', 'aide-soignant', 'mécanicien'];
  return physical.some(p => occupation.toLowerCase().includes(p));
}

function generateLimitationsList(profile, capacity) {
  const limitations = [];
  
  if (profile.aggravatingFactors) {
    profile.aggravatingFactors.forEach(factor => {
      switch(factor) {
        case 'prolonged_sitting':
          limitations.push("Position assise prolongée (>30 min) augmente douleur");
          break;
        case 'prolonged_standing':
          limitations.push("Position debout prolongée difficile");
          break;
        case 'lifting':
          limitations.push("Soulever des charges provoque douleur");
          break;
      }
    });
  }
  
  if (capacity?.level === 'severe_limitation') {
    limitations.push("Activités de la vie quotidienne significativement limitées");
    limitations.push("Difficulté avec tâches ménagères");
  }
  
  return limitations;
}

function generateRealisticTimeline(profile, clinicalAnalysis) {
  const capacity = clinicalAnalysis?.capacity?.level;
  const phenotype = clinicalAnalysis?.phenotype?.primaryPhenotype;
  
  let timeline = {
    phase1: {},
    phase2: {},
    phase3: {},
    maintenance: {}
  };
  
  if (profile.phase === 'acute') {
    timeline.phase1 = {
      duration: "1-2 semaines",
      goal: "Réduction symptômes aigus, apprentissage contrôle moteur",
      expected: "Douleur ↓ 30-50%, mobilité ↑"
    };
    timeline.phase2 = {
      duration: "3-6 semaines",
      goal: "Stabilisation, début renforcement",
      expected: "Retour activités légères, douleur ↓ 50-70%"
    };
    timeline.phase3 = {
      duration: "6-12 semaines",
      goal: "Reconditionnement, retour fonction complète",
      expected: "Douleur ↓ 70-90%, retour travail/sport"
    };
  } else if (profile.phase === 'chronic') {
    timeline.phase1 = {
      duration: "2-4 semaines",
      goal: "Établir pattern exercice, éducation neurophysiologie",
      expected: "Amélioration confiance, fonction ↑ 20-30%"
    };
    timeline.phase2 = {
      duration: "4-12 semaines",
      goal: "Reconditionnement progressif, désensibilisation",
      expected: "Fonction ↑ 40-60%, réduction peur mouvement"
    };
    timeline.phase3 = {
      duration: "12-24 semaines",
      goal: "Optimisation fonction, prévention récurrence",
      expected: "Objectifs fonctionnels atteints, douleur gérée"
    };
  }
  
  timeline.maintenance = {
    duration: "Continu (long-terme)",
    goal: "Prévention récurrence, maintien gains",
    frequency: "2-3x/semaine programme maintenance"
  };
  
  return timeline;
}

function generateMilestones(profile, capacity) {
  const milestones = [];
  
  // Milestones basés sur capacité
  if (capacity?.level === 'severe_limitation') {
    milestones.push(
      { week: 2, goal: "Réduction douleur nocturne, meilleur sommeil" },
      { week: 4, goal: "Capable de marcher 15-20 min sans aggravation" },
      { week: 8, goal: "Retour tâches ménagères légères" },
      { week: 12, goal: "ODI < 40 (handicap modéré)" }
    );
  } else if (capacity?.level === 'moderate_limitation') {
    milestones.push(
      { week: 2, goal: "Tolérance position assise/debout ↑ 50%" },
      { week: 4, goal: "Retour activités quotidiennes complètes" },
      { week: 8, goal: "Début activités loisirs/sport modifié" },
      { week: 12, goal: "ODI < 20 (handicap minimal)" }
    );
  } else {
    milestones.push(
      { week: 2, goal: "Retour sport récréatif modifié" },
      { week: 4, goal: "Performance ↑ 50% baseline" },
      { week: 8, goal: "Retour sport complet sans restriction" },
      { week: 12, goal: "Prévention: maintenance program établi" }
    );
  }
  
  return milestones;
}

function generateErgonomicAdvice(profile) {
  const advice = {
    workstation: null,
    lifting: null,
    driving: null
  };
  
  if (profile.occupation) {
    const occupation = profile.occupation.toLowerCase();
    
    if (occupation.includes('bureau') || occupation.includes('informatique')) {
      advice.workstation = {
        title: "Poste de travail (bureau)",
        setup: [
          "Écran hauteur yeux, distance bras tendu",
          "Clavier/souris au niveau coudes 90°",
          "Chaise: support lombaire, pieds à plat au sol",
          "Variez position: assis ↔ debout si possible"
        ],
        breaks: "Pause 2-3 min toutes les 30 min: marche, étirements légers"
      };
    }
    
    if (isPhysicalOccupation(profile.occupation)) {
      advice.lifting = {
        title: "Technique de levage sécuritaire",
        principles: [
          "Hip hinge: plier aux hanches, garder dos neutre (pas rond)",
          "Charge près du corps",
          "Contraction abdominale AVANT de lever",
          "Expirer pendant effort",
          "Pivotez avec les pieds, pas torsion du dos"
        ],
        load_limits: "Respectez limites: demandez aide pour charges >15-20kg durant phase 1-2"
      };
    }
  }
  
  if (profile.aggravatingFactors?.includes('driving') || profile.aggravatingFactors?.includes('prolonged_sitting')) {
    advice.driving = {
      title: "Conduite automobile",
      setup: [
        "Siège: support lombaire (rouleau ou serviette)",
        "Distance pédalier: genoux légèrement pliés",
        "Dossier: 100-110° (pas trop vertical)"
      ],
      breaks: "Pause toutes les 45-60 min: marche 2-3 min, étirements"
    };
  }
  
  return advice;
}

function generatePersonalizedPrognosis(profile, clinicalAnalysis) {
  const capacity = clinicalAnalysis?.capacity;
  const phenotypeObj = clinicalAnalysis?.phenotype?.primaryPhenotype;
  const phenotype = phenotypeObj?.type; // Extract type string
  
  let prognosis = {
    overall: '',
    positive_factors: [],
    challenges: [],
    success_rate: '',
    timeline: ''
  };
  
  // Facteurs positifs
  if (profile.age < 50) {
    prognosis.positive_factors.push("Âge <50 ans (récupération généralement plus rapide)");
  }
  
  if (profile.startBack === 'low') {
    prognosis.positive_factors.push("Faibles facteurs psychosociaux (STarT Back Low) - excellent pronostic");
  }
  
  if (profile.phase === 'acute' || profile.phase === 'subacute') {
    prognosis.positive_factors.push("Phase non-chronique - meilleur potentiel de résolution complète");
  }
  
  if (profile.sportLevel === 'regular' || profile.sportLevel === 'competitive') {
    prognosis.positive_factors.push("Niveau d'activité physique élevé - bonne condition de base");
  }
  
  if (profile.previousEpisodes === 0) {
    prognosis.positive_factors.push("Premier épisode - faible risque de chronicité");
  }
  
  // Challenges
  if (profile.startBack === 'high') {
    prognosis.challenges.push("Facteurs psychosociaux élevés - nécessite approche bio-psycho-sociale");
  }
  
  if (profile.phase === 'chronic' && profile.odi > 60) {
    prognosis.challenges.push("Chronicité + handicap sévère - récupération plus graduelle");
  }
  
  if (profile.previousEpisodes >= 3) {
    prognosis.challenges.push("Récurrence multiple - risque de nouvelles poussées (prévention critique)");
  }
  
  if (phenotype === 'central_sensitization_risk') {
    prognosis.challenges.push("Sensibilisation centrale - timeline plus long, progrès non-linéaires");
  }
  
  // Overall prognosis
  if (phenotype === 'motor_control_deficit' && profile.phase === 'acute') {
    prognosis.overall = "EXCELLENT pronostic avec traitement approprié. 80-90% des patients récupèrent fonction complète en 6-12 semaines.";
    prognosis.success_rate = "80-90% récupération complète";
    prognosis.timeline = "6-12 semaines pour fonction complète";
  } else if (phenotype === 'deconditioning_syndrome') {
    prognosis.overall = "TRÈS BON pronostic. Grand potentiel d'amélioration avec reconditionnement progressif.";
    prognosis.success_rate = "75-85% atteinte objectifs fonctionnels";
    prognosis.timeline = "12-16 semaines pour reconditionnement complet";
  } else if (phenotype === 'central_sensitization_risk') {
    prognosis.overall = "BON pronostic à long-terme avec approche biopsychosociale. Progrès graduels sur 3-6 mois.";
    prognosis.success_rate = "60-75% amélioration fonctionnelle significative";
    prognosis.timeline = "12-24 semaines, progrès non-linéaires";
  } else if (phenotype === 'neuropathic_component') {
    prognosis.overall = "BON pronostic. 90% des radiculopathies lombaires répondent au traitement conservateur.";
    prognosis.success_rate = "85-90% résolution sans chirurgie";
    prognosis.timeline = "8-16 semaines pour résolution symptômes radiculaires";
  } else {
    prognosis.overall = "BON pronostic avec traitement evidence-based approprié.";
    prognosis.success_rate = "70-80% amélioration significative";
    prognosis.timeline = "8-12 semaines pour amélioration majeure";
  }
  
  return prognosis;
}

/**
 * GÉNÈRE ÉDUCATION COMPLÈTE INTÉGRÉE
 * Point d'entrée principal
 */
export function generateComprehensiveEducation(profile, clinicalAnalysis) {
  console.log('\n📚 EDUCATION ENGINE - Generating personalized education\n');
  
  // Analyse croyances
  const beliefs = analyzeBeliefs(profile, clinicalAnalysis);
  console.log('   Beliefs identified:', beliefs.identified.length);
  console.log('   Educational needs:', beliefs.educational_needs.join(', '));
  
  // Génère contenu
  const education = generatePersonalizedEducation(profile, clinicalAnalysis, beliefs);
  
  console.log('✅ Comprehensive education generated\n');
  
  return {
    beliefs,
    education,
    generatedAt: new Date().toISOString()
  };
}
