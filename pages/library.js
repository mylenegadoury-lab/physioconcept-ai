import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function ExerciseLibrary() {
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const q = router.query.exercises;
    if (!q) return;

    try {
      const parsed = typeof q === "string" ? JSON.parse(decodeURIComponent(q)) : q;
      setExercises(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      console.error("Erreur parsing:", e);
    }
  }, [router.isReady, router.query.exercises]);

  const handleGenerateMedia = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercises, generateImages: false }),
      });

      if (!res.ok) throw new Error("Erreur génération média");

      const data = await res.json();
      setExercises(data.exercises);
      alert("✅ Médias générés avec succès!");
    } catch (error) {
      console.error("Erreur:", error);
      alert("❌ Erreur génération média");
    } finally {
      setGenerating(false);
    }
  };

  const downloadPDF = async () => {
    // Simple text export - ou intégrer une vraie librairie PDF
    const content = exercises
      .map(
        (ex) => `
EXERCICE: ${ex.name}
Description: ${ex.description}
Dosage: ${ex.dosage}
Difficulté: ${ex.difficulty}
YouTube: ${ex.media?.youtube || "N/A"}
Video Script: ${JSON.stringify(ex.media?.videoScript, null, 2)}
---`
      )
      .join("\n");

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    element.setAttribute("download", "exercise_program.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!exercises.length) {
    return (
      <Layout>
        <h1>📚 Bibliothèque d'exercices</h1>
        <p>Aucun exercice trouvé. Veuillez générer un programme d'abord.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>📚 Bibliothèque d'exercices personnalisée</h1>

      <div className="library-controls">
        <button
          onClick={handleGenerateMedia}
          disabled={generating}
          className="btn-primary"
        >
          {generating ? "⏳ Génération en cours..." : "🎬 Générer Vidéos"}
        </button>
        <button onClick={downloadPDF} className="btn-secondary">
          📄 Télécharger en PDF
        </button>
      </div>

      <div className="exercises-grid">
        {exercises.map((exercise, idx) => (
          <div
            key={idx}
            className="exercise-item"
            onClick={() => setSelectedExercise(selectedExercise === idx ? null : idx)}
          >
            <div className="exercise-header">
              <h3>{exercise.name}</h3>
              <span className="difficulty-badge">{exercise.difficulty}</span>
            </div>

            {exercise.media?.image && (
              <img src={exercise.media.image} alt={exercise.name} className="exercise-image" />
            )}

            <p className="exercise-desc">{exercise.description}</p>

            {selectedExercise === idx && (
              <div className="exercise-details">
                <p>
                  <strong>📊 Dosage:</strong> {exercise.dosage}
                </p>

                {exercise.safetyTips && (
                  <p>
                    <strong>⚠️ Sécurité:</strong> {exercise.safetyTips}
                  </p>
                )}

                {exercise.benefits && (
                  <p>
                    <strong>✨ Bénéfices:</strong> {exercise.benefits}
                  </p>
                )}

                {exercise.media?.youtube && (
                  <a
                    href={exercise.media.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-youtube"
                  >
                    🎥 Voir sur YouTube
                  </a>
                )}

                {exercise.media?.videoScript && (
                  <details className="video-script">
                    <summary>📝 Script vidéo</summary>
                    <pre>{JSON.stringify(exercise.media.videoScript, null, 2)}</pre>
                  </details>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .library-controls {
          display: flex;
          gap: 12px;
          margin: 20px 0;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: #10b981;
          color: white;
        }

        .btn-secondary:hover {
          background: #059669;
          transform: translateY(-2px);
        }

        .btn-youtube {
          display: inline-block;
          margin-top: 12px;
          padding: 10px 16px;
          background: #ff0000;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-youtube:hover {
          background: #cc0000;
        }

        .exercises-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
          margin: 24px 0;
        }

        .exercise-item {
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          background: #f9fafb;
          cursor: pointer;
          transition: all 0.2s;
        }

        .exercise-item:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
          transform: translateY(-4px);
        }

        .exercise-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 12px;
        }

        .exercise-header h3 {
          margin: 0;
          font-size: 18px;
        }

        .difficulty-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #fbbf24;
          color: #78350f;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .exercise-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 12px;
          background: #e5e7eb;
        }

        .exercise-desc {
          margin: 12px 0;
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
        }

        .exercise-details {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #d1d5db;
          animation: slideDown 0.3s ease;
        }

        .exercise-details p {
          margin: 8px 0;
          font-size: 14px;
        }

        .video-script {
          margin-top: 12px;
          padding: 12px;
          background: #f3f4f6;
          border-radius: 6px;
        }

        .video-script summary {
          cursor: pointer;
          font-weight: 600;
          color: #3b82f6;
        }

        .video-script pre {
          margin-top: 12px;
          padding: 12px;
          background: white;
          border-radius: 4px;
          overflow-x: auto;
          font-size: 12px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .exercises-grid {
            grid-template-columns: 1fr;
          }

          .library-controls {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
}
