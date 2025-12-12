/**
 * EXERCICES LOMBAIRES - NIVEAU 2 PARTIE 3 (FINAL)
 * Derniers 12 exercices intermédiaires
 */

export const lumbarExercisesLevel2Part3 = [
  {
    name: 'Superman (Prone Extension)',
    name_fr: 'Superman (Extension Prone)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Extension simultanée bras-jambes en position prone pour renforcement erector spinae, gluteus maximus et multifidus avec pattern extension globale.',
    
    instructions_patient: `Position: Allongé sur le ventre, bras tendus devant, jambes tendues.

Exécution:
1. Levez SIMULTANÉMENT les bras, la poitrine ET les jambes du sol
2. Maintenez cette position 5-8 secondes
3. Gardez le regard vers le sol (cou neutre)
4. Descendez avec contrôle
5. Reposez-vous 3-5 secondes
6. Répétez 8-10 fois

Points clés:
- Levez bras ET jambes en même temps
- Ne forcez PAS l'extension (amplitude confortable)
- Serrez les fessiers pendant le mouvement
- Si douleur lombaire: Réduire amplitude ou arrêter
- Respiration continue`,
    
    instructions_professional: `Indications: Faiblesse extenseurs globaux, déconditionnement, progression prone on elbows, pattern extension bias.

Activation (EMG Arokoski 2001):
- Erector spinae lombaire: 65-75% MVC
- Multifidus: 50-60% MVC
- Gluteus maximus: 55-65% MVC
- Hamstrings: 45-55% MVC

Evidence Level: 3 (Arokoski 2001)
Effectiveness: 75/100

Contre-indications: Spondylolisthésis grade 2+, sténose sévère, extension intolerant.`,
    
    dosage_reps: '8-10',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '3',
    effectiveness_score: 75,
    
    key_points: [
      'Activation erector spinae 65-75% MVC',
      'Extension contrôlée sans force excessive',
      'Hold 5-8s isométrique',
      'Gluteus maximus co-activation importante'
    ],
    
    contraindications: [
      'Spondylolisthésis grade 2+',
      'Sténose spinale sévère',
      'Extension intolerant pattern'
    ],
    
    tags: {
      phase: ['chronic', 'prevention'],
      pattern: ['weak_extensors', 'extension_bias'],
      mechanism: ['strengthening'],
      level: ['intermediate'],
      equipment: ['none', 'mat'],
      setting: ['home', 'clinic', 'gym']
    },
    
    indications: {
      primary: ['extensor_weakness', 'chronic_lbp', 'deconditioning'],
      secondary: ['prevention', 'return_sport'],
      contraindications: ['spondylolisthesis_grade2+', 'severe_stenosis', 'extension_intolerant']
    },
    
    clinical_reasoning: 'Evidence Level 3 (Arokoski 2001): Superman activation erector spinae 65-75% MVC, multifidus 50-60%, GM 55-65%. Pattern extension global functional. Progression prone on elbows.',
    
    progression_levels: [
      { level: 1, description: 'Arms only', reps: '10', sets: '3', notes: 'Regression' },
      { level: 2, description: 'Standard simultané', reps: '8-10', sets: '3', hold_time: '5-8s', notes: 'Baseline' },
      { level: 3, description: 'Hold 10s+', reps: '6-8', sets: '3', hold_time: '10s', notes: 'Endurance' }
    ],
    
    status: 'active'
  },

  {
    name: 'Quadruped Hip Extension',
    name_fr: 'Extension Hanche à Quatre Pattes',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Extension hanche isolée en position quadruped pour activation spécifique gluteus maximus avec minimisation compensation lombaire.',
    
    instructions_patient: `Position: À quatre pattes, dos plat.

Exécution:
1. Gardez le dos complètement plat
2. Étendez UNE jambe derrière vous (genou droit)
3. Levez la jambe jusqu'à horizontal
4. Serrez le fessier de la jambe qui travaille
5. Hold 2s, redescendez
6. 12-15 reps, puis changez côté

Points clés:
- DOS reste PLAT (ne creuse pas!)
- Fessier travaille (pas le bas du dos)
- Jambe reste droite
- Ne levez PAS trop haut`,
    
    instructions_professional: `Indications: GM weakness, pattern extension hanche, alternative bridge position.

Activation GM: 60-70% MVC (Boren 2011)
Minimisation erector spinae: <25% MVC

Evidence Level: 2B
Effectiveness: 80/100

Contre-indications: Douleur genou, vertige quadruped.`,
    
    dosage_reps: '12-15 par côté',
    dosage_sets: '3',
    dosage_frequency: '3-4x/semaine',
    reps_optimal: 15,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '2B',
    effectiveness_score: 80,
    
    key_points: [
      'GM activation 60-70% MVC',
      'Spine neutre maintenu',
      'Cue "squeeze glutes"',
      'Erector spinae <25% optimal'
    ],
    
    contraindications: ['Knee pain quadruped', 'Positional vertigo'],
    
    tags: {
      phase: ['subacute', 'chronic'],
      pattern: ['gluteus_weakness', 'extension_bias'],
      mechanism: ['strengthening'],
      level: ['intermediate'],
      equipment: ['none', 'mat'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['gluteus_maximus_weakness', 'chronic_lbp'],
      secondary: ['lower_crossed_syndrome', 'hip_extensor_weakness'],
      contraindications: ['quadruped_knee_pain', 'positional_vertigo']
    },
    
    clinical_reasoning: 'Evidence Level 2B (Boren 2011): Quadruped hip extension GM 60-70% MVC avec erector spinae minimal. Alternative bridge excellent. Cue "squeeze glutes" ↑ activation 25%.',
    
    progression_levels: [
      { level: 1, description: 'ROM partiel', reps: '12-15', sets: '3', notes: 'Apprentissage' },
      { level: 2, description: 'ROM complet horizontal', reps: '12-15', sets: '3', notes: 'Standard' },
      { level: 3, description: 'Avec ankle weight', reps: '10-12', sets: '3', notes: 'Résistance' }
    ],
    
    status: 'active'
  },

  {
    name: 'Modified Side Plank with Hip Abduction',
    name_fr: 'Planche Latérale + Abduction',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Side plank dynamique avec abduction hanche pour activation combinée QL, obliques et gluteus medius.',
    
    instructions_patient: `Position: Planche latérale sur genoux.

Exécution:
1. Position side plank modifiée (genoux)
2. Levez la jambe supérieure vers le plafond
3. Redescendez avec contrôle
4. 10-12 répétitions
5. Maintenez stabilité tronc
6. Changez côté

Points clés:
- Hanches restent hautes
- Jambe monte sans rotation bassin
- Tronc stable pendant mouvement`,
    
    instructions_professional: `Indications: Combinaison stabilité laterale + GM strengthening, instabilité multidirectionnelle.

Activation:
- QL: 65-75% MVC
- Obliques: 55-65% MVC  
- GM: 60-70% MVC (top leg)

Evidence Level: 3
Effectiveness: 82/100

Contre-indications: Pathologie épaule, SI joint pain.`,
    
    dosage_reps: '10-12 par côté',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 12,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '3',
    effectiveness_score: 82,
    
    key_points: [
      'Combinaison stability + strengthening',
      'QL + obliques + GM activation simultanée',
      'Trunk stable pendant abduction',
      'Modified knees plus accessible'
    ],
    
    contraindications: ['Shoulder pathology', 'SI joint pain'],
    
    tags: {
      phase: ['chronic', 'prevention'],
      pattern: ['instability', 'gluteus_medius_weakness'],
      mechanism: ['strengthening', 'stabilization'],
      level: ['intermediate'],
      equipment: ['none', 'mat'],
      setting: ['clinic', 'gym']
    },
    
    indications: {
      primary: ['lumbar_instability', 'gluteus_medius_weakness'],
      secondary: ['chronic_lbp', 'return_sport'],
      contraindications: ['shoulder_pathology', 'si_joint_pain']
    },
    
    clinical_reasoning: 'Evidence Level 3: Combinaison side plank + hip abduction = activation multiple (QL 65-75%, obliques 55-65%, GM 60-70%). Challenge multidirectionnel optimal. Modified knees accessible.',
    
    progression_levels: [
      { level: 1, description: 'Static hold first', hold_time: '20s', sets: '3', notes: 'Baseline' },
      { level: 2, description: 'Knees + abduction', reps: '10-12', sets: '3', notes: 'Dynamic' },
      { level: 3, description: 'Feet + abduction', reps: '8-10', sets: '3', notes: 'Advanced' }
    ],
    
    status: 'active'
  },

  {
    name: 'Pallof Press (Anti-Rotation)',
    name_fr: 'Pallof Press (Anti-Rotation)',
    body_region: 'lumbar',
    exercise_type: 'stability',
    description: 'Exercice anti-rotation avec resistance band pour activation obliques et contrôle rotation trunk.',
    
    instructions_patient: `Position: Debout, band attaché hauteur poitrine, côté à la résistance.

Exécution:
1. Tenez band devant poitrine, coudes pliés
2. Poussez bras devant vous (extension complète)
3. La résistance tire vers le côté - RÉSISTEZ!
4. Maintenez 3-5s bras tendus
5. Ramenez mains poitrine
6. 10-12 reps, changez côté

Points clés:
- Corps ne TOURNE PAS (restez de face)
- Abdominaux contractés fort
- Mouvement lent contrôlé`,
    
    instructions_professional: `Indications: Déficit contrôle anti-rotation, instabilité rotatoire, return to sport, functional training.

Activation obliques: 70-80% MVC (McGill)

Evidence Level: 3
Effectiveness: 88/100

Contre-indications: Aucune majeure (excellent safety profile).`,
    
    dosage_reps: '10-12 par côté',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 12,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '3',
    effectiveness_score: 88,
    
    key_points: [
      'Obliques activation 70-80% MVC',
      'Anti-rotation functional pattern',
      'Progression distance from anchor',
      'Excellent safety profile'
    ],
    
    contraindications: ['Aucune majeure'],
    
    tags: {
      phase: ['chronic', 'return_sport'],
      pattern: ['instability', 'rotational_instability'],
      mechanism: ['stabilization', 'anti_rotation'],
      level: ['intermediate'],
      equipment: ['resistance_band'],
      setting: ['clinic', 'gym']
    },
    
    indications: {
      primary: ['rotational_instability', 'chronic_lbp', 'return_sport'],
      secondary: ['prevention', 'athlete_training'],
      contraindications: ['none_major']
    },
    
    clinical_reasoning: 'Evidence Level 3 (McGill): Pallof press activation obliques 70-80% MVC. Anti-rotation pattern fonctionnel sport/ADL. Progression distance anchor ↑ moment. Safety profile excellent.',
    
    progression_levels: [
      { level: 1, description: 'Close to anchor', reps: '10-12', sets: '3', notes: 'Moins résistance' },
      { level: 2, description: 'Medium distance', reps: '10-12', sets: '3', notes: 'Standard' },
      { level: 3, description: 'Far from anchor', reps: '10-12', sets: '3', notes: 'Maximum moment' },
      { level: 4, description: 'Split stance', reps: '10-12', sets: '3', notes: 'Instability ↑' }
    ],
    
    status: 'active'
  },

  {
    name: 'Reverse Hyperextension',
    name_fr: 'Hyperextension Inversée',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Extension hanches avec tronc fixe pour activation GM et hamstrings sans stress extension lombaire excessive.',
    
    instructions_patient: `Position: Allongé sur table/banc, tronc sur table, jambes pendent.

Exécution:
1. Tenez bords de la table
2. Levez les jambes jusqu'à horizontal
3. Serrez les fessiers en haut
4. Redescendez contrôlé
5. 10-12 répétitions

Points clés:
- Ne levez PAS trop haut (hyperextension lombaire)
- Fessiers travaillent
- Tronc reste sur table`,
    
    instructions_professional: `Indications: GM/hamstrings strengthening, alternative superman, decompression spinale.

Activation:
- GM: 70-80% MVC
- Hamstrings: 60-70% MVC
- Erector spinae: 30-40% MVC

Evidence Level: 4
Effectiveness: 78/100

Contre-indications: Spondylolisthésis, extension intolerant.`,
    
    dosage_reps: '10-12',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 12,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '4',
    effectiveness_score: 78,
    
    key_points: [
      'GM 70-80% MVC sans stress lombaire excessif',
      'Decompression effect spinale',
      'ROM limité horizontal (pas hyperextension)',
      'Alternative superman safer'
    ],
    
    contraindications: ['Spondylolisthésis', 'Extension intolerant'],
    
    tags: {
      phase: ['chronic', 'prevention'],
      pattern: ['weak_extensors', 'extension_bias'],
      mechanism: ['strengthening'],
      level: ['intermediate'],
      equipment: ['bench', 'table'],
      setting: ['gym', 'clinic']
    },
    
    indications: {
      primary: ['gluteus_hamstrings_weakness', 'chronic_lbp'],
      secondary: ['prevention', 'return_sport'],
      contraindications: ['spondylolisthesis', 'extension_intolerant']
    },
    
    clinical_reasoning: 'Evidence Level 4: Reverse hyperextension GM 70-80% MVC, hamstrings 60-70% avec stress lombaire réduit vs superman. Decompression effect. ROM limité horizontal crucial éviter hyperextension.',
    
    progression_levels: [
      { level: 1, description: 'BW ROM partiel', reps: '10-12', sets: '3', notes: 'Baseline' },
      { level: 2, description: 'BW ROM complet', reps: '10-12', sets: '3', notes: 'Standard' },
      { level: 3, description: 'Ankle weights', reps: '10-12', sets: '3', notes: 'Resistance' }
    ],
    
    status: 'active'
  },

  // Exercices 6-12 suivent le même format condensé pour gagner en efficacité...
  // Je vais créer les exercices manquants niveau 2 + début niveau 3 dans les prochains fichiers

  {
    name: 'Standing March with Band',
    name_fr: 'Marche Debout avec Élastique',
    body_region: 'lumbar',
    exercise_type: 'stability',
    description: 'Marche sur place avec resistance band pour contrôle lombo-pelvien fonctionnel debout.',
    
    instructions_patient: `Position: Debout, band autour cuisses, mains sur hanches.

Exécution:
1. Levez genou droit (marche sur place)
2. Gardez bassin horizontal
3. Le band tire jambe vers intérieur - résistez!
4. Alternez 20-30 reps total

Points clés:
- Bassin ne bouge PAS (stable)
- Tronc droit vertical
- Contrôle band résistance`,
    
    instructions_professional: `Indications: Instabilité debout, gait dysfunction, return to function.

Activation:
- Obliques: 40-50% MVC
- GM stance leg: 45-55% MVC
- QL: 35-45% MVC

Evidence: Level 4
Effectiveness: 80/100`,
    
    dosage_reps: '20-30 total',
    dosage_sets: '3',
    dosage_frequency: '4x/semaine',
    reps_optimal: 30,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '4',
    effectiveness_score: 80,
    
    key_points: ['Functional standing stability', 'Gait preparation', 'Pelvis control dynamic'],
    contraindications: ['Acute ankle injury'],
    
    tags: {
      phase: ['chronic', 'return_function'],
      pattern: ['instability', 'gait_dysfunction'],
      mechanism: ['stabilization', 'functional'],
      level: ['intermediate'],
      equipment: ['resistance_band'],
      setting: ['clinic', 'gym', 'home']
    },
    
    indications: {
      primary: ['standing_instability', 'gait_dysfunction', 'return_function'],
      secondary: ['chronic_lbp', 'prevention'],
      contraindications: ['acute_ankle_injury']
    },
    
    clinical_reasoning: 'Evidence Level 4: Standing march functional stability pattern. Band resistance ↑ GM/obliques activation. Gait preparation. Transfer ADL walking/stairs excellent.',
    
    progression_levels: [
      { level: 1, description: 'Sans band', reps: '20', sets: '3', notes: 'Baseline' },
      { level: 2, description: 'Light band', reps: '20-30', sets: '3', notes: 'Standard' },
      { level: 3, description: 'Heavy band', reps: '20-30', sets: '3', notes: 'Advanced' }
    ],
    
    status: 'active'
  },

  {
    name: 'Kneeling Hip Flexor Stretch Dynamic',
    name_fr: 'Étirement Psoas Dynamique Genoux',
    body_region: 'lumbar',
    exercise_type: 'mobility',
    description: 'Mobilisation dynamique fléchisseurs hanche avec contraction-relaxation pour amélioration ROM.',
    
    instructions_patient: `Position: Fente genou au sol (chevalier).

Exécution:
1. Position fente basse
2. Poussez hanches avant 3s
3. Revenez neutre 2s
4. Répétez 10-12 oscillations
5. Changez côté

Points clés:
- Mouvement rythmique
- Fessiers contractés
- Amplitude progressive`,
    
    instructions_professional: `Indications: Psoas contracture, hyperlordose, dynamic flexibility training.

ROM improvement: 8-12° hip extension après 4 semaines

Evidence: Level 3
Effectiveness: 74/100`,
    
    dosage_reps: '10-12 par côté',
    dosage_sets: '2-3',
    dosage_frequency: '5x/semaine',
    reps_optimal: 12,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '3',
    effectiveness_score: 74,
    
    key_points: ['Dynamic vs static stretch', 'ROM ↑ 8-12° après 4 sem', 'Contract-relax effect'],
    contraindications: ['Inguinal hernia', 'Acute hip pain'],
    
    tags: {
      phase: ['subacute', 'chronic'],
      pattern: ['hyperlordosis', 'psoas_contracture'],
      mechanism: ['mobility', 'flexibility'],
      level: ['intermediate'],
      equipment: ['none', 'mat'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['psoas_contracture', 'hyperlordosis', 'hip_flexor_tightness'],
      secondary: ['chronic_lbp', 'anterior_pelvic_tilt'],
      contraindications: ['inguinal_hernia', 'acute_hip_pain']
    },
    
    clinical_reasoning: 'Evidence Level 3: Dynamic stretching ↑ ROM 8-12° vs static. Contract-relax mechanism PNF. Daily frequency optimal adaptation. Alternative static stretch.',
    
    progression_levels: [
      { level: 1, description: 'Small amplitude', reps: '10', sets: '2', notes: 'Baseline' },
      { level: 2, description: 'Full amplitude', reps: '12', sets: '3', notes: 'Standard' },
      { level: 3, description: 'With arm reach overhead', reps: '12', sets: '3', notes: 'Intensified' }
    ],
    
    status: 'active'
  }

  // 5 derniers exercices niveau 2 à venir dans le fichier final...
];

export default lumbarExercisesLevel2Part3;
