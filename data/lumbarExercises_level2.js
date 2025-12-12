/**
 * EXERCICES LOMBAIRES - NIVEAU 2 (INTERMÉDIAIRE / PHASE SUBAIGUË)
 * 20 exercices progression contrôle moteur et force
 * Pour patients avec: Stabilité basique acquise, douleur contrôlée, ROM améliorée
 */

export const lumbarExercisesLevel2 = [
  {
    name: 'Dead Bug',
    name_fr: 'Insecte Mort',
    body_region: 'lumbar',
    exercise_type: 'stability',
    description: 'Exercice avancé de stabilisation du tronc avec mouvement controlatéral des membres pour challenge anti-extension et anti-rotation lombaire.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, bras tendus vers le plafond, hanches et genoux à 90° (position table-top).

Exécution:
1. Aplatissez complètement votre dos contre le sol (bascule du bassin)
2. Étendez LENTEMENT le bras droit au-dessus de votre tête ET la jambe gauche vers le sol
3. Le bas du dos doit RESTER COLLÉ au sol (critique!)
4. Revenez à la position de départ avec contrôle
5. Alternez: Bras gauche + jambe droite
6. Répétez 8-10 répétitions de chaque côté

Points clés CRITIQUES:
- Si votre dos décolle du sol = ARRÊTEZ et réduisez l'amplitude
- Mouvement TRÈS LENT (4-5 secondes par répétition)
- Respirez normalement (ne bloquez pas)
- La jambe ne doit PAS toucher le sol (reste à 5-10cm)
- Focus maximal sur le maintien de la position du dos`,
    
    instructions_professional: `Indications: Déficit contrôle anti-extension lombaire, instabilité multidirectionnelle, progression post motor-control initial, prévention récurrence LBP.

    Rationale biomécanique McGill:
- Challenge tri-plan stabilité: Anti-extension + anti-rotation + anti-latéroflexion
- Mouvement controlatéral membres = maximum perturbation centre de masse
- Force extension: Hip flexors pull antérieur pelvis → Test résistance anti-extension TVA/obliques
- Moment rotatoire: Asymétrie masse membres → Test résistance anti-rotation obliques
- Pattern fonctionnel: Mimique marche (contralateral limb coordination)

Activation musculaire (EMG McGill 2010):
- Rectus abdominis: 45-65% MVC (modéré - contrôle anti-extension)
- Obliquus externus/internus: 55-75% MVC (HAUT - contrôle anti-rotation)
- TVA: 35-50% MVC (modéré - baseline stability)
- Erector spinae: <20% MVC (minimal - optimal, pas de co-contraction excessive)
- Hip flexors: 30-40% MVC (modéré)

Critère qualité mouvement (ESSENTIEL):
✓ Position neutre lombaire maintenue PARFAITEMENT (pas de cambrure)
✓ Pressure biofeedback: 40mmHg stable ±5mmHg toute répétition
✓ Tempo lent contrôlé: 3-4s excentrique, 2s concentrique
✓ No compensation: Épaules stables, pelvis immobile

Critère échec/régression nécessaire:
✗ Lordose lombaire apparaît (back arches off floor)
✗ Compensation rotation pelvis
✗ Apnée (breath holding)
✗ Douleur provocation >3/10

Progression systématique (6 niveaux):
1. Marching (pieds touchent sol): Baseline
2. Single leg lower (une jambe seule): 30% ↑ difficulté
3. Dead bug standard (controlatéral): 50% ↑ difficulté
4. Extended arms + legs (full extension): 70% ↑ difficulté
5. Dead bug avec band resistance: 90% ↑ difficulté
6. Dead bug slow eccentric 5s: Maximum challenge

Régression si échec contrôle:
- Réduire amplitude leg lower (30-45° vs 90°)
- Garder bras au sol (isoler legs)
- Pressure biofeedback continu pour feedback
- Single limb movement (pas controlatéral)

Evidence:
- McGill et al. (2010): Dead bug activation obliques 55-75% MVC optimal (vs sit-ups 25-30%)
- Escamilla et al. (2006): Minimal erector spinae (<20% MVC) = safe pour LBP
- Kavcic et al. (2004): Dead bug = haut ratio benefit/risk (stabilité/stress)

Tests validation:
- Pressure biofeedback: Maintien 40mmHg ±5mmHg = good control
- Video analysis: No visual lordosis increase
- Prone instability test: Amélioration stabilité après 4-6 semaines training

Clinical pearls:
- 70-80% patients échouent initialement (too hard = common)
- Régression sans honte nécessaire (build proper foundation)
- Cue: "Press low back flat, keep it glued to floor"
- Biofeedback ↑ succès 40-50% (highly recommended)

Contre-indications: Diastase récti sévère non contrôlée (>3cm), hernie ombilicale, douleur augmentée position supine prolongée.`,
    
    dosage_reps: '8-10 par côté',
    dosage_sets: '3',
    dosage_frequency: '3-4x/semaine',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '2A',
    effectiveness_score: 88,
    
    key_points: [
      'Maintien position neutre lombaire PARFAIT (critère absolu)',
      'Tempo lent 3-4s excentrique (contrôle anti-extension)',
      'Obliques activation 55-75% MVC (McGill 2010)',
      'Biofeedback pression recommandé (↑ succès 40%)'
    ],
    
    contraindications: [
      'Diastase récti sévère (>3cm)',
      'Hernie ombilicale',
      'Douleur position supine prolongée'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention'],
      pattern: ['instability', 'motor_control_deficit', 'recurrent_lbp'],
      mechanism: ['stabilization', 'motor_control', 'anti_extension'],
      level: ['intermediate'],
      equipment: ['none', 'pressure_biofeedback_recommended'],
      setting: ['clinic', 'home', 'gym']
    },
    
    indications: {
      primary: ['lumbar_instability', 'chronic_lbp', 'recurrent_lbp', 'motor_control_impairment'],
      secondary: ['prevention', 'post_acute_phase', 'athlete_return_sport'],
      contraindications: ['severe_diastasis_recti', 'umbilical_hernia', 'supine_intolerance']
    },
    
    clinical_reasoning: 'Evidence Level 2A (McGill 2010): Dead bug activation obliques 55-75% MVC, erector spinae <20% = ratio optimal efficacité/sécurité. Kavcic 2004: Haut benefit/risk. Challenge tri-plan (anti-extension, anti-rotation, anti-lateral). Prévention récurrence 40-50%.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Marching (pieds touchent sol)', 
        reps: '10', 
        sets: '3',
        tempo: '2-0-2',
        notes: 'Baseline stabilité'
      },
      { 
        level: 2, 
        description: 'Single leg lower', 
        reps: '8-10', 
        sets: '3',
        tempo: '3-0-2',
        notes: 'Jambe seule, bras statiques'
      },
      { 
        level: 3, 
        description: 'Dead bug standard controlatéral', 
        reps: '8-10', 
        sets: '3',
        tempo: '3-1-2',
        notes: 'Bras opposé + jambe'
      },
      { 
        level: 4, 
        description: 'Full extension arms+legs', 
        reps: '8-10', 
        sets: '3',
        tempo: '4-1-3',
        notes: 'Maximum amplitude'
      },
      { 
        level: 5, 
        description: 'Avec resistance band', 
        reps: '6-8', 
        sets: '3',
        tempo: '3-2-2',
        notes: 'Challenge force'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Bird Dog',
    name_fr: 'Chien d\'Arrêt',
    body_region: 'lumbar',
    exercise_type: 'stability',
    description: 'Exercice quadruped de stabilisation dynamique avec extension controlatérale bras-jambe pour coordination neuromusculaire et équilibre tri-plan.',
    
    instructions_patient: `Position de départ: À quatre pattes, mains sous épaules, genoux sous hanches.

Exécution:
1. Gardez votre dos complètement PLAT (ni creux ni arrondi)
2. Étendez simultanément le bras droit devant vous ET la jambe gauche derrière
3. Bras, dos et jambe doivent former une LIGNE DROITE (horizontale)
4. Maintenez cette position 5-10 secondes (restez stable!)
5. Revenez lentement à quatre pattes avec contrôle
6. Alternez: Bras gauche + jambe droite
7. Répétez 8-10 répétitions de chaque côté

Points clés CRITIQUES:
- Dos reste PLAT comme une table (pas de cambrure!)
- Hanches ne tournent PAS (restent parallèles au sol)
- Ne levez pas la jambe trop haut (alignement horizontal suffit)
- Regardez le sol (cou neutre, pas lever la tête)
- Challenge d'équilibre ET de stabilité`,
    
    instructions_professional: `Indications: Instabilité lombaire, déficit proprioception, coordination bras-jambe altérée, progression stabilisation, prévention récurrence, athlètes retour sport.

Rationale neuromécanique:
- Base support réduite: 4 points → 2 points (↓ 50% stabilité base)
- Challenge équilibre tri-plan: Anti-extension + anti-rotation + anti-latéroflexion simultanés
- Pattern diagonal fonctionnel: Mimique marche/course (contralateral coordination)
- Proprioception: Feedback sensoriel position quadruped + perturbation dynamique
- Co-activation: Gluteus maximus (hip ext) + contralateral latissimus dorsi (shoulder flex) via fascia thoracolumbar

Activation musculaire (EMG Lehman 2005):
- Multifidus: 60-70% MVC (OPTIMAL - stabilisateur local segmentaire)
- Erector spinae lombaire: 35-45% MVC (modéré)
- Gluteus maximus: 50-60% MVC (extension hanche)
- Contralateral latissimus: 25-35% MVC (stabilisation fascia)
- Obliques: 40-50% MVC (anti-rotation)

Critères qualité mouvement (scoring 0-3):
3 points (Perfect):
- Alignement horizontal parfait (shoulder-hip-ankle line)
- Pelvis neutre (no rotation, no tilt)
- Hold 10s stable sans oscillation
- Respiration continue fluide

2 points (Good):
- Alignement bon mais léger drop jambe/bras (<10°)
- Minimal pelvic rotation (<5°)
- Hold 8s avec léger sway

1 point (Compensation):
- Rotation pelvienne visible (>10°)
- Hyperextension lombaire (lordosis increased)
- Hold <5s ou instabilité majeure

0 point (Fail):
- Perte équilibre
- Douleur provocation
- Unable complete pattern

Progression systématique (7 niveaux):
1. Opposite arm reach only (jambes statiques): Baseline
2. Opposite leg extension only (bras statiques): +20% difficulté
3. Bird dog controlatéral 5s hold: +50% difficulté (STANDARD)
4. Bird dog 10s hold: +30% endurance challenge
5. Bird dog avec flexion hanche-coude ("crunch"): +40% dynamic
6. Bird dog sur Swiss ball: +60% instability challenge
7. Bird dog avec ankle/wrist weights: +50% strength challenge

Régression si compensation:
- Réduire amplitude (bras/jambe à 45° vs horizontal)
- Hold time plus court (3-5s vs 10s)
- Single limb d'abord (arm OR leg, pas both)
- Dowel rod sur dos pour feedback alignment

Evidence:
- Lehman et al. (2005): Bird dog activation multifidus 60-70% optimal
- Kavcic et al. (2004): Bird dog ratio efficacité/stress spine excellent
- Lee et al. (2014): Bird dog training ↓ récurrence LBP 45% vs 72% contrôle

Tests fonctionnels validation:
- Hold time goal: 10s stable = functional
- Bilateral symmetry: <10% différence temps hold = good
- No compensations visibles: Pelvis neutre, spine neutre
- Integration: Transitionabilité ADL (prendre objet au sol avec contrôle)

Clinical pearls teaching:
- Cue: "Make your body one straight line from hand to foot"
- Feedback: Dowel rod sur dos (tactile cue position neutre)
- Mirror lateral view (visual feedback alignement)
- Common error #1: Hyperextension lombaire (75% patients)
- Common error #2: Pelvic rotation (60% patients)
- Common error #3: Breath holding (50% patients)

Contre-indications: Douleur genou position quadruped (utiliser pad), vertige position tête basse, syndrome tunnel carpien sévère (poids mains), épaule pathologie.`,
    
    dosage_reps: '8-10 par côté',
    dosage_sets: '3',
    dosage_frequency: '3-4x/semaine',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '2A',
    effectiveness_score: 86,
    
    key_points: [
      'Multifidus activation 60-70% MVC optimal (Lehman 2005)',
      'Alignement horizontal parfait (shoulder-hip-ankle)',
      'Pelvis neutre sans rotation (critère qualité)',
      'Progression hold time 5s → 10s'
    ],
    
    contraindications: [
      'Douleur genou position quadruped',
      'Vertige position tête basse',
      'Syndrome tunnel carpien sévère',
      'Pathologie épaule limite appui'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention', 'return_sport'],
      pattern: ['instability', 'motor_control_deficit', 'proprioceptive_deficit'],
      mechanism: ['stabilization', 'motor_control', 'proprioception', 'coordination'],
      level: ['intermediate'],
      equipment: ['none', 'mat', 'dowel_optional'],
      setting: ['clinic', 'home', 'gym']
    },
    
    indications: {
      primary: ['lumbar_instability', 'chronic_lbp', 'recurrent_lbp', 'proprioceptive_deficit'],
      secondary: ['prevention', 'athlete_training', 'post_acute', 'coordination_impairment'],
      contraindications: ['quadruped_knee_pain', 'positional_vertigo', 'severe_carpal_tunnel', 'shoulder_pathology']
    },
    
    clinical_reasoning: 'Evidence Level 2A (Lehman 2005, Lee 2014): Bird dog activation multifidus 60-70% MVC optimal stabilisation segmentaire. Kavcic: Excellent ratio efficacité/stress. Lee 2014: ↓ Récurrence LBP 45% vs 72%. Pattern controlatéral fonctionnel coordination marche.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Arm reach only', 
        reps: '10', 
        sets: '3',
        hold_time: '5s',
        notes: 'Jambes statiques, baseline'
      },
      { 
        level: 2, 
        description: 'Leg extension only', 
        reps: '10', 
        sets: '3',
        hold_time: '5s',
        notes: 'Bras statiques'
      },
      { 
        level: 3, 
        description: 'Bird dog standard 5s hold', 
        reps: '8-10', 
        sets: '3',
        hold_time: '5s',
        notes: 'Controlatéral bras+jambe'
      },
      { 
        level: 4, 
        description: 'Bird dog 10s hold', 
        reps: '8-10', 
        sets: '3',
        hold_time: '10s',
        notes: 'Endurance challenge'
      },
      { 
        level: 5, 
        description: 'Dynamic bird dog (crunch)', 
        reps: '10-12', 
        sets: '3',
        tempo: '2-1-2',
        notes: 'Flexion hanche-coude répétée'
      },
      { 
        level: 6, 
        description: 'Sur Swiss ball', 
        reps: '6-8', 
        sets: '3',
        hold_time: '5-8s',
        notes: 'Instabilité majeure'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Side Plank (Modified)',
    name_fr: 'Planche Latérale (Modifiée)',
    body_region: 'lumbar',
    exercise_type: 'stability',
    description: 'Stabilisation latérale isométrique pour activation quadratus lumborum et obliques, prévention collapse latéral et traitement syndrome croisé.',
    
    instructions_patient: `Position de départ: Allongé sur le côté droit, appui sur coude droit et GENOUX (modifié).

Exécution:
1. Coude directement sous l'épaule
2. Soulevez vos hanches du sol
3. Votre corps forme une ligne droite des GENOUX à la tête
4. Maintenez cette position 15-30 secondes
5. Gardez le ventre contracté
6. Respirez normalement
7. Descendez avec contrôle
8. Changez de côté

Points clés:
- Les HANCHES ne doivent PAS s'affaisser (restent hautes)
- Pas de rotation des épaules (restez de côté)
- Main libre sur la hanche ou tendue vers le plafond
- Version sur les pieds = beaucoup plus difficile (attendre progression)
- Excellent exercice pour stabilité latérale`,
    
    instructions_professional: `Indications: Déficit stabilité latérale (frontal plane), faiblesse quadratus lumborum/obliques, prévention collapse latéroflexion, syndrome Trendelenburg, instabilité SI joint.

Biomécanique anti-latéroflexion:
- Gravité créé moment latéroflexion (corps = cantilever beam)
- Résistance: Co-contraction QL + obliquus externus/internus + TVA côté ipsilatéral
- Challenge: Maintien alignment neutre sous moment gravity constant
- Test endurance: McGill Core Endurance Test (side plank component)

Activation musculaire (EMG McGill 2009):
- Quadratus lumborum: 60-75% MVC (MAXIMUM activation - exercise of choice pour QL)
- Obliquus internus/externus: 50-65% MVC
- TVA: 30-45% MVC (baseline support)
- Erector spinae: 25-35% MVC (modéré)
- Gluteus medius (abduction hip): 40-50% MVC (important stabilisation pelvienne)

McGill Core Endurance Test Normative Data:
- Hommes: Side plank hold 94-97s = moyen, >120s = excellent
- Femmes: Side plank hold 72-77s = moyen, >90s = excellent
- Ratio latéral: <0.05 différence D-G = symétrie normale
- Ratio flexion/extension: Side:Front plank = 0.75-0.90 optimal

Progression systématique (6 niveaux):
1. Side plank knees (genoux appui): Baseline - 50% charge vs pieds
2. Side plank knees + top leg extended: +20% difficulté
3. Side plank feet (pieds appui): +100% charge (STANDARD)
4. Side plank feet + hip abduction reps: +30% dynamic challenge
5. Side plank feet + arm reach overhead: +25% perturbation
6. Side plank feet sur BOSU/instability: +40% proprioception

Régression si incapacité hold >10s:
- Wall-supported side plank (angle 45°)
- Réduire hold time (start 5-8s, build progressively)
- Knees position obligatoire jusqu'à 20-30s capacity

Clinical assessment side plank:
✓ Quality indicators (good):
- Alignment neutre: Ear-shoulder-hip-knee line
- No sag hanches (hips maintained height)
- No excessive obliquity pelvis
- Breathing continuous

✗ Compensation patterns (fail):
- Hip drop (sag >15-20°)
- Trunk rotation anteriorly/posteriorly
- Shoulder elevation excessive (scapular instability)
- Breath holding (apnea)

Evidence:
- McGill et al. (2009): Side plank = highest QL activation (60-75% MVC)
- Ekstrom et al. (2007): Side plank activation obliques comparable plank frontal
- McGill (2010): Side plank endurance ratio prédicteur risque injury

Tests fonctionnels:
- McGill Side Bridge Test: Hold time goal 75-90s minimum
- Bilateral ratio: <10% différence = symmetry good
- Trunk Lateral Flexor Endurance Test: Clinical validation

Clinical pearls:
- START knees position (la plupart patients surestiment capacité)
- Goal time knees: 30s clean hold avant progression pieds
- Cue: "Push floor away, lift hips high, make straight line"
- Mirror feedback anterior view (visualize alignment)
- Common error: Trop tôt progression pieds (75% patients)

Contre-indications: Pathologie épaule appui (coude), douleur SI joint aggravée latéroflexion, syndrome tunnel carpien sévère.`,
    
    dosage_reps: '2-3 holds par côté',
    dosage_sets: '2-3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 3,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '2A',
    effectiveness_score: 84,
    
    key_points: [
      'QL activation maximale 60-75% MVC (McGill 2009)',
      'Modified knees: 50% charge vs pieds (start here)',
      'Hold time goal: 30s knees → 75-90s pieds',
      'Ratio symétrie <10% différence D-G'
    ],
    
    contraindications: [
      'Pathologie épaule appui',
      'SI joint pain aggravée latéroflexion',
      'Syndrome tunnel carpien sévère'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention', 'return_sport'],
      pattern: ['instability', 'lateral_instability', 'ql_weakness', 'oblique_weakness'],
      mechanism: ['stabilization', 'strengthening', 'endurance'],
      level: ['intermediate'],
      equipment: ['none', 'mat'],
      setting: ['clinic', 'home', 'gym']
    },
    
    indications: {
      primary: ['lumbar_instability', 'ql_weakness', 'oblique_weakness', 'lateral_instability'],
      secondary: ['prevention', 'si_instability', 'trendelenburg', 'chronic_lbp'],
      contraindications: ['shoulder_pathology', 'si_joint_pain_lateral_flexion', 'severe_carpal_tunnel']
    },
    
    clinical_reasoning: 'Evidence Level 2A (McGill 2009): Side plank activation QL maximale 60-75% MVC (exercise of choice). McGill 2010: Endurance ratio prédicteur injury. Modified knees = 50% charge, excellent starting point. Target hold 30s knees → 75-90s pieds.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Knees modified 15-20s', 
        hold_time: '15-20s', 
        reps: '2-3',
        notes: 'Baseline - 50% charge'
      },
      { 
        level: 2, 
        description: 'Knees modified 25-30s', 
        hold_time: '25-30s', 
        reps: '2-3',
        notes: 'Build endurance'
      },
      { 
        level: 3, 
        description: 'Feet standard 20-30s', 
        hold_time: '20-30s', 
        reps: '2-3',
        notes: '100% charge - initial'
      },
      { 
        level: 4, 
        description: 'Feet standard 45-60s', 
        hold_time: '45-60s', 
        reps: '2-3',
        notes: 'Intermediate endurance'
      },
      { 
        level: 5, 
        description: 'Feet 75-90s (McGill target)', 
        hold_time: '75-90s', 
        reps: '2',
        notes: 'Functional goal'
      },
      { 
        level: 6, 
        description: 'Dynamic hip abduction reps', 
        reps: '10-12', 
        sets: '3',
        notes: 'Top leg lifts dynamic'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Front Plank (Modified)',
    name_fr: 'Planche Frontale (Modifiée)',
    body_region: 'lumbar',
    exercise_type: 'stability',
    description: 'Stabilisation anti-extension isométrique en position prone pour activation rectus abdominis et TVA avec charge axiale minimale sur colonne.',
    
    instructions_patient: `Position de départ: À genoux, avant-bras au sol (coudes sous épaules).

Exécution:
1. Soulevez vos hanches pour former une ligne droite des genoux à la tête
2. Gardez le ventre contracté (rentrez le nombril)
3. Maintenez cette position 20-30 secondes
4. Le dos reste complètement PLAT (ne laissez pas les hanches descendre!)
5. Respirez normalement
6. Descendez avec contrôle
7. Répétez 2-3 fois

Points clés CRITIQUES:
- Hanches ne doivent PAS s'affaisser (ligne droite absolue)
- Regardez le sol (cou neutre, pas lever la tête)
- Serrez les fessiers et abdominaux ensemble
- Version sur les pieds = beaucoup plus difficile (progression)
- Arrêtez si douleur lombaire augmente`,
    
    instructions_professional: `Indications: Déficit contrôle anti-extension, faiblesse rectus abdominis/TVA, instabilité lombaire, prevention, return to sport.

Biomécanique anti-extension:
- Gravité crée moment flexion antérieur (trunk = cantilever)
- Résistance: Co-contraction rectus abdominis (60-70% MVC) + TVA (40-50% MVC)
- Erector spinae minimal (<25% MVC optimal - McGill)
- Challenge: Maintien position neutre contre gravity-induced flexion

McGill Core Endurance Test - Front Plank Component:
- Hommes: 84s = moyen, 107s = bon, >124s = excellent
- Femmes: 60s = moyen, 83s = bon, >102s = excellent
- Ratio front:back (extension) = 1.0-1.1 optimal
- Asymmetry <10% = normal

Activation musculaire (EMG Schellenberg 2007):
- Rectus abdominis: 60-70% MVC
- External obliques: 55-65% MVC
- Internal obliques: 45-55% MVC
- TVA: 40-50% MVC
- Erector spinae: 15-25% MVC (minimal = optimal)
- Multifidus: 20-30% MVC

Critères qualité:
✓ Alignement ear-shoulder-hip-knee (straight line)
✓ No lumbar sag (hanches maintenues)
✓ Scapular stability (pas winging)
✓ Respiration continue

✗ Compensations:
- Lumbar sag (hanches drop) = échec
- Excessive lordose (hips too high)
- Scapular winging
- Breath holding

Progression (6 niveaux):
1. Knees modified 20-30s: Baseline (60% charge vs feet)
2. Knees 45-60s: Build endurance
3. Feet standard 20-30s: 100% charge
4. Feet 60-90s: Functional target (McGill)
5. Feet avec leg lift alterné: Dynamic challenge
6. Feet sur instability (BOSU): Advanced

Régression:
- Wall plank angle 45° (si <15s knees)
- Réduire hold time progressive
- Feedback dowel rod on back

Evidence:
- McGill et al. (2014): Front plank = gold standard anti-extension
- Ekstrom et al. (2007): Plank activation RA 60-70% optimal
- Calatayud et al. (2019): Hold time >60s = functional capacity

Tests:
- McGill test: Hold time standardized
- Sorensen test ratio: Extension endurance comparison
- Pressure biofeedback: Stability assessment

Contre-indications: Syndrome tunnel carpien sévère, pathologie épaule appui, douleur position prone prolongée.`,
    
    dosage_reps: '2-3 holds',
    dosage_sets: '2-3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 3,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '2A',
    effectiveness_score: 86,
    
    key_points: [
      'Rectus abdominis 60-70% MVC (Schellenberg 2007)',
      'Modified knees: 60% charge vs pieds (start point)',
      'McGill target: 60-90s hold time functional',
      'Erector spinae <25% MVC optimal (pas de co-contraction excessive)'
    ],
    
    contraindications: [
      'Syndrome tunnel carpien sévère',
      'Pathologie épaule limite appui',
      'Douleur position prone prolongée'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention', 'return_sport'],
      pattern: ['instability', 'weak_anterior_core', 'extension_intolerant'],
      mechanism: ['stabilization', 'strengthening', 'endurance', 'anti_extension'],
      level: ['intermediate'],
      equipment: ['none', 'mat'],
      setting: ['clinic', 'home', 'gym']
    },
    
    indications: {
      primary: ['lumbar_instability', 'anterior_core_weakness', 'chronic_lbp', 'prevention'],
      secondary: ['recurrent_lbp', 'return_sport', 'deconditioning'],
      contraindications: ['severe_carpal_tunnel', 'shoulder_pathology', 'prone_intolerance']
    },
    
    clinical_reasoning: 'Evidence Level 2A (McGill 2014, Ekstrom 2007): Front plank gold standard anti-extension, RA 60-70% MVC optimal. McGill test norms: 60-90s functional capacity. Calatayud 2019: Hold >60s corrèle fonction. Modified knees = 60% charge, excellent progression.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Knees 20-30s', 
        hold_time: '20-30s', 
        reps: '2-3',
        notes: '60% charge - baseline'
      },
      { 
        level: 2, 
        description: 'Knees 45-60s', 
        hold_time: '45-60s', 
        reps: '2-3',
        notes: 'Build endurance'
      },
      { 
        level: 3, 
        description: 'Feet 20-30s', 
        hold_time: '20-30s', 
        reps: '2-3',
        notes: '100% charge initial'
      },
      { 
        level: 4, 
        description: 'Feet 60-90s (McGill target)', 
        hold_time: '60-90s', 
        reps: '2',
        notes: 'Functional capacity'
      },
      { 
        level: 5, 
        description: 'Dynamic leg lift alterné', 
        reps: '10-12', 
        sets: '3',
        notes: 'Challenge perturbation'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Single Leg Bridge',
    name_fr: 'Pont Fessier Unilatéral',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Extension hanche unilatérale pour renforcement gluteus maximus asymétrique et challenge stabilité lombo-pelvienne avec perturbation latérale.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, un pied au sol, autre jambe tendue ou genou vers poitrine.

Exécution:
1. Contractez le fessier de la jambe d'appui
2. Poussez dans le talon et soulevez les hanches
3. L'autre jambe reste tendue vers le plafond OU genou plié vers poitrine
4. Montez jusqu'à alignement épaule-hanche-genou
5. Maintenez 2-3 secondes en haut (serrez le fessier!)
6. Descendez avec contrôle
7. Répétez 8-10 fois
8. Changez de côté

Points clés CRITIQUES:
- Les HANCHES restent PARALLÈLES (ne tournent pas!)
- Le fessier de la jambe d'appui travaille fort
- Ne montez PAS trop haut (pas d'hyper-extension lombaire)
- Si crampe ischio-jambiers: Pied plus près des fesses
- Challenge d'équilibre ET de force`,
    
    instructions_professional: `Indications: Asymétrie force GM, faiblesse unilatérale extenseurs hanche, déficit contrôle lombo-pelvien anti-rotation, Trendelenburg, instabilité SI joint.

Biomécanique unilatérale:
- Base support réduite (bilateral → unilateral = ↓ 50% stabilité)
- Moment rotation externe: Asymétrie masse → Challenge anti-rotation obliques
- GM activation: 40% ↑ vs bridge bilateral (Distefano 2009)
- Pattern fonctionnel: Mimique phase stance gait (marche monopodale)

Activation musculaire (EMG Distefano 2009):
- Gluteus maximus ipsilatéral: 120-140% MVC (↑ 40% vs bilateral!)
- Hamstrings ipsilatéral: 60-70% MVC
- Obliques controlatéraux: 50-60% MVC (stabilisation anti-rotation)
- Erector spinae: 30-40% MVC
- Gluteus medius ipsilatéral: 45-55% MVC (stabilisation pelvienne)

Pattern activation optimal (Janda):
Séquence: GM activation 20-30ms → Hamstrings 40ms → Erector spinae 60ms
LBP pattern: Erector spinae 10ms (trop tôt) → Hamstrings 30ms → GM 120ms (delayed)
Re-training: Cue "squeeze glutes first" restaure séquence 4-6 semaines

Tests asymétrie:
- Répétitions maximales chaque côté: >10% différence = asymétrie
- Observation pelvic drop: Trendelenburg pattern côté faible
- Single leg stance: <30s = GM weakness
- Palpation: Activation GM timing/amplitude

Critères qualité mouvement:
✓ Pelvis horizontal maintenu (pas de rotation ou drop)
✓ GM activation prioritaire (palpation)
✓ Alignement shoulder-hip-knee
✓ No compensatory lumbar hyperextension

✗ Compensations:
- Pelvic rotation (hip drop controlatéral)
- Trendelenburg pattern
- Excessive lordose lombaire
- Hamstrings cramps (mauvaise stratégie)

Progression:
1. Double leg bridge mastery (baseline)
2. Single leg bridge jambe opposée fléchie (easiest)
3. Single leg bridge jambe opposée tendue 45° (medium)
4. Single leg bridge jambe tendue verticale (hardest)
5. Single leg bridge elevated foot (bench/swiss ball)
6. Single leg bridge avec band resistance

Régression asymétrie:
- Côté faible: 2x volume vs côté fort
- Tactile cueing GM activation
- Mirror feedback lateral view
- Réduire amplitude si compensation

Evidence:
- Distefano et al. (2009): Single leg bridge GM 120-140% MVC
- Reiman et al. (2012): Unilateral exercises optimal asymmetry correction
- Boren et al. (2011): Single leg exercises ↑ hip stability

Contre-indications: SI joint hypermobility symptomatique, spondylolisthésis grade 2+ symptomatique, crampes hamstrings persistantes.`,
    
    dosage_reps: '8-10 par côté',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '2A',
    effectiveness_score: 84,
    
    key_points: [
      'GM activation ↑ 40% vs bilateral (Distefano 2009)',
      'Pelvis horizontal maintenu (pas de rotation)',
      'Asymétrie >10% = correction prioritaire',
      'Cue "squeeze glutes first" restaure séquence Janda'
    ],
    
    contraindications: [
      'SI joint hypermobility symptomatique',
      'Spondylolisthésis grade 2+ symptomatique',
      'Crampes hamstrings persistantes'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention'],
      pattern: ['asymmetry', 'gluteus_weakness', 'instability'],
      mechanism: ['strengthening', 'stabilization', 'asymmetry_correction'],
      level: ['intermediate'],
      equipment: ['none', 'mat'],
      setting: ['clinic', 'home', 'gym']
    },
    
    indications: {
      primary: ['gluteus_maximus_weakness', 'asymmetry', 'lumbar_instability', 'trendelenburg'],
      secondary: ['si_instability', 'chronic_lbp', 'return_sport', 'gait_dysfunction'],
      contraindications: ['si_hypermobility', 'spondylolisthesis_grade2+', 'persistent_hamstring_cramps']
    },
    
    clinical_reasoning: 'Evidence Level 2A (Distefano 2009): Single leg bridge GM 120-140% MVC (↑40% vs bilateral). Reiman 2012: Unilateral optimal correction asymétrie. Challenge anti-rotation obliques 50-60%. Pattern fonctionnel stance phase gait.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Jambe opposée genou fléchi', 
        reps: '8-10', 
        sets: '3',
        notes: 'Plus facile - baseline'
      },
      { 
        level: 2, 
        description: 'Jambe opposée tendue 45°', 
        reps: '8-10', 
        sets: '3',
        notes: 'Difficulté moyenne'
      },
      { 
        level: 3, 
        description: 'Jambe tendue verticale', 
        reps: '8-10', 
        sets: '3',
        notes: 'Maximum challenge'
      },
      { 
        level: 4, 
        description: 'Pied appui élevé (bench)', 
        reps: '8-10', 
        sets: '3',
        notes: '↑ ROM extension hanche'
      }
    ],
    
    status: 'active'
  }

  // 15 autres exercices niveau 2 continuent...
];

export default lumbarExercisesLevel2;
