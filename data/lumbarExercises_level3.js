/**
 * EXERCICES LOMBAIRES - NIVEAU 3 (AVANCÉ / CHRONIC / RETURN TO SPORT)
 * 25 exercices haute intensité basés sur évidence
 */

export const lumbarExercisesLevel3 = [
  {
    name: 'Conventional Deadlift',
    name_fr: 'Soulevé de Terre Conventionnel',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Pattern lift fondamental pour renforcement chaîne postérieure complète avec charge progressive externe, gold standard force extenseurs.',
    
    instructions_patient: `Position de départ: Debout, barre au sol devant vous, pieds largeur hanches.

Exécution:
1. Descendez en pliant hanches ET genoux (squat partiel)
2. Saisissez la barre largeur épaules, dos PLAT
3. Inspirez, contractez abdominaux (bracing)
4. Poussez dans les talons et levez la barre
5. Gardez barre PROCHE du corps (frôle les jambes)
6. Finissez debout, épaules en arrière
7. Redescendez avec contrôle, dos plat
8. Posez barre au sol entre chaque rep

Points clés CRITIQUES:
- DOS reste PLAT toujours (colonne neutre)
- Barre COLLE aux jambes (trajectoire verticale)
- Poussez le SOL avec les pieds (pas tirer avec le dos)
- Bracing abdominal AVANT chaque rep
- Commencez LÉGER (technique > poids)`,
    
    instructions_professional: `Indications: Renforcement maximal chaîne postérieure, return to sport/work, force fonctionnelle, prevention, athlete training.

Biomécanique pattern lift:
- Moment extension: Hanches 60%, genoux 25%, lombalgie 15%
- Force compression lombaire: 3.0-4.5× BW (charge-dépendant)
- ROM: Hip flexion 70-90°, knee flexion 40-60°, lumbar flexion minimal (<10°)
- Pattern optimal: Hip hinge dominant, spine neutral maintained

Activation musculaire (EMG Swinton 2011):
- Erector spinae lombaire: 80-100% MVC (maximum)
- Gluteus maximus: 85-95% MVC (near-maximum)
- Hamstrings: 70-85% MVC
- Quadriceps: 50-60% MVC
- Latissimus dorsi: 45-55% MVC (barre proximité)
- Rectus abdominis: 40-50% MVC (bracing)

Protocole progression charge:
Phase 1 (Semaines 1-2): Technique BW/PVC pipe, perfect form, 15-20 reps
Phase 2 (Semaines 2-4): Light load 20-30% BW, 10-12 reps, 3-4 sets
Phase 3 (Semaines 4-8): Moderate 40-60% BW, 8-10 reps, 4 sets
Phase 4 (Semaines 8-12): Heavy 60-80% BW, 5-8 reps, 4-5 sets
Phase 5 (12+ sem): Progressive overload, periodization

Critères qualité mouvement (checklist):
✓ Spine neutral entire lift (no flexion-extension)
✓ Bar path vertical (close to shins/thighs)
✓ Shoulders over/slightly anterior bar at start
✓ Hip hinge primary pattern
✓ Weight on midfoot-heel (not toes)
✓ Bracing maintained throughout
✓ Smooth controlled tempo (no jerking)

Common technical faults (correct immédiatement):
✗ Lumbar flexion (cat back) - STOP, reduce load
✗ Bar away from body (inefficient leverage)
✗ Hips rise too fast (back angle horizontal)
✗ Knees cave in (valgus collapse)
✗ Loss neutral spine (hyperextension top)

Variations progression:
1. Trap bar deadlift: Easier, ↓ shear lombaire 30%
2. Sumo deadlift: ↓ Trunk angle, ↑ quad emphasis
3. Romanian deadlift (RDL): Hip hinge pure, eccentric emphasis
4. Single leg RDL: Unilateral, balance challenge

Evidence (FORT):
- Swinton et al. (2011): Deadlift activation erector spinae/GM maximale (Level 2A)
- Berglund et al. (2015): Deadlift training ↓ LBP 2.5 points VAS chronic patients
- McGill (2015): Deadlift = functional lift training essential occupational LBP prevention
- Chilibeck et al. (2004): Deadlift ↑ bone density L2-L4 (osteoporosis prevention)

Tests pré-deadlift (prerequisites):
- Hip hinge BW 20 reps perfect form
- Active SLR >70° bilateral
- Squat pattern functional
- No acute LBP exacerbation

Dosage clinique par phase:
- Post-acute (12+ sem): Light 20-30% BW, 10-12 reps, technique focus
- Chronic stable: Moderate 40-60% BW, 8-10 reps, 4 sets
- Return sport: Heavy 60-80% BW, 5-8 reps, strength focus
- Maintenance: 2x/semaine, varied load 40-70% BW

Contre-indications ABSOLUES: Acute disc herniation, spondylolisthésis grade 3+, osteoporosis sévère, radiculopathie progressive, technique impossible corriger.

Contre-indications RELATIVES: Spondylolisthésis grade 2, stenosis modérée (modifier technique), history multiple herniations (supervision stricte).`,
    
    dosage_reps: '5-8',
    dosage_sets: '4-5',
    dosage_frequency: '2x/semaine',
    reps_optimal: 6,
    sets_optimal: 4,
    difficulty_level: 'advanced',
    evidence_level: '2A',
    effectiveness_score: 95,
    
    key_points: [
      'Gold standard chaîne postérieure (Swinton 2011)',
      'Erector spinae 80-100% MVC, GM 85-95% MVC',
      'Spine neutral ABSOLU (compression 3.0-4.5× BW)',
      'Progression charge 20% → 80% BW sur 12 semaines',
      'Hip hinge prerequisite mandatory'
    ],
    
    contraindications: [
      'Acute disc herniation',
      'Spondylolisthésis grade 3+',
      'Ostéoporose sévère',
      'Radiculopathie progressive',
      'Incapacité maintenir spine neutral'
    ],
    
    tags: {
      phase: ['chronic', 'return_sport', 'prevention', 'maintenance'],
      pattern: ['non_specific', 'deconditioning', 'functional_training'],
      mechanism: ['strengthening', 'functional', 'power'],
      level: ['advanced'],
      equipment: ['barbell', 'weights', 'platform'],
      setting: ['gym', 'clinic_advanced']
    },
    
    indications: {
      primary: ['chronic_lbp_stable', 'return_sport', 'occupational_prevention', 'strength_deficit_major'],
      secondary: ['deconditioning', 'osteoporosis_prevention', 'athlete_training', 'functional_capacity'],
      contraindications: ['acute_disc_herniation', 'spondylolisthesis_grade3+', 'severe_osteoporosis', 'progressive_radiculopathy', 'technical_inability']
    },
    
    clinical_reasoning: 'Evidence Level 2A (Swinton 2011, Berglund 2015, McGill 2015): Deadlift activation maximale erector spinae/GM (80-100%/85-95% MVC). Berglund: ↓ LBP 2.5 points VAS chronic. McGill: Essential functional lift occupational prevention. Chilibeck: ↑ Bone density L2-L4. Prerequisite hip hinge mastery. Progression charge 20% → 80% BW 12 semaines. Spine neutral maintenance absolute sous compression 3.0-4.5× BW.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Technique BW/PVC pipe', 
        reps: '15-20', 
        sets: '3',
        load: 'BW',
        notes: 'Perfect form emphasis'
      },
      { 
        level: 2, 
        description: 'Light load 20-30% BW', 
        reps: '10-12', 
        sets: '3-4',
        load: '20-30% BW',
        notes: 'Volume phase'
      },
      { 
        level: 3, 
        description: 'Moderate 40-60% BW', 
        reps: '8-10', 
        sets: '4',
        load: '40-60% BW',
        notes: 'Strength building'
      },
      { 
        level: 4, 
        description: 'Heavy 60-80% BW', 
        reps: '5-8', 
        sets: '4-5',
        load: '60-80% BW',
        notes: 'Strength/power'
      },
      { 
        level: 5, 
        description: 'Progressive overload periodization', 
        reps: '3-12 varied', 
        sets: '3-5',
        load: '50-85% BW cycles',
        notes: 'Advanced programming'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Barbell Back Squat',
    name_fr: 'Squat Barre (Back Squat)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Squat bilateral avec charge externe pour renforcement global membres inférieurs et tronc, pattern fonctionnel fundamental.',
    
    instructions_patient: `Position: Debout, barre sur trapèzes supérieurs, pieds largeur épaules.

Exécution:
1. Barre repose sur trapèzes (pas cou!)
2. Inspirez, contractez abdominaux (bracing)
3. Descendez en pliant hanches ET genoux
4. Gardez dos DROIT, poitrine haute
5. Descendez jusqu'à cuisses parallèles sol (ou plus si mobile)
6. Remontez en poussant talons
7. Finissez debout complet
8. Répétez 6-10 fois

Points clés:
- DOS reste DROIT (vertical si possible)
- Genoux suivent direction orteils (pas valgus)
- Poids sur talons-milieu pied
- Bracing abdominal constant
- Commencez barre vide (20kg)`,
    
    instructions_professional: `Indications: Renforcement global membres inférieurs, core stability sous charge, return to sport, functional capacity, osteoporosis prevention.

Biomécanique squat:
- Moment extension: Hanches 45%, genoux 40%, lombalgie 15%
- Force compression lombaire: 2.5-4.0× BW (profondeur/charge-dépendant)
- Activation: Quadriceps 70-90% MVC, GM 60-80% MVC, erector spinae 50-70% MVC

Progression charge:
Phase 1: Bar technique (20kg), 12-15 reps, form perfect
Phase 2: Light 30-40% BW, 10-12 reps
Phase 3: Moderate 50-70% BW, 8-10 reps
Phase 4: Heavy 70-90% BW, 5-8 reps

Evidence Level: 2A (Schoenfeld 2010, Escamilla 2001)
Effectiveness: 92/100

Contre-indications: Acute LBP, spondylolisthésis grade 2+, severe stenosis, inability maintain spine neutral.`,
    
    dosage_reps: '6-10',
    dosage_sets: '4',
    dosage_frequency: '2x/semaine',
    reps_optimal: 8,
    sets_optimal: 4,
    difficulty_level: 'advanced',
    evidence_level: '2A',
    effectiveness_score: 92,
    
    key_points: [
      'Quad 70-90% MVC, GM 60-80% MVC',
      'Compression 2.5-4.0× BW (gérable vs deadlift)',
      'Spine neutral + bracing essentiel',
      'Depth parallel optimal (compromise safety/effectiveness)'
    ],
    
    contraindications: [
      'Acute LBP',
      'Spondylolisthésis grade 2+',
      'Severe stenosis',
      'Inability spine neutral'
    ],
    
    tags: {
      phase: ['chronic', 'return_sport', 'prevention'],
      pattern: ['non_specific', 'deconditioning', 'functional'],
      mechanism: ['strengthening', 'functional'],
      level: ['advanced'],
      equipment: ['barbell', 'squat_rack'],
      setting: ['gym']
    },
    
    indications: {
      primary: ['chronic_lbp_stable', 'return_sport', 'strength_deficit', 'functional_training'],
      secondary: ['osteoporosis_prevention', 'athlete_training'],
      contraindications: ['acute_lbp', 'spondylolisthesis_grade2+', 'severe_stenosis', 'technical_inability']
    },
    
    clinical_reasoning: 'Evidence Level 2A (Schoenfeld 2010, Escamilla 2001): Squat renforcement global optimal quadriceps/GM/core. Compression 2.5-4.0× BW gérable avec technique. Functional pattern essential ADL. Progression 20kg → 70-90% BW.',
    
    progression_levels: [
      { level: 1, description: 'Bar only 20kg technique', reps: '12-15', sets: '3', notes: 'Form mastery' },
      { level: 2, description: 'Light 30-40% BW', reps: '10-12', sets: '4', notes: 'Volume' },
      { level: 3, description: 'Moderate 50-70% BW', reps: '8-10', sets: '4', notes: 'Strength' },
      { level: 4, description: 'Heavy 70-90% BW', reps: '5-8', sets: '4', notes: 'Power' }
    ],
    
    status: 'active'
  },

  {
    name: 'Turkish Get-Up',
    name_fr: 'Relevé Turc',
    body_region: 'lumbar',
    exercise_type: 'functional',
    description: 'Mouvement complexe multi-plan du sol debout avec charge overhead pour intégration stabilité-mobilité-force complète.',
    
    instructions_patient: `Position: Allongé, kettlebell dans main droite bras tendu vertical.

Exécution (7 étapes):
1. Roulez sur coude gauche (kettlebell reste vertical!)
2. Poussez main gauche, redressez tronc
3. Levez hanches (bridge position)
4. Glissez jambe gauche arrière (position kneeling)
5. Redressez tronc vertical
6. Levez-vous debout (kettlebell toujours overhead!)
7. Inversez étapes pour redescendre

Points clés:
- Kettlebell reste VERTICAL tout le mouvement
- Regard sur kettlebell constant
- Mouvement LENT contrôlé (30-45s total)
- Chaque étape distincte et stable
- Exercice ULTIME stabilité-coordination`,
    
    instructions_professional: `Indications: Intégration stabilité totale, shoulder stability, return to sport high level, proprioception maximale, functional capacity ultimate.

Complexité neuromotrice:
- 7 positions transitions
- Multi-plan: Sagittal, frontal, transverse simultanés
- Challenge stabilité: Shoulder, scapula, core, hip dans tous plans
- Proprioception: Feedback continu position kettlebell overhead
- Coordination: Timing séquence segment-to-segment

Activation intégrative (EMG estimations):
- Rotator cuff (shoulder overhead): 70-80% MVC
- Serratus anterior: 60-70% MVC
- Obliques: 60-75% MVC (rotation control)
- QL: 50-60% MVC
- Multifidus: 55-65% MVC
- GM: 65-75% MVC (transitions)

Progression charge (kettlebell):
Phase 1 (Semaines 1-2): BW practice (no load), perfect sequence
Phase 2 (Semaines 2-4): 4-8kg, slow tempo 45s
Phase 3 (Semaines 4-8): 8-12kg, controlled 30-40s
Phase 4 (Semaines 8+): 12-20kg, smooth 25-35s

Evidence:
- Pas de RCT spécifique (Level 5)
- Clinical consensus: Ultimate functional assessment/training
- Gray Cook FMS: Get-up component screening tool
- Strength & Conditioning: Staple exercise athletes

Benefits multiples:
- Shoulder stability overhead position
- Thoracic spine mobility
- Hip mobility (multiple positions)
- Core anti-rotation/anti-lateral flexion
- Proprioception enhancement
- Functional transfer floor-to-stand

Tests readiness:
- Overhead squat pattern functional
- Shoulder flexion ROM >170°
- Hip mobility adequate (FMS >2 get-up)
- Core stability intermediate level

Contre-indications: Shoulder pathology (rotator cuff tear, impingement severe), acute LBP, severe balance deficit, inability maintain kettlebell overhead.`,
    
    dosage_reps: '3-5 par côté',
    dosage_sets: '2-3',
    dosage_frequency: '2x/semaine',
    reps_optimal: 5,
    sets_optimal: 3,
    difficulty_level: 'advanced',
    evidence_level: '5',
    effectiveness_score: 90,
    
    key_points: [
      'Ultimate functional exercise (Gray Cook FMS)',
      'Multi-plan integration stabilité-mobilité-force',
      '7 transitions complexité neuromotrice maximale',
      'Shoulder overhead stability critical',
      'Slow tempo 30-45s per rep optimal learning'
    ],
    
    contraindications: [
      'Shoulder pathology (rotator cuff tear)',
      'Acute LBP',
      'Severe balance deficit',
      'Inability overhead position'
    ],
    
    tags: {
      phase: ['chronic', 'return_sport', 'athlete_training'],
      pattern: ['functional', 'integration', 'proprioceptive_deficit'],
      mechanism: ['functional', 'stabilization', 'coordination', 'proprioception'],
      level: ['advanced'],
      equipment: ['kettlebell'],
      setting: ['gym', 'clinic_advanced']
    },
    
    indications: {
      primary: ['return_sport_high_level', 'functional_capacity_ultimate', 'athlete_training', 'integration_training'],
      secondary: ['chronic_lbp_stable', 'shoulder_stability', 'proprioception_training'],
      contraindications: ['shoulder_pathology', 'acute_lbp', 'severe_balance_deficit', 'overhead_inability']
    },
    
    clinical_reasoning: 'Evidence Level 5 (clinical consensus): Turkish get-up = ultimate functional exercise. Gray Cook FMS component. Multi-plan integration 7 transitions. Shoulder stability overhead + core anti-rotation + hip mobility. Progression BW → 4-20kg kettlebell. Slow tempo 30-45s optimal neuromotor learning.',
    
    progression_levels: [
      { level: 1, description: 'BW practice sequence', reps: '3-5', sets: '2', load: 'BW', notes: 'Learn 7 steps' },
      { level: 2, description: 'Light 4-8kg slow', reps: '3-5', sets: '2-3', load: '4-8kg', tempo: '45s', notes: 'Control emphasis' },
      { level: 3, description: 'Moderate 8-12kg', reps: '3-5', sets: '3', load: '8-12kg', tempo: '30-40s', notes: 'Standard' },
      { level: 4, description: 'Heavy 12-20kg smooth', reps: '3-5', sets: '3', load: '12-20kg', tempo: '25-35s', notes: 'Advanced' }
    ],
    
    status: 'active'
  }

,

  {
    name: 'Single Leg Romanian Deadlift (RDL)',
    name_fr: 'Soulevé de Terre Roumain Une Jambe',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Hip hinge unilateral avec charge pour renforcement chaîne postérieure + stabilité single leg + proprioception.',
    instructions_patient: `Position: Debout jambe droite, kettlebell main droite. Exécution: Penchez tronc avant (hip hinge), jambe gauche tend arrière, descendez kettlebell vers sol, remontez. 8-12 reps. Points clés: Dos PLAT, jambe libre et tronc 1 ligne droite, équilibre constant.`,
    instructions_professional: `Indications: Unilateral strength asymmetry, balance deficit, return to sport, proprioception. Activation (EMG): GM 70-80% MVC single leg, hamstrings 65-75%, erector spinae 60-70%, stabilizers hip/ankle 50-60%. Progression: BW → 8-24kg. Evidence Level 3, Effectiveness 88/100. Contre-indications: Acute LBP, severe balance deficit, inability maintain spine neutral.`,
    dosage_reps: '8-12',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'advanced',
    evidence_level: '3',
    effectiveness_score: 88,
    key_points: ['GM 70-80% MVC unilateral', 'Balance + strength integration', 'Spine neutral single leg challenge', 'Functional transfer running/sport'],
    contraindications: ['Acute LBP', 'Severe balance deficit', 'Spine neutral inability'],
    tags: { phase: ['chronic', 'return_sport'], pattern: ['functional', 'asymmetry'], mechanism: ['strengthening', 'proprioception', 'balance'], level: ['advanced'], equipment: ['kettlebell', 'dumbbell'], setting: ['gym', 'clinic'] },
    indications: { primary: ['unilateral_strength_deficit', 'return_sport', 'balance_training', 'asymmetry'], secondary: ['chronic_lbp_stable', 'functional_capacity'], contraindications: ['acute_lbp', 'severe_balance_deficit'] },
    clinical_reasoning: 'Evidence Level 3: Single leg RDL activation GM 70-80% MVC unilateral, hamstrings 65-75%, balance challenge proprioceptive. Functional transfer running/sport. Progression BW → 24kg. Spine neutral single leg = advanced stability.',
    progression_levels: [
      { level: 1, description: 'BW balance focus', reps: '10-12', sets: '3', load: 'BW' },
      { level: 2, description: '8-12kg', reps: '8-10', sets: '3', load: '8-12kg' },
      { level: 3, description: '12-20kg', reps: '8-10', sets: '3', load: '12-20kg' },
      { level: 4, description: '20-24kg', reps: '6-8', sets: '3', load: '20-24kg' }
    ],
    status: 'active'
  },

  {
    name: 'Farmer\'s Carry (Heavy)',
    name_fr: 'Portage Fermier (Charge Lourde)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Portage bilateral charge lourde pour anti-lateral flexion core, grip strength, functional capacity occupational.',
    instructions_patient: `Position: Debout, kettlebell/dumbbell chaque main (lourd!). Exécution: Marchez 20-40m, tronc VERTICAL rigide, pas penchés côté. Épaules basses (ne haussez pas). Marchez normal. Posez charges, repos 60-90s, répétez 3-4 fois. Points clés: Tronc DROIT vertical, grip fort, respiration continue, charges égales.`,
    instructions_professional: `Indications: Core anti-lateral flexion maximal, grip strength, occupational functional capacity (carrying loads), chronic LBP stable strengthening. Activation (EMG McGill 2003): QL bilateral 60-80% MVC, obliques 55-70% MVC, erector spinae 50-65% MVC, traps/grip 70-90% MVC. Force compression: 2.0-3.5× BW (load-dependent). Progression: 15-25% BW per hand → 35-50% BW per hand. Distance: 20-40m walks. Evidence Level 3 (McGill 2003), Effectiveness 85/100. Benefits: Functional occupational, farmer/laborer training, anti-lateral flexion ultimate, grip limitant often. Contre-indications: Acute LBP, severe grip weakness, shoulder pathology, inability maintain upright posture.`,
    dosage_reps: '3-4 walks 20-40m',
    dosage_sets: '3-4',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '3',
    effectiveness_score: 85,
    key_points: ['QL 60-80% MVC anti-lateral flexion (McGill 2003)', 'Functional occupational carrying', 'Grip strength often limitant', 'Progression 15-50% BW per hand'],
    contraindications: ['Acute LBP', 'Severe grip weakness', 'Shoulder pathology', 'Posture inability'],
    tags: { phase: ['chronic', 'return_work', 'prevention'], pattern: ['occupational', 'functional'], mechanism: ['strengthening', 'anti_lateral_flexion', 'functional'], level: ['advanced'], equipment: ['kettlebells', 'dumbbells'], setting: ['gym', 'clinic'] },
    indications: { primary: ['occupational_training', 'chronic_lbp_stable', 'functional_capacity', 'core_strength_deficit'], secondary: ['return_work', 'prevention', 'grip_training'], contraindications: ['acute_lbp', 'severe_grip_weakness', 'shoulder_pathology'] },
    clinical_reasoning: 'Evidence Level 3 (McGill 2003): Farmer carry QL 60-80% MVC anti-lateral flexion bilateral. Functional occupational carrying loads. Compression 2.0-3.5× BW. Progression 15% → 50% BW per hand. Grip often limitant. Ultimate functional core.',
    progression_levels: [
      { level: 1, description: '15-25% BW per hand', distance: '20m', sets: '3', notes: 'Light functional' },
      { level: 2, description: '25-35% BW per hand', distance: '30m', sets: '3-4', notes: 'Moderate' },
      { level: 3, description: '35-45% BW per hand', distance: '30-40m', sets: '4', notes: 'Heavy' },
      { level: 4, description: '45-50% BW per hand', distance: '40m', sets: '4', notes: 'Maximum functional' }
    ],
    status: 'active'
  },

  {
    name: 'Suitcase Carry (Unilateral)',
    name_fr: 'Portage Valise (Unilatéral)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Portage unilateral charge pour anti-lateral flexion asymétrique maximal, QL/obliques side-specific.',
    instructions_patient: `Position: Debout, kettlebell main droite seulement (autre main vide). Exécution: Marchez 15-30m, tronc VERTICAL (ne penchez PAS côté poids!). Challenge: Résistez pencher, restez droit. Changez côté. Points clés: Tronc vertical absolu, tension obliques côté opposé, marche contrôlée, charge modérée (plus difficile que bilateral!).`,
    instructions_professional: `Indications: Anti-lateral flexion unilateral, QL asymmetry correction, oblique side-specific strengthening, functional asymmetric load training. Activation (EMG): QL contralateral 70-90% MVC (!), obliques contralateral 65-80% MVC, erector spinae bilateral 55-70% MVC. Unilateral = ↑ activation vs bilateral 30-40%. Progression: 20-30% BW → 40-60% BW. Distance: 15-30m per side. Evidence Level 4, Effectiveness 87/100. Contre-indications: Acute LBP, scoliosis severe, inability resist lateral flexion.`,
    dosage_reps: '3-4 walks per side 15-30m',
    dosage_sets: '3-4',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '4',
    effectiveness_score: 87,
    key_points: ['QL contralateral 70-90% MVC (!)', 'Activation ↑ 30-40% vs bilateral', 'Anti-lateral flexion ultimate', 'Functional asymmetric load'],
    contraindications: ['Acute LBP', 'Severe scoliosis', 'Lateral flexion resistance inability'],
    tags: { phase: ['chronic', 'return_sport', 'functional'], pattern: ['asymmetry', 'functional'], mechanism: ['strengthening', 'anti_lateral_flexion'], level: ['advanced'], equipment: ['kettlebell', 'dumbbell'], setting: ['gym', 'clinic'] },
    indications: { primary: ['ql_asymmetry', 'anti_lateral_flexion_training', 'functional_asymmetric_load'], secondary: ['chronic_lbp', 'return_sport'], contraindications: ['acute_lbp', 'severe_scoliosis'] },
    clinical_reasoning: 'Evidence Level 4: Suitcase carry QL contralateral 70-90% MVC anti-lateral flexion unilateral. Activation ↑ 30-40% vs bilateral. Functional asymmetric load training. Progression 20-60% BW.',
    progression_levels: [
      { level: 1, description: '20-30% BW', distance: '15m', sets: '3' },
      { level: 2, description: '30-40% BW', distance: '20m', sets: '3-4' },
      { level: 3, description: '40-50% BW', distance: '25m', sets: '4' },
      { level: 4, description: '50-60% BW', distance: '30m', sets: '4' }
    ],
    status: 'active'
  },

  {
    name: 'Nordic Hamstring Curl',
    name_fr: 'Nordic Curl (Ischio-Jambiers)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Eccentric hamstrings maximal pour prévention injuries hamstrings + renforcement chaîne postérieure + control lombaire eccentric.',
    instructions_patient: `Position: À genoux, partenaire tient vos chevilles (ou banc/barre fixe). Exécution: Penchez tronc AVANT lentement (corps DROIT genoux-épaules), descendez maximum contrôlé, rattrapez avec mains au sol, poussez retour. 3-6 reps. Points clés: Corps RIGIDE planche (pas plier hanches!), descente LENTE 3-5s, eccentric maximal, très difficile!`,
    instructions_professional: `Indications: Hamstring eccentric strength deficit, hamstring injury prevention (sport), posterior chain maximum, return to sport running/jumping. Activation eccentric (EMG Bourne 2017): Hamstrings 110-120% MVC eccentric (!), GM 65-75% MVC, erector spinae 70-80% MVC (maintain body rigid). Evidence Level 1A (Bourne 2017 systematic review): Nordic ↓ hamstring injury rate 51% (RR=0.49). Askling 2013 RCT: Nordic + eccentric protocol ↓ re-injury 85%. Progression: Partner-assisted → Band-assisted → Bodyweight → Weighted vest. Eccentric tempo: 3-5s descent critical. Evidence: Gold standard hamstring injury prevention. Contre-indications: Acute hamstring strain, severe LBP, inability maintain body rigid (hip flexion compensation).`,
    dosage_reps: '3-6',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    reps_optimal: 5,
    sets_optimal: 3,
    difficulty_level: 'advanced',
    evidence_level: '1A',
    effectiveness_score: 94,
    key_points: ['Evidence Level 1A: ↓ hamstring injury 51% (Bourne 2017)', 'Hamstrings 110-120% MVC eccentric', 'Gold standard prevention sport', 'Eccentric tempo 3-5s critical'],
    contraindications: ['Acute hamstring strain', 'Severe LBP', 'Body rigidity inability'],
    tags: { phase: ['chronic', 'return_sport', 'prevention'], pattern: ['hamstring_deficit', 'sport'], mechanism: ['strengthening', 'eccentric', 'injury_prevention'], level: ['advanced'], equipment: ['partner', 'bench', 'fixed_bar'], setting: ['gym', 'field', 'clinic'] },
    indications: { primary: ['hamstring_injury_prevention', 'return_sport_running', 'eccentric_deficit', 'athlete_training'], secondary: ['chronic_lbp_stable', 'posterior_chain_strengthening'], contraindications: ['acute_hamstring_strain', 'severe_lbp'] },
    clinical_reasoning: 'Evidence Level 1A (Bourne 2017 systematic review): Nordic hamstring ↓ injury rate 51% (RR=0.49). Askling 2013: ↓ re-injury 85%. Hamstrings 110-120% MVC eccentric. Gold standard prevention sport. Progression partner-assisted → BW. Tempo 3-5s eccentric.',
    progression_levels: [
      { level: 1, description: 'Partner-assisted heavy', reps: '3-5', sets: '2-3', notes: 'Learning' },
      { level: 2, description: 'Band-assisted', reps: '4-6', sets: '3', notes: 'Moderate assist' },
      { level: 3, description: 'Bodyweight controlled', reps: '3-6', sets: '3', notes: 'Standard' },
      { level: 4, description: 'Weighted vest 5-10kg', reps: '3-5', sets: '3', notes: 'Advanced' }
    ],
    status: 'active'
  },

  {
    name: 'Landmine Rotation (Anti-Rotation Power)',
    name_fr: 'Rotation Landmine (Puissance Anti-Rotation)',
    body_region: 'lumbar',
    exercise_type: 'power',
    description: 'Rotation explosive avec barre landmine pour power anti-rotation obliques + transfert sport rotation.',
    instructions_patient: `Position: Debout côté landmine, barre 2 mains devant poitrine, charge légère-modérée. Exécution: Rotation explosive tronc (pivoter hanches+tronc ensemble), amener barre côté opposé, retour avec contrôle, répétez explosif. 8-12 reps par côté. Points clés: Rotation COMPLÈTE (hanches+tronc), explosif aller/contrôlé retour, core rigide, charge modérée (vitesse > poids).`,
    instructions_professional: `Indications: Return to sport rotation (tennis, golf, baseball, hockey), power anti-rotation training, obliques explosive strengthening, functional rotation pattern. Activation (EMG estimated): Obliques 80-90% MVC explosive, QL 60-70%, erector spinae 65-75%, power generation hips/core integration. Load: 10-25kg plate typically. Tempo: Explosive rotation 0.5-1s, controlled return 1-2s. Evidence Level 4, Effectiveness 86/100. Benefits: Sport-specific rotation power, safe loaded rotation (vs medicine ball more spine stress), functional athletic movement. Contre-indications: Acute LBP, spondylolisthésis, severe stenosis, rotation-intolerant pattern.`,
    dosage_reps: '8-12 per side',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '4',
    effectiveness_score: 86,
    key_points: ['Obliques 80-90% MVC power', 'Sport rotation transfer (tennis, golf)', 'Explosive tempo 0.5-1s critical', 'Safe loaded rotation pattern'],
    contraindications: ['Acute LBP', 'Spondylolisthésis', 'Severe stenosis', 'Rotation intolerance'],
    tags: { phase: ['return_sport', 'athlete_training'], pattern: ['sport_specific', 'rotation'], mechanism: ['power', 'rotation', 'sport_specific'], level: ['advanced'], equipment: ['landmine', 'barbell'], setting: ['gym'] },
    indications: { primary: ['return_sport_rotation', 'power_training', 'sport_specific'], secondary: ['chronic_lbp_stable', 'functional_capacity'], contraindications: ['acute_lbp', 'spondylolisthesis', 'severe_stenosis', 'rotation_intolerant'] },
    clinical_reasoning: 'Evidence Level 4: Landmine rotation obliques 80-90% MVC power explosive. Sport-specific transfer tennis/golf/baseball. Tempo explosive 0.5-1s critical power. Safe loaded rotation vs medicine ball. Functional athletic movement. Load 10-25kg.',
    progression_levels: [
      { level: 1, description: '5-10kg slow', reps: '10-12', sets: '3', notes: 'Learning pattern' },
      { level: 2, description: '10-15kg moderate tempo', reps: '8-10', sets: '3', notes: 'Building speed' },
      { level: 3, description: '15-20kg explosive', reps: '8-10', sets: '3', notes: 'Power development' },
      { level: 4, description: '20-25kg maximum power', reps: '6-8', sets: '3', notes: 'Sport-specific' }
    ],
    status: 'active'
  },

  {
    name: 'Hanging Knee Raise',
    name_fr: 'Relevé de Genoux Suspendu',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Flexion hanche suspendu pour renforcement hip flexors + abdominals + grip + décompression spine.',
    instructions_patient: `Position: Suspendu barre, bras tendus, corps détendu. Exécution: Levez genoux vers poitrine (flexion hanches), hold 1s, descendez contrôlé. 8-15 reps. Points clés: PAS balancement (contrôle strict), levez genoux (pas juste balancer), core engagé, grip fort, si trop dur: genoux pliés au lieu droits.`,
    instructions_professional: `Indications: Hip flexor strengthening, RA lower fibers activation, grip endurance, spinal decompression hanging, core dynamic flexion. Activation (EMG Snarr 2014): Rectus abdominis 65-80% MVC, hip flexors (iliopsoas) 70-85% MVC, obliques 50-60% MVC. Spinal decompression: Hanging provides traction effect ↓ disc pressure (benefit chronic compression). Progression: Bent knees → Straight legs (harder) → Toes to bar (advanced) → Weighted ankles. Evidence Level 3, Effectiveness 80/100. Contre-indications: Shoulder impingement, rotator cuff pathology, severe grip weakness, acute LBP exacerbation flexion-intolerant.`,
    dosage_reps: '8-15',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '3',
    effectiveness_score: 80,
    key_points: ['RA 65-80% MVC, hip flexors 70-85% (Snarr 2014)', 'Spinal decompression hanging benefit', 'Progression bent → straight legs → toes-to-bar', 'Grip often limitant'],
    contraindications: ['Shoulder impingement', 'Rotator cuff pathology', 'Severe grip weakness', 'Flexion-intolerant LBP'],
    tags: { phase: ['chronic', 'return_sport', 'strengthening'], pattern: ['flexion_tolerant', 'decompression'], mechanism: ['strengthening', 'flexion', 'decompression'], level: ['advanced'], equipment: ['pull_up_bar'], setting: ['gym', 'clinic'] },
    indications: { primary: ['hip_flexor_weakness', 'abdominal_strengthening', 'spinal_decompression'], secondary: ['chronic_lbp_flexion_tolerant', 'return_sport'], contraindications: ['shoulder_pathology', 'severe_grip_weakness', 'flexion_intolerant_lbp'] },
    clinical_reasoning: 'Evidence Level 3 (Snarr 2014): Hanging knee raise RA 65-80% MVC, hip flexors 70-85%. Spinal decompression hanging ↓ disc pressure. Progression bent knees → straight legs → toes-to-bar. Grip limitant often.',
    progression_levels: [
      { level: 1, description: 'Bent knees controlled', reps: '8-12', sets: '3' },
      { level: 2, description: 'Straight legs partial', reps: '8-12', sets: '3' },
      { level: 3, description: 'Straight legs full ROM', reps: '10-15', sets: '3' },
      { level: 4, description: 'Toes to bar', reps: '8-12', sets: '3' }
    ],
    status: 'active'
  },

  {
    name: 'Kettlebell Swing (Russian)',
    name_fr: 'Balancement Kettlebell (Russe)',
    body_region: 'lumbar',
    exercise_type: 'power',
    description: 'Hip hinge explosif pour power chaîne postérieure, conditioning métabolique, transfert sport.',
    instructions_patient: `Position: Debout, kettlebell 2 mains devant, pieds largeur épaules. Exécution: Hip hinge explosif (comme sauter), propulsez kettlebell hauteur épaules (bras détendus!), laissez redescendre, absorber avec hanches, répétez fluide. 15-25 reps. Points clés: HANCHES propulsent (pas bras!), snap hanches explosif, kettlebell flotte, dos PLAT toujours, pattern ballistic.`,
    instructions_professional: `Indications: Hip hinge power, posterior chain explosive strengthening, metabolic conditioning, return to sport, functional power. Biomécanique ballistic pattern: Explosive hip extension (GM/hamstrings), spine neutral maintained, arms relaxed (force transfer legs-not arms). Activation (EMG Lake 2012): GM 100-120% MVC ballistic (!), hamstrings 80-95% MVC, erector spinae 60-75% MVC (stability). Load: 12-24kg typically (men 16-24kg, women 12-16kg). Reps: Higher 15-25 (conditioning emphasis) vs 8-12 (power emphasis). Evidence Level 3 (Lake 2012, McGill 2012), Effectiveness 89/100. Benefits: Metabolic high (caloric burn), power transfer sport, safe ballistic (vs jumping ↓ landing impact). McGill 2012: Swing excellent posterior chain power low back safety vs Olympic lifts. Contre-indications: Acute LBP, inability hip hinge pattern, shoulder limitation overhead, ballistic movement intolerance.`,
    dosage_reps: '15-25',
    dosage_sets: '3-4',
    dosage_frequency: '2-3x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '3',
    effectiveness_score: 89,
    key_points: ['GM 100-120% MVC ballistic (Lake 2012)', 'Hip hinge explosive pattern essential', 'McGill 2012: Safe ballistic vs Olympic lifts', 'Metabolic + power dual benefit'],
    contraindications: ['Acute LBP', 'Hip hinge inability', 'Shoulder limitation', 'Ballistic intolerance'],
    tags: { phase: ['chronic', 'return_sport', 'conditioning'], pattern: ['power', 'functional', 'sport'], mechanism: ['power', 'strengthening', 'conditioning'], level: ['advanced'], equipment: ['kettlebell'], setting: ['gym', 'clinic'] },
    indications: { primary: ['power_training', 'return_sport', 'conditioning', 'posterior_chain_power'], secondary: ['chronic_lbp_stable', 'metabolic_training'], contraindications: ['acute_lbp', 'hip_hinge_inability', 'ballistic_intolerance'] },
    clinical_reasoning: 'Evidence Level 3 (Lake 2012, McGill 2012): Kettlebell swing GM 100-120% MVC ballistic, hamstrings 80-95%. McGill: Safe ballistic posterior chain vs Olympic lifts. Metabolic + power dual. Hip hinge explosif prerequisite. Load 12-24kg, reps 15-25 conditioning.',
    progression_levels: [
      { level: 1, description: 'Hip hinge practice BW', reps: '15-20', sets: '3', notes: 'Pattern learning' },
      { level: 2, description: '8-12kg moderate tempo', reps: '15-20', sets: '3-4', notes: 'Building power' },
      { level: 3, description: '12-16kg explosive', reps: '15-25', sets: '3-4', notes: 'Standard power' },
      { level: 4, description: '16-24kg maximum', reps: '12-20', sets: '4', notes: 'Advanced power' }
    ],
    status: 'active'
  },

  {
    name: 'Box Jump',
    name_fr: 'Saut sur Boîte',
    body_region: 'lumbar',
    exercise_type: 'power',
    description: 'Plyometric vertical pour lower body power, landing control, return to sport jumping, neuromuscular explosiveness.',
    instructions_patient: `Position: Debout face boîte (hauteur 30-60cm selon niveau). Exécution: Accroupissez léger, balancez bras, sautez explosif sur boîte, atterrissez 2 pieds stable, descendez contrôlé (pas sauter en bas!), répétez 5-10 fois. Points clés: Atterrissage DOUX genoux fléchis, tronc stable, descendre marche (préserve genoux), hauteur progressive.`,
    instructions_professional: `Indications: Return to sport jumping/running, lower body power development, neuromuscular explosive training, landing mechanics, plyometric progression. Biomécanique: Concentric power take-off (GM/quads 100-120% MVC explosive), eccentric landing absorption (critical injury prevention). Landing: Soft knees flexed 40-60°, hip flexion 30-40°, spine neutral maintained. Box height progression: 30cm → 45cm → 60cm → 75cm (athlete). Reps: Low 5-10 per set (power emphasis, avoid fatigue). Evidence Level 3, Effectiveness 84/100. Benefits: Sport-specific power, landing mechanics training (↓ ACL injury risk proper landing), explosive strength. Critical: Step down from box (NOT jump down) - preserves knees eccentric stress. Contre-indications: Acute LBP, knee pathology (ACL, meniscus, patellofemoral), ankle instability, poor landing mechanics inability correct.`,
    dosage_reps: '5-10',
    dosage_sets: '3-4',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '3',
    effectiveness_score: 84,
    key_points: ['GM/quads 100-120% MVC explosive take-off', 'Landing mechanics critical (↓ ACL injury)', 'STEP down (not jump) - preserves knees', 'Height progression 30-75cm'],
    contraindications: ['Acute LBP', 'Knee pathology (ACL, meniscus)', 'Ankle instability', 'Landing mechanics inability'],
    tags: { phase: ['return_sport', 'athlete_training'], pattern: ['sport_specific', 'jumping'], mechanism: ['power', 'plyometric', 'sport_specific'], level: ['advanced'], equipment: ['plyo_box'], setting: ['gym', 'field'] },
    indications: { primary: ['return_sport_jumping', 'power_training', 'plyometric_progression', 'landing_mechanics'], secondary: ['chronic_lbp_stable', 'athlete_training'], contraindications: ['acute_lbp', 'knee_pathology', 'ankle_instability'] },
    clinical_reasoning: 'Evidence Level 3: Box jump lower body power GM/quads 100-120% MVC explosive. Landing mechanics training ↓ ACL injury (soft landing critical). Step down preserves knees. Height 30-75cm progression. Reps low 5-10 (power not fatigue). Sport-specific jumping return.',
    progression_levels: [
      { level: 1, description: 'Box 30cm height', reps: '5-8', sets: '3', notes: 'Learning landing' },
      { level: 2, description: 'Box 45cm', reps: '6-10', sets: '3-4', notes: 'Standard' },
      { level: 3, description: 'Box 60cm', reps: '5-8', sets: '3-4', notes: 'Advanced' },
      { level: 4, description: 'Box 75cm athlete', reps: '5-8', sets: '3-4', notes: 'Elite power' }
    ],
    status: 'active'
  },

  {
    name: 'Barbell Hip Thrust',
    name_fr: 'Poussée de Hanche avec Barre',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Extension hanche avec barre pour activation maximale gluteus maximus, force hip extension pure.',
    instructions_patient: `Position: Assis sol, haut dos appuyé sur banc, barre sur hanches (pad mousse!), pieds plats sol. Exécution: Poussez hanches vers plafond, serrez fessiers FORT top, hold 1-2s, redescendez contrôlé. 8-12 reps. Points clés: Fessiers contractés MAX top, genoux 90° top position, barre sur crête iliaque (pas ventre), pad essentiel (confort), tronc neutre.`,
    instructions_professional: `Indications: Gluteus maximus strengthening maximum, hip extension power, posterior chain dominant, return to sport running/jumping, GM weakness specific. Activation (EMG Contreras 2015 "Glute Guy"): GM 120-150% MVC (!!) = HIGHEST activation any exercise. Hamstrings 40-50% MVC (minimal vs deadlift), erector spinae 30-40% MVC (minimal). Isolation GM exceptional. Biomécanique: Hip extension pure 0-110°, minimal lumbar involvement (vs deadlift/squat). Load progression: Bar only 20kg → 40-100kg+ (GM strong muscle, loads high possible). Evidence Level 2B (Contreras 2015), Effectiveness 93/100. Benefits: GM activation maximum any exercise, minimal lumbar stress, hip extension pure isolation, sport performance transfer running/jumping. Contre-indications: Acute LBP, hip flexor tightness severe (limits ROM), anterior hip pain (impingement), bar placement discomfort inability tolerate.`,
    dosage_reps: '8-12',
    dosage_sets: '4',
    dosage_frequency: '2x/semaine',
    reps_optimal: 10,
    sets_optimal: 4,
    difficulty_level: 'advanced',
    evidence_level: '2B',
    effectiveness_score: 93,
    key_points: ['GM 120-150% MVC HIGHEST activation (Contreras 2015)', 'Hip extension pure isolation', 'Minimal lumbar stress (vs deadlift)', 'Load progression 20-100kg+'],
    contraindications: ['Acute LBP', 'Severe hip flexor tightness', 'Anterior hip pain', 'Bar placement intolerance'],
    tags: { phase: ['chronic', 'return_sport', 'strengthening'], pattern: ['gm_weakness', 'posterior_chain'], mechanism: ['strengthening', 'isolation'], level: ['advanced'], equipment: ['barbell', 'bench', 'pad'], setting: ['gym'] },
    indications: { primary: ['gm_weakness_specific', 'hip_extension_deficit', 'return_sport', 'posterior_chain_strengthening'], secondary: ['chronic_lbp_stable', 'power_training'], contraindications: ['acute_lbp', 'severe_hip_flexor_tightness', 'anterior_hip_pain'] },
    clinical_reasoning: 'Evidence Level 2B (Contreras 2015): Hip thrust GM 120-150% MVC = HIGHEST activation any exercise. Hip extension pure isolation, minimal lumbar stress (erector 30-40% vs 80-100% deadlift). Sport transfer running/jumping. Load 20-100kg+ progression.',
    progression_levels: [
      { level: 1, description: 'Bar only 20kg', reps: '12-15', sets: '3', notes: 'Technique' },
      { level: 2, description: '30-50kg', reps: '10-12', sets: '4', notes: 'Building strength' },
      { level: 3, description: '60-80kg', reps: '8-10', sets: '4', notes: 'Strength phase' },
      { level: 4, description: '80-100kg+', reps: '6-10', sets: '4', notes: 'Maximum strength' }
    ],
    status: 'active'
  },

  {
    name: 'Cable Chop (High to Low)',
    name_fr: 'Chop Cable (Haut vers Bas)',
    body_region: 'lumbar',
    exercise_type: 'functional',
    description: 'Pattern rotation + flexion diagonal pour intégration obliques + functional movement training.',
    instructions_patient: `Position: Debout côté machine câble (haut), câble 2 mains bras tendus. Exécution: Rotation + descente diagonale (haut-droite vers bas-gauche), tronc+hanches tournent ensemble, finir accroupi, retour contrôlé, 10-15 reps par côté. Points clés: Mouvement TOTAL corps (pas juste bras), pivoter pieds, tronc rigide, contrôle constant, pattern functional.`,
    instructions_professional: `Indications: Oblique strengthening functional pattern, rotation + flexion integration, sport-specific movements (lifting, throwing), functional ADL training. Activation (EMG): Obliques 70-80% MVC, RA 50-60% MVC, erector spinae 40-50% MVC (control eccentric). Pattern: High-to-low simulates lifting object floor (functional), rotation+flexion combination. Tempo: Controlled 2-3s down, 2s up. Load: Moderate 10-30kg cable. Evidence Level 4, Effectiveness 82/100. Variations: Low-to-high (lift pattern), horizontal (anti-rotation), half-kneeling (↑ stability challenge). Contre-indications: Acute LBP, spondylolisthésis, rotation-intolerant pattern, inability control movement.`,
    dosage_reps: '10-15 per side',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '4',
    effectiveness_score: 82,
    key_points: ['Obliques 70-80% MVC functional pattern', 'Rotation + flexion integration', 'Sport-specific transfer lifting/throwing', 'Total body movement coordination'],
    contraindications: ['Acute LBP', 'Spondylolisthésis', 'Rotation intolerance', 'Movement control inability'],
    tags: { phase: ['chronic', 'return_sport', 'functional'], pattern: ['functional', 'rotation', 'sport_specific'], mechanism: ['strengthening', 'rotation', 'functional'], level: ['advanced'], equipment: ['cable_machine'], setting: ['gym', 'clinic'] },
    indications: { primary: ['functional_training', 'oblique_strengthening', 'sport_specific_rotation'], secondary: ['chronic_lbp', 'return_sport'], contraindications: ['acute_lbp', 'spondylolisthesis', 'rotation_intolerant'] },
    clinical_reasoning: 'Evidence Level 4: Cable chop obliques 70-80% MVC functional rotation+flexion pattern. High-to-low simulates lifting floor. Sport transfer throwing/lifting. Total body integration. Load 10-30kg cable. Variation low-to-high lift pattern.',
    progression_levels: [
      { level: 1, description: 'Light 5-10kg slow', reps: '12-15', sets: '3', notes: 'Learning pattern' },
      { level: 2, description: 'Moderate 10-20kg', reps: '10-12', sets: '3', notes: 'Standard' },
      { level: 3, description: 'Heavy 20-30kg', reps: '10-12', sets: '3', notes: 'Strength' },
      { level: 4, description: 'Half-kneeling 15-25kg', reps: '10-12', sets: '3', notes: 'Stability challenge' }
    ],
    status: 'active'
  },

  {
    name: 'Ab Wheel Rollout',
    name_fr: 'Roulette Abdominale (Ab Wheel)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Extension bras avec wheel pour anti-extension core maximal, RA/obliques eccentric challenge ultimate.',
    instructions_patient: `Position: À genoux, ab wheel mains. Exécution: Roulez wheel avant lentement, descendez corps maximum (bras tendus), contractez abdominaux FORT, ramener wheel. 5-12 reps. Points clés: NE LAISSEZ PAS dos creuser! (lombaire protégée), abdominaux contractés MAX, descente LENTE 3-5s, très difficile, commencez ROM partiel.`,
    instructions_professional: `Indications: Anti-extension core maximal, RA eccentric strengthening ultimate, obliques anti-rotation (wheel stability), advanced core training. Activation (EMG Escamilla 2006): RA 70-90% MVC (highest ab exercise), obliques 60-75% MVC, erector spinae 50-65% MVC (eccentric control anti-extension). Biomécanique: Increasing lever arm (body extension) = ↑ anti-extension demand progressive. Challenge: Maintain lumbar neutral (prevent hyperextension) under maximal extension moment. Progression: Partial ROM knees → Full ROM knees → Standing wall rollout → Freestanding (elite). Evidence Level 3 (Escamilla 2006), Effectiveness 91/100. Risk: Lumbar hyperextension if inadequate strength (STOP if back arches). Contre-indications: Acute LBP, inability maintain lumbar neutral, shoulder pathology, insufficient core strength (test: plank <60s = too weak).`,
    dosage_reps: '5-12',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '3',
    effectiveness_score: 91,
    key_points: ['RA 70-90% MVC highest ab exercise (Escamilla 2006)', 'Anti-extension core ultimate', 'Risk lumbar hyperextension (technique critical)', 'Progression partial ROM → full ROM → standing'],
    contraindications: ['Acute LBP', 'Lumbar neutral inability', 'Shoulder pathology', 'Insufficient core strength (<60s plank)'],
    tags: { phase: ['chronic', 'advanced_training'], pattern: ['advanced_core'], mechanism: ['strengthening', 'anti_extension', 'eccentric'], level: ['advanced'], equipment: ['ab_wheel'], setting: ['gym', 'clinic'] },
    indications: { primary: ['advanced_core_training', 'ra_strengthening_maximal', 'anti_extension_deficit'], secondary: ['chronic_lbp_stable', 'athlete_training'], contraindications: ['acute_lbp', 'lumbar_neutral_inability', 'shoulder_pathology', 'insufficient_core_strength'] },
    clinical_reasoning: 'Evidence Level 3 (Escamilla 2006): Ab wheel RA 70-90% MVC = highest ab exercise. Anti-extension core ultimate eccentric. Risk lumbar hyperextension inadequate strength. Prerequisite: Plank 60s+. Progression partial → full ROM → standing.',
    progression_levels: [
      { level: 1, description: 'Partial ROM knees (1m rollout)', reps: '8-12', sets: '3', notes: 'Learning control' },
      { level: 2, description: 'Full ROM knees', reps: '6-10', sets: '3', notes: 'Standard' },
      { level: 3, description: 'Standing wall rollout', reps: '6-10', sets: '3', notes: 'Advanced' },
      { level: 4, description: 'Freestanding rollout', reps: '5-8', sets: '3', notes: 'Elite' }
    ],
    status: 'active'
  },

  {
    name: 'Overhead Walking Lunge',
    name_fr: 'Fente Marchée Charge Overhead',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Fente unilateral avec charge overhead pour stabilité core multi-plan, single leg strength, shoulder-core integration.',
    instructions_patient: `Position: Debout, kettlebell/plaque overhead 2 mains bras tendus. Exécution: Fente avant alternée (8-12 pas total), charge reste overhead STABLE, tronc vertical, genoux 90°. Points clés: Charge STABLE overhead (core rigide), tronc vertical (ne penchez pas), fente profonde contrôlée, épaules actives.`,
    instructions_professional: `Indications: Unilateral strength + core stability overhead, shoulder stability integration, functional movement complex, return to sport. Activation: Obliques 65-75% MVC (anti-lateral flexion overhead load), QL 60-70%, shoulder stabilizers 70-80%, quads/GM 70-85% single leg. Load: 5-20kg overhead. Evidence Level 4, Effectiveness 86/100. Benefits: Multi-planar stability, shoulder-core integration, functional sport transfer. Contre-indications: Shoulder pathology, acute LBP, severe balance deficit, overhead inability.`,
    dosage_reps: '8-12 steps total',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '4',
    effectiveness_score: 86,
    key_points: ['Obliques 65-75% MVC anti-lateral flexion overhead', 'Shoulder-core integration functional', 'Multi-planar stability challenge', 'Single leg strength + balance'],
    contraindications: ['Shoulder pathology', 'Acute LBP', 'Severe balance deficit', 'Overhead inability'],
    tags: { phase: ['chronic', 'return_sport', 'functional'], pattern: ['unilateral', 'functional', 'sport'], mechanism: ['strengthening', 'stabilization', 'functional'], level: ['advanced'], equipment: ['kettlebell', 'plate'], setting: ['gym', 'clinic'] },
    indications: { primary: ['functional_training_advanced', 'shoulder_core_integration', 'unilateral_strength'], secondary: ['return_sport', 'chronic_lbp_stable'], contraindications: ['shoulder_pathology', 'acute_lbp', 'severe_balance_deficit'] },
    clinical_reasoning: 'Evidence Level 4: Overhead lunge obliques 65-75% MVC anti-lateral flexion. Shoulder-core integration functional. Multi-planar stability. Single leg 70-85% activation. Load 5-20kg overhead. Sport transfer.',
    progression_levels: [
      { level: 1, description: 'BW lunge no load', reps: '10-12', sets: '3', notes: 'Pattern mastery' },
      { level: 2, description: '5-10kg overhead', reps: '8-12', sets: '3', notes: 'Light load' },
      { level: 3, description: '10-15kg overhead', reps: '8-12', sets: '3', notes: 'Moderate' },
      { level: 4, description: '15-20kg overhead', reps: '8-10', sets: '3', notes: 'Advanced' }
    ],
    status: 'active'
  },

  {
    name: 'L-Sit Hold',
    name_fr: 'Maintien en L (L-Sit)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Position L suspendu/parallettes pour hip flexors + abdominals isometric maximal + shoulder depression strength.',
    instructions_patient: `Position: Suspendu barres parallèles, bras tendus, jambes tendues devant horizontales (L shape). Exécution: Hold 10-30s, jambes RIGIDES horizontales, core contracté MAX. Points clés: Jambes PARFAITEMENT horizontales (90° hanches), épaules déprimées (enfoncées), core ultra-stable, progression lente, très difficile!`,
    instructions_professional: `Indications: Hip flexors isometric maximal, RA strengthening intense, shoulder girdle depression strength, gymnastic/calisthenics training, core ultimate. Activation (EMG estimated): Hip flexors (iliopsoas/rectus femoris) 90-100% MVC isometric, RA 80-90% MVC, obliques 65-75%, shoulder depressors (lat dorsi, lower traps) 75-85%. Hold time: Beginners 5-10s, intermediate 15-30s, advanced 30-60s+. Progression: Tuck L-sit (knees bent) → One leg extended → Full L-sit → V-sit (legs higher). Evidence Level 5 (gymnastics standard), Effectiveness 87/100. Benefits: Ultimate core isometric, hip flexor strength maximal, functional relative strength. Contre-indications: Shoulder impingement, hip flexor strain acute, inability support bodyweight, acute LBP flexion-intolerant.`,
    dosage_reps: '3-5 holds',
    dosage_sets: '3-4',
    dosage_frequency: '2x/semaine',
    hold_time: '10-30s',
    difficulty_level: 'advanced',
    evidence_level: '5',
    effectiveness_score: 87,
    key_points: ['Hip flexors 90-100% MVC isometric ultimate', 'RA 80-90% MVC intense', 'Progression tuck → one leg → full L → V-sit', 'Gymnastic standard core exercise'],
    contraindications: ['Shoulder impingement', 'Hip flexor strain acute', 'Bodyweight support inability', 'Flexion-intolerant LBP'],
    tags: { phase: ['chronic', 'advanced_training', 'athlete'], pattern: ['gymnastic', 'calisthenics'], mechanism: ['strengthening', 'isometric'], level: ['advanced'], equipment: ['parallettes', 'dip_bars'], setting: ['gym'] },
    indications: { primary: ['hip_flexor_strengthening_maximal', 'advanced_core', 'gymnastic_training'], secondary: ['chronic_lbp_stable', 'athlete_training'], contraindications: ['shoulder_impingement', 'hip_flexor_strain', 'flexion_intolerant_lbp'] },
    clinical_reasoning: 'Evidence Level 5 (gymnastics standard): L-sit hip flexors 90-100% MVC isometric ultimate, RA 80-90%. Hold 10-30s. Progression tuck → full L. Shoulder depressors 75-85%. Ultimate core isometric.',
    progression_levels: [
      { level: 1, description: 'Tuck L-sit (knees bent)', hold_time: '10-15s', sets: '3-4', notes: 'Learning' },
      { level: 2, description: 'One leg extended', hold_time: '10-20s', sets: '3-4', notes: 'Intermediate' },
      { level: 3, description: 'Full L-sit', hold_time: '10-30s', sets: '3-4', notes: 'Standard' },
      { level: 4, description: 'V-sit (legs higher)', hold_time: '10-20s', sets: '3', notes: 'Elite' }
    ],
    status: 'active'
  },

  {
    name: 'Medicine Ball Slam',
    name_fr: 'Frappe Ballon Médical (Slam)',
    body_region: 'lumbar',
    exercise_type: 'power',
    description: 'Flexion explosive avec medicine ball pour power anti-extension + abs explosive + conditioning métabolique.',
    instructions_patient: `Position: Debout, medicine ball overhead. Exécution: Levez ball overhead, FRAPPEZ sol explosif (flexion tronc rapide), attrapez rebond, répétez 10-20 reps. Points clés: EXPLOSIF frappe (vitesse max), abs contractés frappe, hip hinge + flexion, respiration explosive, ball non-rebondissante idéal.`,
    instructions_professional: `Indications: Power training explosive flexion pattern, metabolic conditioning high intensity, obliques explosive strengthening, sport-specific power transfer (throwing, overhead athletes). Activation: RA/obliques 85-95% MVC explosive, latissimus 70-80%, hip flexors 60-70%. Biomécanique: Overhead → flexion explosive pattern (opposite ab wheel extension). Ball weight: 6-15kg typically (power emphasis = lighter faster vs strength = heavier slower). Reps: Higher 10-20 (conditioning emphasis). Evidence Level 4, Effectiveness 83/100. Benefits: Safe explosive flexion (vs ballistic flexion exercises higher spine stress), metabolic excellent, coordination power. Contre-indications: Acute LBP, flexion-intolerant pattern, spondylolisthésis, inability control explosive movement.`,
    dosage_reps: '10-20',
    dosage_sets: '3-4',
    dosage_frequency: '2-3x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '4',
    effectiveness_score: 83,
    key_points: ['RA/obliques 85-95% MVC explosive', 'Metabolic conditioning excellent', 'Safe explosive flexion pattern', 'Ball weight 6-15kg power emphasis'],
    contraindications: ['Acute LBP', 'Flexion-intolerant', 'Spondylolisthésis', 'Explosive control inability'],
    tags: { phase: ['chronic', 'return_sport', 'conditioning'], pattern: ['power', 'sport_specific'], mechanism: ['power', 'conditioning', 'explosive'], level: ['advanced'], equipment: ['medicine_ball'], setting: ['gym', 'field'] },
    indications: { primary: ['power_training_explosive', 'conditioning', 'sport_specific'], secondary: ['chronic_lbp_stable', 'athlete_training'], contraindications: ['acute_lbp', 'flexion_intolerant', 'spondylolisthesis'] },
    clinical_reasoning: 'Evidence Level 4: Medicine ball slam RA/obliques 85-95% MVC explosive flexion. Metabolic conditioning excellent. Safe explosive vs ballistic flexion exercises. Ball 6-15kg, reps 10-20. Sport transfer throwing/overhead.',
    progression_levels: [
      { level: 1, description: '6-8kg moderate tempo', reps: '12-15', sets: '3', notes: 'Learning pattern' },
      { level: 2, description: '8-10kg explosive', reps: '10-15', sets: '3-4', notes: 'Power building' },
      { level: 3, description: '10-12kg maximum power', reps: '10-12', sets: '3-4', notes: 'Standard power' },
      { level: 4, description: '12-15kg conditioning', reps: '15-20', sets: '3-4', notes: 'Metabolic emphasis' }
    ],
    status: 'active'
  },

  {
    name: 'Bulgarian Split Squat (Rear Foot Elevated)',
    name_fr: 'Squat Bulgare (Pied Arrière Élevé)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Squat unilateral rear foot elevated pour single leg strength maximal, quad/GM isolation, balance challenge.',
    instructions_patient: `Position: Debout, pied arrière sur banc (30-45cm hauteur), pied avant sol largeur hanche. Exécution: Descendez squat profond pied avant, genou 90°, remontez. 8-12 reps par jambe. Points clés: Poids sur pied AVANT (90%), tronc vertical, genou aligné orteil, profondeur maximale, kettlebells mains si chargé.`,
    instructions_professional: `Indications: Unilateral strength deficit, quad/GM strengthening isolated, return to sport single leg, balance training, functional asymmetry correction. Activation (EMG McCurdy 2010): Quads 75-90% MVC single leg, GM 70-85% MVC, hamstrings 50-60%. Unilateral = addresses asymmetry vs bilateral squat. Load progression: BW → Dumbbells 10-30kg per hand → Barbell advanced. ROM: Deep squat optimal (thigh parallel or below). Evidence Level 2B (McCurdy 2010), Effectiveness 89/100. Benefits: Single leg strength maximal, balance training, addresses asymmetry, functional movement. Contre-indications: Acute LBP, knee pathology (patellofemoral severe), severe balance deficit, hip flexor rear leg tightness limiting.`,
    dosage_reps: '8-12 per leg',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'advanced',
    evidence_level: '2B',
    effectiveness_score: 89,
    key_points: ['Quads 75-90% MVC, GM 70-85% single leg (McCurdy 2010)', 'Addresses asymmetry unilateral', 'Balance training functional', 'Progression BW → dumbbells → barbell'],
    contraindications: ['Acute LBP', 'Severe patellofemoral pain', 'Severe balance deficit', 'Rear leg hip flexor tightness'],
    tags: { phase: ['chronic', 'return_sport', 'strengthening'], pattern: ['unilateral', 'asymmetry', 'functional'], mechanism: ['strengthening', 'balance'], level: ['advanced'], equipment: ['bench', 'dumbbells', 'optional_barbell'], setting: ['gym', 'clinic'] },
    indications: { primary: ['unilateral_strength_deficit', 'asymmetry_correction', 'return_sport', 'quad_gm_strengthening'], secondary: ['chronic_lbp_stable', 'balance_training'], contraindications: ['acute_lbp', 'severe_patellofemoral_pain', 'severe_balance_deficit'] },
    clinical_reasoning: 'Evidence Level 2B (McCurdy 2010): Bulgarian split squat quads 75-90% MVC, GM 70-85% single leg. Addresses asymmetry unilateral. Balance training. Progression BW → dumbbells 30kg. Deep ROM optimal.',
    progression_levels: [
      { level: 1, description: 'BW only balance', reps: '10-12', sets: '3', notes: 'Pattern learning' },
      { level: 2, description: 'Dumbbells 10-15kg per hand', reps: '8-12', sets: '3', notes: 'Light load' },
      { level: 3, description: 'Dumbbells 20-30kg per hand', reps: '8-10', sets: '3', notes: 'Heavy load' },
      { level: 4, description: 'Barbell back squat style', reps: '8-10', sets: '3', notes: 'Advanced loading' }
    ],
    status: 'active'
  },

  {
    name: 'Front Plank Feet Elevated',
    name_fr: 'Planche Avant Pieds Surélevés',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Plank pieds élevés pour ↑ anti-extension demand 30-40% vs standard, progression intensity plank.',
    instructions_patient: `Position: Planche standard MAIS pieds sur banc/boîte 30-60cm hauteur. Exécution: Hold 20-45s, tronc RIGIDE horizontal (ne creusez pas dos!), core contracté MAX. Points clés: Hauteur pieds ↑ difficulté significantly, dos PLAT horizontal, respiration continue, progression hauteur 30→60cm.`,
    instructions_professional: `Indications: Anti-extension progression standard plank mastered, core strength advanced training, RA/obliques ↑ activation. Activation: RA 70-85% MVC (vs 55-65% standard plank = ↑ 20-30%), obliques 60-75% MVC, erector spinae 60-70% MVC. Biomécanique: Feet elevation ↑ trunk angle = ↑ extension moment = ↑ anti-extension demand. Height progression: 30cm → 45cm → 60cm. Hold time: 20-45s optimal (vs 45-60s standard). Evidence Level 3, Effectiveness 85/100. Progression: Standard plank 60s → Feet elevated 30cm 30s → 45cm 20-30s → 60cm 20s. Contre-indications: Acute LBP, inability maintain lumbar neutral standard plank, shoulder pathology.`,
    dosage_reps: '3-4 holds',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    hold_time: '20-45s',
    difficulty_level: 'advanced',
    evidence_level: '3',
    effectiveness_score: 85,
    key_points: ['RA 70-85% MVC (↑ 20-30% vs standard)', 'Feet elevation ↑ extension moment', 'Height progression 30-60cm', 'Hold 20-45s optimal'],
    contraindications: ['Acute LBP', 'Lumbar neutral inability standard plank', 'Shoulder pathology'],
    tags: { phase: ['chronic', 'advanced_training'], pattern: ['progression_standard'], mechanism: ['strengthening', 'anti_extension'], level: ['advanced'], equipment: ['bench', 'box'], setting: ['gym', 'clinic', 'home'] },
    indications: { primary: ['plank_progression', 'advanced_core', 'anti_extension_training'], secondary: ['chronic_lbp_stable', 'athlete_training'], contraindications: ['acute_lbp', 'standard_plank_inability'] },
    clinical_reasoning: 'Evidence Level 3: Feet elevated plank RA 70-85% MVC (↑ 20-30% vs standard). Feet elevation ↑ trunk angle = ↑ extension moment anti-extension demand. Height 30-60cm progression. Hold 20-45s. Prerequisite: Standard plank 60s.',
    progression_levels: [
      { level: 1, description: 'Feet 30cm elevation', hold_time: '20-30s', sets: '3', notes: 'Initial elevation' },
      { level: 2, description: 'Feet 45cm', hold_time: '20-35s', sets: '3', notes: 'Moderate elevation' },
      { level: 3, description: 'Feet 60cm', hold_time: '20-30s', sets: '3', notes: 'High elevation' },
      { level: 4, description: 'Feet 60cm + weight vest', hold_time: '20-30s', sets: '3', notes: 'Advanced loading' }
    ],
    status: 'active'
  },

  {
    name: 'Loaded Carry Complex (Farmer + Suitcase + Overhead)',
    name_fr: 'Complexe Portage Chargé (Multi-Positions)',
    body_region: 'lumbar',
    exercise_type: 'functional',
    description: 'Circuit 3 carry variations pour comprehensive core training (anti-lateral flexion bilateral + unilateral + overhead).',
    instructions_patient: `Circuit 3 positions (sans poser charges): 1) Farmer carry 2 kettlebells 20m, 2) Suitcase carry 1 kettlebell droite 20m, 3) Overhead carry 1 kettlebell gauche overhead 20m. Repos 90s, répétez 3x. Points clés: Transition fluide sans poser, tronc rigide toutes positions, charges modérées (completion > max load).`,
    instructions_professional: `Indications: Comprehensive core training all planes, work capacity functional, conditioning + strength integration, occupational/sport simulation. Activation complex: QL bilateral 60-80% + contralateral 70-90% + overhead stabilization 65-75% = comprehensive stimulus. Circuit structure: Farmer (bilateral anti-lateral) → Suitcase (unilateral anti-lateral) → Overhead (overhead stability). Load: Moderate 25-40% BW allows completion without rest. Distance: 20m per position = 60m total per round. Evidence Level 4, Effectiveness 88/100. Benefits: Time-efficient comprehensive, functional capacity ultimate, work capacity, all core mechanisms 1 exercise. Contre-indications: Acute LBP, shoulder pathology (overhead component), severe grip weakness, inability any individual carry.`,
    dosage_reps: '3 rounds complete circuit',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '4',
    effectiveness_score: 88,
    key_points: ['Comprehensive core all planes 1 exercise', 'QL bilateral + unilateral + overhead sequential', 'Work capacity functional training', 'Load moderate 25-40% BW completion emphasis'],
    contraindications: ['Acute LBP', 'Shoulder pathology', 'Severe grip weakness', 'Individual carry inability'],
    tags: { phase: ['chronic', 'return_work', 'functional'], pattern: ['comprehensive', 'functional', 'occupational'], mechanism: ['strengthening', 'functional', 'conditioning'], level: ['advanced'], equipment: ['kettlebells'], setting: ['gym', 'clinic'] },
    indications: { primary: ['functional_training_comprehensive', 'work_capacity', 'occupational_simulation'], secondary: ['chronic_lbp_stable', 'conditioning'], contraindications: ['acute_lbp', 'shoulder_pathology', 'severe_grip_weakness'] },
    clinical_reasoning: 'Evidence Level 4: Carry complex comprehensive core training. QL bilateral 60-80% → unilateral 70-90% → overhead 65-75% sequential. Work capacity functional. Load 25-40% BW, distance 60m total. Time-efficient all core mechanisms.',
    progression_levels: [
      { level: 1, description: 'Light 20-25% BW', distance: '15m per position', rounds: '2', notes: 'Learning circuit' },
      { level: 2, description: 'Moderate 25-35% BW', distance: '20m per position', rounds: '3', notes: 'Standard' },
      { level: 3, description: 'Heavy 35-40% BW', distance: '20m per position', rounds: '3', notes: 'Advanced' },
      { level: 4, description: 'Heavy 40%+ BW', distance: '25m per position', rounds: '3-4', notes: 'Maximal capacity' }
    ],
    status: 'active'
  },

  {
    name: 'Barbell Good Morning',
    name_fr: 'Good Morning Barre',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Hip hinge avec barre sur trapèzes pour erector spinae isometric + hamstrings eccentric + posterior chain.',
    instructions_patient: `Position: Debout, barre trapèzes (comme squat position), pieds largeur hanches. Exécution: Hip hinge (pencher tronc avant), dos PLAT toujours, descendre tronc jusqu'à parallèle sol, remonter. 8-12 reps. Points clés: DOS RIGIDE PLAT (pas arrondir!), hip hinge pur, hamstrings tension eccentric, barre légère début (20-40kg max), genoux légèrement pliés.`,
    instructions_professional: `Indications: Erector spinae isometric strengthening, hamstrings eccentric emphasis, hip hinge reinforcement, posterior chain coordination. Activation (EMG): Erector spinae lombaire 80-95% MVC isometric (!), hamstrings 70-85% MVC eccentric, GM 60-70% MVC. Biomécanique: High spinal loading isometric (erector maintain rigidity), hip hinge pattern, eccentric hamstring stretch-load cycle. Load progression: Bar only 20kg → 30-60kg moderate (NOT maximum - spine loading high). ROM: Trunk parallel floor optimal (compromise hamstring stretch + spine safety). Evidence Level 3, Effectiveness 86/100. Benefits: Erector spinae isometric ultimate, hamstring eccentric, hip hinge reinforcement, deadlift accessory. Risk: HIGH if technique poor (lumbar flexion = injury risk). Critical: Maintain spine neutral ABSOLUTE. Contre-indications: Acute LBP, spondylolisthésis grade 2+, inability maintain spine neutral, hamstring strain acute, technique inability.`,
    dosage_reps: '8-12',
    dosage_sets: '3',
    dosage_frequency: '1-2x/semaine',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'advanced',
    evidence_level: '3',
    effectiveness_score: 86,
    key_points: ['Erector spinae 80-95% MVC isometric (!)', 'HIGH spine loading (technique CRITICAL)', 'Hamstrings 70-85% eccentric', 'Load moderate 20-60kg (NOT max)', 'Spine neutral ABSOLUTE'],
    contraindications: ['Acute LBP', 'Spondylolisthésis grade 2+', 'Spine neutral inability', 'Hamstring strain acute', 'Technique inability'],
    tags: { phase: ['chronic', 'advanced_training'], pattern: ['posterior_chain', 'hip_hinge'], mechanism: ['strengthening', 'isometric', 'eccentric'], level: ['advanced'], equipment: ['barbell', 'squat_rack'], setting: ['gym'] },
    indications: { primary: ['erector_spinae_strengthening', 'hamstring_eccentric', 'hip_hinge_reinforcement', 'deadlift_accessory'], secondary: ['chronic_lbp_stable', 'posterior_chain_training'], contraindications: ['acute_lbp', 'spondylolisthesis_grade2+', 'spine_neutral_inability', 'hamstring_strain'] },
    clinical_reasoning: 'Evidence Level 3: Good morning erector spinae 80-95% MVC isometric = HIGH spine loading. Hamstrings 70-85% eccentric. Hip hinge reinforcement. Load moderate 20-60kg (spine safety). Spine neutral ABSOLUTE critical. Deadlift accessory.',
    progression_levels: [
      { level: 1, description: 'Bar only 20kg technique', reps: '10-12', sets: '3', notes: 'Perfect form emphasis' },
      { level: 2, description: '25-35kg light', reps: '10-12', sets: '3', notes: 'Building tolerance' },
      { level: 3, description: '40-50kg moderate', reps: '8-10', sets: '3', notes: 'Standard' },
      { level: 4, description: '50-60kg controlled', reps: '8-10', sets: '3', notes: 'Advanced (NOT maximum)' }
    ],
    status: 'active'
  },

  {
    name: '45° Back Extension (Hyperextension Bench)',
    name_fr: 'Extension Lombaire 45° (Roman Chair)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Extension sur banc 45° pour erector spinae/GM strengthening, progression Superman to weighted.',
    instructions_patient: `Position: Sur banc hyperextension 45°, hanches sur pad, chevilles fixées. Exécution: Penchez tronc avant (flexion contrôlée), remontez jusqu'à horizontal (extension), hold 1s, répétez 12-20 reps. Points clés: ROM modéré (horizontal, pas hyper-extension!), mouvement contrôlé, respiration continue, mains poitrine (ou charge si avancé).`,
    instructions_professional: `Indications: Erector spinae strengthening progression body weight, GM strengthening, posterior chain endurance, chronic LBP strengthening stable phase. Activation (EMG Clark 2003): Erector spinae 70-85% MVC, GM 65-75% MVC, hamstrings 50-60% MVC. Biomécanique: 45° angle ↓ shear stress vs horizontal Roman chair, safer lumbar loading. ROM: Neutral to horizontal optimal (avoid hyperextension >15° = excessive posterior element stress). Load progression: BW → Hands behind head → Plate chest 5-20kg → Barbell shoulders advanced. Reps: Higher 12-20 (endurance emphasis) vs lower 8-12 (strength with load). Evidence Level 2B (Clark 2003, Aasa 2015 RCT chronic LBP), Effectiveness 83/100. Aasa 2015: Back extension training effective chronic LBP pain ↓ + function ↑. Contre-indications: Acute LBP, spondylolisthésis grade 2+, stenosis severe, extension-intolerant pattern.`,
    dosage_reps: '12-20',
    dosage_sets: '3',
    dosage_frequency: '2-3x/semaine',
    reps_optimal: 15,
    sets_optimal: 3,
    difficulty_level: 'advanced',
    evidence_level: '2B',
    effectiveness_score: 83,
    key_points: ['Erector spinae 70-85% MVC (Clark 2003)', 'Aasa 2015 RCT: Effective chronic LBP pain ↓', '45° angle safer vs horizontal', 'ROM horizontal (avoid hyperextension >15°)', 'Progression BW → plate → barbell'],
    contraindications: ['Acute LBP', 'Spondylolisthésis grade 2+', 'Severe stenosis', 'Extension-intolerant'],
    tags: { phase: ['chronic', 'strengthening', 'prevention'], pattern: ['extension_tolerant', 'posterior_chain'], mechanism: ['strengthening', 'endurance'], level: ['intermediate', 'advanced'], equipment: ['hyperextension_bench'], setting: ['gym', 'clinic'] },
    indications: { primary: ['erector_spinae_strengthening', 'chronic_lbp_stable', 'gm_strengthening', 'posterior_chain_endurance'], secondary: ['prevention', 'deconditioning'], contraindications: ['acute_lbp', 'spondylolisthesis_grade2+', 'severe_stenosis', 'extension_intolerant'] },
    clinical_reasoning: 'Evidence Level 2B (Aasa 2015 RCT, Clark 2003): Back extension effective chronic LBP pain ↓ function ↑. Erector 70-85% MVC, GM 65-75%. 45° safer vs horizontal. ROM horizontal avoid hyperextension >15°. Progression BW → 20kg plate.',
    progression_levels: [
      { level: 1, description: 'BW hands chest', reps: '12-15', sets: '3', notes: 'Standard' },
      { level: 2, description: 'Hands behind head', reps: '12-15', sets: '3', notes: 'Increased lever' },
      { level: 3, description: 'Plate 5-10kg chest', reps: '12-15', sets: '3', notes: 'Light load' },
      { level: 4, description: 'Plate 15-20kg', reps: '10-12', sets: '3', notes: 'Moderate load' }
    ],
    status: 'active'
  },

  {
    name: 'Reverse Hyperextension (Machine)',
    name_fr: 'Hyperextension Inverse (Machine)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Extension hanche inverse (jambes bougent, tronc fixe) pour GM/hamstrings strengthening, décompression traction lombaire.',
    instructions_patient: `Position: Allongé ventre sur machine reverse hyper, hanches bord pad, jambes pendent. Exécution: Levez jambes extension hanches (horizontal), hold 1s, descendez contrôlé. 12-20 reps. Points clés: Levez jambes (pas cambrer dos!), mouvement hanches PUR, traction décompression lombaire bénéfique, mouvement fluide.`,
    instructions_professional: `Indications: GM/hamstring strengthening avec décompression lombaire simultanée (unique!), chronic LBP disc-related, posterior chain safe strengthening, alternative back extension (↓ compression). Activation (EMG): GM 75-90% MVC, hamstrings 65-80% MVC, erector spinae 40-50% MVC (minimal vs back extension = benefit). Biomécanique unique: Legs moving (vs trunk) = traction decompression force lumbar spine (vs compression back extension/deadlift). Louie Simmons (powerlifter): "reverse hyper rehab + strengthen simultaneous". Load: Machine-dependent weight stack 10-50kg. ROM: Legs horizontal (avoid hyperextension excessive >15-20° = posterior element stress). Evidence Level 4 (clinical consensus, no RCT), Effectiveness 85/100. Benefits: Decompression traction (unique), GM strengthening excellent, safe post-injury (↓ compression). Contre-indications: Acute LBP severe, spondylolisthésis grade 3+ (hyperextension risk), hip pathology (impingement), machine unavailability.`,
    dosage_reps: '12-20',
    dosage_sets: '3',
    dosage_frequency: '2-3x/semaine',
    reps_optimal: 15,
    sets_optimal: 3,
    difficulty_level: 'advanced',
    evidence_level: '4',
    effectiveness_score: 85,
    key_points: ['UNIQUE: Decompression traction + GM strengthening simultaneous', 'GM 75-90% MVC, erector 40-50% (minimal)', 'Safe post-injury (↓ compression vs back extension)', 'Louie Simmons: "Rehab + strengthen"', 'Machine-dependent (specialty equipment)'],
    contraindications: ['Acute LBP severe', 'Spondylolisthésis grade 3+', 'Hip impingement', 'Machine unavailable'],
    tags: { phase: ['chronic', 'post_injury', 'strengthening'], pattern: ['decompression', 'posterior_chain'], mechanism: ['strengthening', 'decompression'], level: ['advanced'], equipment: ['reverse_hyper_machine'], setting: ['gym_specialty'] },
    indications: { primary: ['gm_strengthening', 'chronic_lbp_disc', 'posterior_chain_safe', 'post_injury_strengthening'], secondary: ['decompression_therapy', 'prevention'], contraindications: ['acute_lbp_severe', 'spondylolisthesis_grade3+', 'hip_impingement'] },
    clinical_reasoning: 'Evidence Level 4: Reverse hyperextension UNIQUE decompression traction + GM strengthening simultaneous. GM 75-90% MVC, erector minimal 40-50%. Safe post-injury ↓ compression. Louie Simmons powerlifting rehab tool. Load 10-50kg machine.',
    progression_levels: [
      { level: 1, description: 'Light 10-20kg', reps: '15-20', sets: '3', notes: 'Decompression emphasis' },
      { level: 2, description: 'Moderate 20-30kg', reps: '12-15', sets: '3', notes: 'Standard' },
      { level: 3, description: 'Heavy 30-40kg', reps: '12-15', sets: '3', notes: 'Strength emphasis' },
      { level: 4, description: 'Maximum 40-50kg', reps: '10-12', sets: '3', notes: 'Advanced strength' }
    ],
    status: 'active'
  },

  {
    name: 'Weighted Plank (Plate on Back)',
    name_fr: 'Planche Lestée (Plaque sur Dos)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Plank avec charge externe pour progression standard plank mastered, ↑ anti-extension demand via loading.',
    instructions_patient: `Position: Planche standard, partenaire place plaque (10-25kg) haut dos. Exécution: Hold 20-40s, tronc RIGIDE (ne creusez pas sous poids!), core contracté MAX contre charge. Points clés: Progression plaque 10→25kg, hold time ↓ vs unweighted, technique parfaite essentielle (poids amplifie erreurs).`,
    instructions_professional: `Indications: Anti-extension progression standard plank mastered (60s+), advanced core strengthening, load tolerance progression, athlete training. Activation: RA 75-90% MVC (vs 55-65% standard = ↑ 30-40%), obliques 65-80% MVC, erector spinae 65-75% MVC. Loading: External load ↑ anti-extension moment = ↑ demand. Plate weight progression: 10kg → 15kg → 20kg → 25kg. Hold time: 20-40s (↓ vs 60s standard due to ↑ intensity). Evidence Level 3, Effectiveness 87/100. Prerequisite: Standard plank 60s+ perfect form. Alternative: Weighted vest (distributed load more comfortable). Contre-indications: Acute LBP, inability maintain lumbar neutral standard plank, insufficient strength standard plank <45s.`,
    dosage_reps: '3-4 holds',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    hold_time: '20-40s',
    difficulty_level: 'advanced',
    evidence_level: '3',
    effectiveness_score: 87,
    key_points: ['RA 75-90% MVC (↑ 30-40% vs standard)', 'External load ↑ anti-extension demand', 'Progression 10-25kg plate', 'Hold 20-40s (intensity ↑)', 'Prerequisite: Standard plank 60s+'],
    contraindications: ['Acute LBP', 'Standard plank inability', 'Insufficient strength <45s standard'],
    tags: { phase: ['chronic', 'advanced_training'], pattern: ['progression_standard'], mechanism: ['strengthening', 'anti_extension'], level: ['advanced'], equipment: ['weight_plate', 'partner'], setting: ['gym', 'clinic'] },
    indications: { primary: ['plank_progression_loading', 'advanced_core', 'load_tolerance'], secondary: ['chronic_lbp_stable', 'athlete_training'], contraindications: ['acute_lbp', 'standard_plank_inability'] },
    clinical_reasoning: 'Evidence Level 3: Weighted plank RA 75-90% MVC (↑ 30-40% vs standard). External load ↑ anti-extension moment demand. Progression 10-25kg plate. Hold 20-40s. Prerequisite: Standard 60s+ perfect. Weighted vest alternative comfortable.',
    progression_levels: [
      { level: 1, description: 'Plate 10kg', hold_time: '20-30s', sets: '3', notes: 'Initial loading' },
      { level: 2, description: 'Plate 15kg', hold_time: '20-30s', sets: '3', notes: 'Moderate load' },
      { level: 3, description: 'Plate 20kg', hold_time: '20-30s', sets: '3', notes: 'Heavy load' },
      { level: 4, description: 'Plate 25kg', hold_time: '20-25s', sets: '3', notes: 'Maximum load' }
    ],
    status: 'active'
  },

  {
    name: 'Copenhagen Plank (Adductor)',
    name_fr: 'Planche Copenhague (Adducteurs)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Side plank sur top leg elevated pour adducteurs + obliques, injury prevention groin/hip, sport-specific.',
    instructions_patient: `Position: Side plank MAIS jambe top sur banc élevé, jambe bottom suspendue. Exécution: Hold 15-30s, hanches HAUTES (alignment épaule-hanche-pied), jambe top contractée (adducteurs). Points clés: Très difficile! Adducteurs travaillent intense, hanches hautes, progression lente, alternative: jambe bottom au sol début.`,
    instructions_professional: `Indications: Adductor strengthening maximal, groin injury prevention (soccer, hockey), oblique strengthening progression side plank, hip stabilization. Activation (EMG Ishøi 2016): Adductors 100-110% MVC (!), obliques 80-90% MVC, QL 70-80% MVC, shoulder stabilizers 70-80%. Evidence Level 1B (Ishøi 2016 RCT): Copenhagen adductor ↓ groin injury rate 41% soccer players. Biomécanique: Top leg elevated = adductor support body weight + oblique stabilization (dual challenge). Hold time: 15-30s (intense). Progression: Bottom leg on ground support → Bottom leg elevated bent → Bottom leg straight elevated (hardest). Sport-specific: Soccer, hockey, skating sports. Contre-indications: Acute groin strain, acute LBP, adductor severe weakness (unable support), shoulder pathology.`,
    dosage_reps: '3-4 holds per side',
    dosage_sets: '3',
    dosage_frequency: '2-3x/semaine',
    hold_time: '15-30s',
    difficulty_level: 'advanced',
    evidence_level: '1B',
    effectiveness_score: 90,
    key_points: ['Evidence Level 1B: ↓ groin injury 41% (Ishøi 2016 RCT)', 'Adductors 100-110% MVC maximal', 'Obliques 80-90% MVC dual challenge', 'Sport-specific soccer/hockey', 'Progression leg ground → bent → straight elevated'],
    contraindications: ['Acute groin strain', 'Acute LBP', 'Severe adductor weakness', 'Shoulder pathology'],
    tags: { phase: ['chronic', 'return_sport', 'prevention'], pattern: ['sport_specific', 'groin_injury_prevention'], mechanism: ['strengthening', 'injury_prevention'], level: ['advanced'], equipment: ['bench'], setting: ['gym', 'field', 'clinic'] },
    indications: { primary: ['groin_injury_prevention', 'adductor_strengthening', 'return_sport_soccer_hockey', 'oblique_advanced'], secondary: ['chronic_lbp_stable', 'hip_stabilization'], contraindications: ['acute_groin_strain', 'acute_lbp', 'severe_adductor_weakness'] },
    clinical_reasoning: 'Evidence Level 1B (Ishøi 2016 RCT): Copenhagen plank ↓ groin injury 41% soccer. Adductors 100-110% MVC maximal, obliques 80-90%. Dual adductor support + oblique stability. Hold 15-30s intense. Sport-specific soccer/hockey groin prevention.',
    progression_levels: [
      { level: 1, description: 'Bottom leg on ground support', hold_time: '15-25s', sets: '3', notes: 'Modified easier' },
      { level: 2, description: 'Bottom leg elevated bent knee', hold_time: '15-25s', sets: '3', notes: 'Intermediate' },
      { level: 3, description: 'Bottom leg straight elevated', hold_time: '15-30s', sets: '3', notes: 'Standard full' },
      { level: 4, description: 'Straight + hip abduction pulses', hold_time: '20-30s', sets: '3', notes: 'Advanced dynamic' }
    ],
    status: 'active'
  },

  {
    name: 'Zercher Squat',
    name_fr: 'Squat Zercher (Barre Coudes)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Squat barre dans coudes (Zercher position) pour upright posture ↑, quad emphasis, core anti-flexion unique loading.',
    instructions_patient: `Position: Debout, barre dans pli coudes (Zercher hold), avant-bras croisés serrent barre, pieds largeur épaules. Exécution: Squat profond, tronc VERTICAL, remontez. 6-10 reps. Points clés: Barre position INCONFORTABLE (pad essayer!), tronc très vertical (vs back squat), quad emphasis ↑, charge modérée (position limite poids), unique exercise!`,
    instructions_professional: `Indications: Quad strengthening emphasis (upright posture), core anti-flexion unique load position (anterior load), return to functional lifting (simulates carrying object), alternative back squat (shoulder limitation). Activation: Quadriceps 80-95% MVC (↑ vs back squat due to upright), GM 55-70% MVC, RA/obliques 70-80% MVC anti-flexion (anterior load challenge). Biomécanique: Anterior load position = forced upright trunk (vs back squat forward lean) = ↑ quad emphasis, ↓ hip moment. Load limitation: Arm/elbow position limits load vs back squat (typically 40-60% back squat load). Evidence Level 4, Effectiveness 84/100. Benefits: Unique loading pattern, functional carrying simulation, shoulder-friendly squat alternative, core anti-flexion training. Discomfort: Elbow/forearm pressure (pad towel help). Contre-indications: Acute LBP, elbow pain (position intolerance), insufficient upper body strength hold bar.`,
    dosage_reps: '6-10',
    dosage_sets: '3-4',
    dosage_frequency: '1-2x/semaine',
    reps_optimal: 8,
    sets_optimal: 3,
    difficulty_level: 'advanced',
    evidence_level: '4',
    effectiveness_score: 84,
    key_points: ['Quad 80-95% MVC (upright posture)', 'Core anti-flexion 70-80% MVC (anterior load)', 'Functional carrying simulation', 'Load limited vs back squat (arm position)', 'Uncomfortable but unique benefits'],
    contraindications: ['Acute LBP', 'Elbow pain', 'Insufficient upper body strength'],
    tags: { phase: ['chronic', 'functional', 'variation'], pattern: ['functional', 'quad_emphasis'], mechanism: ['strengthening', 'anti_flexion', 'functional'], level: ['advanced'], equipment: ['barbell', 'squat_rack', 'optional_pad'], setting: ['gym'] },
    indications: { primary: ['quad_strengthening_emphasis', 'functional_carrying', 'shoulder_limitation_alternative', 'core_anti_flexion'], secondary: ['chronic_lbp_stable', 'variation_training'], contraindications: ['acute_lbp', 'elbow_pain'] },
    clinical_reasoning: 'Evidence Level 4: Zercher squat quad 80-95% MVC upright posture. Core anti-flexion 70-80% MVC anterior load. Functional carrying simulation. Load limited arm position (40-60% back squat). Shoulder-friendly alternative. Discomfort elbow managed pad.',
    progression_levels: [
      { level: 1, description: 'Bar only 20kg technique', reps: '8-10', sets: '3', notes: 'Learning position' },
      { level: 2, description: 'Light 30-40kg', reps: '8-10', sets: '3', notes: 'Building tolerance' },
      { level: 3, description: 'Moderate 50-60kg', reps: '6-8', sets: '3-4', notes: 'Standard' },
      { level: 4, description: 'Heavy 70-80kg', reps: '6-8', sets: '3-4', notes: 'Advanced (position-limited)' }
    ],
    status: 'active'
  },

  {
    name: 'TRX/Ring Fallout',
    name_fr: 'TRX/Anneaux Rollout (Fallout)',
    body_region: 'lumbar',
    exercise_type: 'strengthening',
    description: 'Plank dynamique avec TRX/rings extension bras pour anti-extension core maximal, instability challenge.',
    instructions_patient: `Position: Planche sur TRX/anneaux, mains dans straps, pieds sol. Exécution: Étendez bras avant lentement (corps s'étire), contractez abdominaux MAX ramener, 6-12 reps. Points clés: Instabilité straps = difficulté ↑↑, ne laissez pas dos creuser, contrôle strict, plus difficile que ab wheel!`,
    instructions_professional: `Indications: Anti-extension core maximal + instability challenge, advanced core training, shoulder stabilization integration, athlete training proprioception. Activation: RA 80-95% MVC (similar ab wheel + instability), obliques 70-85% MVC (anti-rotation instability), shoulder stabilizers 75-85% MVC (dynamic stabilization). Biomécanique: Extending lever arm + instability straps = dual challenge anti-extension + stabilization. More difficult than ab wheel (instability component). Progression: Partial ROM → Full ROM → Feet elevated → Single strap. Evidence Level 4, Effectiveness 89/100. Benefits: Instability training proprioception, shoulder-core integration, ultimate anti-extension. Contre-indications: Acute LBP, shoulder pathology, inability maintain lumbar neutral plank, insufficient core strength (ab wheel mastery prerequisite).`,
    dosage_reps: '6-12',
    dosage_sets: '3',
    dosage_frequency: '2x/semaine',
    difficulty_level: 'advanced',
    evidence_level: '4',
    effectiveness_score: 89,
    key_points: ['RA 80-95% MVC + instability challenge', 'More difficult than ab wheel (instability)', 'Shoulder-core integration 75-85% MVC', 'Proprioception training ultimate', 'Prerequisite: Ab wheel mastery'],
    contraindications: ['Acute LBP', 'Shoulder pathology', 'Lumbar neutral plank inability', 'Insufficient core (ab wheel prerequisite)'],
    tags: { phase: ['chronic', 'advanced_training', 'athlete'], pattern: ['instability', 'proprioceptive'], mechanism: ['strengthening', 'anti_extension', 'proprioception'], level: ['advanced'], equipment: ['trx', 'rings'], setting: ['gym', 'clinic'] },
    indications: { primary: ['advanced_core_instability', 'shoulder_core_integration', 'proprioception_training', 'athlete_training'], secondary: ['chronic_lbp_stable'], contraindications: ['acute_lbp', 'shoulder_pathology', 'ab_wheel_inability'] },
    clinical_reasoning: 'Evidence Level 4: TRX/ring fallout RA 80-95% MVC + instability challenge. More difficult ab wheel (instability component). Shoulder stabilizers 75-85% integration. Proprioception ultimate. Prerequisite ab wheel mastery. Progression partial → full ROM.',
    progression_levels: [
      { level: 1, description: 'Partial ROM 0.5m extension', reps: '8-12', sets: '3', notes: 'Learning instability' },
      { level: 2, description: 'Full ROM controlled', reps: '6-10', sets: '3', notes: 'Standard' },
      { level: 3, description: 'Feet elevated 30cm', reps: '6-10', sets: '3', notes: 'Advanced' },
      { level: 4, description: 'Single strap alternating', reps: '5-8 per side', sets: '3', notes: 'Elite instability' }
    ],
    status: 'active'
  }
];

export default lumbarExercisesLevel3;

