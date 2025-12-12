/**
 * PAGE RÉSULTATS EXERCICES
 * Affiche les exercices sélectionnés par l'algorithme
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function ExerciseResults() {
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const [justifications, setJustifications] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    // Load data from session storage
    const exercisesData = sessionStorage.getItem('selectedExercises');
    const justificationsData = sessionStorage.getItem('justifications');
    const profileData = sessionStorage.getItem('patientProfile');

    if (!exercisesData) {
      router.push('/assessment');
      return;
    }

    setExercises(JSON.parse(exercisesData));
    setJustifications(JSON.parse(justificationsData || '[]'));
    setProfile(JSON.parse(profileData || '{}'));
  }, []);

  const getEvidenceBadgeColor = (level) => {
    if (['1A', '1B'].includes(level)) return '#2ecc71';
    if (['2A', '2B'].includes(level)) return '#3498db';
    if (['3A', '3B'].includes(level)) return '#f39c12';
    return '#95a5a6';
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === 'beginner') return '#3498db';
    if (difficulty === 'intermediate') return '#f39c12';
    return '#e74c3c';
  };

  const getDifficultyLabel = (difficulty) => {
    if (difficulty === 'beginner') return 'Débutant';
    if (difficulty === 'intermediate') return 'Intermédiaire';
    return 'Avancé';
  };

  if (!exercises.length) {
    return (
      <Layout>
        <div className="loading">Chargement...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="results-container">
        <div className="results-header">
          <h1>🎯 Votre programme d'exercices personnalisé</h1>
          <p className="subtitle">
            {exercises.length} exercices sélectionnés spécifiquement pour vous
          </p>
          
          {profile && (
            <div className="profile-summary">
              <div className="summary-badge">
                <span className="badge-label">Phase:</span>
                <span className="badge-value">{profile.phase}</span>
              </div>
              {profile.odi !== null && (
                <div className="summary-badge">
                  <span className="badge-label">ODI:</span>
                  <span className="badge-value">{profile.odi}%</span>
                </div>
              )}
              {profile.startBack && (
                <div className="summary-badge">
                  <span className="badge-label">STarT Back:</span>
                  <span className="badge-value">{profile.startBack.toUpperCase()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="exercises-grid">
          {exercises.map((exercise, index) => (
            <div 
              key={exercise.id} 
              className="exercise-card"
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="card-header">
                <div className="exercise-number">{index + 1}</div>
                <h3 className="exercise-name">{exercise.name_fr || exercise.name}</h3>
              </div>

              <div className="card-badges">
                <span 
                  className="badge evidence-badge"
                  style={{ background: getEvidenceBadgeColor(exercise.evidence_level) }}
                >
                  Evidence {exercise.evidence_level}
                </span>
                <span 
                  className="badge difficulty-badge"
                  style={{ background: getDifficultyColor(exercise.difficulty_level) }}
                >
                  {getDifficultyLabel(exercise.difficulty_level)}
                </span>
                <span className="badge effectiveness-badge">
                  ⭐ {exercise.effectiveness_score}/100
                </span>
              </div>

              <div className="exercise-dosage">
                <div className="dosage-item">
                  <span className="dosage-icon">🔁</span>
                  <span>{exercise.reps_min}-{exercise.reps_max} répétitions</span>
                </div>
                <div className="dosage-item">
                  <span className="dosage-icon">📊</span>
                  <span>{exercise.sets_min}-{exercise.sets_max} séries</span>
                </div>
                <div className="dosage-item">
                  <span className="dosage-icon">📅</span>
                  <span>{exercise.frequency_per_week}x/semaine</span>
                </div>
              </div>

              {justifications.find(j => j.exercise === exercise.name) && (
                <div className="justification-preview">
                  <strong>Pourquoi cet exercice?</strong>
                  <p>
                    {justifications.find(j => j.exercise === exercise.name).reasons[0]}
                  </p>
                </div>
              )}

              <button className="view-details-btn">
                Voir les détails →
              </button>
            </div>
          ))}
        </div>

        <div className="actions-section">
          <button 
            className="action-btn secondary"
            onClick={() => router.push('/assessment')}
          >
            🔄 Nouvelle évaluation
          </button>
          <button 
            className="action-btn primary"
            onClick={() => window.print()}
          >
            🖨️ Imprimer le programme
          </button>
          <button 
            className="action-btn success"
            onClick={() => {
              const data = { exercises, justifications, profile };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'programme-exercices.json';
              a.click();
            }}
          >
            💾 Télécharger
          </button>
        </div>
      </div>

      {selectedExercise && (
        <div className="modal-overlay" onClick={() => setSelectedExercise(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedExercise(null)}>
              ✕
            </button>
            
            <h2>{selectedExercise.name_fr || selectedExercise.name}</h2>
            
            <div className="modal-badges">
              <span 
                className="badge evidence-badge"
                style={{ background: getEvidenceBadgeColor(selectedExercise.evidence_level) }}
              >
                Evidence {selectedExercise.evidence_level}
              </span>
              <span 
                className="badge difficulty-badge"
                style={{ background: getDifficultyColor(selectedExercise.difficulty_level) }}
              >
                {getDifficultyLabel(selectedExercise.difficulty_level)}
              </span>
              <span className="badge effectiveness-badge">
                ⭐ {selectedExercise.effectiveness_score}/100
              </span>
            </div>

            <div className="modal-section">
              <h3>📋 Instructions</h3>
              <div className="instructions">
                {selectedExercise.instructions_patient?.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                )) || <p>{selectedExercise.description}</p>}
              </div>
            </div>

            <div className="modal-section">
              <h3>💊 Dosage recommandé</h3>
              <div className="dosage-details">
                <div><strong>Répétitions:</strong> {selectedExercise.reps_min}-{selectedExercise.reps_max}</div>
                <div><strong>Séries:</strong> {selectedExercise.sets_min}-{selectedExercise.sets_max}</div>
                <div><strong>Fréquence:</strong> {selectedExercise.frequency_per_week}x par semaine</div>
                {selectedExercise.duration_weeks && (
                  <div><strong>Durée:</strong> {selectedExercise.duration_weeks} semaines</div>
                )}
              </div>
            </div>

            {selectedExercise.key_points && selectedExercise.key_points.length > 0 && (
              <div className="modal-section">
                <h3>✅ Points clés</h3>
                <ul className="key-points">
                  {selectedExercise.key_points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedExercise.absolute_contraindications && selectedExercise.absolute_contraindications.length > 0 && (
              <div className="modal-section warning">
                <h3>⚠️ Contre-indications</h3>
                <ul className="contraindications">
                  {selectedExercise.absolute_contraindications.map((contra, idx) => (
                    <li key={idx}>{contra}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .results-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .results-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .results-header h1 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #7f8c8d;
          margin-bottom: 1.5rem;
        }

        .profile-summary {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .summary-badge {
          background: #f8f9fa;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .badge-label {
          font-weight: 600;
          color: #7f8c8d;
        }

        .badge-value {
          color: #2c3e50;
          font-weight: 700;
        }

        .exercises-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .exercise-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s;
        }

        .exercise-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .exercise-number {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #3498db, #2ecc71);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .exercise-name {
          color: #2c3e50;
          font-size: 1.3rem;
          margin: 0;
          line-height: 1.3;
        }

        .card-badges {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          color: white;
        }

        .exercise-dosage {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
        }

        .dosage-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        .dosage-item:last-child {
          margin-bottom: 0;
        }

        .dosage-icon {
          font-size: 1.2rem;
        }

        .justification-preview {
          background: #e8f5e9;
          border-left: 4px solid #2ecc71;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .justification-preview strong {
          display: block;
          color: #27ae60;
          margin-bottom: 0.5rem;
        }

        .justification-preview p {
          margin: 0;
          color: #555;
          font-size: 0.95rem;
        }

        .view-details-btn {
          width: 100%;
          padding: 0.75rem;
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-details-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }

        .actions-section {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 1rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn.secondary {
          background: #ecf0f1;
          color: #2c3e50;
        }

        .action-btn.primary {
          background: #3498db;
          color: white;
        }

        .action-btn.success {
          background: #2ecc71;
          color: white;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #ecf0f1;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: #bdc3c7;
        }

        .modal-content h2 {
          color: #2c3e50;
          margin-bottom: 1rem;
          padding-right: 2rem;
        }

        .modal-badges {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .modal-section {
          margin-bottom: 2rem;
        }

        .modal-section h3 {
          color: #34495e;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .instructions p {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .dosage-details div {
          padding: 0.5rem 0;
          border-bottom: 1px solid #ecf0f1;
          color: #555;
        }

        .dosage-details div:last-child {
          border-bottom: none;
        }

        .key-points,
        .contraindications {
          list-style: none;
          padding: 0;
        }

        .key-points li,
        .contraindications li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          color: #555;
        }

        .key-points li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #2ecc71;
          font-weight: bold;
        }

        .contraindications li:before {
          content: "⚠";
          position: absolute;
          left: 0;
          color: #e74c3c;
        }

        .modal-section.warning {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 1rem;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .exercises-grid {
            grid-template-columns: 1fr;
          }

          .results-header h1 {
            font-size: 2rem;
          }

          .modal-content {
            padding: 1.5rem;
          }
        }

        @media print {
          .actions-section,
          .view-details-btn {
            display: none;
          }

          .exercise-card {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </Layout>
  );
}
