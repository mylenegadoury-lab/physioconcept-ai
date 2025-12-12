/**
 * FORMULAIRE ÉVALUATION - VERSION PROFESSIONNELLE
 * Pour physiothérapeutes et kinésithérapeutes
 * Inclut scoring clinique détaillé et raisonnement diagnostique
 */

import { useState } from 'react';

export default function ProfessionalAssessmentForm({ onComplete }) {
  const [section, setSection] = useState('demographics');
  const [data, setData] = useState({});
  const [scores, setScores] = useState({});

  // ============================================
  // SECTION 1: DONNÉES DÉMOGRAPHIQUES
  // ============================================
  const demographicsFields = [
    {
      id: 'age',
      label: 'Âge',
      type: 'number',
      required: true
    },
    {
      id: 'sex',
      label: 'Sexe',
      type: 'select',
      options: [
        { value: 'M', label: 'Masculin' },
        { value: 'F', label: 'Féminin' }
      ],
      required: true
    },
    {
      id: 'occupation',
      label: 'Profession',
      type: 'text',
      placeholder: 'Ex: Infirmier, ouvrier, bureau...'
    },
    {
      id: 'sport_level',
      label: 'Niveau sportif',
      type: 'select',
      options: [
        { value: 'sedentary', label: 'Sédentaire' },
        { value: 'recreational', label: 'Récréatif (1-2x/semaine)' },
        { value: 'regular', label: 'Régulier (3-5x/semaine)' },
        { value: 'competitive', label: 'Compétitif' },
        { value: 'elite', label: 'Élite' }
      ]
    }
  ];

  // ============================================
  // SECTION 2: HISTORIQUE CLINIQUE
  // ============================================
  const clinicalHistoryFields = [
    {
      id: 'duration',
      label: 'Durée des symptômes',
      type: 'select',
      options: [
        { value: 'acute', label: 'Aigu (< 6 semaines)' },
        { value: 'subacute', label: 'Subaigu (6 semaines - 3 mois)' },
        { value: 'chronic', label: 'Chronique (> 3 mois)' },
        { value: 'recurrent', label: 'Récurrent' }
      ],
      required: true
    },
    {
      id: 'onset',
      label: 'Début des symptômes',
      type: 'select',
      options: [
        { value: 'sudden', label: 'Soudain (traumatique)' },
        { value: 'gradual', label: 'Progressif (insidieux)' }
      ]
    },
    {
      id: 'previous_episodes',
      label: 'Épisodes antérieurs',
      type: 'number',
      placeholder: 'Nombre d\'épisodes'
    },
    {
      id: 'aggravating_factors',
      label: 'Facteurs aggravants',
      type: 'multiselect',
      options: [
        { value: 'prolonged_sitting', label: 'Position assise prolongée' },
        { value: 'prolonged_standing', label: 'Position debout prolongée' },
        { value: 'flexion', label: 'Flexion lombaire' },
        { value: 'extension', label: 'Extension lombaire' },
        { value: 'rotation', label: 'Rotation' },
        { value: 'lateral_flexion', label: 'Flexion latérale' },
        { value: 'lifting', label: 'Soulèvement de charge' },
        { value: 'coughing', label: 'Toux/éternuements' }
      ]
    },
    {
      id: 'easing_factors',
      label: 'Facteurs soulageants',
      type: 'multiselect',
      options: [
        { value: 'rest', label: 'Repos' },
        { value: 'movement', label: 'Mouvement' },
        { value: 'flexion', label: 'Flexion' },
        { value: 'extension', label: 'Extension' },
        { value: 'lateral_shift', label: 'Déplacement latéral' },
        { value: 'medication', label: 'Médication' }
      ]
    }
  ];

  // ============================================
  // SECTION 3: RED FLAGS
  // ============================================
  const redFlagsChecklist = [
    { id: 'age_under_20', label: 'Âge < 20 ans ou > 55 ans (première occurrence)', severity: 'high' },
    { id: 'trauma', label: 'Traumatisme important (chute, accident)', severity: 'high' },
    { id: 'constant_progressive', label: 'Douleur constante et progressive', severity: 'high' },
    { id: 'thoracic_pain', label: 'Douleur thoracique', severity: 'medium' },
    { id: 'cancer_history', label: 'Antécédents de cancer', severity: 'high' },
    { id: 'immunosuppression', label: 'Immunosuppression/corticothérapie', severity: 'high' },
    { id: 'iv_drug_use', label: 'Usage de drogues IV', severity: 'high' },
    { id: 'systemic_unwellness', label: 'Malaise général/fièvre', severity: 'high' },
    { id: 'unexplained_weight_loss', label: 'Perte de poids inexpliquée', severity: 'high' },
    { id: 'saddle_anesthesia', label: 'Anesthésie en selle', severity: 'emergency' },
    { id: 'bladder_dysfunction', label: 'Dysfonction vésicale/intestinale', severity: 'emergency' },
    { id: 'progressive_neurological', label: 'Déficit neurologique progressif', severity: 'emergency' },
    { id: 'gait_disturbance', label: 'Trouble de la marche sévère', severity: 'high' }
  ];

  // ============================================
  // SECTION 4: ODI (OSWESTRY DISABILITY INDEX)
  // ============================================
  const odiSections = [
    {
      id: 'pain_intensity',
      label: 'Section 1 - Intensité de la douleur',
      options: [
        { value: 0, label: 'Je n\'ai aucune douleur en ce moment' },
        { value: 1, label: 'La douleur est très légère en ce moment' },
        { value: 2, label: 'La douleur est modérée en ce moment' },
        { value: 3, label: 'La douleur est assez sévère en ce moment' },
        { value: 4, label: 'La douleur est très sévère en ce moment' },
        { value: 5, label: 'La douleur est la pire imaginable en ce moment' }
      ]
    },
    {
      id: 'personal_care',
      label: 'Section 2 - Soins personnels',
      options: [
        { value: 0, label: 'Je peux prendre soin de moi normalement sans douleur supplémentaire' },
        { value: 1, label: 'Je peux prendre soin de moi normalement mais cela provoque une douleur supplémentaire' },
        { value: 2, label: 'Prendre soin de moi est douloureux et je dois y aller lentement et avec précaution' },
        { value: 3, label: 'J\'ai besoin d\'aide mais je parviens à faire la plupart de mes soins personnels' },
        { value: 4, label: 'J\'ai besoin d\'aide chaque jour dans la plupart des aspects de mes soins personnels' },
        { value: 5, label: 'Je ne m\'habille pas, me lave avec difficulté et reste au lit' }
      ]
    },
    {
      id: 'lifting',
      label: 'Section 3 - Soulever',
      options: [
        { value: 0, label: 'Je peux soulever des objets lourds sans douleur supplémentaire' },
        { value: 1, label: 'Je peux soulever des objets lourds mais cela provoque une douleur supplémentaire' },
        { value: 2, label: 'La douleur m\'empêche de soulever des objets lourds du sol, mais je peux si ils sont commodément positionnés' },
        { value: 3, label: 'La douleur m\'empêche de soulever des objets lourds, mais je peux gérer des objets légers à moyens' },
        { value: 4, label: 'Je peux seulement soulever des objets très légers' },
        { value: 5, label: 'Je ne peux rien soulever ou porter' }
      ]
    },
    {
      id: 'walking',
      label: 'Section 4 - Marcher',
      options: [
        { value: 0, label: 'La douleur ne m\'empêche pas de marcher n\'importe quelle distance' },
        { value: 1, label: 'La douleur m\'empêche de marcher plus de 1,6 km' },
        { value: 2, label: 'La douleur m\'empêche de marcher plus de 500m' },
        { value: 3, label: 'La douleur m\'empêche de marcher plus de 100m' },
        { value: 4, label: 'Je peux seulement marcher en utilisant une canne ou des béquilles' },
        { value: 5, label: 'Je suis au lit la plupart du temps' }
      ]
    },
    {
      id: 'sitting',
      label: 'Section 5 - S\'asseoir',
      options: [
        { value: 0, label: 'Je peux m\'asseoir sur n\'importe quelle chaise aussi longtemps que je le souhaite' },
        { value: 1, label: 'Je peux m\'asseoir sur ma chaise favorite aussi longtemps que je le souhaite' },
        { value: 2, label: 'La douleur m\'empêche de m\'asseoir plus d\'1 heure' },
        { value: 3, label: 'La douleur m\'empêche de m\'asseoir plus de 30 minutes' },
        { value: 4, label: 'La douleur m\'empêche de m\'asseoir plus de 10 minutes' },
        { value: 5, label: 'La douleur m\'empêche de m\'asseoir' }
      ]
    },
    {
      id: 'standing',
      label: 'Section 6 - Se tenir debout',
      options: [
        { value: 0, label: 'Je peux me tenir debout aussi longtemps que je le souhaite sans douleur supplémentaire' },
        { value: 1, label: 'Je peux me tenir debout aussi longtemps que je le souhaite mais cela me fait plus mal' },
        { value: 2, label: 'La douleur m\'empêche de me tenir debout plus d\'1 heure' },
        { value: 3, label: 'La douleur m\'empêche de me tenir debout plus de 30 minutes' },
        { value: 4, label: 'La douleur m\'empêche de me tenir debout plus de 10 minutes' },
        { value: 5, label: 'La douleur m\'empêche de me tenir debout' }
      ]
    },
    {
      id: 'sleeping',
      label: 'Section 7 - Dormir',
      options: [
        { value: 0, label: 'Mon sommeil n\'est jamais perturbé par la douleur' },
        { value: 1, label: 'Mon sommeil est occasionnellement perturbé par la douleur' },
        { value: 2, label: 'À cause de la douleur, j\'ai moins de 6 heures de sommeil' },
        { value: 3, label: 'À cause de la douleur, j\'ai moins de 4 heures de sommeil' },
        { value: 4, label: 'À cause de la douleur, j\'ai moins de 2 heures de sommeil' },
        { value: 5, label: 'La douleur m\'empêche complètement de dormir' }
      ]
    },
    {
      id: 'social_life',
      label: 'Section 8 - Vie sociale',
      options: [
        { value: 0, label: 'Ma vie sociale est normale et ne me cause aucune douleur supplémentaire' },
        { value: 1, label: 'Ma vie sociale est normale mais augmente le degré de douleur' },
        { value: 2, label: 'La douleur n\'a pas d\'effet significatif sur ma vie sociale à part limiter mes intérêts plus énergiques' },
        { value: 3, label: 'La douleur a restreint ma vie sociale et je ne sors pas souvent' },
        { value: 4, label: 'La douleur a restreint ma vie sociale à mon domicile' },
        { value: 5, label: 'Je n\'ai pratiquement pas de vie sociale à cause de la douleur' }
      ]
    },
    {
      id: 'traveling',
      label: 'Section 9 - Voyager',
      options: [
        { value: 0, label: 'Je peux voyager partout sans douleur' },
        { value: 1, label: 'Je peux voyager partout mais cela augmente ma douleur' },
        { value: 2, label: 'La douleur est mauvaise mais je peux gérer des trajets de plus de 2 heures' },
        { value: 3, label: 'La douleur me limite aux trajets de moins d\'1 heure' },
        { value: 4, label: 'La douleur me limite aux trajets courts nécessaires de moins de 30 minutes' },
        { value: 5, label: 'La douleur m\'empêche de voyager sauf pour recevoir un traitement' }
      ]
    },
    {
      id: 'employment',
      label: 'Section 10 - Emploi/Tâches ménagères',
      options: [
        { value: 0, label: 'Mon activité normale n\'augmente pas ma douleur' },
        { value: 1, label: 'Mon activité normale augmente ma douleur mais je peux toujours effectuer tout ce qui est nécessaire' },
        { value: 2, label: 'Je peux effectuer la plupart de mon activité normale mais la douleur m\'empêche d\'accomplir des activités plus exigeantes physiquement' },
        { value: 3, label: 'La douleur m\'empêche de faire autre chose que des tâches légères' },
        { value: 4, label: 'La douleur m\'empêche de faire même des tâches légères' },
        { value: 5, label: 'La douleur m\'empêche d\'effectuer toute sorte de travail' }
      ]
    }
  ];

  // ============================================
  // SECTION 5: STarT BACK TOOL
  // ============================================
  const startBackQuestions = [
    {
      id: 'sb_bothersomeness',
      label: '1. Dans l\'ensemble, à quel point votre mal de dos vous a-t-il gêné au cours des 2 dernières semaines?',
      type: 'scale',
      scale: 5,
      psychosocial: false
    },
    {
      id: 'sb_shoulder_pain',
      label: '2. Au cours des 2 dernières semaines, avez-vous aussi eu des douleurs à l\'épaule ou au cou?',
      type: 'yesno',
      psychosocial: false
    },
    {
      id: 'sb_limited_walking',
      label: '3. Au cours des 2 dernières semaines, avez-vous marché seulement de courtes distances à cause de votre mal de dos?',
      type: 'yesno',
      psychosocial: false
    },
    {
      id: 'sb_dressing',
      label: '4. Au cours des 2 dernières semaines, vous êtes-vous habillé plus lentement que d\'habitude à cause de votre mal de dos?',
      type: 'yesno',
      psychosocial: false
    },
    {
      id: 'sb_dangerous',
      label: '5. Ce n\'est vraiment pas sûr pour une personne ayant une condition comme la mienne d\'être physiquement active.',
      type: 'disagree_agree',
      psychosocial: true
    },
    {
      id: 'sb_worry',
      label: '6. Au cours des 2 dernières semaines, des pensées inquiétantes vous sont-elles venues à l\'esprit souvent?',
      type: 'disagree_agree',
      psychosocial: true
    },
    {
      id: 'sb_catastrophizing',
      label: '7. Je pense que mon mal de dos est une condition terrible.',
      type: 'disagree_agree',
      psychosocial: true
    },
    {
      id: 'sb_not_enjoyable',
      label: '8. Au cours des 2 dernières semaines, avez-vous trouvé difficile d\'apprécier votre activité habituelle?',
      type: 'disagree_agree',
      psychosocial: true
    },
    {
      id: 'sb_depression',
      label: '9. Au cours des 2 dernières semaines, vous êtes-vous senti déprimé?',
      type: 'disagree_agree',
      psychosocial: true
    }
  ];

  // ============================================
  // SECTION 6: TBC (TREATMENT-BASED CLASSIFICATION)
  // ============================================
  const tbcAssessment = {
    directional_preference: {
      label: 'Test de préférence directionnelle (McKenzie)',
      tests: [
        { id: 'repeated_flexion', label: 'Flexion répétée', result: ['better', 'worse', 'no_change', 'centralization', 'peripheralization'] },
        { id: 'repeated_extension', label: 'Extension répétée', result: ['better', 'worse', 'no_change', 'centralization', 'peripheralization'] },
        { id: 'lateral_shift', label: 'Déplacement latéral', result: ['better', 'worse', 'no_change'] }
      ]
    },
    motor_control: {
      label: 'Tests de contrôle moteur',
      tests: [
        { id: 'prone_instability', label: 'Test d\'instabilité en pronation', result: ['positive', 'negative'] },
        { id: 'aberrant_movement', label: 'Mouvements aberrants', result: ['present', 'absent'] },
        { id: 'segmental_hypermobility', label: 'Hypermobilité segmentaire', result: ['present', 'absent'] }
      ]
    },
    flexibility_deficits: {
      label: 'Déficits de flexibilité',
      tests: [
        { id: 'hamstring', label: 'Test SLR (ischio-jambiers)', result: ['<70', '70-90', '>90'] },
        { id: 'hip_flexor', label: 'Test Thomas (fléchisseurs hanche)', result: ['positive', 'negative'] },
        { id: 'hip_rotation', label: 'Rotation hanche (FABER)', result: ['limited', 'normal'] }
      ]
    },
    neurological: {
      label: 'Examen neurologique',
      tests: [
        { id: 'slr_test', label: 'Straight Leg Raise', result: ['positive', 'negative', 'angle'] },
        { id: 'reflexes', label: 'Réflexes ostéotendineux', result: ['normal', 'diminished', 'absent'] },
        { id: 'sensation', label: 'Sensibilité', result: ['normal', 'altered'] },
        { id: 'motor_strength', label: 'Force motrice', result: ['5/5', '4/5', '3/5', '2/5', '1/5', '0/5'] }
      ]
    }
  };

  // ============================================
  // CALCUL DES SCORES
  // ============================================
  const calculateODI = () => {
    const odiIds = odiSections.map(s => s.id);
    const completed = odiIds.filter(id => data[id] !== undefined);
    
    if (completed.length === 0) return null;
    
    const sum = completed.reduce((acc, id) => acc + (data[id] || 0), 0);
    const percentage = (sum / (completed.length * 5)) * 100;
    
    return {
      score: Math.round(percentage),
      interpretation: 
        percentage <= 20 ? 'Incapacité minimale' :
        percentage <= 40 ? 'Incapacité modérée' :
        percentage <= 60 ? 'Incapacité sévère' :
        percentage <= 80 ? 'Invalidité' :
        'Alitement/exagération',
      completed: completed.length,
      total: 10
    };
  };

  const calculateSTarTBack = () => {
    let totalScore = 0;
    let psychosocialScore = 0;

    startBackQuestions.forEach(q => {
      const answer = data[q.id];
      if (answer === undefined) return;

      if (q.type === 'yesno' && answer === 'yes') {
        totalScore += 1;
      } else if (q.type === 'scale' && answer >= 3) {
        totalScore += 1;
      } else if (q.type === 'disagree_agree' && answer === 'agree') {
        totalScore += 1;
        if (q.psychosocial) psychosocialScore += 1;
      }
    });

    let risk = 'low';
    if (totalScore >= 4) {
      risk = psychosocialScore >= 4 ? 'high' : 'medium';
    }

    return {
      totalScore,
      psychosocialScore,
      risk,
      interpretation:
        risk === 'low' ? 'Faible risque - Approche générale' :
        risk === 'medium' ? 'Risque moyen - Intervention physique ciblée' :
        'Risque élevé - Approche multidimensionnelle nécessaire'
    };
  };

  const determineTBCCategory = () => {
    // Logic to determine TBC category based on clinical tests
    const categories = [];
    
    // Check for directional preference
    if (data.repeated_extension === 'better' || data.repeated_extension === 'centralization') {
      categories.push('specific_exercise_extension');
    }
    if (data.repeated_flexion === 'better' || data.repeated_flexion === 'centralization') {
      categories.push('specific_exercise_flexion');
    }
    
    // Check for motor control issues
    if (data.prone_instability === 'positive' || data.aberrant_movement === 'present') {
      categories.push('stabilization');
    }
    
    // Check for flexibility deficits
    if (data.hamstring === '<70' || data.hip_flexor === 'positive') {
      categories.push('mobilization');
    }
    
    // Check for manipulation criteria (not enough data yet)
    
    return categories.length > 0 ? categories : ['general_exercise'];
  };

  // ============================================
  // BUILD PATIENT PROFILE
  // ============================================
  const buildPatientProfile = () => {
    const odi = calculateODI();
    const startBack = calculateSTarTBack();
    const tbcCategories = determineTBCCategory();
    
    // Determine phase
    const phase = data.duration || 'subacute';
    
    // Determine directional preference
    let directionalPreference = null;
    if (data.repeated_extension === 'better' || data.repeated_extension === 'centralization') {
      directionalPreference = 'extension';
    } else if (data.repeated_flexion === 'better' || data.repeated_flexion === 'centralization') {
      directionalPreference = 'flexion';
    }
    
    // Determine movement intolerance
    const movementIntolerance = [];
    const aggravating = data.aggravating_factors || [];
    if (aggravating.includes('flexion')) movementIntolerance.push('flexion_intolerant');
    if (aggravating.includes('extension')) movementIntolerance.push('extension_intolerant');
    if (aggravating.includes('rotation')) movementIntolerance.push('rotation_intolerant');
    
    // Determine dominant pattern from TBC
    let dominantPattern = 'stabilization'; // default
    if (tbcCategories.includes('specific_exercise_extension') || tbcCategories.includes('specific_exercise_flexion')) {
      dominantPattern = 'mobilization';
    } else if (tbcCategories.includes('stabilization')) {
      dominantPattern = 'motor_control';
    } else if (startBack.risk === 'low' && phase === 'chronic') {
      dominantPattern = 'strengthening';
    }
    
    // Specific needs
    const specificNeeds = [];
    if (data.hamstring === '<70') specificNeeds.push('hamstring_tightness');
    if (data.hip_flexor === 'positive') specificNeeds.push('hip_flexor_tightness');
    
    // Red flags
    const redFlags = redFlagsChecklist
      .filter(flag => data[flag.id] === true)
      .map(flag => flag.id);
    
    return {
      // Demographics
      age: data.age,
      sex: data.sex,
      occupation: data.occupation,
      sportLevel: data.sport_level,
      
      // Clinical history
      phase,
      acuteLBP: phase === 'acute',
      duration: data.duration,
      onset: data.onset,
      previousEpisodes: data.previous_episodes || 0,
      
      // Scores
      odi: odi?.score || null,
      odiInterpretation: odi?.interpretation || null,
      startBack: startBack.risk,
      startBackScore: startBack.totalScore,
      psychosocialScore: startBack.psychosocialScore,
      
      // Goals (professional determined)
      primaryGoals: data.primary_goals || ['function', 'pain_reduction'],
      
      // Movement patterns
      directionalPreference,
      movementIntolerance,
      dominantPattern,
      tbcCategories,
      
      // Specific needs
      specificNeeds,
      
      // Red flags
      redFlags,
      hasRedFlags: redFlags.length > 0,
      
      // Contraindications
      contraindications: data.contraindications || [],
      
      // Additional clinical data
      aggravatingFactors: data.aggravating_factors || [],
      easingFactors: data.easing_factors || [],
      neurologicalSigns: {
        slr: data.slr_test,
        reflexes: data.reflexes,
        sensation: data.sensation,
        motorStrength: data.motor_strength
      }
    };
  };

  const handleSubmit = () => {
    const profile = buildPatientProfile();
    
    // Validate red flags
    if (profile.hasRedFlags) {
      const severity = redFlagsChecklist
        .filter(flag => profile.redFlags.includes(flag.id))
        .map(flag => flag.severity);
      
      if (severity.includes('emergency')) {
        alert('⚠️ RED FLAGS CRITIQUES: Référence médicale urgente nécessaire!');
        return;
      }
    }
    
    setScores({
      odi: calculateODI(),
      startBack: calculateSTarTBack(),
      tbcCategories: determineTBCCategory()
    });
    
    onComplete(profile);
  };

  const renderSection = () => {
    switch (section) {
      case 'demographics':
        return renderDemographics();
      case 'history':
        return renderClinicalHistory();
      case 'red_flags':
        return renderRedFlags();
      case 'odi':
        return renderODI();
      case 'start_back':
        return renderSTarTBack();
      case 'tbc':
        return renderTBC();
      case 'summary':
        return renderSummary();
      default:
        return null;
    }
  };

  const renderDemographics = () => (
    <div className="section-content">
      <h3>📋 Données démographiques</h3>
      {demographicsFields.map(field => (
        <div key={field.id} className="field-group">
          <label>
            {field.label}
            {field.required && <span className="required">*</span>}
          </label>
          {field.type === 'select' ? (
            <select
              value={data[field.id] || ''}
              onChange={(e) => setData({ ...data, [field.id]: e.target.value })}
            >
              <option value="">Sélectionnez...</option>
              {field.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              value={data[field.id] || ''}
              onChange={(e) => setData({ ...data, [field.id]: e.target.value })}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderClinicalHistory = () => (
    <div className="section-content">
      <h3>🩺 Historique clinique</h3>
      {clinicalHistoryFields.map(field => (
        <div key={field.id} className="field-group">
          <label>
            {field.label}
            {field.required && <span className="required">*</span>}
          </label>
          {field.type === 'select' ? (
            <select
              value={data[field.id] || ''}
              onChange={(e) => setData({ ...data, [field.id]: e.target.value })}
            >
              <option value="">Sélectionnez...</option>
              {field.options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : field.type === 'multiselect' ? (
            <div className="checkbox-group">
              {field.options.map(opt => (
                <label key={opt.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={(data[field.id] || []).includes(opt.value)}
                    onChange={(e) => {
                      const current = data[field.id] || [];
                      const newValue = e.target.checked
                        ? [...current, opt.value]
                        : current.filter(v => v !== opt.value);
                      setData({ ...data, [field.id]: newValue });
                    }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          ) : (
            <input
              type={field.type}
              value={data[field.id] || ''}
              onChange={(e) => setData({ ...data, [field.id]: e.target.value })}
              placeholder={field.placeholder}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderRedFlags = () => (
    <div className="section-content">
      <h3>🚨 Red Flags</h3>
      <div className="red-flags-checklist">
        {redFlagsChecklist.map(flag => (
          <label
            key={flag.id}
            className={`flag-item severity-${flag.severity}`}
          >
            <input
              type="checkbox"
              checked={data[flag.id] || false}
              onChange={(e) => setData({ ...data, [flag.id]: e.target.checked })}
            />
            <span className="flag-label">{flag.label}</span>
            <span className="flag-severity">
              {flag.severity === 'emergency' && '🚨 URGENCE'}
              {flag.severity === 'high' && '⚠️ Élevé'}
              {flag.severity === 'medium' && '⚡ Moyen'}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderODI = () => (
    <div className="section-content">
      <h3>📊 Oswestry Disability Index (ODI)</h3>
      {odiSections.map((section, idx) => (
        <div key={section.id} className="odi-section">
          <h4>{section.label}</h4>
          <div className="radio-group">
            {section.options.map(opt => (
              <label key={opt.value} className="radio-label">
                <input
                  type="radio"
                  name={section.id}
                  value={opt.value}
                  checked={data[section.id] === opt.value}
                  onChange={() => setData({ ...data, [section.id]: opt.value })}
                />
                <span className="option-text">
                  <span className="option-value">{opt.value}</span>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
      {data[odiSections[0].id] !== undefined && (
        <div className="score-preview">
          <strong>Score ODI:</strong> {calculateODI()?.score}% - {calculateODI()?.interpretation}
        </div>
      )}
    </div>
  );

  const renderSTarTBack = () => (
    <div className="section-content">
      <h3>🎯 STarT Back Tool</h3>
      {startBackQuestions.map((q, idx) => (
        <div key={q.id} className="startback-question">
          <p className="question-text">
            {q.psychosocial && <span className="psych-tag">PSYCHOSOCIAL</span>}
            {q.label}
          </p>
          {q.type === 'yesno' ? (
            <div className="radio-group inline">
              <label>
                <input
                  type="radio"
                  name={q.id}
                  value="yes"
                  checked={data[q.id] === 'yes'}
                  onChange={() => setData({ ...data, [q.id]: 'yes' })}
                />
                Oui
              </label>
              <label>
                <input
                  type="radio"
                  name={q.id}
                  value="no"
                  checked={data[q.id] === 'no'}
                  onChange={() => setData({ ...data, [q.id]: 'no' })}
                />
                Non
              </label>
            </div>
          ) : q.type === 'scale' ? (
            <div className="scale-group">
              {[0, 1, 2, 3, 4].map(val => (
                <label key={val} className="scale-option">
                  <input
                    type="radio"
                    name={q.id}
                    value={val}
                    checked={data[q.id] === val}
                    onChange={() => setData({ ...data, [q.id]: val })}
                  />
                  {val}
                </label>
              ))}
            </div>
          ) : (
            <div className="radio-group inline">
              <label>
                <input
                  type="radio"
                  name={q.id}
                  value="disagree"
                  checked={data[q.id] === 'disagree'}
                  onChange={() => setData({ ...data, [q.id]: 'disagree' })}
                />
                En désaccord
              </label>
              <label>
                <input
                  type="radio"
                  name={q.id}
                  value="agree"
                  checked={data[q.id] === 'agree'}
                  onChange={() => setData({ ...data, [q.id]: 'agree' })}
                />
                D'accord
              </label>
            </div>
          )}
        </div>
      ))}
      {data[startBackQuestions[0].id] !== undefined && (
        <div className="score-preview">
          <strong>STarT Back:</strong> {calculateSTarTBack().risk.toUpperCase()} 
          (Total: {calculateSTarTBack().totalScore}, Psychosocial: {calculateSTarTBack().psychosocialScore})
        </div>
      )}
    </div>
  );

  const renderTBC = () => (
    <div className="section-content">
      <h3>🔍 Treatment-Based Classification</h3>
      
      {Object.entries(tbcAssessment).map(([category, categoryData]) => (
        <div key={category} className="tbc-category">
          <h4>{categoryData.label}</h4>
          {categoryData.tests.map(test => (
            <div key={test.id} className="tbc-test">
              <label className="test-label">{test.label}:</label>
              <select
                value={data[test.id] || ''}
                onChange={(e) => setData({ ...data, [test.id]: e.target.value })}
              >
                <option value="">Sélectionnez...</option>
                {test.result.map(res => (
                  <option key={res} value={res}>{res}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderSummary = () => {
    const odi = calculateODI();
    const startBack = calculateSTarTBack();
    const profile = buildPatientProfile();
    
    return (
      <div className="section-content summary">
        <h3>📋 Résumé de l'évaluation</h3>
        
        <div className="summary-section">
          <h4>Scores cliniques</h4>
          <div className="score-card">
            <strong>ODI:</strong> {odi?.score}% - {odi?.interpretation}
          </div>
          <div className="score-card">
            <strong>STarT Back:</strong> {startBack.risk.toUpperCase()} - {startBack.interpretation}
          </div>
        </div>
        
        <div className="summary-section">
          <h4>Classification TBC</h4>
          <ul>
            {profile.tbcCategories.map(cat => (
              <li key={cat}>{cat.replace('_', ' ').toUpperCase()}</li>
            ))}
          </ul>
        </div>
        
        <div className="summary-section">
          <h4>Recommandation traitement</h4>
          <p><strong>Phase:</strong> {profile.phase}</p>
          <p><strong>Pattern dominant:</strong> {profile.dominantPattern}</p>
          <p><strong>Préférence directionnelle:</strong> {profile.directionalPreference || 'Non identifiée'}</p>
        </div>
        
        {profile.hasRedFlags && (
          <div className="summary-section alert">
            <h4>⚠️ RED FLAGS DÉTECTÉS</h4>
            <p>Référence médicale recommandée</p>
          </div>
        )}
      </div>
    );
  };

  const sections = [
    { id: 'demographics', label: '1. Démographiques' },
    { id: 'history', label: '2. Historique' },
    { id: 'red_flags', label: '3. Red Flags' },
    { id: 'odi', label: '4. ODI' },
    { id: 'start_back', label: '5. STarT Back' },
    { id: 'tbc', label: '6. TBC' },
    { id: 'summary', label: '7. Résumé' }
  ];

  return (
    <div className="professional-assessment-form">
      <div className="form-sidebar">
        <h2>Évaluation Professionnelle</h2>
        <nav className="section-nav">
          {sections.map(s => (
            <button
              key={s.id}
              className={`nav-item ${section === s.id ? 'active' : ''}`}
              onClick={() => setSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="form-main">
        {renderSection()}
        
        <div className="form-actions">
          {section !== 'demographics' && (
            <button
              onClick={() => {
                const currentIdx = sections.findIndex(s => s.id === section);
                setSection(sections[currentIdx - 1].id);
              }}
              className="btn-secondary"
            >
              ← Précédent
            </button>
          )}
          
          {section !== 'summary' ? (
            <button
              onClick={() => {
                const currentIdx = sections.findIndex(s => s.id === section);
                setSection(sections[currentIdx + 1].id);
              }}
              className="btn-primary"
            >
              Suivant →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-success"
            >
              ✅ Générer programme
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .professional-assessment-form {
          display: flex;
          min-height: 100vh;
          background: #f5f5f5;
        }

        .form-sidebar {
          width: 280px;
          background: #2c3e50;
          color: white;
          padding: 2rem;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .form-sidebar h2 {
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }

        .section-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          padding: 1rem;
          background: transparent;
          border: none;
          color: #bdc3c7;
          text-align: left;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .nav-item:hover {
          background: #34495e;
          color: white;
        }

        .nav-item.active {
          background: #3498db;
          color: white;
          font-weight: 600;
        }

        .form-main {
          margin-left: 280px;
          flex: 1;
          padding: 2rem;
        }

        .section-content {
          background: white;
          border-radius: 8px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .section-content h3 {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }

        .field-group {
          margin-bottom: 1.5rem;
        }

        .field-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        .required {
          color: #e74c3c;
          margin-left: 0.25rem;
        }

        input[type="text"],
        input[type="number"],
        select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 4px;
          font-size: 1rem;
        }

        .checkbox-group,
        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .radio-group.inline {
          flex-direction: row;
          gap: 2rem;
        }

        .checkbox-label,
        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          cursor: pointer;
        }

        .checkbox-label:hover,
        .radio-label:hover {
          background: #f8f9fa;
        }

        .red-flags-checklist {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .flag-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 4px;
          cursor: pointer;
        }

        .flag-item.severity-emergency {
          background: #fee;
          border: 2px solid #e74c3c;
        }

        .flag-item.severity-high {
          background: #fff3cd;
          border: 2px solid #ffc107;
        }

        .flag-item.severity-medium {
          background: #e3f2fd;
          border: 2px solid #2196f3;
        }

        .flag-severity {
          margin-left: auto;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .odi-section {
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .odi-section h4 {
          color: #34495e;
          margin-bottom: 1rem;
        }

        .option-text {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .option-value {
          display: inline-block;
          width: 24px;
          height: 24px;
          background: #3498db;
          color: white;
          border-radius: 50%;
          text-align: center;
          font-weight: 600;
          line-height: 24px;
          font-size: 0.9rem;
        }

        .startback-question {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .question-text {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .psych-tag {
          display: inline-block;
          background: #9b59b6;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          margin-right: 0.5rem;
        }

        .scale-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .scale-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .tbc-category {
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 4px;
        }

        .tbc-test {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
          align-items: center;
        }

        .test-label {
          font-weight: 600;
        }

        .score-preview {
          margin-top: 2rem;
          padding: 1rem;
          background: #e8f5e9;
          border-left: 4px solid #4caf50;
          border-radius: 4px;
          font-size: 1.1rem;
        }

        .summary {
          background: #f8f9fa;
        }

        .summary-section {
          margin-bottom: 2rem;
          padding: 1rem;
          background: white;
          border-radius: 4px;
        }

        .summary-section.alert {
          background: #fee;
          border: 2px solid #e74c3c;
        }

        .score-card {
          padding: 1rem;
          background: #e3f2fd;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary,
        .btn-primary,
        .btn-success {
          padding: 1rem 2rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary {
          background: #ecf0f1;
          color: #2c3e50;
        }

        .btn-primary {
          background: #3498db;
          color: white;
        }

        .btn-success {
          background: #2ecc71;
          color: white;
        }

        .btn-secondary:hover,
        .btn-primary:hover,
        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 1024px) {
          .form-sidebar {
            position: static;
            width: 100%;
            height: auto;
          }

          .form-main {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
