/**
 * FORMULAIRE ÉVALUATION PATIENT - VERSION GRAND PUBLIC
 * Simplifié et vulgarisé pour utilisation directe par les patients
 */

import { useState } from 'react';

export default function PatientAssessmentForm({ onComplete }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  
  // ODI Questions simplifiées pour patients
  const odiQuestions = [
    {
      id: 'pain_intensity',
      question: 'Quelle est l\'intensité de votre douleur au dos en ce moment?',
      icon: '😣',
      type: 'scale',
      options: [
        { value: 0, label: 'Aucune douleur', emoji: '😊' },
        { value: 1, label: 'Douleur légère', emoji: '🙂' },
        { value: 2, label: 'Douleur modérée', emoji: '😐' },
        { value: 3, label: 'Douleur importante', emoji: '😟' },
        { value: 4, label: 'Douleur intense', emoji: '😣' },
        { value: 5, label: 'Douleur insupportable', emoji: '😫' }
      ]
    },
    {
      id: 'personal_care',
      question: 'Pouvez-vous vous laver et vous habiller seul(e)?',
      icon: '🚿',
      type: 'scale',
      options: [
        { value: 0, label: 'Sans aucune difficulté', emoji: '✅' },
        { value: 1, label: 'Légère difficulté mais je me débrouille', emoji: '🙂' },
        { value: 2, label: 'Difficulté modérée, je dois aller doucement', emoji: '😐' },
        { value: 3, label: 'Grande difficulté, je dois faire des pauses', emoji: '😟' },
        { value: 4, label: 'J\'ai besoin d\'aide pour certaines tâches', emoji: '😣' },
        { value: 5, label: 'Je ne peux pas me débrouiller seul(e)', emoji: '😫' }
      ]
    },
    {
      id: 'lifting',
      question: 'Pouvez-vous soulever des objets (sac de courses, enfant)?',
      icon: '🛍️',
      type: 'scale',
      options: [
        { value: 0, label: 'Je peux soulever des objets lourds sans problème', emoji: '💪' },
        { value: 1, label: 'Je peux soulever des objets lourds mais ça fait mal', emoji: '😐' },
        { value: 2, label: 'Je ne peux soulever que des objets légers/moyens', emoji: '😟' },
        { value: 3, label: 'Je ne peux soulever que des objets très légers', emoji: '😣' },
        { value: 4, label: 'Je ne peux rien soulever', emoji: '🚫' },
        { value: 5, label: 'Même un objet léger est impossible', emoji: '😫' }
      ]
    },
    {
      id: 'walking',
      question: 'Quelle distance pouvez-vous marcher?',
      icon: '🚶',
      type: 'scale',
      options: [
        { value: 0, label: 'Je peux marcher sans limite', emoji: '🚶‍♂️' },
        { value: 1, label: 'Plus de 1km mais avec douleur', emoji: '😐' },
        { value: 2, label: 'Entre 500m et 1km maximum', emoji: '😟' },
        { value: 3, label: 'Entre 100m et 500m seulement', emoji: '😣' },
        { value: 4, label: 'Moins de 100m avec aide (canne)', emoji: '🦯' },
        { value: 5, label: 'Je ne peux pas marcher du tout', emoji: '🚫' }
      ]
    },
    {
      id: 'sitting',
      question: 'Combien de temps pouvez-vous rester assis(e)?',
      icon: '🪑',
      type: 'scale',
      options: [
        { value: 0, label: 'Aussi longtemps que je veux', emoji: '✅' },
        { value: 1, label: 'Aussi longtemps que je veux mais avec douleur', emoji: '😐' },
        { value: 2, label: 'Environ 1 heure maximum', emoji: '😟' },
        { value: 3, label: 'Environ 30 minutes maximum', emoji: '😣' },
        { value: 4, label: 'Environ 10 minutes maximum', emoji: '😫' },
        { value: 5, label: 'Je ne peux pas rester assis(e)', emoji: '🚫' }
      ]
    },
    {
      id: 'standing',
      question: 'Combien de temps pouvez-vous rester debout?',
      icon: '🧍',
      type: 'scale',
      options: [
        { value: 0, label: 'Aussi longtemps que je veux', emoji: '✅' },
        { value: 1, label: 'Aussi longtemps que je veux mais avec douleur', emoji: '😐' },
        { value: 2, label: 'Environ 1 heure maximum', emoji: '😟' },
        { value: 3, label: 'Environ 30 minutes maximum', emoji: '😣' },
        { value: 4, label: 'Environ 10 minutes maximum', emoji: '😫' },
        { value: 5, label: 'Je ne peux pas rester debout', emoji: '🚫' }
      ]
    },
    {
      id: 'sleeping',
      question: 'Comment dormez-vous avec votre douleur au dos?',
      icon: '😴',
      type: 'scale',
      options: [
        { value: 0, label: 'Très bien, pas de problème', emoji: '😴' },
        { value: 1, label: 'Légère gêne mais je dors bien', emoji: '🙂' },
        { value: 2, label: 'Douleur modérée, sommeil perturbé', emoji: '😐' },
        { value: 3, label: 'Douleur importante, sommeil difficile', emoji: '😟' },
        { value: 4, label: 'Douleur intense, je dors très mal', emoji: '😣' },
        { value: 5, label: 'Je ne peux pratiquement pas dormir', emoji: '😫' }
      ]
    },
    {
      id: 'social_life',
      question: 'Votre douleur affecte-t-elle votre vie sociale et familiale?',
      icon: '👨‍👩‍👧‍👦',
      type: 'scale',
      options: [
        { value: 0, label: 'Pas du tout', emoji: '😊' },
        { value: 1, label: 'Légèrement, mais je fais mes activités', emoji: '🙂' },
        { value: 2, label: 'Modérément, je dois limiter certaines activités', emoji: '😐' },
        { value: 3, label: 'Beaucoup, j\'évite plusieurs activités', emoji: '😟' },
        { value: 4, label: 'Énormément, je ne sors presque plus', emoji: '😣' },
        { value: 5, label: 'Totalement, je suis isolé(e)', emoji: '😫' }
      ]
    },
    {
      id: 'traveling',
      question: 'Pouvez-vous voyager (voiture, transport)?',
      icon: '🚗',
      type: 'scale',
      options: [
        { value: 0, label: 'Oui, sans problème', emoji: '🚗' },
        { value: 1, label: 'Oui mais avec douleur', emoji: '😐' },
        { value: 2, label: 'Oui mais trajets courts seulement (< 1h)', emoji: '😟' },
        { value: 3, label: 'Trajets très courts uniquement (< 30min)', emoji: '😣' },
        { value: 4, label: 'Presque impossible, douleur intense', emoji: '😫' },
        { value: 5, label: 'Je ne peux pas voyager du tout', emoji: '🚫' }
      ]
    },
    {
      id: 'work',
      question: 'Votre douleur affecte-t-elle votre travail ou vos tâches quotidiennes?',
      icon: '💼',
      type: 'scale',
      options: [
        { value: 0, label: 'Pas du tout, je travaille normalement', emoji: '💪' },
        { value: 1, label: 'Travail normal mais avec douleur', emoji: '😐' },
        { value: 2, label: 'Je dois adapter mon rythme', emoji: '😟' },
        { value: 3, label: 'Je ne peux travailler qu\'à temps partiel', emoji: '😣' },
        { value: 4, label: 'Je ne peux presque plus travailler', emoji: '😫' },
        { value: 5, label: 'Je ne peux pas travailler du tout', emoji: '🚫' }
      ]
    }
  ];

  // STarT Back Questions simplifiées
  const startBackQuestions = [
    {
      id: 'referred_leg_pain',
      question: 'Avez-vous une douleur qui descend dans la jambe?',
      icon: '🦵',
      type: 'yesno',
      help: 'Cette douleur peut aller jusqu\'au pied (sciatique)'
    },
    {
      id: 'shoulder_pain',
      question: 'Avez-vous aussi des douleurs aux épaules ou au cou?',
      icon: '🤷',
      type: 'yesno'
    },
    {
      id: 'limited_walking',
      question: 'Marchez-vous seulement de courtes distances à cause de votre dos?',
      icon: '🚶‍♂️',
      type: 'yesno',
      help: 'Par exemple: moins de 15-20 minutes'
    },
    {
      id: 'dressing_slowly',
      question: 'Vous habillez-vous plus lentement que d\'habitude à cause de votre dos?',
      icon: '👔',
      type: 'yesno'
    },
    {
      id: 'worry',
      question: 'Vous inquiétez-vous beaucoup à propos de votre douleur au dos?',
      icon: '😰',
      type: 'scale',
      options: [
        { value: 0, label: 'Pas du tout' },
        { value: 1, label: 'Un peu' },
        { value: 2, label: 'Modérément' },
        { value: 3, label: 'Beaucoup' },
        { value: 4, label: 'Énormément' }
      ],
      psychosocial: true
    },
    {
      id: 'catastrophizing',
      question: 'Pensez-vous que votre douleur ne s\'améliorera jamais?',
      icon: '😔',
      type: 'scale',
      options: [
        { value: 0, label: 'Pas du tout' },
        { value: 1, label: 'Un peu' },
        { value: 2, label: 'Modérément' },
        { value: 3, label: 'Beaucoup' },
        { value: 4, label: 'Énormément' }
      ],
      psychosocial: true
    },
    {
      id: 'not_enjoyable',
      question: 'En général, avez-vous du mal à apprécier les choses?',
      icon: '😞',
      type: 'scale',
      options: [
        { value: 0, label: 'Pas du tout' },
        { value: 1, label: 'Un peu' },
        { value: 2, label: 'Modérément' },
        { value: 3, label: 'Beaucoup' },
        { value: 4, label: 'Énormément' }
      ],
      psychosocial: true
    },
    {
      id: 'irritable',
      question: 'Êtes-vous plus irritable ou de mauvaise humeur ces derniers temps?',
      icon: '😤',
      type: 'scale',
      options: [
        { value: 0, label: 'Pas du tout' },
        { value: 1, label: 'Un peu' },
        { value: 2, label: 'Modérément' },
        { value: 3, label: 'Beaucoup' },
        { value: 4, label: 'Énormément' }
      ],
      psychosocial: true
    },
    {
      id: 'physical_activity',
      question: 'Avez-vous peur que l\'activité physique aggrave votre douleur?',
      icon: '🏃‍♂️',
      type: 'scale',
      options: [
        { value: 0, label: 'Pas du tout' },
        { value: 1, label: 'Un peu' },
        { value: 2, label: 'Modérément' },
        { value: 3, label: 'Beaucoup' },
        { value: 4, label: 'Énormément' }
      ],
      psychosocial: true
    }
  ];

  // Questions contextuelles simples
  const contextQuestions = [
    {
      id: 'duration',
      question: 'Depuis combien de temps avez-vous mal au dos?',
      icon: '📅',
      type: 'select',
      options: [
        { value: 'acute', label: 'Moins de 6 semaines (récent)' },
        { value: 'subacute', label: 'Entre 6 semaines et 3 mois' },
        { value: 'chronic', label: 'Plus de 3 mois (chronique)' }
      ]
    },
    {
      id: 'goals',
      question: 'Quels sont vos objectifs principaux? (plusieurs choix possibles)',
      icon: '🎯',
      type: 'multiselect',
      options: [
        { value: 'pain_reduction', label: 'Réduire ma douleur', emoji: '😌' },
        { value: 'function', label: 'Retrouver mes activités quotidiennes', emoji: '🏠' },
        { value: 'strength', label: 'Devenir plus fort(e)', emoji: '💪' },
        { value: 'return_sport', label: 'Reprendre le sport', emoji: '⚽' }
      ]
    },
    {
      id: 'movement_pain',
      question: 'Quels mouvements augmentent votre douleur?',
      icon: '🔍',
      type: 'multiselect',
      options: [
        { value: 'flexion', label: 'Me pencher en avant', emoji: '🙇' },
        { value: 'extension', label: 'Me cambrer en arrière', emoji: '🤸' },
        { value: 'rotation', label: 'Tourner le tronc', emoji: '🔄' },
        { value: 'none', label: 'Aucun mouvement spécifique', emoji: '😐' }
      ]
    },
    {
      id: 'red_flags',
      question: 'Avez-vous l\'un de ces symptômes? (IMPORTANT)',
      icon: '⚠️',
      type: 'multiselect',
      help: 'Ces symptômes nécessitent une consultation médicale urgente',
      options: [
        { value: 'bladder_loss', label: 'Perte de contrôle de la vessie', emoji: '🚨' },
        { value: 'numbness_saddle', label: 'Engourdissement entre les jambes', emoji: '🚨' },
        { value: 'leg_weakness', label: 'Faiblesse importante dans les jambes', emoji: '🚨' },
        { value: 'night_pain', label: 'Douleur intense la nuit (ne diminue pas)', emoji: '⚠️' },
        { value: 'unexplained_weight_loss', label: 'Perte de poids inexpliquée', emoji: '⚠️' },
        { value: 'none', label: 'Aucun de ces symptômes', emoji: '✅' }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleMultiSelectAnswer = (questionId, value) => {
    const odiIds = odiQuestions.map(q => q.id);
    const odiAnswers = odiIds.filter(id => answers[id] !== undefined);
    if (odiAnswers.length === 0) return 0;
    
    const sum = odiAnswers.reduce((acc, id) => acc + (answers[id] || 0), 0);
    const score = (sum / (odiAnswers.length * 5)) * 100;
    return Math.round(score);
  };

  const calculateSTarTBack = () => {
    let totalScore = 0;
    let psychosocialScore = 0;

    startBackQuestions.forEach(q => {
      const answer = answers[q.id];
      if (answer === undefined) return;

      if (q.type === 'yesno') {
        if (answer === 'yes') totalScore += 1;
      } else if (q.type === 'scale') {
        if (answer >= 2) {
          totalScore += 1;
          if (q.psychosocial) psychosocialScore += 1;
        }
      }
    });

    // STarT Back scoring: Low (0-3), Medium (4+), High (4+ with psychosocial 4+)
    if (totalScore <= 3) return 'low';
    if (psychosocialScore >= 4) return 'high';
    return 'medium';
  };

  const buildPatientProfile = () => {
    const odi = calculateODI();
    const startBack = calculateSTarTBack();
    
    // Determine phase
    const phase = answers.duration || 'subacute';
    
    // Determine directional preference and intolerance
    const movementPain = answers.movement_pain || [];
    const movementIntolerance = [];
    let directionalPreference = null;
    
    if (movementPain.includes('flexion')) {
      movementIntolerance.push('flexion_intolerant');
      directionalPreference = 'extension'; // McKenzie approach
    }
    if (movementPain.includes('extension')) {
      movementIntolerance.push('extension_intolerant');
      directionalPreference = 'flexion';
    }
    if (movementPain.includes('rotation')) {
      movementIntolerance.push('rotation_intolerant');
    }
    
    // Determine dominant pattern based on ODI and phase
    let dominantPattern = 'stabilization';
    if (odi > 60 || phase === 'acute') {
      dominantPattern = 'motor_control';
    } else if (startBack === 'low' && phase === 'chronic') {
      dominantPattern = 'strengthening';
    }
    
    // Check red flags
    const redFlags = answers.red_flags || [];
    const hasRedFlags = redFlags.some(flag => 
      ['bladder_loss', 'numbness_saddle', 'leg_weakness'].includes(flag)
    );
    
    return {
      // Demographics
      phase,
      acuteLBP: phase === 'acute',
      
      // ODI & STarT Back
      odi,
      startBack,
      
      // Goals
      primaryGoals: answers.goals || ['pain_reduction'],
      
      // Movement patterns
      directionalPreference,
      movementIntolerance,
      dominantPattern,
      
      // Specific needs
      specificNeeds: [],
      
      // Red flags
      redFlags: hasRedFlags ? redFlags.filter(f => f !== 'none') : [],
      
      // Contraindications (derived from answers)
      contraindications: [],
      
      // Additional context
      legPain: answers.referred_leg_pain === 'yes'
    };
  };

  const handleSubmit = async () => {
    const profile = buildPatientProfile();
    
    // Check for red flags
    if (profile.redFlags.length > 0) {
      alert('⚠️ ATTENTION: Vos symptômes nécessitent une consultation médicale urgente. Veuillez consulter un médecin avant de faire des exercices.');
      return;
    }
    
    try {
      setLoading(true);
      
      // Call exercise selection API
      const response = await fetch('/api/select-exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientProfile: profile })
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la sélection des exercices');
      }
      
      const data = await response.json();
      
      // Store results with correct keys for exercise-results page
      sessionStorage.setItem('selectedExercises', JSON.stringify(data.selectedExercises));
      sessionStorage.setItem('justifications', JSON.stringify(data.justifications || []));
      sessionStorage.setItem('patientProfile', JSON.stringify(profile));
      window.location.href = '/exercise-results';
      
    } catch (error) {
      console.error('Error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setLoading(false);
    }
  };

  const renderQuestion = (question, index) => {
    const answer = answers[question.id];
    
    return (
      <div key={question.id} className="question-card">
        <div className="question-header">
          <span className="question-icon">{question.icon}</span>
          <h3 className="question-text">
            {index + 1}. {question.question}
          </h3>
        </div>
        
        {question.help && (
          <p className="question-help">💡 {question.help}</p>
        )}
        
        <div className="options-container">
          {question.type === 'yesno' ? (
            <>
              <button
                type="button"
                className="option-button"
                style={{
                  borderColor: answer === 'yes' ? '#2ecc71' : '#3498db',
                  background: answer === 'yes' ? '#d5f4e6' : '#3498db',
                  fontWeight: answer === 'yes' ? 700 : 400,
                  boxShadow: answer === 'yes' ? '0 0 0 3px rgba(46, 204, 113, 0.2)' : 'none',
                  color: answer === 'yes' ? '#2c3e50' : 'white'
                }}
                onClick={() => handleAnswer(question.id, 'yes')}
              >
                ✅ Oui
              </button>
              <button
                type="button"
                className="option-button"
                style={{
                  borderColor: answer === 'no' ? '#2ecc71' : '#3498db',
                  background: answer === 'no' ? '#d5f4e6' : '#3498db',
                  fontWeight: answer === 'no' ? 700 : 400,
                  boxShadow: answer === 'no' ? '0 0 0 3px rgba(46, 204, 113, 0.2)' : 'none',
                  color: answer === 'no' ? '#2c3e50' : 'white'
                }}
                onClick={() => handleAnswer(question.id, 'no')}
              >
                ❌ Non
              </button>
            </>
          ) : question.type === 'select' ? (
            <select
              value={answer || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              className="select-input"
            >
              <option value="">Sélectionnez...</option>
              {question.options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : question.type === 'multiselect' ? (
            question.options.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`option-button multiselect ${
                  (answer || []).includes(opt.value) ? 'selected' : ''
                }`}
                onClick={() => {
                  const current = answer || [];
                  const newValue = current.includes(opt.value)
                    ? current.filter(v => v !== opt.value)
                    : [...current, opt.value];
                  handleAnswer(question.id, newValue);
                }}
              >
                {opt.emoji && <span className="option-emoji">{opt.emoji}</span>}
                {opt.label}
              </button>
            ))
          ) : question.type === 'scale' ? (
            question.options.map(opt => (
              <button
                key={opt.value}
                type="button"
                className="option-button scale"
                style={{
                  borderColor: answer === opt.value ? '#2ecc71' : '#3498db',
                  background: answer === opt.value ? '#d5f4e6' : '#3498db',
                  fontWeight: answer === opt.value ? 700 : 400,
                  boxShadow: answer === opt.value ? '0 0 0 3px rgba(46, 204, 113, 0.2)' : 'none',
                  color: answer === opt.value ? '#2c3e50' : 'white'
                }}
                onClick={() => handleAnswer(question.id, opt.value)}
              >
                {opt.emoji && <span className="option-emoji">{opt.emoji}</span>}
                <span className="option-label">{opt.label}</span>
              </button>
            ))
          ) : (
            question.options.map(opt => (
              <button
                key={opt.value}
                type="button"
                className="option-button"
                style={{
                  borderColor: answer === opt.value ? '#2ecc71' : '#3498db',
                  background: answer === opt.value ? '#d5f4e6' : '#3498db',
                  fontWeight: answer === opt.value ? 700 : 400,
                  boxShadow: answer === opt.value ? '0 0 0 3px rgba(46, 204, 113, 0.2)' : 'none',
                  color: answer === opt.value ? '#2c3e50' : 'white'
                }}
                onClick={() => handleAnswer(question.id, opt.value)}
              >
                <span className="option-emoji">{opt.emoji}</span>
                <span className="option-label">{opt.label}</span>
              </button>
            ))
          )}
        </div>
      </div>
    );
  };

  const allQuestions = [...odiQuestions, ...startBackQuestions, ...contextQuestions];
  const totalSteps = Math.ceil(allQuestions.length / 3); // 3 questions per step
  const currentQuestions = allQuestions.slice((step - 1) * 3, step * 3);
  
  // Calculate progress based on answered questions, not step
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / allQuestions.length) * 100;

  return (
    <div className="patient-assessment-form">
      <div className="form-header">
        <h2>Évaluation de votre douleur au dos 🩺</h2>
        <p className="form-subtitle">
          Répondez à ces questions pour obtenir un programme d'exercices personnalisé
        </p>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-text">
          Étape {step} sur {totalSteps} ({Math.round(progress)}% complété)
        </p>
      </div>

      <div className="questions-section">
        {currentQuestions.map((q, idx) => renderQuestion(q, (step - 1) * 3 + idx))}
      </div>

      <div className="form-navigation">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="nav-button prev"
          >
            ← Précédent
          </button>
        )}
        
        {step < totalSteps ? (
          <button
            onClick={() => setStep(step + 1)}
            className="nav-button next"
          >
            Suivant →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="nav-button submit"
            disabled={loading}
          >
            {loading ? '⏳ Génération en cours...' : '🎯 Obtenir mon programme'}
          </button>
        )}
      </div>

      <style jsx>{`
        .patient-assessment-form {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .form-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .form-header h2 {
          font-size: 2rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          color: #7f8c8d;
          font-size: 1.1rem;
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: #ecf0f1;
          border-radius: 10px;
          margin: 1.5rem 0 0.5rem;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3498db, #2ecc71);
          transition: width 0.3s ease;
        }

        .progress-text {
          color: #7f8c8d;
          font-size: 0.9rem;
        }

        .questions-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .question-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .question-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .question-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .question-text {
          font-size: 1.3rem;
          color: #2c3e50;
          margin: 0;
          line-height: 1.4;
        }

        .question-help {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          border-radius: 4px;
          font-size: 0.95rem;
          color: #856404;
        }

        .options-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .option-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
          text-align: center;
        }

        .option-button:hover {
          border-color: #3498db;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
        }

        .option-button.selected {
          border-color: #2ecc71 !important;
          background: #d5f4e6 !important;
          font-weight: 600;
          box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2) !important;
        }

        .option-button.scale.selected {
          border-color: #2ecc71 !important;
          background: #d5f4e6 !important;
          font-weight: 700;
        }

        .option-button.multiselect.selected {
          background: #d1f2eb;
        }

        .option-emoji {
          font-size: 2rem;
        }

        .option-label {
          line-height: 1.4;
        }

        .select-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          cursor: pointer;
        }

        .form-navigation {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 3rem;
        }

        .nav-button {
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .nav-button.prev {
          background: #ecf0f1;
          color: #2c3e50;
        }

        .nav-button.next,
        .nav-button.submit {
          background: linear-gradient(135deg, #3498db, #2ecc71);
          color: white;
          margin-left: auto;
        }

        .nav-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .patient-assessment-form {
            padding: 1rem;
          }

          .question-text {
            font-size: 1.1rem;
          }

          .options-container {
            grid-template-columns: 1fr;
          }

          .form-navigation {
            flex-direction: column;
          }

          .nav-button.next,
          .nav-button.submit {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
