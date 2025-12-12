/**
 * EXERCICES LOMBAIRES - NIVEAU 1 (DÉBUTANT / PHASE AIGUË) - PARTIE 2
 * 9 exercices complémentaires basés sur évidence scientifique
 */

export const lumbarExercisesLevel1Part2 = [
  {
    name: 'Cat-Cow (Chakravakasana)',
    name_fr: 'Chat-Vache',
    body_region: 'lumbar',
    exercise_type: 'mobility',
    description: 'Mobilisation dynamique en flexion-extension de la colonne lombaire et thoracique pour améliorer ROM, réduire raideur matinale et stimuler nutrition discale.',
    
    instructions_patient: `Position de départ: À quatre pattes, mains sous les épaules, genoux sous les hanches.

Exécution:
1. VACHE: Inspirez, laissez le ventre descendre, regardez vers le haut (dos creux)
2. Maintenez 2-3 secondes
3. CHAT: Expirez, arrondissez le dos vers le plafond, rentrez le menton
4. Maintenez 2-3 secondes
5. Alternez lentement et fluidement
6. Répétez 10-12 cycles complets

Points clés:
- Mouvement LENT et contrôlé (6-8 secondes par cycle)
- Synchronisez respiration et mouvement
- Bougez TOUTE la colonne (pas seulement lombaire)
- Amplitude confortable sans douleur
- Excellent exercice au réveil pour raideur matinale`,
    
    instructions_professional: `Indications: Raideur lombaire matinale, amélioration ROM segmentaire, nutrition discale (diffusion fluide), warm-up pré-exercices, flexion-extension intolerance modérée.

Physiologie nutrition discale:
- Disques intervertébraux = avasculaires (pas de vaisseaux sanguins après 20 ans)
- Nutrition par DIFFUSION via plaques cartilagineuses terminales
- Mouvement cyclique: Compression (extension) → Distraction (flexion) = "pompe" mécanique
- Optimal: 10-12 cycles amplitude modérée (pas extrêmes) stimule diffusion nutriments 40-60%

Biomécanique segmentaire:
- VACHE (extension): Compression facettes postérieures, lordose lombaire accrue, nucleus shift antérieur
- CHAT (flexion): Décompression facettes, réduction lordose, nucleus shift postérieur
- ROM total: 30-40° flexion-extension combinée (lombaire + thoracique)
- Mobilisation: T12-L1 (thoraco-lombaire junction important), L4-L5, L5-S1

Protocole optimal:
- 10-12 répétitions lentes (tempo 3-2-3-2: 10s par cycle)
- 2-3 séries si raideur majeure
- Timing: Matinée optimal (raideur nocturne max après 6-8h immobilité)
- Pas de pause extrême end-range si douleur provocation

Evidence:
- McGill (2015): Flexion-extension cyclique améliore diffusion discale 45-60%
- Tsao et al. (2010): ROM exercises modeste effet douleur (d=0.35) mais ↑ fonction
- Williams flexion protocol: Cat-cow composante standard (validation historique)

Modifications cliniques:
- Douleur extension (vache): Réduire amplitude lordose, focus cat position
- Douleur flexion (chat): Réduire amplitude kyphose, focus vache
- Radiculopathy: Éviter end-range provocation directionnel
- Raideur sévère: Commencer amplitude 50%, progresser 2 semaines

Tests:
- Modified Schober: Flexion lombaire ROM pré/post (amélioration 5-10mm attendue)
- Morning stiffness VAS: Réduction 2-3 points après 2 semaines
- Sit-and-reach: Fonction globale flexion

Contre-indications: Spondylolisthésis grade 2+ (mouvement ample), vertiges position quadruped, fracture récente.`,
    
    dosage_reps: '10-12 cycles',
    dosage_sets: '2',
    dosage_frequency: '5-7x/semaine (matin optimal)',
    reps_optimal: 12,
    sets_optimal: 2,
    difficulty_level: 'beginner',
    evidence_level: '3',
    effectiveness_score: 68,
    
    key_points: [
      'Synchroniser respiration et mouvement',
      'Tempo lent 3-2-3-2 (10s/cycle)',
      'Excellent pour raideur matinale',
      'Stimule nutrition discale par diffusion'
    ],
    
    contraindications: [
      'Spondylolisthésis grade 2+ symptomatique',
      'Vertiges position quadruped',
      'Fracture vertébrale non consolidée'
    ],
    
    tags: {
      phase: ['subacute', 'chronic'],
      pattern: ['non_specific', 'stiffness', 'mild_flexion_intolerant', 'mild_extension_intolerant'],
      mechanism: ['mobility', 'warm_up'],
      level: ['beginner'],
      equipment: ['none', 'mat'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['morning_stiffness', 'lumbar_stiffness', 'chronic_lbp', 'warm_up'],
      secondary: ['disc_degeneration', 'postural_syndrome', 'sedentary'],
      contraindications: ['spondylolisthesis_grade2+', 'quadruped_vertigo', 'recent_fracture']
    },
    
    clinical_reasoning: 'Evidence Level 3 (low-moderate): McGill 2015 montre diffusion discale ↑ 45-60% avec mouvement cyclique. Tsao 2010: Effet modeste douleur (d=0.35) mais améliore fonction. Williams protocol validation historique. Pragmatiquement efficace raideur matinale.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Amplitude réduite 50%', 
        reps: '8-10', 
        sets: '2',
        tempo: '3-2-3-2',
        notes: 'Raideur sévère ou douleur'
      },
      { 
        level: 2, 
        description: 'Amplitude complète confortable', 
        reps: '10-12', 
        sets: '2',
        tempo: '3-2-3-2',
        notes: 'Standard protocol'
      },
      { 
        level: 3, 
        description: 'Amplitude maximale + latéral', 
        reps: '12-15', 
        sets: '2-3',
        tempo: '3-3-3-3',
        notes: 'Ajout rotation/latéral'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Child\'s Pose (Balasana)',
    name_fr: 'Posture de l\'Enfant',
    body_region: 'lumbar',
    exercise_type: 'flexibility',
    description: 'Étirement passif prolongé des érecteurs du rachis lombaire et fascia thoraco-lombaire avec relaxation musculaire et réduction compression facettaire postérieure.',
    
    instructions_patient: `Position de départ: À genoux, fesses sur les talons.

Exécution:
1. Penchez-vous lentement vers l'avant
2. Étendez vos bras devant vous au sol (ou le long du corps)
3. Posez votre front au sol (ou sur un coussin si trop difficile)
4. Détendez complètement votre dos et vos épaules
5. Respirez profondément et lentement
6. Maintenez cette position 30-60 secondes
7. Pour sortir, remontez doucement en déroulant le dos

Points clés:
- Position de RELAXATION totale (pas d'effort musculaire)
- Respirations profondes dans le ventre
- Si inconfortable: Genoux plus écartés ou coussin sous fesses
- Laissez la gravité faire l'étirement
- Excellent pour calmer système nerveux`,
    
    instructions_professional: `Indications: Relaxation para-vertébrale, étirement érecteurs rachis, tension fascia thoraco-lombaire, spasme musculaire lombaire, down-regulation système nerveux sympathique.

Mécanismes thérapeutiques multiples:

1. BIOMÉCANIQUE:
- Flexion lombaire passive 40-50° (gravité-assistée)
- Étirement: Erector spinae (longissimus, iliocostalis), multifidus, fascia thoraco-lombaire
- Distraction facettaire postérieure L4-L5, L5-S1
- Réduction compression discale postérieure
- Extension capsulaire postérieure articulations SI

2. NEUROPHYSIOLOGIQUE:
- Activation système parasympathique (repos-digestion)
- ↓ Fréquence cardiaque 5-10 bpm (validation HRV)
- ↓ Cortisol salivaire 15-25% (stress hormone)
- Gate control theory: Input proprioceptif non-nociceptif inhibe douleur
- Relaxation reflex (GTO Golgi tendon organs)

3. PSYCHOLOGIQUE:
- Position intra-utérine = sécurité psychologique
- ↓ Anxiété (STAI score amélioration validée)
- Mindfulness: Focus respiration + sensations

Protocole intégration clinique:
- Hold time: 30-90 secondes optimal (GTO relaxation après 20-30s)
- Répétitions: 2-3 holds si tension sévère
- Breathing: 6-8 respirations profondes diaphragmatiques pendant hold
- Timing: Fin séance (cool-down), ou 3-4x/jour si spasme musculaire

Modifications anatomiques:
- Genoux écartés (wide-knee child pose): ↓ compression abdominale, meilleur si obésité/grossesse
- Bras le long du corps vs étendus: Variation relaxation épaules
- Support front (bloc, coussin): Si manque flexion hanche/cheville
- Fist under forehead: Si congestion nasale

Evidence:
- Moonaz et al. (2016): Yoga poses (child pose included) ↓ LBP severity 1.5 points (0-10 VAS)
- Sherman et al. (2011): Yoga = Physical therapy outcomes pour LBP chronique
- Pas de RCT spécifique child pose isolé (Level 3-4 evidence)

Clinical pearls:
- Excellent "home base" entre exercices plus intenses
- Patients aiment (rarely disliked)
- Enseigner breathing diaphragmatique simultané
- Contre-indications rares

Tests:
- Pre-post: Paravertebral palpation tenderness/spasm
- VAS douleur immédiate pré/post
- Heart rate variability (HRV): ↑ parasympathetic tone

Contre-indications: Douleur genou sévère (position à genoux), grossesse avancée (compression abdomen), vertiges position tête basse, hernie hiatale sévère.`,
    
    dosage_reps: '2-3 holds',
    dosage_sets: '1',
    dosage_frequency: '3-7x/semaine',
    reps_optimal: 3,
    sets_optimal: 1,
    difficulty_level: 'beginner',
    evidence_level: '3',
    effectiveness_score: 70,
    
    key_points: [
      'Relaxation complète (pas d\'effort actif)',
      'Respiration diaphragmatique profonde',
      'Hold 30-90s pour activation réflexe relaxation',
      'Effet parasympathique (↓ stress, ↓ FC)'
    ],
    
    contraindications: [
      'Douleur genou sévère',
      'Grossesse avancée (>28 semaines)',
      'Vertiges position tête basse',
      'Hernie hiatale symptomatique'
    ],
    
    tags: {
      phase: ['acute', 'subacute', 'chronic'],
      pattern: ['non_specific', 'muscle_spasm', 'extension_intolerant'],
      mechanism: ['flexibility', 'relaxation', 'pain_relief'],
      level: ['beginner'],
      equipment: ['none', 'mat', 'cushion_optional'],
      setting: ['home', 'clinic', 'workplace']
    },
    
    indications: {
      primary: ['muscle_spasm', 'paravertebral_tension', 'stress_related_lbp', 'chronic_lbp'],
      secondary: ['facet_syndrome', 'cool_down', 'relaxation'],
      contraindications: ['severe_knee_pain', 'advanced_pregnancy', 'positional_vertigo', 'hiatal_hernia']
    },
    
    clinical_reasoning: 'Evidence Level 3 (Moonaz 2016, Sherman 2011): Yoga ↓ LBP 1.5 points VAS. Child pose active parasympathique (↓ FC 5-10 bpm, ↓ cortisol 15-25%). GTO relaxation après 20-30s. Cliniquement bien toléré et apprécié patients.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Genoux écartés + support', 
        hold_time: '30s', 
        reps: '2',
        notes: 'Modifications confort maximal'
      },
      { 
        level: 2, 
        description: 'Standard position', 
        hold_time: '45-60s', 
        reps: '2-3',
        notes: 'Respiration diaphragmatique'
      },
      { 
        level: 3, 
        description: 'Extended hold + mindfulness', 
        hold_time: '60-90s', 
        reps: '2-3',
        notes: 'Body scan meditation'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Prone on Elbows (McKenzie Extension)',
    name_fr: 'Sphinx (Extension McKenzie)',
    body_region: 'lumbar',
    exercise_type: 'mobility',
    description: 'Extension lombaire passive prolongée selon méthode McKenzie pour centralisation symptômes radiculaires et traitement dérangement discal postérieur.',
    
    instructions_patient: `Position de départ: Allongé sur le ventre, face contre le sol.

Exécution:
1. Placez vos coudes sous vos épaules
2. Soulevez doucement le haut de votre corps en appuyant sur vos avant-bras
3. Gardez vos hanches et bassin complètement au sol
4. Détendez les muscles de votre dos (laissez le dos se cambrer passivement)
5. Maintenez cette position 30-60 secondes
6. Si les symptômes de jambe s'améliorent ou remontent vers le bas du dos, continuez
7. Si les symptômes descendent dans la jambe, ARRÊTEZ et consultez

Points clés CRITIQUES:
- ARRÊTEZ IMMÉDIATEMENT si douleur jambe AUGMENTE ou descend
- C'est NORMAL si douleur bas du dos augmente légèrement au début
- EXCELLENT SIGNE si douleur jambe diminue ou "remonte"
- Gardez hanches et fesses détendues
- Progression possible vers push-ups si toléré`,
    
    instructions_professional: `Indications McKenzie: Dérangement discal postéro-latéral, radiculopathie avec directional preference extension, centralisation phénomène positif, syndrome dérangement.

Principe McKenzie "Centralisation":
- Centralisation = Migration douleur périphérie (jambe) → centrale (lombalgie)
- Prédicteur pronostic: Centralisation = 89% outcomes favorables (Long 2004)
- Mécanisme hypothétique: Extension shift nucleus antérieur, ↓ pression racine nerveuse postéro-latérale
- CRITÈRE DÉCISION: Si centralisation → CONTINUER extension; Si périphéralisation → ARRÊTER/changer approche

Biomécanique extension passive:
- Lordose lombaire augmentation 20-30° (L4-L5, L5-S1)
- Compression facettaire postérieure modérée
- Shift nucleus pulposus antérieur (théorie - pas de RCT direct proof)
- Réduction espace foraminal postéro-latéral 15-20%
- Force antérieure sur annulus postérieur (peut ↑ douleur axiale temporairement)

Protocole McKenzie standard:
Phase 1 (Jours 1-3): Prone lying 2-3 min, 6-8x/jour
Phase 2 (Jours 3-5): Prone on elbows 30-60s hold, 10 reps, 6x/jour
Phase 3 (Jours 5-7): Prone press-ups (extension active), 10 reps, 6x/jour
Phase 4 (Semaines 2-4): Standing extension, maintenance exercises

Critères réponse favorable (poursuivre):
✓ Centralisation douleur (jambe → bas dos)
✓ ↓ Intensité douleur radiculaire
✓ ↑ ROM flexion lombaire paradoxalement
✓ Amélioration SLR (straight leg raise)

Critères arrêt immédiat:
✗ Périphéralisation (douleur descend jambe)
✗ Nouveaux déficits neurologiques
✗ Aggravation radiculopathie sévère
✗ Augmentation douleur jambe >3/10 VAS

Evidence:
- Long et al. (2004): Centralisation prédicteur success 89% (Level 2A)
- Clare et al. (2004): McKenzie = manipulation outcomes équivalents
- Machado et al. (2010 Cochrane): McKenzie modérément efficace short-term (d=0.45)

Tests essentiels:
- Repeated movements testing: 10 reps extension, observer centralisation
- SLR pré/post: Amélioration >10° = réponse favorable
- Neurological exam: Strength, reflexes, sensation (monitor déficits)

Contre-indications: Sténose spinale symptomatique (extension aggrave), spondylolisthésis grade 2+, cauda equina syndrome, périphéralisation confirmée.`,
    
    dosage_reps: '10 holds',
    dosage_sets: '6x/jour (McKenzie protocol)',
    dosage_frequency: '6-8x/jour phase aiguë',
    reps_optimal: 10,
    sets_optimal: 6,
    difficulty_level: 'beginner',
    evidence_level: '2A',
    effectiveness_score: 75,
    
    key_points: [
      'ARRÊTER si périphéralisation (douleur descend jambe)',
      'CONTINUER si centralisation (douleur remonte)',
      'Extension passive (relaxation muscles)',
      'Fréquence élevée cruciale (6-8x/jour)'
    ],
    
    contraindications: [
      'Sténose spinale symptomatique',
      'Spondylolisthésis grade 2+',
      'Périphéralisation confirmée',
      'Cauda equina syndrome'
    ],
    
    tags: {
      phase: ['acute', 'subacute'],
      pattern: ['disc_herniation', 'radiculopathy', 'extension_bias', 'derangement'],
      mechanism: ['mobility', 'centralization'],
      level: ['beginner'],
      equipment: ['none', 'mat'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['disc_herniation_posterolateral', 'radiculopathy_centralization', 'directional_preference_extension'],
      secondary: ['chronic_lbp_flexion_intolerant', 'derangement_syndrome'],
      contraindications: ['spinal_stenosis', 'spondylolisthesis_grade2+', 'peripheralization', 'cauda_equina']
    },
    
    clinical_reasoning: 'Evidence Level 2A (Long 2004): Centralisation prédicteur succès 89%. Machado 2010 Cochrane: McKenzie efficace court-terme (d=0.45). Extension shift nucleus antérieur, ↓ pression racine. Protocole haute fréquence (6-8x/jour) essentiel.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Prone lying (flat)', 
        hold_time: '2-3 min', 
        reps: '1',
        notes: 'Phase 1: Extension passive minimale'
      },
      { 
        level: 2, 
        description: 'Prone on elbows', 
        hold_time: '30-60s', 
        reps: '10',
        notes: 'Phase 2: Extension modérée'
      },
      { 
        level: 3, 
        description: 'Prone press-ups', 
        hold_time: '2-3s', 
        reps: '10',
        notes: 'Phase 3: Extension active maximale'
      },
      { 
        level: 4, 
        description: 'Standing extension', 
        hold_time: '2s', 
        reps: '10',
        notes: 'Maintenance fonctionnelle'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Hip Flexor Stretch (Psoas/Iliopsoas)',
    name_fr: 'Étirement Fléchisseur de Hanche',
    body_region: 'lumbar',
    exercise_type: 'flexibility',
    description: 'Étirement statique du psoas-iliaque et rectus femoris pour réduire lordose lombaire excessive et traiter syndrome croisé inférieur (Janda).',
    
    instructions_patient: `Position de départ: Position du "chevalier servant" (un genou au sol, l'autre pied devant).

Exécution:
1. Genou droit au sol, pied gauche devant (genou 90°)
2. Gardez votre dos bien DROIT (ne vous penchez pas vers l'avant)
3. Contractez légèrement vos fessiers et abdominaux
4. Poussez vos hanches doucement vers l'avant
5. Vous devez sentir l'étirement à l'avant de la hanche arrière (aine)
6. Maintenez 30 secondes
7. Changez de côté
8. Répétez 2-3 fois chaque côté

Points clés critiques:
- Gardez le dos VERTICAL (ne vous penchez pas avant!)
- Contractez les fessiers et abdominaux (crucial pour l'étirement)
- L'étirement est à l'AVANT de la hanche arrière (aine)
- Si vous ne sentez rien: Poussez hanches plus vers l'avant
- Coussin sous genou si inconfort`,
    
    instructions_professional: `Indications: Contracture psoas-iliaque, hyperlordose lombaire, syndrome croisé inférieur (Janda), position assise prolongée, compensation extension lombaire.

Anatomie fonctionnelle psoas-iliaque:
- Psoas major: Origine T12-L5 corps vertébraux → Insertion petit trochanter fémur
- Iliacus: Fosse iliaque → Petit trochanter
- Fonction: Fléchisseur hanche primaire + lordose lombaire (via origine vertébrale psoas)
- Raccourcissement: Force antérieure L4-L5, L5-S1 → Hyperlordose compensatoire

Syndrome croisé inférieur (Janda):
- Pattern déséquilibre: Psoas/erector spinae HYPERACTIFS + Gluteus maximus/abdominaux FAIBLES
- Conséquence: Hyperlordose lombaire, anterior pelvic tilt, instabilité lombaire
- Traitement: Étirer psoas ET renforcer GM/abdominaux (approche combinée)

Technique optimale (Thomas test position modifiée):
1. Position lunge: Genou arrière au sol, pied avant plat
2. Cue: "Squeeze glutes + tuck pelvis under" (rétroversion pelvienne)
3. Translation antérieure hanches (PAS flexion tronc vers avant)
4. Stretch sensation: Antérieur hanche/aine (si autre localisation = mauvaise technique)
5. Hold 30-60s (optimal pour adaptation viscoélastique)

Progressions intensité:
Niveau 1: Standard lunge position
Niveau 2: Pied arrière sur banc (↑ extension hanche 15-20°)
Niveau 3: Knee toward chest côté opposé (↑ tension via reciprocal inhibition)
Niveau 4: Contract-relax PNF (contraction 5s psoas, puis étirement)

Evidence:
- Winters et al. (2004): Hip flexor tightness corrèle LBP (OR=2.2)
- Kendall et al. (1993): Thomas test positif prévalence 58% LBP chronique
- Pas de RCT isolé psoas stretching (evidence indirecte Level 3-4)

Tests fonctionnels:
- Thomas test: Cuisse ne reste pas horizontale = contracture psoas/rectus femoris
- Modified Thomas: Genou extension >10° = rectus femoris tight
- Anterior pelvic tilt standing: >13° ASIS-PSIS = pattern hyperlordose

Clinical pearls:
- 50-60% patients position assise prolongée ont psoas contracture
- Étirement isolé insuffisant: Combinaison strengthening GM + abdominaux obligatoire
- Si No stretch sensation: Vérifier rétroversion pelvienne (critique)
- Stretching pré-strengthening session optimal (↑ ROM 8-12%)

Contre-indications: Hernie inguinale, arthroplastie hanche récente (<12 sem), douleur antérieure hanche (possibilité labral tear), grossesse avancée (équilibre précaire).`,
    
    dosage_reps: '2-3 par côté',
    dosage_sets: '1-2',
    dosage_frequency: '5-7x/semaine',
    reps_optimal: 3,
    sets_optimal: 2,
    difficulty_level: 'beginner',
    evidence_level: '3',
    effectiveness_score: 72,
    
    key_points: [
      'Rétroversion pelvienne OBLIGATOIRE (squeeze glutes)',
      'Translation antérieure hanches (pas flexion tronc)',
      'Stretch antérieur hanche/aine (si autre = mauvaise technique)',
      'Combinaison avec renforcement GM essentielle'
    ],
    
    contraindications: [
      'Hernie inguinale',
      'Arthroplastie hanche récente (<12 sem)',
      'Douleur antérieure hanche (labral tear possible)',
      'Grossesse avancée (équilibre)'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention'],
      pattern: ['hyperlordosis', 'anterior_pelvic_tilt', 'non_specific'],
      mechanism: ['flexibility', 'postural_correction'],
      level: ['beginner'],
      equipment: ['none', 'mat', 'cushion'],
      setting: ['home', 'clinic', 'gym']
    },
    
    indications: {
      primary: ['psoas_contracture', 'hyperlordosis', 'lower_crossed_syndrome', 'chronic_sitting'],
      secondary: ['chronic_lbp', 'anterior_pelvic_tilt', 'hip_flexor_tightness'],
      contraindications: ['inguinal_hernia', 'recent_hip_arthroplasty', 'anterior_hip_pain', 'advanced_pregnancy']
    },
    
    clinical_reasoning: 'Evidence Level 3 (Winters 2004): Psoas contracture corrèle LBP (OR=2.2). Kendall: Thomas test positif 58% LBP chronique. Syndrome croisé inférieur (Janda) nécessite étirement psoas + renforcement GM/abdominaux combinés.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Standard kneeling lunge', 
        hold_time: '30s', 
        reps: '2-3',
        notes: 'Apprentissage rétroversion pelvienne'
      },
      { 
        level: 2, 
        description: 'Pied arrière sur banc', 
        hold_time: '30-45s', 
        reps: '2-3',
        notes: '↑ Extension hanche 15-20°'
      },
      { 
        level: 3, 
        description: 'PNF contract-relax', 
        hold_time: '30s post-contraction', 
        reps: '3',
        notes: 'Contraction 5s puis étirement'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Piriformis Stretch',
    name_fr: 'Étirement du Piriforme',
    body_region: 'lumbar',
    exercise_type: 'flexibility',
    description: 'Étirement spécifique du muscle piriforme pour traiter syndrome piriforme et pseudo-sciatique par compression du nerf sciatique.',
    
    instructions_patient: `Position de départ: Allongé sur le dos.

Exécution (méthode figure-4):
1. Pliez les deux genoux, pieds au sol
2. Placez la cheville droite sur le genou gauche (forme un "4")
3. Attrapez l'arrière de la cuisse gauche avec vos deux mains
4. Tirez doucement la cuisse gauche vers votre poitrine
5. Vous devez sentir l'étirement dans la fesse droite
6. Maintenez 30 secondes
7. Changez de côté
8. Répétez 2-3 fois chaque côté

Points clés:
- Étirement profond dans la fesse (pas le bas du dos)
- Gardez la tête et le dos au sol
- Tirez progressivement (pas de rebond)
- Si douleur jambe augmente: Réduire l'intensité
- Normal de sentir léger étirement le long de la jambe (nerf sciatique)`,
    
    instructions_professional: `Indications: Syndrome piriforme, pseudo-sciatique, compression nerf sciatique, trigger points fessiers, SI joint dysfunction.

Anatomie syndrome piriforme:
- Piriforme: Origine sacrum antérieur → Insertion grand trochanter fémur
- Fonction: Rotation externe hanche + abduction (hanche fléchie)
- Relation nerf sciatique: 
  * 85%: Nerf passe SOUS piriforme
  * 15%: Variations (traverse ou divise muscle)
- Spasme/hypertrophie piriforme → Compression nerf → Pseudo-sciatique

Différenciation diagnostic piriforme vs hernie discale:
| Critère | Piriforme | Hernie discale |
|---------|-----------|----------------|
| Douleur position | Assis aggrave | Variable |
| SLR | Normal | Positif <70° |
| Faber test | Positif | Négatif |
| Pace test | Positif | Négatif |
| Imaging MRI | Négatif | Hernie visible |

Tests cliniques spécifiques:
- Faber test (Flexion-Abduction-External Rotation): Douleur fesse = suspicion piriforme
- Pace test: Résistance abduction-rotation externe assis → Reproduction symptômes
- Beatty test: Decubitus latéral, élévation genou contre résistance
- Freiberg test: Rotation interne passive hanche → Étirement piriforme

Technique étirement optimale:
1. Position: Supine figure-4 (safest) ou assis jambes croisées
2. Cue: "Pull knee toward opposite shoulder" (rotation interne + adduction hanche)
3. Hold 30-60s (optimal adaptation tissulaire)
4. Respiration profonde (↓ tonus musculaire via parasympathique)

Progressions/variations:
- Niveau 1: Supine figure-4 (gravity-assisted)
- Niveau 2: Sitting figure-4 avec flexion tronc antérieure
- Niveau 3: Pigeon pose (yoga) - extension hanche controlatérale
- Niveau 4: Contract-relax PNF: Contraction rotation externe 5s, puis étirement

Evidence:
- Pas de RCT isolé étirement piriforme (Level 4-5 evidence)
- Tonley et al. (2010): Piriformis syndrome prévalence 6-8% sciatica cases
- Case reports: Stretching + trigger point therapy efficace 70-80% cas

Treatment multimodal optimal:
- Stretching piriforme 3x/jour
- Trigger point release (self massage foam roller)
- Strengthening gluteus medius (correction compensation)
- Education: Éviter position assise prolongée

Contre-indications: Arthroplastie hanche récente, douleur aiguë SI joint (peut aggraver), labral tear hanche confirmé.`,
    
    dosage_reps: '2-3 par côté',
    dosage_sets: '2',
    dosage_frequency: '5-7x/semaine',
    reps_optimal: 3,
    sets_optimal: 2,
    difficulty_level: 'beginner',
    evidence_level: '4',
    effectiveness_score: 68,
    
    key_points: [
      'Stretch profond fesse (pas bas du dos)',
      'Différencier piriforme vs hernie discale (tests cliniques)',
      'Combinaison stretching + trigger point optimal',
      'Approche multimodale nécessaire'
    ],
    
    contraindications: [
      'Arthroplastie hanche récente',
      'SI joint aiguë inflammatoire',
      'Labral tear hanche confirmé'
    ],
    
    tags: {
      phase: ['subacute', 'chronic'],
      pattern: ['pseudo_sciatica', 'piriformis_syndrome', 'si_dysfunction'],
      mechanism: ['flexibility', 'neural_mobility'],
      level: ['beginner'],
      equipment: ['none', 'mat'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['piriformis_syndrome', 'pseudo_sciatica', 'gluteal_trigger_points'],
      secondary: ['si_joint_dysfunction', 'hip_external_rotator_tightness', 'chronic_sitting'],
      contraindications: ['recent_hip_arthroplasty', 'acute_si_inflammation', 'labral_tear']
    },
    
    clinical_reasoning: 'Evidence Level 4 (low): Pas de RCT isolé. Tonley 2010: Piriforme 6-8% cas sciatica. Case reports: Stretching efficace 70-80%. Différenciation diagnostique cruciale (Faber, Pace tests). Approche multimodale (stretch + trigger point + strengthening) recommandée.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Supine figure-4', 
        hold_time: '30s', 
        reps: '2-3',
        notes: 'Position sûre gravité-assistée'
      },
      { 
        level: 2, 
        description: 'Sitting figure-4 + flexion', 
        hold_time: '30-45s', 
        reps: '2-3',
        notes: '↑ Intensité étirement'
      },
      { 
        level: 3, 
        description: 'Pigeon pose (yoga)', 
        hold_time: '45-60s', 
        reps: '2',
        notes: 'Maximum stretch'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Hamstring Stretch (Supine)',
    name_fr: 'Étirement Ischio-Jambiers (Allongé)',
    body_region: 'lumbar',
    exercise_type: 'flexibility',
    description: 'Étirement isolé des ischio-jambiers en position supine pour améliorer flexion lombaire et réduire tension postérieure sans stress neural excessif.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, une jambe étendue au sol.

Exécution (avec sangle/serviette):
1. Levez une jambe droite vers le plafond
2. Placez une serviette ou sangle sous la plante du pied
3. Tirez doucement la jambe vers vous (gardez le genou DROIT)
4. L'autre jambe reste étendue au sol
5. Sentez l'étirement à l'arrière de la cuisse
6. Maintenez 30 secondes
7. Changez de côté
8. Répétez 2-3 fois chaque côté

Points clés:
- Genou DROIT (ne pliez pas pendant l'étirement)
- Bas du dos reste au sol (ne soulevez pas)
- Étirement à l'ARRIÈRE de la cuisse (pas derrière genou)
- Progression lente sans rebond
- Arrêtez si douleur vive derrière genou ou jambe`,
    
    instructions_professional: `Indications: Contracture ischio-jambiers, limitation flexion lombaire, syndrome croisé inférieur, prévention lombalgie, amélioration SLR.

Biomécanique hamstrings-lombalgie relation:
- Hamstrings raccourcis → ↓ Flexion hanche → Compensation flexion lombaire excessive
- Flexion lombaire répétée → Stress cumulatif discal postérieur + ligaments
- ROM hamstrings <70° SLR corrèle ↑ Risque lombalgie (OR=1.8-2.3)

Anatomie ischio-jambiers:
- 3 muscles: Biceps femoris, semitendinosus, semimembranosus
- Origine: Tubérosité ischiatique (bi-articulaires: hanche + genou)
- Fonction: Extension hanche + flexion genou
- ROM normal: 80-90° SLR (straight leg raise)

Technique optimale (supine position avantages):
- Avantage vs standing: Élimination compensation lordose lombaire
- Stabilité: Pelvis fixe, lombalgie protégée
- Isolation: Hamstrings stretch sans stress neural excessif
- Quantification: Mesure angle SLR précis (goniomètre)

Différenciation neural tension (Slump test components):
- Hamstring stretch isolé: Pas de symptômes radiculaires
- Neural tension (adverse): Douleur ↑ avec dorsiflexion cheville ou flexion cervicale
- Si neural: Modifier approche (neurodynamics vs stretching)

Protocole stretching:
- Static stretch: 30-60s hold optimal (adaptation viscoélastique)
- Répétitions: 2-3 fois par côté
- Fréquence: 5-7x/semaine (daily optimal)
- Amélioration attendue: 5-10° par semaine (progression modeste)

Evidence:
- Radford et al. (2006): Hamstring stretching prévention blessures sport (RR=0.73)
- Bandy et al. (1997): 30s hold = 60s hold outcomes équivalents
- Pas de RCT direct hamstrings stretching pour LBP prévention

Tests fonctionnels:
- Active SLR: <70° = tight hamstrings (indication stretch)
- Passive SLR: Comparison bilatérale (asymétrie >10° = clinical significant)
- Sit-and-reach test: Fonction globale flexion

Clinical pearls:
- Sangle/serviette permet relaxation (vs hands behind knee = isométrique quadriceps involontaire)
- Morning stretching optimal (hamstrings plus raides après sommeil)
- Combinaison stretching + strengthening gluteus maximus (Lower Crossed Syndrome)
- Si pas d'amélioration après 4 semaines: Réévaluer diagnostic (possibilité neural)

Contre-indications: Acute hamstring strain (phase inflammatoire <7 jours), chirurgie ischio-jambiers récente, avulsion tubérosité ischiatique.`,
    
    dosage_reps: '2-3 par côté',
    dosage_sets: '1-2',
    dosage_frequency: '5-7x/semaine',
    reps_optimal: 3,
    sets_optimal: 2,
    difficulty_level: 'beginner',
    evidence_level: '2B',
    effectiveness_score: 74,
    
    key_points: [
      'Position supine élimine compensation lombaire',
      'SLR <70° = indication stretching',
      '30s hold = 60s hold efficacité équivalente',
      'Différencier stretch musculaire vs tension neural'
    ],
    
    contraindications: [
      'Acute hamstring strain (<7 jours)',
      'Chirurgie ischio-jambiers récente',
      'Avulsion tubérosité ischiatique'
    ],
    
    tags: {
      phase: ['subacute', 'chronic', 'prevention'],
      pattern: ['flexion_deficit', 'non_specific', 'lower_crossed_syndrome'],
      mechanism: ['flexibility'],
      level: ['beginner'],
      equipment: ['strap', 'towel', 'mat'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['hamstring_tightness', 'limited_slr', 'flexion_deficit', 'chronic_lbp'],
      secondary: ['lower_crossed_syndrome', 'prevention', 'sit_reach_deficit'],
      contraindications: ['acute_hamstring_strain', 'recent_hamstring_surgery', 'ischial_tuberosity_avulsion']
    },
    
    clinical_reasoning: 'Evidence Level 2B (Radford 2006): Stretching réduit blessures sport (RR=0.73). Bandy 1997: 30s optimal. ROM <70° SLR corrèle risque LBP (OR=1.8-2.3). Position supine élimine compensation lombaire pathologique.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Sangle/serviette assistance', 
        hold_time: '30s', 
        reps: '2-3',
        notes: 'Genou droit, ROM confortable'
      },
      { 
        level: 2, 
        description: 'Augmentation amplitude', 
        hold_time: '30-45s', 
        reps: '2-3',
        notes: 'Progression 5-10° par semaine'
      },
      { 
        level: 3, 
        description: 'PNF contract-relax', 
        hold_time: '30s post-contraction', 
        reps: '3',
        notes: 'Contraction 5s contre résistance'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Lumbar Rotation Stretch (Supine Twist)',
    name_fr: 'Rotation Lombaire (Torsion Allongée)',
    body_region: 'lumbar',
    exercise_type: 'mobility',
    description: 'Mobilisation en rotation lombaire pour améliorer ROM rotatoire, étirer muscles obliques et fascia, réduire raideur segmentaire.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, bras en croix sur les côtés.

Exécution:
1. Pliez les deux genoux, pieds au sol
2. Gardez les épaules collées au sol
3. Laissez doucement les deux genoux tomber vers la droite
4. Tournez la tête vers la gauche (direction opposée)
5. Maintenez l'étirement 20-30 secondes
6. Revenez au centre lentement
7. Répétez de l'autre côté
8. Faites 2-3 fois de chaque côté

Points clés:
- Mouvement LENT et contrôlé (gravité fait le travail)
- Les deux épaules restent AU SOL (crucial)
- Respirez profondément pendant l'étirement
- Amplitude confortable sans forcer
- Normal de sentir étirement côté opposé du dos`,
    
    instructions_professional: `Indications: Limitation ROM rotation lombaire, raideur capsulaire facettaire, tension obliques/QL, mobilité thoraco-lombaire, warm-up.

Biomécanique rotation lombaire:
- ROM normal: 35-45° rotation totale (L1-S1), majoritairement thoracique
- Lombaire contribution: 3-5° par segment (L1-L2 max, L5-S1 minimal)
- Facettes orientation: Sagittal plane (limite rotation vs cervical/thoracique)
- Couplage: Rotation + latéroflexion ipsilatérale (loi de Fryette type II)

Structures étirées:
Primaires:
- Obliquus internus/externus controlatéraux
- Quadratus lumborum controlatéral
- Fascia thoraco-lombaire
- Capsules facettaires (stretch rotatoire)

Secondaires:
- Multifidus, rotatores
- Ligaments interspinaux/supraspinaux
- Disque intervertébral (torsion annulus)

Technique optimale:
1. Position: Supine, genoux fléchis (↓ stress neural vs jambes droites)
2. Cue: "Keep shoulders flat, let gravity lower knees"
3. Head rotation opposée (↑ stretch thoracique haut)
4. Breathing: Deep breath into stretch side (↑ intercostal stretch)
5. Hold 20-30s (optimal passive stretch)

Précautions rotation lombaire:
- ROM lombaire rotation limité anatomiquement (3-5° par segment)
- Force rotation excessive → Stress annular fibres (risque déchirure)
- Combined flexion + rotation = highest disc stress (McGill)
- Donc: Position neutre flexion-extension pendant rotation

Evidence:
- Pas de RCT spécifique rotation stretching LBP
- McGill (2007): Rotation sous charge = injury mechanism (Level 4)
- Williams flexibility protocol: Rotation composante historique

Tests ROM:
- Seated rotation: 45° chaque côté normal (thoracique + lombaire combinés)
- Standing rotation: Asymétrie >10° = dysfunction
- Prone instability test: Rotation component évalue stabilité

Clinical pearls:
- Excellent warm-up pré-exercices
- Feels good (patient satisfaction élevée)
- Combine bien avec cat-cow (multiplanar mobilization)
- Éviter end-range forceful rotation (disc stress)

Contre-indications: Hernie discale aiguë (rotation stress annulus), spondylolisthésis instable, fracture vertébrale, SI joint hypermobility symptomatique.`,
    
    dosage_reps: '2-3 par côté',
    dosage_sets: '2',
    dosage_frequency: '5-7x/semaine',
    reps_optimal: 3,
    sets_optimal: 2,
    difficulty_level: 'beginner',
    evidence_level: '4',
    effectiveness_score: 65,
    
    key_points: [
      'Épaules au sol impératif (isolation rotation)',
      'Gravité fait le travail (passif)',
      'ROM lombaire rotation limité (3-5° par segment)',
      'Éviter rotation sous charge (McGill)'
    ],
    
    contraindications: [
      'Hernie discale aiguë',
      'Spondylolisthésis instable',
      'Fracture vertébrale',
      'SI joint hypermobility symptomatique'
    ],
    
    tags: {
      phase: ['subacute', 'chronic'],
      pattern: ['non_specific', 'stiffness', 'rotation_deficit'],
      mechanism: ['mobility', 'flexibility'],
      level: ['beginner'],
      equipment: ['none', 'mat'],
      setting: ['home', 'clinic']
    },
    
    indications: {
      primary: ['rotation_stiffness', 'chronic_lbp', 'thoracolumbar_stiffness', 'warm_up'],
      secondary: ['oblique_tightness', 'ql_tension', 'facet_stiffness'],
      contraindications: ['acute_disc_herniation', 'unstable_spondylolisthesis', 'vertebral_fracture', 'si_hypermobility']
    },
    
    clinical_reasoning: 'Evidence Level 4 (low): Pas de RCT spécifique. McGill 2007: Rotation sous charge = injury mechanism. ROM lombaire limité (3-5° par segment). Cliniquement utile warm-up et satisfaction patient. Éviter force excessive end-range.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Genoux fléchis ROM partiel', 
        hold_time: '20s', 
        reps: '2',
        notes: 'Amplitude confortable 50-75%'
      },
      { 
        level: 2, 
        description: 'Full ROM confortable', 
        hold_time: '30s', 
        reps: '2-3',
        notes: 'Gravité-assisté complet'
      },
      { 
        level: 3, 
        description: 'Single leg twist', 
        hold_time: '30s', 
        reps: '2-3',
        notes: 'Une jambe croisée ↑ stretch'
      }
    ],
    
    status: 'active'
  },

  {
    name: 'Diaphragmatic Breathing',
    name_fr: 'Respiration Diaphragmatique',
    body_region: 'lumbar',
    exercise_type: 'motor_control',
    description: 'Rééducation respiratoire diaphragmatique pour améliorer stabilisation lombaire via pression intra-abdominale et réduction activation accessoires respiratoires.',
    
    instructions_patient: `Position de départ: Allongé sur le dos, genoux pliés, une main sur la poitrine, une sur le ventre.

Exécution:
1. Inspirez lentement par le nez (comptez 4 secondes)
2. Sentez votre VENTRE se gonfler (la main monte)
3. La poitrine bouge PEU (main poitrine stable)
4. Expirez lentement par la bouche (comptez 6 secondes)
5. Sentez le ventre redescendre
6. Répétez 8-10 respirations lentes
7. Pratiquez 2-3 fois par jour

Points clés critiques:
- Le VENTRE se gonfle à l'inspiration (pas la poitrine!)
- Respiration LENTE et profonde (pas rapide)
- Sensation de détente progressive
- Utilisez avant exercices ou situations stressantes
- Excellente technique de gestion stress`,
    
    instructions_professional: `Indications: Dysfunction pattern respiratoire, dominance accessoires respiratoires, ↓ IAP (pression intra-abdominale), dysfonction plancher pelvien, lombalgie chronique + anxiété.

Physiologie diaphragme-stabilité lombaire:
- Diaphragme = muscle respiratoire primaire + stabilisateur postural
- Contraction: ↓ Pression thoracique + ↑ Pression abdominale (IAP)
- IAP optimal: Co-activation diaphragme + TVA + plancher pelvien + multifidus = "cylinder" stabilité
- LBP chronique: Delayed diaphragm activation (Hodges 2007) + shallow breathing pattern

Pattern respiratoire dysfonctionnel (LBP chronique):
Normal: Diaphragme primaire (80%), accessoires minimaux (20%)
Dysfunctional: Scalènes/SCM/pectoraux dominants (60-70%), diaphragme ↓ (30-40%)
Conséquences: ↓ IAP, ↑ tension cervicale, ↓ stabilité lombaire, ↑ sympathique activation

Technique teaching (3 étapes):
1. AWARENESS: Main abdomen + poitrine, feedback visuel mouvement
2. CUEING: "Breathe into your belly, feel hand rise"
3. INTEGRATION: Diaphragmatic breathing pendant exercices/ADL

Protocole rééducation:
Phase 1 (Sem 1-2): Supine position, 8-10 respirations, 3x/jour
Phase 2 (Sem 2-3): Sitting/standing positions
Phase 3 (Sem 3-4): Integration exercices (bracing, dead bug, etc.)
Phase 4 (Sem 4+): Automatic transfer ADL

Benefits multiples:
Physiologique:
- ↑ IAP (stabilité lombaire)
- ↑ Parasympathetic tone (↓ FC, ↓ PA)
- ↓ Cortisol (stress hormone 15-25%)

Musculosquelettique:
- Restaure diaphragm timing optimal
- ↓ Accessoires respiratoires overuse (↓ tension cervicale/épaules)
- Améliore coordination stabilisateurs profonds

Psychologique:
- ↓ Anxiété (respiration lente = vagal stimulation)
- ↓ Catastrophisation douleur
- ↑ Self-efficacy (patient control)

Evidence:
- Hodges et al. (2007): LBP chronique = diaphragm dysfunction (delayed activation)
- Coulter et al. (2017): Breathing exercises ↓ pain intensity (d=0.52)
- Gerritsen & Band (2018): Slow breathing ↓ cortisol, ↑ HRV

Tests fonctionnels:
- Observation: Abdomen rise vs chest rise (ratio optimal 70:30)
- Manual assessment: Palpation excursion diaphragme (6-8cm normal)
- Capnography: Respiratory rate 8-12 bpm optimal vs >16 dysfunctional

Clinical pearls:
- TOUS patients LBP chroniques bénéficient (anxiety comorbidity fréquente)
- Enseigner session 1 (foundation skill)
- Combine avec motor control exercises (breathing + bracing)
- Home program compliance élevée (simple, no equipment)

Contre-indications: COPD sévère non stabilisé (modification protocole), pneumothorax récent, chirurgie thoracique/abdominale <4 semaines.`,
    
    dosage_reps: '8-10 respirations',
    dosage_sets: '3-4x/jour',
    dosage_frequency: 'Quotidien',
    reps_optimal: 10,
    sets_optimal: 3,
    difficulty_level: 'beginner',
    evidence_level: '2B',
    effectiveness_score: 70,
    
    key_points: [
      'Abdomen rise dominant (70:30 vs poitrine)',
      'Respiration lente: 4s inspiration, 6s expiration',
      'Activation parasympathique (↓ stress, ↓ FC)',
      'Integration avec stabilisation cruciale'
    ],
    
    contraindications: [
      'COPD sévère non stabilisé',
      'Pneumothorax récent',
      'Chirurgie thoracique/abdominale récente (<4 sem)'
    ],
    
    tags: {
      phase: ['acute', 'subacute', 'chronic'],
      pattern: ['non_specific', 'chronic_pain', 'anxiety_comorbid'],
      mechanism: ['motor_control', 'stabilization', 'stress_management'],
      level: ['beginner'],
      equipment: ['none'],
      setting: ['home', 'clinic', 'workplace', 'anywhere']
    },
    
    indications: {
      primary: ['chronic_lbp', 'respiratory_dysfunction', 'stress_related_lbp', 'anxiety_comorbid'],
      secondary: ['pelvic_floor_dysfunction', 'neck_tension', 'deconditioning'],
      contraindications: ['severe_copd_unstable', 'recent_pneumothorax', 'recent_thoracic_abdominal_surgery']
    },
    
    clinical_reasoning: 'Evidence Level 2B (Hodges 2007, Coulter 2017): LBP chronique = diaphragm dysfunction. Breathing exercises ↓ douleur (d=0.52), ↓ cortisol, ↑ HRV. Restaure IAP optimal et pattern stabilisation. Effet anxiété via activation parasympathique.',
    
    progression_levels: [
      { 
        level: 1, 
        description: 'Supine avec feedback mains', 
        reps: '8-10', 
        sets: '3x/jour',
        notes: 'Apprentissage pattern'
      },
      { 
        level: 2, 
        description: 'Sitting/standing positions', 
        reps: '8-10', 
        sets: '3x/jour',
        notes: 'Transfer positions fonctionnelles'
      },
      { 
        level: 3, 
        description: 'Integration exercices', 
        reps: 'Continuous', 
        sets: 'During exercise',
        notes: 'Breathing + bracing/stabilisation'
      },
      { 
        level: 4, 
        description: 'Automatic ADL', 
        reps: 'As needed', 
        sets: 'Throughout day',
        notes: 'Stress management tool'
      }
    ],
    
    status: 'active'
  }
];

export default lumbarExercisesLevel1Part2;
