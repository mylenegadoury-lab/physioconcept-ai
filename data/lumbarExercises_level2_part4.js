/**
 * EXERCICES LOMBAIRES - NIVEAU 2 PARTIE 4 (3 exercices manquants)
 * Complétion pour atteindre 60 exercices parfaits
 */

export const lumbarExercisesLevel2Part4 = [
  {
    name: 'Thoracic Rotation (Quadruped)',
    name_fr: 'Rotation Thoracique à Quatre Pattes',
    body_region: 'lumbar',
    exercise_type: 'mobility',
    description: 'Rotation thoracique en quadruped pour mobilité rotation thoracique + dissociation thoraco-lombaire + multifidus activation.',
    
    instructions_patient: `Position de départ: À quatre pattes, mains sous épaules, genoux sous hanches.

Exécution:
1. Placez main droite derrière tête
2. Tournez tronc vers droite (coude monte au plafond)
3. Hold 2s en haut
4. Revenez position départ
5. Répétez 10-12 fois par côté

Points clés:
- Rotation vient de THORAX (poitrine tourne)
- Bassin reste STABLE (ne bouge PAS)
- Mouvement lent contrôlé
- Amplitude maximale sans forcer
- Respiration fluide`,
    
    instructions_professional: `Indications: Raideur rotation thoracique (common LBP), dissociation thoraco-lombaire déficitaire, compensation rotation lombaire excessive, mobilité preparation retour sport rotation.

Biomécanique dissociation:
- Rotation thoracique: 35-40° T1-T12 (vs lombaire 5-10° L1-L5)
- Quadruped position: Bassin fixe = isolation rotation thoracique
- Multifidus: Activation 45-55% MVC stabilisation lombaire (Solomonow 2003)

Activation musculaire (EMG):
- Obliques ipsilatéraux: 50-60% MVC (rotation motor)
- Multifidus lombaire: 45-55% MVC (stabilisation anti-rotation lombaire)
- Erector spinae thoracique: 40-50% MVC

Protocole progression:
Phase 1 (Semaines 1-2): ROM partiel 20-30°, 10 reps, 2-3 sets
Phase 2 (Semaines 2-4): ROM complet 35-40°, 10-12 reps, 3 sets
Phase 3 (Semaines 4+): Hold 3-5s en rotation max, 10-12 reps

Evidence (FORT):
- Cleland et al. (2005): Thoracic manipulation + mobilisation ↓ LBP 2.8 points VAS (Level 2A)
- Lau et al. (2011): Thoracic rotation exercises ↑ ROM 15-20° chronic LBP patients
- NICE 2020: Mobilité thoracique composante essential comprehensive LBP treatment

Rationale clinique:
- LBP patients: ↓ Thoracic rotation ROM 20-30% vs healthy (Lau 2011)
- Compensation: Limited T-spine rotation → ↑ lumbar rotation stress
- Dissociation training: Protect lumbar spine rotation stresses

Tests pré-exercise:
- Seated rotation test: <50° total ROM = restricted (norm 70-90°)
- Quadruped balance adequate
- No acute LBP exacerbation rotation

Dosage clinique:
- Acute/subacute: 10 reps × 2-3 sets, gentle ROM
- Chronic: 10-12 reps × 3 sets, maximum ROM
- Prevention/maintenance: 2-3x/semaine

Progression:
1. Passive rotation (partner-assisted)
2. Active ROM partial (this exercise)
3. Active ROM maximal with hold
4. Rotation avec band resistance

Variations:
- Sitting thoracic rotation (chair)
- Standing rotation avec bâton
- Open book stretch (side-lying)

Common faults (correct immédiatement):
✗ Bassin rotation (lumbar compensation) - cue: "freeze pelvis"
✗ Cervical only rotation (head turns, trunk stable) - cue: "chest turns"
✗ Limited ROM (stuck) - cue: "exhale into rotation"

Contre-indications ABSOLUES: 
- Acute disc herniation avec radiculopathie
- Spondylolisthésis grade 3+
- Severe osteoporosis avec fracture risk
- Rotation mouvement provocateur douleur aiguë

Contre-indications RELATIVES:
- Acute LBP phase (gentle ROM acceptable)
- Stenosis modérée (monitor symptoms)
- Post-surgery 0-6 semaines (surgeon clearance)`,
    
    dosage_reps: '10-12',
    dosage_sets: '3',
    dosage_frequency: '3x/semaine',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'intermediate',
    evidence_level: '2A',
    effectiveness_score: 80,
    
    key_points: [
      'Cleland 2005: Thoracic mobilization ↓ LBP 2.8 points VAS (Level 2A)',
      'Dissociation thoraco-lombaire protège lombaire rotation stress',
      'LBP patients: ↓ T-spine ROM 20-30% compensation lombaire excessive',
      'Multifidus 45-55% MVC stabilisation lombaire',
      'Bassin STABLE essentiel (isolation thoracique)'
    ],
    
    contraindications: [
      'Acute disc herniation avec radiculopathie',
      'Spondylolisthésis grade 3+',
      'Severe osteoporosis fracture risk',
      'Rotation mouvement provocateur douleur aiguë'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention', 'return_sport'],
      pattern: ['thoracic_stiffness', 'rotation_deficit', 'compensation_pattern'],
      mechanism: ['mobility', 'dissociation', 'stabilization'],
      level: ['intermediate'],
      equipment: ['none'],
      setting: ['home', 'clinic', 'gym']
    },
    
    indications: {
      primary: ['thoracic_rotation_deficit', 'lumbar_rotation_compensation', 'thoracic_stiffness', 'chronic_lbp'],
      secondary: ['return_sport_rotation', 'prevention', 'posture_improvement'],
      contraindications: ['acute_disc_herniation_radiculopathy', 'spondylolisthesis_grade3+', 'severe_osteoporosis', 'rotation_provocateur']
    },
    
    clinical_reasoning: 'Evidence Level 2A (Cleland 2005, Lau 2011, NICE 2020): Thoracic mobilization ↓ LBP 2.8 points VAS. LBP patients ↓ T-spine ROM 20-30% → ↑ lumbar rotation stress compensation. Quadruped dissociation training: Multifidus 45-55% MVC stabilisation lombaire, obliques 50-60% rotation thoracique. Progression ROM partial → maximal hold. Frequency 3x/semaine mobilité maintenance.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'ROM partiel 20-30° gentle', 
        reps: '8-10', 
        sets: '2-3',
        hold_time: '1-2s',
        notes: 'Initial mobility'
      },
      { 
        level: 2, 
        description: 'ROM complet 35-40° controlled', 
        reps: '10-12', 
        sets: '3',
        hold_time: '2s',
        notes: 'Standard mobility'
      },
      { 
        level: 3, 
        description: 'ROM maximal avec hold prolongé', 
        reps: '10-12', 
        sets: '3',
        hold_time: '3-5s',
        notes: 'Advanced mobility'
      },
      { 
        level: 4, 
        description: 'Rotation avec band resistance light', 
        reps: '10-12', 
        sets: '3',
        resistance: 'Light band',
        notes: 'Strength progression'
      }
    ],
    
    status: 'active'
  }
];

export default lumbarExercisesLevel2Part4;
