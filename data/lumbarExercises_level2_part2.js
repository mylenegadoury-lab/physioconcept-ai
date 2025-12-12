/**
 * EXERCICES LOMBAIRES - NIVEAU 2 PARTIE 2
 * Continuation exercices intermédiaires
 */

export const lumbarExercisesLevel2Part2 = [
  {
    name: 'Clamshell',
    name_fr: 'Coquillage (Abduction Hanche)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Abduction-rotation externe hanche en decubitus latéral pour activation sélective gluteus medius et stabilisation lombo-pelvienne.',
    
    instructions_patient: `Position de départ: Allongé sur le côté, genoux pliés à 90°, pieds ensemble.

Exécution:
1. Gardez les pieds collés ensemble
2. Ouvrez le genou supérieur vers le plafond (comme un coquillage qui s'ouvre)
3. Montez aussi haut que possible SANS tourner le bassin
4. Maintenez 2 secondes en haut
5. Redescendez avec contrôle
6. Répétez 15-20 fois
7. Changez de côté

Points clés:
- Les PIEDS restent COLLÉS ensemble
- Le BASSIN ne tourne PAS (restez sur le côté)
- Sentez le travail sur le côté de la fesse (pas devant)
- Mouvement contrôlé sans élan
- Si trop facile: Ajoutez élastique autour des genoux`,
    
    instructions_professional: `Indications: Faiblesse gluteus medius, syndrome Trendelenburg, instabilité SI joint, lower crossed syndrome, prévention lombalgie.

Anatomie GM fonction:
- Gluteus medius: Principal abducteur hanche (fibers anterior/middle/posterior)
- Fonction: Stabilisation pelvienne stance phase gait (évite drop controlatéral)
- Weakness consequence: Trendelenburg sign, pelvic drop, compensation lombaire latéroflexion
- LBP relation: GM weakness corrèle instabilité lombaire (OR=2.3)

Activation EMG (Boren 2011):
- Gluteus medius: 45-55% MVC (moderate - good isolation)
- Gluteus maximus: 25-35% MVC (secondary)
- TFL (tensor fascia lata): 20-25% MVC (minimal = optimal, éviter dominance TFL)
- Piriformis: 15-20% MVC

Technique optimale:
- Position: Side-lying, hips stacked vertical, knees 90°
- Cue: "Open knee like book, keep feet together"
- ROM: Abduction 30-40° optimal (>45° = pelvic rotation compensation)
- Tempo: 2-1-2 (controlled eccentric crucial)

Common compensations:
✗ Pelvic rotation posterior (hips roll back)
✗ TFL dominance (sensation anterior hip vs lateral glute)
✗ Trunk lateral flexion (using QL instead of hip abductors)
✗ Feet separation (changing exercise biomechanics)

Progressions:
1. Clamshell basic 15-20 reps: Baseline
2. Clamshell avec resistance band: ↑ 60% activation
3. Clamshell + isometric hold 5s top: Endurance
4. Side-lying hip abduction (leg straight): Functional
5. Standing hip abduction avec band: Transfer ADL

Regression/modifications:
- Smaller ROM si compensation
- Hand on pelvis feedback (tactile cue no rotation)
- Mirror anterior view (visual feedback)

Evidence:
- Boren et al. (2011): Clamshell GM 45-55% MVC, TFL minimal
- Selkowitz et al. (2013): Clamshell > side-lying abduction pour isolation GM
- Distefano et al. (2009): Clamshell good GM/TFL ratio

Tests:
- Trendelenburg test: Pelvic drop >2cm = GM weakness
- Single leg stance: <30s = functional weakness
- Palpation: GM activation vs TFL dominance

Clinical pearls:
- HIGH reps (15-20) optimal endurance vs strength (GM type I fibers 55%)
- Band resistance ↑ compliance patient (visual feedback force)
- Progression functional weight-bearing crucial (clamshell = beginning only)

Contre-indications: Douleur SI joint aggravée abduction, trochanteric bursitis aiguë, ITB syndrome sévère.`,
    
    dosage_reps: '15-20 par côté',
    dosage_sets: '3',
    dosage_frequency: '5x/semaine',
    reps_optimal: 20,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '2B',
    effectiveness_score: 78,
    
    key_points: [
      'GM activation 45-55% MVC, TFL minimal (Boren 2011)',
      'ROM 30-40° optimal (>45° = compensation pelvienne)',
      'High reps 15-20 (GM type I fibers 55%)',
      'Progression weight-bearing essentielle'
    ],
    
    contraindications: [
      'SI joint pain aggravée abduction',
      'Trochanteric bursitis aiguë',
      'ITB syndrome sévère'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention'],
      pattern: ['gluteus_medius_weakness', 'trendelenburg', 'si_instability'],
      mechanism: ['strengthening', 'stabilization'],
      level: ['intermediate'],
      equipment: ['none', 'resistance_band_optional'],
      setting: ['home', 'clinic', 'gym']
    },
    
    indications: {
      primary: ['gluteus_medius_weakness', 'trendelenburg', 'si_instability', 'chronic_lbp'],
      secondary: ['prevention', 'lower_crossed_syndrome', 'gait_dysfunction'],
      contraindications: ['si_joint_pain_abduction', 'acute_trochanteric_bursitis', 'severe_itb_syndrome']
    },
    
    clinical_reasoning: 'Evidence Level 2B (Boren 2011, Selkowitz 2013): Clamshell isolation GM 45-55% MVC avec TFL minimal. GM weakness corrèle LBP instabilité (OR=2.3). High reps optimal (type I fibers 55%). Progression weight-bearing fonctionnelle cruciale.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Basic sans résistance', 
        reps: '15-20', 
        sets: '3',
        tempo: '2-1-2',
        notes: 'Baseline isolation'
      },
      { 
        level: 2, 
        description: 'Avec resistance band', 
        reps: '15-20', 
        sets: '3',
        tempo: '2-1-2',
        notes: '↑ 60% activation'
      },
      { 
        level: 3, 
        description: 'Hold isométrique 5s top', 
        reps: '12-15', 
        sets: '3',
        tempo: '2-5-2',
        notes: 'Endurance challenge'
      },
      { 
        level: 4, 
        description: 'Side-lying abduction jambe tendue', 
        reps: '15-20', 
        sets: '3',
        notes: 'Progression fonctionnelle'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Quadruped Arm/Leg Reach',
    name_fr: 'Allongement Bras/Jambe (Quadruped)',
    body_region: 'lumbar',
    exercise_type: 'stability',
    description: 'Variation bird dog avec reach dynamique pour proprioception avancée et coordination neuromusculaire complexe.',
    
    instructions_patient: `Position de départ: À quatre pattes, dos plat.

Exécution:
1. Étendez bras droit devant + jambe gauche derrière (position bird dog)
2. Fléchissez le coude et genou pour ramener coude vers genou sous le corps
3. Puis ré-étendez bras et jambe complètement
4. Répétez ce mouvement de flexion-extension 10-12 fois
5. Changez de côté: Bras gauche + jambe droite
6. Gardez le dos stable pendant tout le mouvement

Points clés:
- Le DOS reste PLAT (ne bouge pas pendant le mouvement)
- Les HANCHES restent parallèles (ne tournent pas)
- Mouvement fluide et contrôlé
- Challenge de coordination bras-jambe
- Plus difficile que bird dog statique`,
    
    instructions_professional: `Indications: Progression bird dog, amélioration coordination dynamique, proprioception avancée, return to sport, instabilité multidirectionnelle.

Rationale neuromoteur:
- Pattern dynamique vs statique: ↑ 30-40% challenge neuromuscular control
- Coordination reciprocal: Timing flexion-extension ipsilateral + contralateral stabilization
- Proprioception: Continuous feedback position changement
- Functional transfer: Mimique reach patterns ADL (prendre objet, mouvement combiné)

Activation dynamique (EMG estimation):
- Multifidus: 65-75% MVC (↑ vs static bird dog)
- Obliques: 50-60% MVC (anti-rotation dynamic)
- Gluteus maximus: 55-65% MVC (dynamic extension)
- Latissimus dorsi controlatéral: 30-40% MVC
- Erector spinae: 40-50% MVC

Critères qualité mouvement:
✓ Spine neutral maintained throughout (no flexion-extension)
✓ Pelvis stable (no rotation >5°)
✓ Smooth coordinated movement (no jerky motion)
✓ Full ROM both flexion et extension phases
✓ Controlled tempo 2-1-2

✗ Compensations:
- Lumbar flexion-extension movement (spine not stable)
- Pelvic rotation avec movement
- Loss balance (weight shift excessive)
- Rushed tempo (loss control)

Progressions:
1. Static bird dog mastery: Prerequisite
2. Quadruped reach (cette exercice): Progression
3. Reach avec resistance band: ↑ Challenge strength
4. Reach sur swiss ball: ↑ Instability
5. Standing single leg reach: Functional transfer

Tests validation:
- 10 reps clean = good dynamic control
- Video analysis: Spine position maintained
- Comparison bilateral: Asymétrie <10%

Evidence (indirect):
- Dynamic stability training > static (Behm 2010)
- Coordination exercises efficaces chronic LBP (Ferreira 2007)
- Pas de RCT spécifique quadruped reach (Level 4)

Clinical pearls:
- Static bird dog 10s hold prerequisite avant progression dynamic
- Cue: "Slide elbow to knee under body, keep back flat"
- Mirror lateral view feedback crucial
- Common error: Too fast tempo (patient rushes, loses control)

Contre-indications: Même que bird dog - douleur genou, vertige, tunnel carpien, pathologie épaule.`,
    
    dosage_reps: '10-12 par côté',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 12,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '4',
    effectiveness_score: 80,
    
    key_points: [
      'Challenge neuromoteur ↑ 30-40% vs bird dog statique',
      'Coordination dynamique reciprocal pattern',
      'Prerequisite: Bird dog statique 10s hold',
      'Tempo contrôlé 2-1-2 crucial'
    ],
    
    contraindications: [
      'Douleur genou position quadruped',
      'Vertige position tête basse',
      'Syndrome tunnel carpien',
      'Pathologie épaule'
    ],
    
    tags: {
      phase: ['chronic', 'prevention', 'return_sport'],
      pattern: ['instability', 'coordination_deficit', 'proprioceptive_deficit'],
      mechanism: ['stabilization', 'motor_control', 'coordination', 'proprioception'],
      level: ['intermediate'],
      equipment: ['none', 'mat'],
      setting: ['clinic', 'gym']
    },
    
    indications: {
      primary: ['chronic_lbp', 'instability', 'coordination_impairment', 'return_sport'],
      secondary: ['prevention', 'proprioceptive_training', 'athlete_training'],
      contraindications: ['quadruped_knee_pain', 'positional_vertigo', 'carpal_tunnel', 'shoulder_pathology']
    },
    
    clinical_reasoning: 'Evidence Level 4 (indirect Behm 2010, Ferreira 2007): Dynamic stability training supérieur statique. Challenge neuromoteur ↑ 30-40%. Coordination reciprocal pattern fonctionnel. Prerequisite bird dog statique 10s mastery.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'ROM partiel 50%', 
        reps: '8-10', 
        sets: '3',
        tempo: '2-1-2',
        notes: 'Apprentissage pattern'
      },
      { 
        level: 2, 
        description: 'ROM complet', 
        reps: '10-12', 
        sets: '3',
        tempo: '2-1-2',
        notes: 'Standard execution'
      },
      { 
        level: 3, 
        description: 'Tempo lent 3-2-3', 
        reps: '10-12', 
        sets: '3',
        tempo: '3-2-3',
        notes: 'Maximum control'
      },
      { 
        level: 4, 
        description: 'Avec resistance band', 
        reps: '8-10', 
        sets: '3',
        notes: 'Strength challenge'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Wall Sit',
    name_fr: 'Chaise Murale',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Squat isométrique contre mur pour renforcement quadriceps et extenseurs hanche avec décharge axiale lombaire minimale.',
    
    instructions_patient: `Position de départ: Dos contre un mur, pieds à 30-45cm du mur.

Exécution:
1. Glissez le dos le long du mur en descendant
2. Arrêtez quand vos genoux sont à 90° (position assise)
3. Gardez le dos complètement COLLÉ au mur
4. Maintenez cette position 20-45 secondes
5. Glissez vers le haut pour remonter
6. Reposez-vous 30 secondes
7. Répétez 3-4 fois

Points clés:
- Genoux à 90° (alignés avec chevilles, pas devant orteils)
- Poids sur les TALONS (pas sur les orteils)
- Dos entièrement contre le mur (toute la colonne)
- Respirez normalement (ne bloquez pas!)
- Excellent pour renforcement jambes sans stress lombaire`,
    
    instructions_professional: `Indications: Renforcement quadriceps/extenseurs hanche, décharge axiale lombaire, alternative squat/deadlift phase aiguë-subaiguë, deconditioning.

Biomécanique décharge lombaire:
- Mur support posterior: ↓ 60-70% charge axiale lombaire vs squat libre
- Moment extension hanche/genou: Quadriceps 60%, GM 25%, hamstrings 15%
- Force compression lombaire: 0.8-1.2× BW vs 2.5-3.0× BW squat standard
- Avantage: Strength training sans excessive spinal loading

Activation musculaire (EMG Escamilla 2001):
- Vastus medialis: 60-70% MVC
- Vastus lateralis: 65-75% MVC
- Rectus femoris: 50-60% MVC
- Gluteus maximus: 35-45% MVC
- Hamstrings: 30-40% MVC
- Erector spinae: 20-30% MVC (minimal = optimal)

Angle optimal:
- 90° knee flexion: Maximum quadriceps activation
- 60° knee flexion: ↓ Patellofemoral stress (si douleur genou)
- 110° knee flexion: Easier (si faiblesse majeure)

Progression hold time:
Phase 1: 20-30s hold = baseline functional
Phase 2: 45-60s hold = good endurance
Phase 3: 90s+ hold = excellent endurance
Athlete: 2-3min hold target

Progressions exercice:
1. Wall sit 90° static hold: Baseline
2. Wall sit avec single leg lift alterné: Dynamic stability
3. Wall sit avec arm reach forward/overhead: Perturbation
4. Wall sit avec resistance band hip abduction: GM activation
5. Transition squat dynamique (si toléré)

Evidence:
- Escamilla et al. (2001): Wall sit ↓ spinal load vs squat
- Schoenfeld (2010): Isometric training efficace strength (d=0.65)
- Pas de RCT wall sit specific LBP (Level 4)

Tests:
- Hold time goal: 45-60s functional capacity
- Visual goniometer: Knee angle verification 90°
- Pain VAS pre/post: Should not increase

Clinical pearls:
- Excellent transition exercise (bed rest → functional activities)
- Low skill requirement (easy teaching)
- Home program compliance élevée (simple, no equipment except wall)
- Bridge to squat progression when tolerated

Contre-indications: Patellofemoral pain severe (réduire angle 60°), acute knee injury, douleur lombaire aggravée position assise prolongée.`,
    
    dosage_reps: '3-4 holds',
    dosage_sets: '2-3',
    dosage_frequency: '3-4x/semaine',
    reps_optimal: 4,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '4',
    effectiveness_score: 76,
    
    key_points: [
      'Décharge axiale ↓ 60-70% vs squat (Escamilla 2001)',
      'Angle 90° optimal quadriceps activation',
      'Hold time target: 45-60s functional',
      'Excellent transition bed rest → functional'
    ],
    
    contraindications: [
      'Patellofemoral pain sévère (modifier angle 60°)',
      'Acute knee injury',
      'Douleur aggravée position assise prolongée'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'deconditioning'],
      pattern: ['weak_extensors', 'deconditioning', 'non_specific'],
      mechanism: ['strengthening', 'endurance'],
      level: ['intermediate'],
      equipment: ['wall'],
      setting: ['home', 'clinic', 'gym', 'workplace']
    },
    
    indications: {
      primary: ['deconditioning', 'quadriceps_weakness', 'chronic_lbp', 'transition_exercise'],
      secondary: ['prevention', 'lower_extremity_weakness', 'return_function'],
      contraindications: ['severe_patellofemoral_pain', 'acute_knee_injury', 'sitting_intolerance']
    },
    
    clinical_reasoning: 'Evidence Level 4 (Escamilla 2001, Schoenfeld 2010): Wall sit ↓ spinal load 60-70% vs squat. Isometric training efficace strength (d=0.65). Hold 45-60s = functional capacity. Excellent bridge bed rest → squat progression.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Hold 20-30s angle 90°', 
        hold_time: '20-30s', 
        reps: '3-4',
        notes: 'Baseline functional'
      },
      { 
        level: 2, 
        description: 'Hold 45-60s', 
        hold_time: '45-60s', 
        reps: '3-4',
        notes: 'Good endurance'
      },
      { 
        level: 3, 
        description: 'Hold 90s+', 
        hold_time: '90s', 
        reps: '2-3',
        notes: 'Excellent endurance'
      },
      { 
        level: 4, 
        description: 'Single leg lift alterné', 
        reps: '10-12', 
        sets: '3',
        notes: 'Dynamic stability challenge'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'McGill Curl-Up',
    name_fr: 'Curl-Up McGill (Abdominal)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Flexion cervico-thoracique contrôlée selon protocole McGill pour activation rectus abdominis avec minimisation stress flexion lombaire.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, une jambe pliée, l'autre tendue, mains sous le bas du dos.

Exécution:
1. Placez vos mains sous votre lordose lombaire (creux du dos)
2. Une jambe pliée, l'autre tendue au sol
3. Levez SEULEMENT la tête et les épaules du sol (10-15cm max)
4. Gardez le menton rentré (comme tenant une orange sous le menton)
5. Maintenez 8-10 secondes en haut
6. Redescendez avec SUPER contrôle (pas de drop)
7. Répétez 5-8 fois
8. Changez jambe pliée

Points clés CRITIQUES:
- Les MAINS protègent le bas du dos (crucial!)
- Levez SEULEMENT tête/épaules (PAS tout le tronc)
- Le BAS DU DOS ne bouge PAS (reste sur les mains)
- Hold 8-10s en haut (isométrique)
- Descente LENTE contrôlée (4-5 secondes)`,
    
    instructions_professional: `Indications: Renforcement rectus abdominis sans flexion lombaire excessive, alternative sit-ups traditionnels, chronic LBP, McGill Big 3 protocol component.

Rationale McGill design:
- Hands under lordosis: Maintain lumbar neutral, ↓ flexion stress
- Small ROM (head/shoulders only): Minimize lumbar flexion <15°
- Isometric hold: Endurance training vs dynamic repetitive flexion
- One leg bent: ↓ Psoas activation, ↓ anterior pelvic tilt tendency

Biomécanique protection lombaire:
- Flexion lombaire minimale: <10-15° vs 40-50° sit-up traditionnel
- Force compression discale: 1.2-1.5× BW vs 2.8-3.5× BW sit-up
- Stress flexion cumulatif: ↓ 70-80% vs sit-up (McGill 2007)
- Activation RA sans excessive spine loading

Activation musculaire (EMG McGill 2001):
- Rectus abdominis: 55-65% MVC (good activation)
- External obliques: 40-50% MVC
- Hip flexors (psoas): 15-25% MVC (minimal = optimal)
- Erector spinae: 20-30% MVC (co-contraction acceptable)

McGill Big 3 Protocol:
1. McGill Curl-up: RA activation
2. Side plank: QL/obliques activation
3. Bird dog: Multifidus/extensors activation
Combined = comprehensive core stability training

Technique precision:
- Chin tuck (double chin): ↓ Cervical strain, maintain cervical lordosis
- Hands position: Directly under L4-L5 lordosis
- ROM: Scapulae just clear floor (8-10cm lift max)
- Hold: 8-10s optimal (longer = fatigue loss form)
- Eccentric: 4-5s controlled lowering (critical component)

Common errors:
✗ Excessive trunk flexion (>30cm lift)
✗ Hands not supporting lumbar spine
✗ Fast jerky motion (loss control)
✗ Breath holding (apnea)
✗ Chin jutting forward (cervical hyperextension)

Progressions:
1. Modified curl-up both legs bent: Easier
2. McGill curl-up standard: Baseline
3. Curl-up avec arm reach forward: ↑ Moment arm
4. Curl-up avec weight on chest: ↑ Resistance

Evidence:
- McGill et al. (2007): Curl-up ↓ spine loading 70-80% vs sit-up
- McGill (2001): Big 3 protocol efficace chronic LBP
- Axler & McGill (1997): Curl-up RA 55-65% MVC optimal

Tests:
- Hold time: 8-10s × 5-8 reps = functional
- Form check: Video lateral view (no excessive flexion)
- Pain provocation: Should not increase symptoms

Contre-indications: Acute disc herniation flexion-intolerant, cervical radiculopathy, diastase récti sévère non contrôlée.`,
    
    dosage_reps: '5-8',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 8,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '2A',
    effectiveness_score: 82,
    
    key_points: [
      'Flexion lombaire minimale <15° (McGill 2007)',
      'Force compression ↓ 70% vs sit-up traditionnel',
      'Mains sous lordose protègent colonne',
      'Hold 8-10s isométrique optimal'
    ],
    
    contraindications: [
      'Acute disc herniation flexion-intolerant',
      'Cervical radiculopathy',
      'Diastase récti sévère'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention'],
      pattern: ['weak_anterior_core', 'non_specific'],
      mechanism: ['strengthening', 'stabilization'],
      level: ['intermediate'],
      equipment: ['none', 'mat'],
      setting: ['home', 'clinic', 'gym']
    },
    
    indications: {
      primary: ['chronic_lbp', 'rectus_abdominis_weakness', 'core_endurance_deficit'],
      secondary: ['prevention', 'mcgill_big3_protocol', 'return_function'],
      contraindications: ['acute_flexion_intolerant_disc', 'cervical_radiculopathy', 'severe_diastasis']
    },
    
    clinical_reasoning: 'Evidence Level 2A (McGill 2007, 2001): Curl-up ↓ spinal loading 70-80% vs sit-up, force compression 1.2-1.5× BW vs 2.8-3.5×. RA activation 55-65% MVC optimal. McGill Big 3 component efficace chronic LBP.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Both legs bent (easier)', 
        reps: '5-8', 
        sets: '3',
        hold_time: '8s',
        notes: 'Modified version'
      },
      { 
        level: 2, 
        description: 'Standard one leg bent', 
        reps: '5-8', 
        sets: '3',
        hold_time: '10s',
        notes: 'McGill protocol'
      },
      { 
        level: 3, 
        description: 'Arm reach forward', 
        reps: '6-10', 
        sets: '3',
        hold_time: '8-10s',
        notes: '↑ Moment arm challenge'
      },
      { 
        level: 4, 
        description: 'Weight on chest', 
        reps: '5-8', 
        sets: '3',
        hold_time: '8s',
        notes: 'Advanced resistance'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Standing Hip Hinge',
    name_fr: 'Charnière Hanche Debout',
    body_region: 'lumbar',
    exercise_type: 'motor_control',
    description: 'Pattern movement flexion hanche avec colonne neutre pour apprentissage mécanique corporelle sécuritaire et prévention blessures soulèvement.',
    
    instructions_patient: `Position de départ: Debout, pieds largeur hanches, un bâton le long de votre dos.

Exécution:
1. Tenez un bâton (ou manche à balai) contre votre dos
2. Le bâton touche votre tête, entre les omoplates, et vos fesses
3. Penchez-vous vers l'avant EN PLIANT LES HANCHES (pas le dos!)
4. Le bâton doit RESTER EN CONTACT avec les 3 points pendant tout le mouvement
5. Descendez jusqu'à sentir étirement arrière cuisses
6. Remontez en poussant les hanches vers l'avant
7. Répétez 10-15 fois

Points clés CRITIQUES:
- Le DOS reste DROIT (le bâton ne décolle jamais!)
- Vous pliez aux HANCHES (pas à la taille)
- Les genoux plient légèrement (10-20°)
- Sentez l'étirement derrière les cuisses
- C'est le MOUVEMENT DE BASE pour soulever des objets!`,
    
    instructions_professional: `Indications: Apprentissage mécanique corporelle, pattern lifting sécuritaire, prévention lombalgie occupationnelle, éducation patient, préparation deadlift.

Rationale movement pattern:
- Hip hinge = fundamental movement pattern (squat, deadlift, bend, lift)
- Spine neutral maintained: ↓ Stress flexion discal
- Hip flexion primary: Load posterior chain (GM, hamstrings) vs lumbar extensors
- Functional transfer: ADL lifting (groceries, child, laundry, etc.)

Biomécanique optimal:
- Hip flexion: 60-90° (primary movement)
- Lumbar flexion: 0-10° (minimal - spine neutral maintained)
- Knee flexion: 10-20° (slight bend unlock knees)
- Load distribution: 70% hamstrings/GM, 30% erector spinae

Dowel rod feedback (3-point contact):
1. Occiput (back of head)
2. Thoracic spine (between scapulae)
3. Sacrum (pelvis)
Loss contact = lumbar flexion occurring = WRONG

Teaching progression:
Phase 1 (Weeks 1-2): Dowel rod feedback, BW only, 10-15 reps, focus form perfect
Phase 2 (Weeks 2-3): Remove dowel, maintain pattern, proprioceptive cueing
Phase 3 (Weeks 3-4): Add light load (dumbbell 5-10kg), maintain form
Phase 4 (Weeks 4+): Functional transfer ADL, lift objects floor

Common compensations:
✗ Lumbar flexion (dowel loses contact sacrum)
✗ Cervical hyperextension (looking up excessively)
✗ Knee hyperextension (locking knees)
✗ Insufficient hip flexion ROM (hamstring tightness limiting)

Progressions functional:
1. Hip hinge BW avec dowel: Baseline motor learning
2. Hip hinge sans dowel: Proprioceptive maintenance
3. Single leg RDL (Romanian deadlift): Balance challenge
4. Kettlebell/dumbbell deadlift: Load introduction
5. Barbell deadlift: Advanced strength

Evidence:
- Nolan et al. (2014): Movement training ↓ LBP occupational workers (RR=0.58)
- Sahrmann (2002): Hip hinge fundamental pattern chronic LBP rehabilitation
- Pas de RCT spécifique hip hinge training (Level 4)

Tests mouvement:
- Active Straight Leg Raise: Hamstring flexibility prerequisite
- Dowel rod test: 3-point contact maintained entire ROM
- Functional Lifting test: Transfer to actual lifting tasks

Clinical pearls:
- EVERY patient LBP should learn hip hinge (foundational skill)
- Dowel rod feedback ↑ learning 60-70% (kinesthetic awareness)
- Hamstring flexibility often limiting factor (address concurrent)
- Home program: Practice 10-15 reps daily (motor learning requires repetition)

Contre-indications: Acute hamstring strain, severe hamstring tightness preventing pattern (treat first), vertigo position flexion.`,
    
    dosage_reps: '10-15',
    dosage_sets: '3',
    dosage_frequency: '5-7x/semaine (daily optimal motor learning)',
    reps_optimal: 15,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '4',
    effectiveness_score: 85,
    
    key_points: [
      'Spine neutral maintenu (dowel 3-point contact)',
      'Hip flexion 60-90° primary movement',
      'Nolan 2014: Movement training ↓ LBP occupational (RR=0.58)',
      'Daily practice optimal motor learning'
    ],
    
    contraindications: [
      'Acute hamstring strain',
      'Severe hamstring tightness',
      'Vertigo position flexion'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention', 'education'],
      pattern: ['non_specific', 'poor_body_mechanics'],
      mechanism: ['motor_control', 'education', 'prevention'],
      level: ['intermediate'],
      equipment: ['dowel_rod', 'broomstick'],
      setting: ['clinic', 'home', 'workplace']
    },
    
    indications: {
      primary: ['chronic_lbp', 'prevention', 'occupational_lbp', 'body_mechanics_education'],
      secondary: ['pre_deadlift_training', 'functional_training', 'return_work'],
      contraindications: ['acute_hamstring_strain', 'severe_hamstring_tightness', 'flexion_vertigo']
    },
    
    clinical_reasoning: 'Evidence Level 4 (Nolan 2014, Sahrmann 2002): Movement training ↓ LBP occupational (RR=0.58). Hip hinge = fundamental pattern ADL lifting. Dowel feedback ↑ learning 60-70%. Daily practice crucial motor learning. Foundation deadlift/lifting sécuritaire.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'BW avec dowel rod feedback', 
        reps: '10-15', 
        sets: '3',
        tempo: 'Slow',
        notes: 'Motor learning phase'
      },
      { 
        level: 2, 
        description: 'Sans dowel proprioceptive', 
        reps: '12-15', 
        sets: '3',
        tempo: 'Moderate',
        notes: 'Pattern maintenance'
      },
      { 
        level: 3, 
        description: 'Light load (5-10kg)', 
        reps: '10-12', 
        sets: '3',
        notes: 'Introduction résistance'
      },
      { 
        level: 4, 
        description: 'Functional ADL transfer', 
        reps: 'As needed', 
        sets: 'Throughout day',
        notes: 'Real-life application'
      }
    ],
    
    status: 'active'
  }
];

export default lumbarExercisesLevel2Part2;
