/**
 * PAGE PRINCIPALE ÉVALUATION
 * Choix entre version patient et version professionnelle
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import PatientAssessmentForm from '../components/forms/PatientAssessmentForm';
import ProfessionalAssessmentForm from '../components/forms/ProfessionalAssessmentForm';

export default function Assessment() {
  const [mode, setMode] = useState(null); // 'patient' or 'professional'
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAssessmentComplete = async (patientProfile) => {
    setLoading(true);
    
    try {
      // Call API to select exercises
      const response = await fetch('/api/select-exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientProfile }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sélection des exercices');
      }

      const data = await response.json();
      
      // Store results and navigate
      sessionStorage.setItem('selectedExercises', JSON.stringify(data.selectedExercises));
      sessionStorage.setItem('justifications', JSON.stringify(data.justifications));
      sessionStorage.setItem('patientProfile', JSON.stringify(patientProfile));
      
      // Navigate to results
      router.push('/exercise-results');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Sélection de vos exercices personnalisés...</h2>
          <p>Analyse de votre profil clinique en cours</p>
          
          <style jsx>{`
            .loading-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 60vh;
              text-align: center;
            }
            
            .loading-spinner {
              width: 60px;
              height: 60px;
              border: 5px solid #f3f3f3;
              border-top: 5px solid #3498db;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              margin-bottom: 2rem;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            h2 {
              color: #2c3e50;
              margin-bottom: 0.5rem;
            }
            
            p {
              color: #7f8c8d;
            }
          `}</style>
        </div>
      </Layout>
    );
  }

  if (!mode) {
    return (
      <Layout>
        <div className="mode-selection">
          <div className="selection-header">
            <h1>Évaluation de votre douleur au dos</h1>
            <p className="subtitle">
              Choisissez le type d'évaluation adapté à vos besoins
            </p>
          </div>

          <div className="mode-cards">
            <div className="mode-card patient-card" onClick={() => setMode('patient')}>
              <div className="card-icon">🏠</div>
              <h2>Je suis un patient</h2>
              <p className="card-description">
                Formulaire simplifié et facile à comprendre pour obtenir rapidement 
                un programme d'exercices personnalisé
              </p>
              <ul className="card-features">
                <li>✅ Questions simples et visuelles</li>
                <li>✅ 10-15 minutes à compléter</li>
                <li>✅ Langage accessible</li>
                <li>✅ Programme immédiat</li>
              </ul>
              <button className="select-button">
                Commencer l'évaluation
              </button>
            </div>

            <div className="mode-card professional-card" onClick={() => setMode('professional')}>
              <div className="card-icon">🩺</div>
              <h2>Je suis un professionnel</h2>
              <p className="card-description">
                Évaluation clinique complète avec scoring ODI, STarT Back, TBC 
                et raisonnement diagnostique détaillé
              </p>
              <ul className="card-features">
                <li>✅ Outils validés (ODI, STarT Back, TBC)</li>
                <li>✅ Red flags et screening neurologique</li>
                <li>✅ Scoring clinique automatique</li>
                <li>✅ Classification evidence-based</li>
              </ul>
              <button className="select-button">
                Évaluation professionnelle
              </button>
            </div>
          </div>

          <div className="info-section">
            <h3>🔒 Vos données sont sécurisées</h3>
            <p>
              Cette évaluation est confidentielle. Aucune donnée personnelle n'est conservée 
              sans votre consentement. Les résultats sont générés localement et ne sont pas partagés.
            </p>
          </div>
        </div>

        <style jsx>{`
          .mode-selection {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }

          .selection-header {
            text-align: center;
            margin-bottom: 3rem;
          }

          .selection-header h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 1rem;
          }

          .subtitle {
            font-size: 1.2rem;
            color: #7f8c8d;
          }

          .mode-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }

          .mode-card {
            background: white;
            border-radius: 12px;
            padding: 2.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.3s;
            border: 3px solid transparent;
          }

          .mode-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
          }

          .patient-card:hover {
            border-color: #3498db;
          }

          .professional-card:hover {
            border-color: #2ecc71;
          }

          .card-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }

          .mode-card h2 {
            font-size: 1.8rem;
            color: #2c3e50;
            margin-bottom: 1rem;
          }

          .card-description {
            color: #555;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .card-features {
            list-style: none;
            padding: 0;
            margin: 1.5rem 0;
          }

          .card-features li {
            padding: 0.5rem 0;
            color: #555;
            font-size: 1rem;
          }

          .select-button {
            width: 100%;
            padding: 1rem;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 1rem;
          }

          .patient-card .select-button {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
          }

          .professional-card .select-button {
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
          }

          .select-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          .info-section {
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 1.5rem;
            border-radius: 4px;
            text-align: center;
          }

          .info-section h3 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
          }

          .info-section p {
            color: #555;
            line-height: 1.6;
            margin: 0;
          }

          @media (max-width: 768px) {
            .mode-cards {
              grid-template-columns: 1fr;
            }

            .selection-header h1 {
              font-size: 2rem;
            }

            .mode-card {
              padding: 1.5rem;
            }
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="assessment-container">
        <button 
          className="back-button"
          onClick={() => setMode(null)}
        >
          ← Changer de mode
        </button>
        
        {mode === 'patient' ? (
          <PatientAssessmentForm onComplete={handleAssessmentComplete} />
        ) : (
          <ProfessionalAssessmentForm onComplete={handleAssessmentComplete} />
        )}
      </div>

      <style jsx>{`
        .assessment-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .back-button {
          padding: 0.75rem 1.5rem;
          background: #ecf0f1;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: 2rem;
          transition: all 0.2s;
        }

        .back-button:hover {
          background: #bdc3c7;
          transform: translateX(-4px);
        }
      `}</style>
    </Layout>
  );
}
