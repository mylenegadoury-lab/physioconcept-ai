import { useState } from "react";
import Layout from "../components/Layout";

export default function OutcomeTracker() {
  const [outcomes, setOutcomes] = useState([
    {
      id: 1,
      patientName: "Jean M.",
      condition: "Lombalgie",
      startDate: "2025-11-08",
      startScore: 8,
      currentScore: 4,
      phase: "Phase 2",
      compliance: 95,
      notes: "Excellente progression, patient motivé",
    },
    {
      id: 2,
      patientName: "Marie D.",
      condition: "Genou",
      startDate: "2025-10-15",
      startScore: 7,
      currentScore: 2,
      phase: "Phase 3",
      compliance: 88,
      notes: "Bon suivi, renforcement progressif efficace",
    },
  ]);

  const [newOutcome, setNewOutcome] = useState({
    patientName: "",
    condition: "Lombalgie",
    startScore: 5,
    currentScore: 5,
  });

  const handleAddOutcome = () => {
    if (!newOutcome.patientName) {
      alert("Veuillez entrer un nom patient");
      return;
    }

    setOutcomes([
      ...outcomes,
      {
        id: outcomes.length + 1,
        ...newOutcome,
        startDate: new Date().toISOString().split("T")[0],
        phase: "Phase 1",
        compliance: 0,
        notes: "",
      },
    ]);

    setNewOutcome({
      patientName: "",
      condition: "Lombalgie",
      startScore: 5,
      currentScore: 5,
    });
  };

  const calculateImprovement = (start, current) => {
    return Math.round(((start - current) / start) * 100);
  };

  return (
    <Layout>
      <h1>📊 Suivi des Outcomes Patients</h1>
      <p style={{ color: "#6b7280" }}>
        Tracker la progression et valider l'efficacité des programmes
      </p>

      {/* NEW OUTCOME FORM */}
      <div className="form-section">
        <h2>➕ Ajouter un Patient</h2>

        <div className="form-group">
          <label>Nom Patient</label>
          <input
            type="text"
            placeholder="Ex: Jean Dupont"
            value={newOutcome.patientName}
            onChange={(e) => setNewOutcome({ ...newOutcome, patientName: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Condition</label>
          <select
            value={newOutcome.condition}
            onChange={(e) => setNewOutcome({ ...newOutcome, condition: e.target.value })}
          >
            <option>Lombalgie</option>
            <option>Genou</option>
            <option>Épaule</option>
            <option>Hanche</option>
            <option>Cheville</option>
            <option>Cou</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Score Initial (0-10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={newOutcome.startScore}
              onChange={(e) => setNewOutcome({ ...newOutcome, startScore: parseInt(e.target.value) })}
            />
          </div>
          <div className="form-group">
            <label>Score Actuel (0-10)</label>
            <input
              type="number"
              min="0"
              max="10"
              value={newOutcome.currentScore}
              onChange={(e) => setNewOutcome({ ...newOutcome, currentScore: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <button onClick={handleAddOutcome} className="btn-add">
          ➕ Ajouter Patient
        </button>
      </div>

      {/* OUTCOMES LIST */}
      <h2>👥 Patients en Suivi</h2>
      <div className="outcomes-grid">
        {outcomes.map((outcome) => {
          const improvement = calculateImprovement(outcome.startScore, outcome.currentScore);
          const color =
            improvement >= 75
              ? "#10b981"
              : improvement >= 50
                ? "#3b82f6"
                : improvement >= 25
                  ? "#f59e0b"
                  : "#ef4444";

          return (
            <div key={outcome.id} className="outcome-card">
              <div className="outcome-header">
                <div>
                  <h3>{outcome.patientName}</h3>
                  <p className="condition">{outcome.condition}</p>
                </div>
                <span className="phase-badge">{outcome.phase}</span>
              </div>

              <div className="outcome-body">
                {/* PROGRESSION */}
                <div className="progression-chart">
                  <div className="score-comparison">
                    <div className="score-item">
                      <span className="score-label">Avant</span>
                      <div className="score-circle" style={{ backgroundColor: "#ef4444" }}>
                        {outcome.startScore}
                      </div>
                    </div>

                    <div className="arrow">→</div>

                    <div className="score-item">
                      <span className="score-label">Maintenant</span>
                      <div className="score-circle" style={{ backgroundColor: "#10b981" }}>
                        {outcome.currentScore}
                      </div>
                    </div>
                  </div>

                  <div className="improvement-bar">
                    <div className="improvement-fill" style={{ width: `${improvement}%`, backgroundColor: color }} />
                  </div>
                  <p className="improvement-text" style={{ color }}>
                    {improvement}% amélioration
                  </p>
                </div>

                {/* COMPLIANCE */}
                <div className="compliance-section">
                  <label>Compliance</label>
                  <div className="compliance-bar">
                    <div
                      className="compliance-fill"
                      style={{
                        width: `${outcome.compliance}%`,
                        backgroundColor:
                          outcome.compliance >= 90
                            ? "#10b981"
                            : outcome.compliance >= 75
                              ? "#3b82f6"
                              : "#f59e0b",
                      }}
                    />
                  </div>
                  <p>{outcome.compliance}%</p>
                </div>

                {/* NOTES */}
                {outcome.notes && (
                  <div className="notes">
                    <p>
                      <strong>Notes:</strong> {outcome.notes}
                    </p>
                  </div>
                )}

                {/* DATE */}
                <p className="date">Depuis: {outcome.startDate}</p>
              </div>

              {/* ACTIONS */}
              <div className="outcome-actions">
                <button className="btn-sm btn-edit">✏️ Éditer</button>
                <button className="btn-sm btn-export">📄 Export</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SUMMARY STATS */}
      <h2>📈 Résumé Global</h2>
      <div className="summary-stats">
        <div className="stat-box">
          <div className="stat-number">{outcomes.length}</div>
          <div className="stat-label">Patients Suivis</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">
            {Math.round(
              outcomes.reduce((acc, o) => acc + calculateImprovement(o.startScore, o.currentScore), 0) /
                outcomes.length
            )}
            %
          </div>
          <div className="stat-label">Amélioration Moyenne</div>
        </div>
        <div className="stat-box">
          <div className="stat-number">
            {Math.round(
              outcomes.reduce((acc, o) => acc + o.compliance, 0) / outcomes.length
            )}
            %
          </div>
          <div className="stat-label">Compliance Moyenne</div>
        </div>
      </div>

      <style jsx>{`
        .form-section {
          background: #f9fafb;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 32px;
          border: 1px solid #e5e7eb;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #374151;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }

        .btn-add {
          width: 100%;
          padding: 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-add:hover {
          background: #2563eb;
        }

        .outcomes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .outcome-card {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s;
        }

        .outcome-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .outcome-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 16px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .outcome-header h3 {
          margin: 0 0 4px 0;
          font-size: 18px;
        }

        .condition {
          margin: 0;
          font-size: 12px;
          color: #6b7280;
        }

        .phase-badge {
          background: #dbeafe;
          color: #1e40af;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .outcome-body {
          padding: 16px;
        }

        .progression-chart {
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .score-comparison {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-bottom: 12px;
        }

        .score-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .score-label {
          font-size: 12px;
          color: #6b7280;
          font-weight: 600;
        }

        .score-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 20px;
        }

        .arrow {
          font-size: 24px;
          color: #d1d5db;
        }

        .improvement-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .improvement-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s;
        }

        .improvement-text {
          margin: 0;
          font-size: 12px;
          font-weight: 600;
          text-align: center;
        }

        .compliance-section {
          margin-bottom: 16px;
        }

        .compliance-section label {
          font-weight: 600;
          font-size: 12px;
          color: #6b7280;
        }

        .compliance-bar {
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
          margin: 4px 0;
        }

        .compliance-fill {
          height: 100%;
          border-radius: 3px;
        }

        .compliance-section p {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: #6b7280;
        }

        .notes {
          padding: 8px;
          background: #fef3c7;
          border-radius: 6px;
          margin-bottom: 12px;
        }

        .notes p {
          margin: 0;
          font-size: 12px;
          color: #78350f;
        }

        .date {
          margin: 0;
          font-size: 11px;
          color: #9ca3af;
        }

        .outcome-actions {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .btn-sm {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-sm:hover {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }

        .stat-box {
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          text-align: center;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .outcomes-grid {
            grid-template-columns: 1fr;
          }

          .score-comparison {
            flex-direction: column;
            gap: 12px;
          }

          .arrow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </Layout>
  );
}
