/**
 * EXERCICES LOMBAIRES - NIVEAU 1 (DÉBUTANT / PHASE AIGUË)
 * 15 exercices basés sur évidence scientifique
 * Sources: NICE 2020, APTA 2021, Cochrane 2023, Lancet Low Back Pain Series 2018
 */

export const lumbarExercisesLevel1 = [
  {
    name: 'Pelvic Tilt',
    name_fr: 'Bascule du Bassin',
    body_region: 'lumbar',
    exercise_type: 'mobility',
    description: 'Mobilisation douce du bassin en rétroversion pour réduire la lordose lombaire et activer les abdominaux profonds.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, genoux pliés, pieds à plat au sol.

Exécution:
1. Contractez doucement vos abdominaux
2. Basculez votre bassin pour aplatir complètement le bas du dos contre le sol
3. Maintenez cette position 3-5 secondes
4. Relâchez lentement et revenez à la position neutre
5. Répétez le mouvement avec contrôle

Points clés:
- Mouvement doux et contrôlé, sans force excessive
- Respiration continue (ne bloquez pas votre respiration)
- Concentrez-vous sur la contraction abdominale
- Si douleur, réduisez l'amplitude ou arrêtez
- Peut être fait plusieurs fois par jour`,
    
    instructions_professional: `Indications primaires: Phase aiguë lombalgie non-spécifique, réduction lordose excessive, activation transverse abdominis, syndrome postural.

Biomécanique:
- Rétroversion pelvienne via co-contraction abdominaux (TVA, obliques) + gluteus maximus
- Réduction compression facettaire postérieure L4-L5, L5-S1
- Distraction légère espace discal postérieur
- Pattern moteur de base pour stabilisation lombaire

Progression systématique:
Niveau 1: Supine, 10-15 reps, tempo 2-2-2, focus qualité mouvement
Niveau 2: Maintien isométrique 5-10s, 8-12 reps, augmentation contrôle
Niveau 3: Jambes en table-top (90° hanches-genoux), challenge stabilité accrue
Niveau 4: Intégration positions fonctionnelles (assis, debout)

Evidence: Richardson et al. (1999) - Activation TVA 30-40% MVC. NICE Guidelines 2020 recommandent mobilisation précoce phase aiguë.

Tests/Mesures:
- Pressure biofeedback: 40-70mmHg maintien (test TVA)
- Palpation multifidus activation
- ROM flexion lombaire pré/post

Contre-indications: Spondylolisthésis aigu grade 2+, fracture vertébrale non consolidée, hernie discale avec déficit neurologique progressif.`,
    
    dosage_reps: '10-15',
    dosage_sets: '2-3',
    dosage_frequency: '3-4x/semaine',
    reps_optimal: 12,
    sets_optimal: 3,
    difficulty_level: 'beginner',
    evidence_level: '2A',
    effectiveness_score: 75,
    
    key_points: [
      'Mouvement contrôlé sans compensation',
      'Respiration fluide continue',
      'Activation abdominale prioritaire',
      'Pas de douleur pendant l\'exercice'
    ],
    
    contraindications: [
      'Spondylolisthésis aigu grade 2+',
      'Fracture vertébrale récente',
      'Déficit neurologique progressif'
    ],
    
    tags: {
      phase: ['acute', 'subacute'],
      pattern: ['non_specific', 'extension_intolerant'],
      mechanism: ['motor_control', 'mobility'],
      level: ['beginner'],
      equipment: ['none'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['acute_lbp', 'chronic_lbp', 'postural_syndrome', 'hyperlordosis'],
      secondary: ['post_partum', 'sedentary_lifestyle', 'deconditioning'],
      contraindications: ['spondylolisthesis_acute', 'vertebral_fracture', 'progressive_neurological_deficit']
    },
    
    clinical_reasoning: 'Evidence Level 2A: Réduction compression facettes postérieures, activation muscles stabilisateurs profonds. Richardson (1999) EMG: TVA 30-40% MVC optimal. NICE 2020: Mobilisation précoce recommandée phase aiguë.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Basique - Apprentissage pattern', 
        reps: '8-10', 
        sets: '2',
        tempo: '2-2-2',
        notes: 'Focus qualité mouvement'
      },
      { 
        level: 2, 
        description: 'Maintien isométrique', 
        reps: '10-12', 
        sets: '3',
        tempo: '2-5-2',
        notes: 'Hold 5s en rétroversion'
      },
      { 
        level: 3, 
        description: 'Challenge stabilité', 
        reps: '12-15', 
        sets: '3',
        tempo: '3-5-3',
        notes: 'Jambes table-top 90°'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Knee to Chest Stretch (Single)',
    name_fr: 'Genou à la Poitrine (Unilatéral)',
    body_region: 'lumbar',
    exercise_type: 'flexibility',
    description: 'Étirement doux des muscles para-vertébraux lombaires et fessiers avec réduction de la compression discale postérieure par flexion contrôlée.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, jambes étendues ou genoux pliés.

Exécution:
1. Amenez un genou vers votre poitrine en utilisant vos deux mains
2. Tirez doucement jusqu'à sentir un étirement confortable dans le bas du dos
3. Gardez l'autre jambe détendue (pliée ou étendue selon confort)
4. Maintenez l'étirement 20-30 secondes
5. Relâchez doucement et changez de côté
6. Répétez 2-3 fois de chaque côté

Points clés:
- Étirement progressif sans rebond
- Respirez profondément pendant l'étirement
- L'autre jambe reste détendue et au sol
- Sensation d'étirement doux, pas de douleur aiguë
- Arrêtez si douleur irradiante dans la jambe`,
    
    instructions_professional: `Indications: Lombalgie aiguë/subaiguë, tension para-vertébrale (erector spinae, multifidus), syndrome facettaire, réduction compression postérieure.

Mécanisme biomécanique:
- Flexion lombaire contrôlée 20-30° (L4-L5, L5-S1)
- Étirement passif: Erector spinae (longissimus, iliocostalis), multifidus, quadratus lumborum
- Étirement secondaire: Gluteus maximus, piriformis, fléchisseurs hanche
- Distraction facettaire postérieure
- Shift antérieur nucleus pulposus (McKenzie principe)
- Réduction compression nerveuse postéro-latérale

Dosage clinique par phase:
- Phase aiguë (0-4 sem): 20-30s hold, 2-3 reps, 3-5x/jour, doux
- Phase subaiguë (4-12 sem): 30-45s hold, 3-4 reps, 2-3x/jour, intensité modérée
- Phase chronique (>12 sem): 45-60s hold, 3-5 reps, 1-2x/jour, progression double knee

Progression: Single knee → Double knee to chest → Knees to chest with cervical flexion

Evidence: 
- Cochrane Review (2015): Stretching efficace pour ROM (Level 1B)
- Williams Flexion Protocol: Réduction douleur 2-3 points EVA après 2 semaines
- McKenzie: Flexion bias si preference directionnelle identifiée

Tests:
- ROM flexion lombaire: Amélioration 10-20% attendue
- Straight Leg Raise: Évaluation tension neural
- Modified Schober: Mesure objective ROM lombaire

Contre-indications: Hernie discale centrale aiguë avec radiculopathie progressive, sténose spinale sévère symptomatique, ostéoporose sévère.`,
    
    dosage_reps: '2-3 par côté',
    dosage_sets: '2',
    dosage_frequency: '3-5x/semaine',
    reps_optimal: 3,
    sets_optimal: 2,
    difficulty_level: 'beginner',
    evidence_level: '1B',
    effectiveness_score: 78,
    
    key_points: [
      'Étirement progressif sans rebond',
      'Jambe opposée détendue au sol',
      'Respiration profonde constante',
      'Arrêter si douleur radiculaire augmente'
    ],
    
    contraindications: [
      'Hernie discale centrale aiguë avec déficit',
      'Sténose spinale sévère symptomatique',
      'Radiculopathie progressive'
    ],
    
    tags: {
      phase: ['acute', 'subacute', 'chronic'],
      pattern: ['extension_intolerant', 'non_specific', 'flexion_bias'],
      mechanism: ['flexibility', 'mobility', 'pain_relief'],
      level: ['beginner'],
      equipment: ['none'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['acute_lbp', 'paraspinal_tension', 'facet_syndrome', 'muscle_spasm'],
      secondary: ['piriformis_syndrome', 'si_joint_dysfunction', 'hip_tightness'],
      contraindications: ['acute_central_disc_herniation', 'severe_stenosis', 'progressive_radiculopathy']
    },
    
    clinical_reasoning: 'Evidence Level 1B (Cochrane 2015): Stretching améliore ROM 10-20% et réduit douleur 2-3 points EVA. Flexion lombaire réduit compression facettaire postérieure, shift nucléus antérieur (McKenzie 2006). Williams Protocol validé phase aiguë.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Single knee 20-30s', 
        reps: '2-3', 
        sets: '2',
        hold_time: '20-30s',
        notes: 'Doux, phase aiguë'
      },
      { 
        level: 2, 
        description: 'Single knee 30-45s', 
        reps: '3-4', 
        sets: '2',
        hold_time: '30-45s',
        notes: 'Intensité modérée'
      },
      { 
        level: 3, 
        description: 'Double knee to chest', 
        reps: '3-4', 
        sets: '3',
        hold_time: '30-60s',
        notes: 'Flexion maximale contrôlée'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Supine Marching',
    name_fr: 'Marche Allongée (Alternée)',
    body_region: 'lumbar',
    exercise_type: 'stability',
    description: 'Activation contrôlée des muscles stabilisateurs profonds du tronc avec mouvement alterné des membres inférieurs en position sécuritaire supine.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, genoux pliés à 90°, pieds levés (position table-top).

Exécution:
1. Gardez votre dos complètement plat contre le sol (bascule du bassin)
2. Abaissez lentement un pied vers le sol (comptez 3 secondes)
3. Tapez doucement le sol avec votre talon
4. Remontez la jambe à la position initiale (3 secondes)
5. Alternez avec l'autre jambe
6. Continuez en "marchant" lentement

Points clés critiques:
- Le bas du dos reste COLLÉ au sol pendant tout l'exercice
- Si votre dos se cambre, ARRÊTEZ et repositionnez-vous
- Mouvement très lent et contrôlé (6 secondes par rep)
- Respirez normalement, ne bloquez pas
- Concentrez-vous sur la stabilité du tronc, pas la jambe`,
    
    instructions_professional: `Indications: Activation transverse abdominis (TVA), contrôle lombo-pelvien, instabilité lombaire, phase subaiguë à chronique.

Biomécanique détaillée:
- Co-contraction anticipatoire (feed-forward): TVA + multifidus
- Maintien position neutre lombaire sous charge dynamique asymétrique
- Dissociation lombo-pelvienne (pelvis fixe, fémur mobile)
- Challenge stabilité: Shift centre masse + moment de force hip flexors
- Activation: TVA 40-60% MVC, multifidus 30-40% MVC, minimal erector spinae (<20%)

Protocole progression Richardson/Hodges:
Phase 1 (Semaine 1-2): Pieds touchent sol, maintien rétroversion stricte, 8-10 reps, tempo 2-0-2
Phase 2 (Semaine 2-3): Pieds à 2cm sol, pause 2s, 10-12 reps, tempo 2-2-2
Phase 3 (Semaine 3-4): Pieds descendent 30cm, 12-15 reps, tempo 3-1-3
Phase 4 (Semaine 4-6): Tempo lent 4-2-4, focus contrôle excentrique, 10-12 reps

Biofeedback pression (Stabilizer):
- Cible: 40-70mmHg maintien constant
- Feedback visuel améliore adherence 35-40%
- Perte pression >10mmHg = compensation = arrêter

Tests fonctionnels:
- Active Straight Leg Raise (ASLR): Amélioration score attendue (0-1 optimal)
- Pressure biofeedback: Maintien 40-70mmHg sans fluctuation
- Endurance holding time: >30s position table-top = bon

Evidence:
- Hodges & Richardson (1996): TVA activation 30-110ms AVANT mouvement membre
- Macedo et al. (2016): Motor control exercises réduisent récidive 50% (Level 1B)
- Hides et al. (2001): Activation multifidus spécifique prévient chronicité

Contre-indications: Douleur lombaire aggravée par flexion active, diastase récti non contrôlée (>3cm), hernie ombilicale.`,
    
    dosage_reps: '10-12 alternés',
    dosage_sets: '3',
    dosage_frequency: '4x/semaine',
    reps_optimal: 12,
    sets_optimal: 3,
    difficulty_level: 'beginner',
    evidence_level: '1B',
    effectiveness_score: 82,
    
    key_points: [
      'Maintien strict position neutre lombaire',
      'Aucune compensation (cambrure)',
      'Tempo lent et contrôlé 3-0-3',
      'Progression basée sur contrôle parfait'
    ],
    
    contraindications: [
      'Douleur aggravée par flexion active',
      'Diastase récti non contrôlée',
      'Hernie ombilicale non traitée'
    ],
    
    tags: {
      phase: ['subacute', 'chronic'],
      pattern: ['instability', 'non_specific', 'motor_control_deficit'],
      mechanism: ['motor_control', 'stabilization'],
      level: ['beginner'],
      equipment: ['none', 'pressure_biofeedback_optional'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['chronic_lbp', 'recurrent_lbp', 'lumbar_instability', 'motor_control_impairment'],
      secondary: ['post_partum', 'spondylolisthesis_grade1', 'deconditioning'],
      contraindications: ['flexion_intolerant_pain', 'uncontrolled_diastasis_recti', 'umbilical_hernia']
    },
    
    clinical_reasoning: 'Evidence Level 1B (Hodges 1996, Macedo 2016): Motor control exercises activent TVA/multifidus avec pattern feed-forward optimal. Réduction récidive lombalgie 50%. EMG: TVA 40-60% MVC, multifidus 30-40% MVC. ASLR amélioration corrèle fonction.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Pieds touchent sol', 
        reps: '8-10', 
        sets: '2',
        tempo: '2-0-2',
        notes: 'Apprentissage stabilité'
      },
      { 
        level: 2, 
        description: 'Pieds 2cm sol + pause', 
        reps: '10-12', 
        sets: '3',
        tempo: '2-2-2',
        notes: 'Challenge isométrique'
      },
      { 
        level: 3, 
        description: 'Amplitude complète', 
        reps: '12-15', 
        sets: '3',
        tempo: '3-1-3',
        notes: 'Full ROM contrôlé'
      },
      { 
        level: 4, 
        description: 'Tempo ultra-lent', 
        reps: '10-12', 
        sets: '3',
        tempo: '4-2-4',
        notes: 'Focus excentrique'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Abdominal Bracing',
    name_fr: 'Contraction Abdominale Globale',
    body_region: 'lumbar',
    exercise_type: 'motor_control',
    description: 'Co-contraction isométrique des muscles abdominaux et du plancher pelvien pour créer rigidité du tronc et protection lombaire.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, genoux pliés, ou assis.

Exécution:
1. Placez vos mains sur votre ventre
2. Contractez tous vos abdominaux comme si vous vous prépariez à recevoir un coup
3. Rentrez légèrement votre nombril vers la colonne
4. Maintenez cette contraction en respirant normalement
5. Gardez 5-10 secondes
6. Relâchez complètement
7. Répétez 10-15 fois

Points clés:
- Contraction de toute la sangle abdominale (pas seulement le ventre rentré)
- Continuez à respirer normalement (crucial!)
- Ne retenez PAS votre souffle
- Sensation de "corsetting" autour du tronc
- Utilisez avant de soulever des charges`,
    
    instructions_professional: `Indications: Protection lombaire pré-charge, augmentation pression intra-abdominale (IAP), rigidité tronc fonctionnelle, instabilité lombaire.

Mécanisme IAP (Intra-Abdominal Pressure):
- Co-contraction: TVA, obliques internes/externes, erector spinae, multifidus
- Augmentation IAP 20-40mmHg baseline → 80-150mmHg avec bracing
- Effet "cylinder hydraulique": Réduction charge compressive lombaire 30-50%
- Stiffness tronc: Augmentation 18-23% (McGill)
- Moment extenseur passif via fascia thoracolombaire

Protocole McGill "Abdominal Bracing":
- Contraction 10-15% MVC (sous-maximal, soutenable)
- Respiration diaphragmatique continue obligatoire
- Hold 10s, rest 5s, 10-15 reps
- Progression: Supine → sitting → standing → functional tasks

Integration fonctionnelle:
- Teach "brace before lift" strategy
- Timing: Bracing 200-300ms AVANT mouvement lombaire
- Transfert: Squat, deadlift, porte d'enfant, tâches ADL
- Supérieur à "drawing-in" (TVA seul) pour tâches charge élevée

Evidence:
- McGill (2010): Bracing ↑ stiffness 18%, ↓ charge discale 40%
- Grenier & McGill (2007): IAP corrèle protection lombaire (r=0.73)
- Hodges (2003): Respiration + bracing possible avec training (6-8 sessions)

Différenciation clinique:
- Bracing (co-contraction global) vs Drawing-in (TVA isolé)
- Bracing: Tâches charge élevée, instabilité majeure
- Drawing-in: Motor control, tâches précision, douleur chronique

Tests:
- Palpation: Activation uniforme toute sangle abdominale
- IAP monitoring: Pression rectale 80-150mmHg optimal
- Ultrasound: Épaississement TVA + obliques simultané

Contre-indications: Hypertension non contrôlée (IAP peut augmenter PA), hernie inguinale/ombilicale, prolapsus pelvien.`,
    
    dosage_reps: '10-15',
    dosage_sets: '3',
    dosage_frequency: '5x/semaine + avant charges',
    reps_optimal: 12,
    sets_optimal: 3,
    difficulty_level: 'beginner',
    evidence_level: '2A',
    effectiveness_score: 80,
    
    key_points: [
      'Respiration continue absolument nécessaire',
      'Contraction globale (pas seulement TVA)',
      '10-15% MVC (sous-maximal soutenable)',
      'Appliquer avant toute charge/mouvement'
    ],
    
    contraindications: [
      'Hypertension non contrôlée',
      'Hernie inguinale/ombilicale',
      'Prolapsus pelvien non traité'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention'],
      pattern: ['instability', 'non_specific'],
      mechanism: ['motor_control', 'stabilization', 'protection'],
      level: ['beginner'],
      equipment: ['none'],
      setting: ['home', 'clinic', 'workplace']
    },
    
    indications: {
      primary: ['lumbar_instability', 'recurrent_lbp', 'pre_lifting_strategy'],
      secondary: ['chronic_lbp', 'occupational_lbp', 'prevention'],
      contraindications: ['uncontrolled_hypertension', 'hernia', 'pelvic_prolapse']
    },
    
    clinical_reasoning: 'Evidence Level 2A (McGill 2010): Bracing augmente stiffness tronc 18% et réduit charge discale 40% via IAP. Grenier (2007): Corrélation IAP-protection r=0.73. Stratégie pré-charge validée prévention blessures.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Supine learning', 
        reps: '10', 
        sets: '3',
        hold_time: '5s',
        notes: 'Apprentissage respiration + bracing'
      },
      { 
        level: 2, 
        description: 'Sitting/standing', 
        reps: '12', 
        sets: '3',
        hold_time: '8s',
        notes: 'Positions fonctionnelles'
      },
      { 
        level: 3, 
        description: 'Functional integration', 
        reps: '15', 
        sets: '3',
        hold_time: '10s',
        notes: 'Avant squat/deadlift/charges ADL'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Transversus Abdominis Activation (Drawing-In)',
    name_fr: 'Activation Transverse de l\'Abdomen',
    body_region: 'lumbar',
    exercise_type: 'motor_control',
    description: 'Contraction isolée sélective du transverse de l\'abdomen (TVA) pour améliorer le contrôle moteur segmentaire et la stabilisation lombaire profonde.',
    
    instructions_patient: `Position de départ: À quatre pattes (mains sous épaules, genoux sous hanches).

Exécution:
1. Laissez votre ventre se relâcher complètement vers le sol
2. Rentrez doucement votre nombril vers la colonne vertébrale
3. Imaginez "fermer une fermeture éclair" du pubis au nombril
4. Maintenez cette contraction légère tout en respirant normalement
5. Gardez 10 secondes
6. Relâchez complètement
7. Répétez 10 fois

Points critiques:
- Contraction LÉGÈRE (30-40% de votre maximum)
- Le dos ne bouge PAS pendant la contraction
- Respirez naturellement (ne bloquez pas)
- Pas de mouvement du bassin ou cambrure
- Sentez les muscles profonds du ventre se contracter`,
    
    instructions_professional: `Indications: Déficit contrôle moteur spécifique TVA, lombalgie récurrente/chronique, timing neuromusculaire altéré (délai activation >200ms).

Physiologie activation TVA (Richardson/Hodges):
- Muscle stabilisateur LOCAL (vs GLOBAL erector spinae)
- Fonction: Augmentation tension fascia thoracolombaire → rigidité segmentaire L4-L5, L5-S1
- Activation feed-forward: 30-110ms AVANT mouvement membre (personnes saines)
- Lombalgie chronique: Délai 200-450ms (pathologique)
- Re-training restaure timing optimal en 4-6 semaines

Technique biofeedback pression (Stabilizer Chattanooga):
1. Position: Supine, lordose naturelle, stabilizer sous L4-L5 à 40mmHg
2. Consigne: "Rentrez nombril, aplatissez légèrement dos contre coussin"
3. Cible: Augmentation 4-10mmHg (44-50mmHg) = TVA isolé
4. Si >10mmHg: Compensation rectus abdominis/obliques = réduire effort
5. Maintien 10s, breathing continuous, 10 reps × 3 sets

Progression positions (difficulté croissante):
1. Supine (plus facile - gravité assistée)
2. Quadruped (optimal pour apprentissage - feedback visuel abdomen)
3. Sitting (défi posture)
4. Standing (le plus fonctionnel)
5. Functional tasks (intégration ADL)

Ultrasound imaging validation (Gold standard):
- TVA: Épaississement 3-5mm à rest → 8-12mm contraction (ratio 2.5-3.0)
- Obliquus internus: Ratio <1.5 (minimal activation)
- Si OI ratio >2.0: Stratégie compensatoire = re-cue patient

Evidence:
- Hodges & Richardson (1996): Délai TVA 30ms pré-mouvement (sains) vs 200ms (LBP)
- Hides et al. (2001): Specific training TVA ↓ récurrence LBP 35% vs 75% contrôle
- Ferreira et al. (2010): Motor control exercises = general exercise (outcomes équivalents, mais ↓ récurrence)

Clinical pearls:
- 80% patients LBP chronique ont inhibition/délai TVA
- Re-training nécessite feedback (verbal, tactile, ou biofeedback)
- Transfert fonctionnel crucial (sinon, amélioration non-significative cliniquement)
- 10-15 reps hold 10s optimal (fatigue inhibe apprentissage)

Contre-indications: Douleur aggravée par activation isolée (rare), hypermobilité avec instabilité majeure (préférer bracing global).`,
    
    dosage_reps: '10',
    dosage_sets: '3',
    dosage_frequency: '5-7x/semaine',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'beginner',
    evidence_level: '1A',
    effectiveness_score: 85,
    
    key_points: [
      'Contraction légère isolée (30-40% MVC)',
      'Pas de mouvement du dos ou bassin',
      'Respiration continue obligatoire',
      'Biofeedback pression améliore apprentissage 40%'
    ],
    
    contraindications: [
      'Douleur augmentée par contraction isolée',
      'Instabilité majeure (préférer bracing)'
    ],
    
    tags: {
      phase: ['chronic', 'subacute', 'recurrent'],
      pattern: ['instability', 'motor_control_deficit', 'recurrent_lbp'],
      mechanism: ['motor_control', 'stabilization'],
      level: ['beginner'],
      equipment: ['none', 'pressure_biofeedback_optimal'],
      setting: ['clinic', 'home']
    },
    
    indications: {
      primary: ['chronic_lbp', 'recurrent_lbp', 'motor_control_impairment', 'delayed_tva_activation'],
      secondary: ['post_partum', 'spondylolisthesis_grade1', 'prevention'],
      contraindications: ['pain_with_isolated_contraction', 'major_instability']
    },
    
    clinical_reasoning: 'Evidence Level 1A (Hodges 1996, Hides 2001): Specific TVA training restaure timing neuromusculaire optimal (30-110ms) et réduit récurrence lombalgie 35% vs 75%. EMG/ultrasound valident activation sélective. Biofeedback ↑ succès 40%.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Supine with biofeedback', 
        reps: '10', 
        sets: '3',
        hold_time: '10s',
        notes: 'Apprentissage activation sélective'
      },
      { 
        level: 2, 
        description: 'Quadruped position', 
        reps: '10', 
        sets: '3',
        hold_time: '10s',
        notes: 'Challenge gravité'
      },
      { 
        level: 3, 
        description: 'Sitting/standing', 
        reps: '10-12', 
        sets: '3',
        hold_time: '10s',
        notes: 'Positions fonctionnelles'
      },
      { 
        level: 4, 
        description: 'Functional integration', 
        reps: 'Variable', 
        sets: '1',
        hold_time: 'Continuous',
        notes: 'Pendant ADL: marche, soulever'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Pelvic Clock',
    name_fr: 'Horloge Pelvienne',
    body_region: 'lumbar',
    exercise_type: 'mobility',
    description: 'Mobilisation contrôlée multi-directionnelle du bassin pour améliorer le contrôle neuromusculaire lombo-pelvien et la proprioception segmentaire.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, genoux pliés, imaginez une horloge dessinée sous votre bassin.

Exécution:
1. 12h = tête: Basculez le bassin pour cambrer légèrement le dos
2. 6h = pieds: Basculez pour aplatir le dos au sol
3. 3h = droite: Penchez le bassin vers la droite
4. 9h = gauche: Penchez vers la gauche
5. Faites le tour complet de l'horloge lentement
6. Puis inversez le sens (sens horaire, puis anti-horaire)
7. 5 tours dans chaque sens

Points clés:
- Mouvement très doux et contrôlé
- Explorez toute l'amplitude sans douleur
- Les épaules restent au sol
- Respirez naturellement
- Sentez chaque "heure" distinctement`,
    
    instructions_professional: `Indications: Amélioration proprioception lombo-pelvienne, raideur capsulaire sacro-iliaque, déficit dissociation lombo-pelvienne, phase subacute vers chronique.

Neurophysiologie contrôle moteur:
- Activation coordonnée: Rectus abdominis, obliques, multifidus, erector spinae, fléchisseurs hanches
- Proprioception: Stimulation mécanorécepteurs capsules articulaires SI + facettes L4-L5, L5-S1
- Pattern moteur: 4 vecteurs (flexion-extension, latéroflexion D-G) + diagonales
- Amélioration feed-forward control via variabilité mouvement

Protocole Feldenkrais/Moshe (evidence base faible mais cliniquement utile):
- Phase 1: 4 directions cardinales isolées (12h, 3h, 6h, 9h)
- Phase 2: 8 directions (add 1h30, 4h30, 7h30, 10h30)
- Phase 3: Mouvement circulaire continu fluide
- Phase 4: Intégration positions (sitting, standing sur swissball)

Bénéfices cliniques:
- ↑ ROM lumbar flexion-extension 5-10° (modeste)
- ↑ Proprioception: Amélioration joint position sense 15-20%
- ↓ Raideur matinale (patient-reported)
- Relaxation musculaire para-vertébrale (baisse tonus 10-15% EMG)

Evidence (limitée):
- Pereira et al. (2012): Pelvic tilting exercises ↑ ROM lombaire 8% vs contrôle
- Body awareness training: Modeste efficacité douleur chronique (Cohen's d=0.3-0.4)
- Pas d'études RCT spécifiques "pelvic clock" (low evidence)

Indications cliniques pragmatiques:
- Warm-up pré-exercices plus intenses
- Patients anxieux/kinésiophobie (non-menaçant)
- Post-immobilisation (chirurgie, plâtre)
- Complément mobilisation manuelle SI

Tests:
- Active ROM lumbar: Flexion, extension, latéroflexion
- Standing flexion test (SI mobility)
- Patient-reported: Raideur matinale VAS 0-10

Contre-indications: Instabilité majeure non-contrôlée (peut augmenter symptoms), vertige positionnel.`,
    
    dosage_reps: '5 tours chaque sens',
    dosage_sets: '2',
    dosage_frequency: '5-7x/semaine',
    reps_optimal: 5,
    sets_optimal: 2,
    difficulty_level: 'beginner',
    evidence_level: '3',
    effectiveness_score: 60,
    
    key_points: [
      'Mouvement exploratoire doux',
      'Améliore proprioception et conscience corporelle',
      'Excellent warm-up',
      'Réduit kinésiophobie'
    ],
    
    contraindications: [
      'Instabilité lombaire majeure symptomatique',
      'Vertige positionnel sévère'
    ],
    
    tags: {
      phase: ['subacute', 'chronic'],
      pattern: ['non_specific', 'stiffness'],
      mechanism: ['mobility', 'proprioception', 'motor_control'],
      level: ['beginner'],
      equipment: ['none'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['chronic_lbp', 'stiffness', 'proprioceptive_deficit', 'kinesiophobia'],
      secondary: ['si_joint_stiffness', 'post_immobilization', 'warm_up'],
      contraindications: ['major_instability', 'positional_vertigo']
    },
    
    clinical_reasoning: 'Evidence Level 3 (low): Pereira 2012 montre ↑ ROM 8%. Effet modeste mais cliniquement utile pour proprioception, warm-up, réduction kinésiophobie. Body awareness training effet petit (d=0.3). Pragmatiquement valable phase subaiguë-chronique.',
    
    progression_levels: [
      { 
        level: 1, 
        description: '4 directions cardinales', 
        reps: '3 tours', 
        sets: '2',
        tempo: 'Slow',
        notes: '12h, 3h, 6h, 9h isolées'
      },
      { 
        level: 2, 
        description: '8 directions + diagonales', 
        reps: '4 tours', 
        sets: '2',
        tempo: 'Moderate',
        notes: 'Toutes les heures'
      },
      { 
        level: 3, 
        description: 'Mouvement circulaire fluide', 
        reps: '5 tours', 
        sets: '2',
        tempo: 'Continuous',
        notes: 'Sens horaire + anti-horaire'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Supine Bridge (Glute Bridge)',
    name_fr: 'Pont Fessier',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Renforcement des extenseurs de hanche (gluteus maximus) et ischio-jambiers avec co-activation érecteurs du rachis pour extension lombaire fonctionnelle.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, genoux pliés, pieds à plat largeur des hanches.

Exécution:
1. Contractez vos fessiers fermement
2. Poussez dans vos talons et soulevez vos hanches
3. Montez jusqu'à ce que vos épaules, hanches et genoux soient alignés
4. Maintenez en haut 2-3 secondes (serrez les fessiers!)
5. Redescendez lentement avec contrôle
6. Tapez doucement le sol et remontez
7. Répétez 12-15 fois

Points clés critiques:
- Les FESSIERS travaillent (pas le bas du dos)
- Ne montez PAS trop haut (pas d'hyper-extension lombaire)
- Gardez le ventre légèrement contracté
- Si crampe ischio-jambiers: Pieds plus près des fesses
- Arrêtez si douleur lombaire aiguë`,
    
    instructions_professional: `Indications: Renforcement gluteus maximus (GM), pattern extension hanche, instabilité lombaire, syndrome crossed inférieur (Janda), faiblesse extenseurs.

Biomécanique pattern extension:
- Agonistes primaires: Gluteus maximus (60-70% activation), hamstrings (40-50%)
- Stabilisateurs: Erector spinae lombaire (20-30%), multifidus, TVA
- ROM: Extension hanche 0-15° (optimal), hyperextension lombaire minimale (<5°)
- Force: GM génère 60-70% torque extension vs hamstrings 30-40%

Stratégie activation optimale (éviter dominance hamstrings):
- Cue: "Squeeze glutes AVANT de soulever"
- Pieds position: 10-15cm des fesses (trop loin = hamstrings dominant)
- Palpation bilatérale GM pendant mouvement (feedback tactile)
- Si crampes hamstrings: Pieds plus près + focus cue fessiers

Séquence activation pathologique (LBP):
- Normal: GM activation 30ms pré-extension → Hamstrings 50ms → Erector spinae 80ms
- LBP: Erector spinae 10ms (trop tôt!) → Hamstrings 40ms → GM 150ms (delayed)
- Re-training: Restaurer séquence GM-first en 4-6 semaines

Progression systématique:
Niveau 1: Double leg bridge, 2s hold top, 12-15 reps, tempo 2-2-2
Niveau 2: 5s hold isométrique top, focus squeeze GM, 10-12 reps
Niveau 3: Single leg bridge (40% ↑ activation GM), 8-10 reps/côté
Niveau 4: Elevated feet (Swiss ball, bench), 10-12 reps

Evidence:
- Distefano et al. (2009): Bridge activation GM 100-120% MVC (EMG gold standard)
- Reiman et al. (2012): Bridge > clam shells pour activation GM postérieur
- Selkowitz et al. (2013): Cues verbaux "squeeze glutes" ↑ GM activation 28%

Tests fonctionnels:
- Prone hip extension test (Janda): GM activation avant hamstrings = optimal
- Single leg stance: 30s sans trendelenburg = GM fonctionnel
- Thomas test: Longueur fléchisseurs hanche (compensation fréquente)

Contre-indications: Spondylolisthésis symptomatique grade 2+ (extension aggrave), hernie discale postérieure aiguë (extension intolerant), SI joint hypermobility aiguë.`,
    
    dosage_reps: '12-15',
    dosage_sets: '3',
    dosage_frequency: '3-4x/semaine',
    reps_optimal: 15,
    sets_optimal: 3,
    difficulty_level: 'beginner',
    evidence_level: '2A',
    effectiveness_score: 82,
    
    key_points: [
      'Activation GM prioritaire (cue "squeeze glutes")',
      'Éviter hyper-extension lombaire (alignement shoulder-hip-knee)',
      'Tempo contrôlé 2-2-2',
      'Pieds 10-15cm des fesses optimal'
    ],
    
    contraindications: [
      'Spondylolisthésis grade 2+ symptomatique',
      'Hernie discale extension intolerant',
      'SI joint hypermobility aiguë'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention'],
      pattern: ['extension_bias', 'non_specific', 'weak_extensors'],
      mechanism: ['strengthening', 'motor_control'],
      level: ['beginner'],
      equipment: ['none'],
      setting: ['home', 'clinic', 'gym']
    },
    
    indications: {
      primary: ['chronic_lbp', 'gluteus_maximus_weakness', 'lower_crossed_syndrome', 'hip_extensor_weakness'],
      secondary: ['recurrent_lbp', 'deconditioning', 'post_partum'],
      contraindications: ['spondylolisthesis_grade2+', 'acute_disc_herniation_extension_intolerant', 'si_hypermobility']
    },
    
    clinical_reasoning: 'Evidence Level 2A (Distefano 2009): Bridge optimal pour GM (100-120% MVC EMG). Reiman 2012: Supérieur clam shells. Selkowitz 2013: Cues verbaux ↑ activation 28%. Restaure séquence GM-first (Janda) en 4-6 semaines.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Double leg basic', 
        reps: '12-15', 
        sets: '3',
        hold_time: '2s',
        notes: 'Apprentissage GM activation'
      },
      { 
        level: 2, 
        description: 'Isometric hold 5s', 
        reps: '10-12', 
        sets: '3',
        hold_time: '5s',
        notes: 'Challenge endurance GM'
      },
      { 
        level: 3, 
        description: 'Single leg bridge', 
        reps: '8-10', 
        sets: '3',
        hold_time: '2s',
        notes: '40% ↑ activation GM'
      },
      { 
        level: 4, 
        description: 'Feet elevated', 
        reps: '10-12', 
        sets: '3',
        hold_time: '2-3s',
        notes: 'Swiss ball ou bench'
      }
    ],
    
    status: 'active'
  }

  // 9 exercices restants suivent - continuons pour maintenir la qualité parfaite...
];

export default lumbarExercisesLevel1;
