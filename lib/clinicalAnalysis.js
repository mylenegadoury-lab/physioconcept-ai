/**
 * ANALYSE CLINIQUE APPROFONDIE
 * Analyse multi-dimensionnelle du profil patient pour personnalisation optimale
 * 
 * Intègre:
 * - Classification TBC (Treatment-Based Classification)
 * - Modèle bio-psycho-social (STarT Back)
 * - Directional preference (McKenzie)
 * - Pain mechanisms (nociceptive, neuropathic, central sensitization)
 * - Functional capacity (ODI)
 * - Movement patterns et déficits
 */

/**
 * ANALYSE 1: PHÉNOTYPE CLINIQUE
 * Détermine le sous-type de lombalgie selon littérature
 */
export function analyzeClinicalPhenotype(profile) {
  const phenotypes = [];
  let primaryPhenotype = 'non_specific';
  
  // 1. Motor control deficit (O'Sullivan classification)
  if (profile.dominantPattern === 'motor_control' || 
      profile.tbcCategories?.includes('stabilization')) {
    phenotypes.push({
      type: 'motor_control_deficit',
      confidence: 0.8,
      indicators: ['Poor stabilization', 'TBC: stabilization', 'Phase: acute/subacute'],
      implications: {
        exerciseEmphasis: ['stabilization', 'motor_control', 'proprioception'],
        avoidInitially: ['high_load_strengthening', 'ballistic_movements'],
        progression: 'Motor control → Stabilization → Strengthening'
      }
    });
    primaryPhenotype = 'motor_control_deficit';
  }
  
  // 2. Directional preference (McKenzie)
  if (profile.directionalPreference) {
    phenotypes.push({
      type: 'directional_preference',
      subtype: profile.directionalPreference,
      confidence: 0.9,
      indicators: [`Centralization with ${profile.directionalPreference}`, 'Repeated movement testing positive'],
      implications: {
        exerciseEmphasis: [`${profile.directionalPreference}_exercises`, 'centralization_based'],
        avoidInitially: profile.movementIntolerance,
        progression: 'Directional preference → Neutral → Opposite direction (gradual)'
      }
    });
    primaryPhenotype = 'directional_preference';
  }
  
  // 3. Neuropathic pattern (radicular pain)
  if (profile.neurologicalSigns?.slr === 'positive' || 
      profile.legPain || 
      profile.neurologicalSigns?.sensation === 'altered') {
    const neuropathicConfidence = 
      profile.neurologicalSigns?.slr === 'positive' ? 0.9 :
      profile.neurologicalSigns?.sensation === 'altered' ? 0.7 : 0.5;
    
    phenotypes.push({
      type: 'neuropathic_component',
      confidence: neuropathicConfidence,
      indicators: ['SLR positive', 'Dermatomal pain', 'Altered sensation'],
      implications: {
        exerciseEmphasis: ['neural_mobilization', 'gentle_mobility', 'pain_free_ROM'],
        avoidInitially: ['nerve_tension_provocateurs', 'slump_position', 'SLR_stretch'],
        progression: 'Neural desensitization → Gradual loading → Strengthening'
      }
    });
    if (neuropathicConfidence >= 0.7) {
      primaryPhenotype = 'neuropathic_component';
    }
  }
  
  // 4. Central sensitization (psychosocial factors)
  if (profile.startBack === 'high' || profile.psychosocialScore >= 4) {
    phenotypes.push({
      type: 'central_sensitization_risk',
      confidence: profile.psychosocialScore >= 4 ? 0.8 : 0.6,
      indicators: ['STarT Back: High risk', 'Psychosocial score elevated', 'Chronic pain'],
      implications: {
        exerciseEmphasis: ['graded_exposure', 'functional_activities', 'confidence_building'],
        avoidInitially: ['pain_focused_approach', 'rest_based_management'],
        progression: 'Education + Graded activity → Functional restoration → Conditioning',
        educationEmphasis: 'Pain neuroscience education, fear-avoidance reduction'
      }
    });
    if (profile.psychosocialScore >= 5) {
      primaryPhenotype = 'central_sensitization_risk';
    }
  }
  
  // 5. Deconditioning syndrome (chronic + low disability)
  if (profile.phase === 'chronic' && 
      profile.odi < 40 && 
      profile.startBack === 'low' &&
      profile.sportLevel === 'sedentary') {
    phenotypes.push({
      type: 'deconditioning_syndrome',
      confidence: 0.8,
      indicators: ['Chronic LBP', 'Low disability', 'Sedentary lifestyle', 'Low STarT Back'],
      implications: {
        exerciseEmphasis: ['progressive_loading', 'strengthening', 'cardiovascular', 'functional'],
        avoidInitially: ['excessive_caution', 'symptom_based_progression'],
        progression: 'General conditioning → Progressive overload → Return to activity'
      }
    });
    primaryPhenotype = 'deconditioning_syndrome';
  }
  
  return {
    phenotypes,
    primaryPhenotype,
    complexity: phenotypes.length // Multiple phenotypes = more complex case
  };
}

/**
 * ANALYSE 2: CAPACITÉ FONCTIONNELLE ET OBJECTIFS
 * Détermine les limitations et objectifs réalistes
 */
export function analyzeFunctionalCapacity(profile) {
  const capacity = {
    level: 'moderate',
    limitations: [],
    priorities: [],
    progressionRate: 'moderate'
  };
  
  // ODI-based capacity
  if (profile.odi >= 60) {
    capacity.level = 'severe_limitation';
    capacity.limitations.push('Severe disability', 'ADL significantly impaired');
    capacity.priorities = ['pain_management', 'basic_mobility', 'ADL_independence'];
    capacity.progressionRate = 'slow';
  } else if (profile.odi >= 40) {
    capacity.level = 'moderate_limitation';
    capacity.limitations.push('Moderate disability', 'Functional restrictions');
    capacity.priorities = ['function_restoration', 'pain_reduction', 'activity_tolerance'];
    capacity.progressionRate = 'moderate';
  } else if (profile.odi >= 20) {
    capacity.level = 'mild_limitation';
    capacity.limitations.push('Mild disability', 'Specific activity limitations');
    capacity.priorities = ['full_function_return', 'prevention', 'performance'];
    capacity.progressionRate = 'moderate_to_fast';
  } else {
    capacity.level = 'minimal_limitation';
    capacity.priorities = ['prevention', 'performance_optimization', 'return_to_sport'];
    capacity.progressionRate = 'fast';
  }
  
  // Occupation-specific considerations
  if (profile.occupation) {
    const heavyOccupations = ['ouvrier', 'construction', 'agriculteur', 'déménageur', 'infirmier'];
    const sedentaryOccupations = ['bureau', 'informatique', 'comptable', 'secrétaire'];
    
    const occupation = profile.occupation.toLowerCase();
    if (heavyOccupations.some(o => occupation.includes(o))) {
      capacity.priorities.unshift('load_tolerance', 'lifting_mechanics', 'endurance');
      capacity.limitations.push('High physical demands at work');
    } else if (sedentaryOccupations.some(o => occupation.includes(o))) {
      capacity.priorities.push('sitting_tolerance', 'postural_endurance', 'mobility');
      capacity.limitations.push('Prolonged sitting required');
    }
  }
  
  // Sport level considerations
  if (profile.sportLevel === 'competitive' || profile.sportLevel === 'elite') {
    capacity.priorities.unshift('performance', 'power', 'sport_specific_demands');
    capacity.progressionRate = 'fast';
  } else if (profile.sportLevel === 'sedentary') {
    capacity.priorities.push('general_fitness', 'cardiovascular_health');
    if (capacity.progressionRate === 'fast') {
      capacity.progressionRate = 'moderate';
    }
  }
  
  // Age considerations
  if (profile.age >= 65) {
    capacity.priorities.push('fall_prevention', 'bone_health', 'balance');
    capacity.limitations.push('Age-related considerations');
    if (capacity.progressionRate === 'fast') {
      capacity.progressionRate = 'moderate';
    }
  } else if (profile.age <= 30) {
    capacity.priorities.push('injury_prevention', 'performance');
    if (capacity.level === 'minimal_limitation' || capacity.level === 'mild_limitation') {
      capacity.progressionRate = 'fast';
    }
  }
  
  return capacity;
}

/**
 * ANALYSE 3: FACTEURS DE MODULATION
 * Éléments qui modifient la prescription (aggravants, calmants, contexte)
 */
export function analyzeModulatingFactors(profile) {
  const modulation = {
    aggravatingFactors: [],
    easingFactors: [],
    biomechanicalIssues: [],
    recommendations: []
  };
  
  // Aggravating factors analysis
  if (profile.aggravatingFactors) {
    profile.aggravatingFactors.forEach(factor => {
      switch(factor) {
        case 'prolonged_sitting':
          modulation.aggravatingFactors.push({
            factor: 'Prolonged sitting',
            implication: 'Flexion intolerance likely',
            exerciseModification: 'Prioritize extension, avoid sustained flexion',
            education: 'Postural variation, lumbar support, frequent position changes'
          });
          modulation.biomechanicalIssues.push('flexion_overload');
          break;
        
        case 'prolonged_standing':
          modulation.aggravatingFactors.push({
            factor: 'Prolonged standing',
            implication: 'Extension intolerance or muscle fatigue',
            exerciseModification: 'Include flexion-based relief, core endurance',
            education: 'Weight shifting, foot placement, anti-fatigue strategies'
          });
          modulation.biomechanicalIssues.push('extension_overload');
          break;
        
        case 'flexion':
          modulation.aggravatingFactors.push({
            factor: 'Flexion aggravation',
            implication: 'Disc involvement possible, flexion intolerant',
            exerciseModification: 'Extension-based program, neutral spine emphasis',
            education: 'Hip hinge mechanics, neutral spine during ADLs'
          });
          modulation.biomechanicalIssues.push('flexion_intolerant');
          break;
        
        case 'extension':
          modulation.aggravatingFactors.push({
            factor: 'Extension aggravation',
            implication: 'Facet or stenosis possible, extension intolerant',
            exerciseModification: 'Flexion-based relief, avoid extension exercises',
            education: 'Pelvic tilt, flexion for symptom relief'
          });
          modulation.biomechanicalIssues.push('extension_intolerant');
          break;
        
        case 'rotation':
          modulation.aggravatingFactors.push({
            factor: 'Rotation aggravation',
            implication: 'Rotational instability or facet irritation',
            exerciseModification: 'Anti-rotation exercises, unilateral loading',
            education: 'Avoid combined movements, segmental control'
          });
          modulation.biomechanicalIssues.push('rotation_sensitive');
          break;
        
        case 'lifting':
          modulation.aggravatingFactors.push({
            factor: 'Lifting aggravation',
            implication: 'Load intolerance, motor control deficit',
            exerciseModification: 'Progressive loading, hip hinge training',
            education: 'Proper lifting mechanics, intra-abdominal pressure'
          });
          modulation.biomechanicalIssues.push('load_intolerant');
          break;
      }
    });
  }
  
  // Easing factors analysis
  if (profile.easingFactors) {
    profile.easingFactors.forEach(factor => {
      modulation.easingFactors.push({
        factor,
        implication: `${factor} provides relief`,
        exerciseIntegration: `Incorporate ${factor} positions/movements`,
        recommendation: `Use as starting position or recovery strategy`
      });
    });
  }
  
  // Specific biomechanical deficits
  if (profile.specificNeeds) {
    profile.specificNeeds.forEach(need => {
      switch(need) {
        case 'hamstring_tightness':
          modulation.biomechanicalIssues.push({
            issue: 'Hamstring tightness',
            implication: 'Pelvic tilt compensation, flexion strain',
            exercise: 'Neural hamstring stretching, posterior chain lengthening',
            priority: 'high'
          });
          break;
        
        case 'hip_flexor_tightness':
          modulation.biomechanicalIssues.push({
            issue: 'Hip flexor tightness',
            implication: 'Anterior pelvic tilt, lumbar extension load',
            exercise: 'Hip flexor stretching, anterior chain release',
            priority: 'high'
          });
          break;
      }
    });
  }
  
  // Contextual recommendations
  if (profile.previousEpisodes >= 3) {
    modulation.recommendations.push({
      area: 'Recurrence prevention',
      priority: 'critical',
      content: 'High recurrence risk - emphasize long-term maintenance program, movement pattern retraining, and lifestyle modification'
    });
  }
  
  if (profile.onset === 'sudden') {
    modulation.recommendations.push({
      area: 'Trauma consideration',
      priority: 'high',
      content: 'Sudden onset - assess for structural damage, tissue healing timeline important, respect inflammatory phase'
    });
  }
  
  return modulation;
}

/**
 * ANALYSE 4: PRESCRIPTION PARAMETERS
 * Détermine dosage, intensité, fréquence personnalisés
 */
export function determinePrescriptionParameters(profile, phenotype, capacity) {
  const params = {
    volume: 'moderate',
    intensity: 'moderate',
    frequency: '3-4x/week',
    sessionDuration: '30-40min',
    progressionTimeline: '4-6 weeks',
    supervisionLevel: 'moderate',
    modifications: []
  };
  
  // Adjust based on phase
  if (profile.phase === 'acute') {
    params.volume = 'low';
    params.intensity = 'low';
    params.frequency = 'daily (2-3x/day, short sessions)';
    params.sessionDuration = '10-15min';
    params.progressionTimeline = '1-2 weeks';
    params.supervisionLevel = 'close';
  } else if (profile.phase === 'chronic') {
    params.volume = 'moderate_to_high';
    params.intensity = 'moderate_to_high';
    params.frequency = '4-5x/week';
    params.sessionDuration = '40-60min';
    params.progressionTimeline = '6-12 weeks';
  }
  
  // Adjust based on capacity
  if (capacity.level === 'severe_limitation') {
    params.intensity = 'very_low';
    params.volume = 'very_low';
    params.progressionRate = 'very_slow';
    params.supervisionLevel = 'close';
  } else if (capacity.level === 'minimal_limitation') {
    params.intensity = 'moderate_to_high';
    params.volume = 'moderate_to_high';
    params.progressionRate = 'fast';
    params.supervisionLevel = 'periodic';
  }
  
  // Adjust based on phenotype
  if (phenotype.primaryPhenotype === 'motor_control_deficit') {
    params.modifications.push('Low reps, high quality, frequent feedback');
    params.modifications.push('Cognitive load initially high - simple progressions');
    params.intensity = 'low_to_moderate';
  }
  
  if (phenotype.primaryPhenotype === 'central_sensitization_risk') {
    params.modifications.push('Graded exposure approach, time-based not pain-based');
    params.modifications.push('Education sessions integral to treatment');
    params.modifications.push('Pacing strategies to avoid boom-bust cycle');
    params.supervisionLevel = 'close';
  }
  
  if (phenotype.primaryPhenotype === 'deconditioning_syndrome') {
    params.modifications.push('Progressive overload principle essential');
    params.modifications.push('General conditioning + specific exercises');
    params.volume = 'moderate_to_high';
    params.intensity = 'progressive';
  }
  
  // Age adjustments
  if (profile.age >= 65) {
    params.modifications.push('Longer warm-up required');
    params.modifications.push('Balance component essential');
    params.modifications.push('Recovery time may be longer');
    if (params.intensity === 'high') params.intensity = 'moderate_to_high';
  }
  
  // Psychosocial adjustments
  if (profile.psychosocialScore >= 4) {
    params.modifications.push('Goal-setting and self-efficacy building critical');
    params.modifications.push('Collaborative approach - patient input essential');
    params.supervisionLevel = 'close';
  }
  
  return params;
}

/**
 * ANALYSE COMPLÈTE INTÉGRÉE
 * Point d'entrée principal - retourne analyse multi-dimensionnelle
 */
export function performComprehensiveClinicalAnalysis(profile) {
  console.log('\n🔬 ANALYSE CLINIQUE APPROFONDIE\n');
  
  // 1. Phénotype clinique
  const phenotype = analyzeClinicalPhenotype(profile);
  console.log('📊 Phénotype:', phenotype.primaryPhenotype);
  
  // 2. Capacité fonctionnelle
  const capacity = analyzeFunctionalCapacity(profile);
  console.log('💪 Capacité:', capacity.level);
  
  // 3. Facteurs modulants
  const modulation = analyzeModulatingFactors(profile);
  console.log('⚙️ Facteurs aggravants:', modulation.aggravatingFactors.length);
  
  // 4. Paramètres de prescription
  const prescription = determinePrescriptionParameters(profile, phenotype, capacity);
  console.log('📋 Volume:', prescription.volume, '| Intensité:', prescription.intensity);
  
  const analysis = {
    phenotype,
    capacity,
    modulation,
    prescription,
    summary: generateClinicalSummary(profile, phenotype, capacity, modulation)
  };
  
  console.log('\n✅ Analyse clinique complète\n');
  
  return analysis;
}

/**
 * Génère un résumé clinique texte
 */
function generateClinicalSummary(profile, phenotype, capacity, modulation) {
  let summary = `Patient ${profile.age} ans, ${profile.sex}, `;
  summary += `phase ${profile.phase}, `;
  summary += `ODI ${profile.odi} (${capacity.level}), `;
  summary += `STarT Back ${profile.startBack}. `;
  summary += `\n\nPhénotype principal: ${phenotype.primaryPhenotype}. `;
  
  if (phenotype.phenotypes.length > 1) {
    summary += `Présentation complexe avec ${phenotype.phenotypes.length} phénotypes identifiés. `;
  }
  
  if (modulation.aggravatingFactors.length > 0) {
    summary += `\n\nFacteurs aggravants: ${modulation.aggravatingFactors.map(f => f.factor).join(', ')}. `;
  }
  
  summary += `\n\nPriorités: ${capacity.priorities.slice(0, 3).join(', ')}.`;
  
  return summary;
}
