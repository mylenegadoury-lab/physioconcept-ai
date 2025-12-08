import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getEvidenceForCondition, calculateExerciseEfficacy } from "../data/evidence";

export default function ResultWithEvidence() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [evidenceData, setEvidenceData] = useState(null);
  const [activeTab, setActiveTab] = useState("program");

  useEffect(() => {
    if (!router.isReady) return;

    const q = router.query.data;
    if (!q) return;

    try {
      const parsed = typeof q === "string" ? JSON.parse(decodeURIComponent(q)) : q;
      setData(parsed);

      // Charger les données probantes si problématique disponible
      if (parsed.condition) {
        const evidence = getEvidenceForCondition(parsed.condition);
        setEvidenceData(evidence);
      }
    } catch (e) {
      console.error("Erreur parsing:", e);
    }
  }, [router.isReady, router.query.data]);

  if (!data) {
    return (
      <Layout>
        <h1>Programme Personnalisé</h1>
        <p>Chargement...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>📊 Programme Personnalisé - Basé sur les Données Probantes</h1>

      {/* TABS */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === "program" ? "active" : ""}`}
          onClick={() => setActiveTab("program")}
        >
          📋 Programme
        </button>
        <button
          className={`tab ${activeTab === "evidence" ? "active" : ""}`}
          onClick={() => setActiveTab("evidence")}
        >
          📚 Données Probantes
        </button>
        <button
          className={`tab ${activeTab === "research" ? "active" : ""}`}
          onClick={() => setActiveTab("research")}
        >
          🔬 Recherches
        </button>
      </div>

      {/* TAB 1: PROGRAMME */}
      {activeTab === "program" && (
        <>
          {/* DRAPEAUX ROUGES */}
          {data.redFlags && (
            <>
              <h2>⚠️ Évaluation Sécurité</h2>
              {data.redFlags.present ? (
                <div style={{ backgroundColor: "#fee2e2", padding: "16px", borderRadius: "8px" }}>
                  <p style={{ color: "#dc2626", fontWeight: "600" }}>Consultation médicale requise:</p>
                  <ul>
                    {data.redFlags.items.map((flag, i) => (
                      <li key={i} style={{ color: "#991b1b" }}>
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div style={{ backgroundColor: "#dcfce7", padding: "16px", borderRadius: "8px", color: "#166534" }}>
                  ✅ Aucun drapeau rouge détecté
                </div>
              )}
            </>
          )}

          {/* ÉDUCATION */}
          {data.education && (
            <>
              <h2>📘 Éducation du Patient</h2>
              {data.education.understanding && (
                <p>
                  <strong>Comprendre votre condition:</strong> {data.education.understanding}
                </p>
              )}
              {data.education.helpful && (
                <p>
                  <strong>Ce qui aide:</strong> {data.education.helpful}
                </p>
              )}
            </>
          )}

          {/* EXERCICES */}
          <h2>📌 Exercices Recommandés</h2>
          {data.exercises?.length > 0 ? (
            data.exercises.map((ex, i) => {
              const efficacy = calculateExerciseEfficacy(ex.name, data.condition);
              return (
                <div key={i} className="exercise-card-evidence">
                  <div className="exercise-header-evidence">
                    <h3>{ex.name}</h3>
                    {efficacy && (
                      <span className="efficacy-badge" style={{ backgroundColor: `rgba(16, 185, 129, ${efficacy.effectiveness / 100})` }}>
                        {efficacy.effectiveness}% efficacité
                      </span>
                    )}
                  </div>

                  <p>{ex.description}</p>

                  <div className="exercise-details-grid">
                    <div>
                      <strong>📊 Dosage:</strong> {ex.dosage}
                    </div>
                    {efficacy && (
                      <>
                        <div>
                          <strong>📚 Niveau preuve:</strong> {efficacy.evidence}
                        </div>
                        <div>
                          <strong>🎯 Recommandation:</strong> {efficacy.recommendation}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>Aucun exercice généré</p>
          )}
        </>
      )}

      {/* TAB 2: DONNÉES PROBANTES */}
      {activeTab === "evidence" && evidenceData && (
        <>
          <h2>📚 Données Probantes pour {data.condition}</h2>

          <div className="evidence-card">
            <h3>Prévalence & Impact</h3>
            <p>
              <strong>Prévalence:</strong> {evidenceData.prevalence}
            </p>
          </div>

          {evidenceData.guidelines?.length > 0 && (
            <div className="evidence-card">
              <h3>🏥 Guidelines Professionnelles</h3>
              {evidenceData.guidelines.map((guide, i) => (
                <div key={i} className="guideline-item">
                  <p>
                    <strong>{guide.organization}</strong> ({guide.year})
                  </p>
                  <p style={{ marginLeft: "16px", color: "#4b5563" }}>{guide.recommendation}</p>
                </div>
              ))}
            </div>
          )}

          <div className="evidence-card">
            <h3>💡 Recommandations Clés</h3>
            <ul>
              <li>Approche multimodale optimale (ex + éducation + thérapie manuelle)</li>
              <li>Progression graduelle d'intensité</li>
              <li>Continuité = clé du succès</li>
              <li>Suivi régulier et ajustement du programme</li>
            </ul>
          </div>
        </>
      )}

      {/* TAB 3: RECHERCHES */}
      {activeTab === "research" && evidenceData?.keyResearch?.length > 0 && (
        <>
          <h2>🔬 Études Cliniques Clés</h2>

          {evidenceData.keyResearch.map((study, i) => (
            <div key={i} className="research-card">
              <div className="research-header">
                <h3>{study.title}</h3>
                <span className={`evidence-level ${study.evidence.toLowerCase().replace(" ", "-")}`}>
                  {study.evidence}
                </span>
              </div>

              <div className="research-details">
                <p>
                  <strong>Auteur:</strong> {study.author}
                </p>
                <p>
                  <strong>Journal:</strong> {study.journal} ({study.year})
                </p>
                <div className="efficacy-meter">
                  <div className="efficacy-bar" style={{ width: `${study.effectiveness}%` }} />
                  <span>{study.effectiveness}% efficacité</span>
                </div>
              </div>
            </div>
          ))}

          <div className="research-footer">
            <p>📖 Les études montrent que cette approche est scientifiquement validée et recommandée par les organisations internationales.</p>
          </div>
        </>
      )}

      {/* ACTIONS BUTTONS */}
      <div className="action-buttons" style={{ marginTop: "32px" }}>
        <button
          onClick={() =>
            window.location.href = `/library?exercises=${encodeURIComponent(
              JSON.stringify(data.exercises)
            )}`
          }
          className="btn-action"
        >
          📚 Voir Bibliothèque
        </button>
        <button onClick={() => window.history.back()} className="btn-action btn-secondary">
          ← Retour
        </button>
      </div>

      <style jsx>{`
        .tabs-container {
          display: flex;
          gap: 12px;
          margin: 24px 0;
          border-bottom: 2px solid #e5e7eb;
          flex-wrap: wrap;
        }

        .tab {
          padding: 12px 20px;
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          font-weight: 600;
          border-bottom: 3px solid transparent;
          transition: all 0.2s;
        }

        .tab.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }

        .tab:hover {
          color: #3b82f6;
        }

        .exercise-card-evidence {
          padding: 16px;
          margin-bottom: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: #f9fafb;
          transition: all 0.2s;
        }

        .exercise-card-evidence:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .exercise-header-evidence {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .exercise-header-evidence h3 {
          margin: 0;
        }

        .efficacy-badge {
          padding: 6px 12px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: 600;
        }

        .exercise-details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #d1d5db;
        }

        .evidence-card {
          padding: 20px;
          background: #f0f9ff;
          border-left: 4px solid #3b82f6;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .evidence-card h3 {
          margin-top: 0;
          color: #1e40af;
        }

        .guideline-item {
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #d1d5db;
        }

        .guideline-item:last-child {
          border-bottom: none;
        }

        .research-card {
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 16px;
          background: white;
        }

        .research-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .research-header h3 {
          margin: 0;
          flex: 1;
        }

        .evidence-level {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: white;
          white-space: nowrap;
        }

        .evidence-level.level-1a {
          background: #10b981;
        }

        .evidence-level.level-1b {
          background: #14b8a6;
        }

        .evidence-level.level-2 {
          background: #f59e0b;
        }

        .research-details {
          font-size: 14px;
          color: #6b7280;
        }

        .research-details p {
          margin: 8px 0;
        }

        .efficacy-meter {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }

        .efficacy-bar {
          height: 8px;
          background: #3b82f6;
          border-radius: 4px;
          min-width: 100px;
          flex: 1;
        }

        .research-footer {
          padding: 16px;
          background: #e0f2fe;
          border-radius: 8px;
          text-align: center;
          color: #0369a1;
          margin-top: 20px;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-action {
          padding: 12px 24px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-action:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        .btn-action.btn-secondary {
          background: #6b7280;
        }

        .btn-action.btn-secondary:hover {
          background: #4b5563;
        }

        @media (max-width: 768px) {
          .exercise-details-grid {
            grid-template-columns: 1fr;
          }

          .research-header {
            flex-direction: column;
            gap: 8px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn-action {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
}
