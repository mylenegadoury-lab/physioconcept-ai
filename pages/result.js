import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Result() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [parseError, setParseError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query.data;

    if (!q) return;

    try {
      if (typeof q === "string") {
        setData(JSON.parse(q));
      } else {
        setData(q);
      }
    } catch (e) {
      console.error("Erreur de parsing JSON:", e);
      setParseError("Impossible de lire les données du programme.");
    }
  }, [router.isReady, router.query.data]);

  if (parseError) {
    return (
      <Layout>
        <h1>Votre programme personnalisé</h1>
        <p>{parseError}</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <h1>Votre programme personnalisé</h1>
        <p>Chargement...</p>
      </Layout>
    );
  }

  const hasRedFlags =
    data.redFlags && data.redFlags.present && Array.isArray(data.redFlags.items);

  return (
    <Layout>
      <h1>Votre programme personnalisé</h1>

      {/* ---- SECTION DRAPEAUX ROUGES ---- */}
      {data.redFlags && (
        <>
          <h2>⚠️ Drapeaux rouges</h2>

          {hasRedFlags ? (
            <>
              <ul>
                {data.redFlags.items.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              {data.redFlags.recommendation && (
                <p>
                  <strong>Recommandation :</strong> {data.redFlags.recommendation}
                </p>
              )}
            </>
          ) : (
            <p>Aucun drapeau rouge inquiétant détecté selon vos réponses.</p>
          )}
        </>
      )}

      {/* ---- SECTION ÉDUCATION ---- */}
      {data.education && (
        <>
          <h2>📘 Éducation</h2>
          {data.education.understanding && (
            <p>
              <strong>Comprendre ce que vous vivez :</strong>{" "}
              {data.education.understanding}
            </p>
          )}
          {data.education.meaning && (
            <p>
              <strong>Ce que cela signifie :</strong> {data.education.meaning}
            </p>
          )}
          {data.education.helpful && (
            <p>
              <strong>Ce qui aide :</strong> {data.education.helpful}
            </p>
          )}
          {data.education.avoid && (
            <p>
              <strong>À éviter :</strong> {data.education.avoid}
            </p>
          )}
          {data.education.progression && (
            <p>
              <strong>Progression attendue :</strong>{" "}
              {data.education.progression}
            </p>
          )}
        </>
      )}

      {/* SECTION PLAN */}
      {data.plan && (
        <>
          <h2>📅 Plan de traitement</h2>
          {data.plan.phase && (
            <p>
              <strong>Phase:</strong> {data.plan.phase}
            </p>
          )}
          {data.plan.duration && (
            <p>
              <strong>Durée:</strong> {data.plan.duration}
            </p>
          )}
          {data.plan.frequency && (
            <p>
              <strong>Fréquence:</strong> {data.plan.frequency}
            </p>
          )}
        </>
      )}

      {/* ---- SECTION EXERCICES ---- */}
      <h2>📌 Exercices recommandés</h2>
      {data.exercises?.length > 0 ? (
        data.exercises.map((ex, i) => (
          <div
            key={i}
            className="exercise-card"
            style={{ marginBottom: "24px" }}
          >
            <h3>{ex.name}</h3>
            <p>{ex.description}</p>

            {ex.dosage && (
              <p>
                <strong>Dosage :</strong> {ex.dosage}
              </p>
            )}
            {ex.justification && (
              <p>
                <strong>Pourquoi :</strong> {ex.justification}
              </p>
            )}

            {ex.imagePrompt && (
              <p>
                <strong>Idée d’illustration :</strong> {ex.imagePrompt}
              </p>
            )}
            {ex.videoPrompt && (
              <p>
                <strong>Idée de vidéo :</strong> {ex.videoPrompt}
              </p>
            )}
          </div>
        ))
      ) : (
        <p>Aucun exercice généré.</p>
      )}

      {/* BOUTONS D'ACTION */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => window.print()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          🖨️ Imprimer
        </button>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#e5e7eb",
            color: "#1f2937",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Retour
        </button>
      </div>
    </Layout>
  );
}
