import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Result() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const q = router.query.data;

    if (!q) return;

    try {
      const parsed =
        typeof q === "string" ? JSON.parse(decodeURIComponent(q)) : q;
      setData(parsed);
    } catch (e) {
      console.error("Erreur parsing:", e);
    }
  }, [router.isReady, router.query.data]);

  if (!data) {
    return (
      <Layout>
        <h1>Programme généré</h1>
        <p>Chargement...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Programme généré</h1>

      {/* 🔥 SECTION DRAPEAUX ROUGES */}
      {data.redFlags && (
        <>
          <h2>⚠️ Drapeaux rouges</h2>

          {data.redFlags.present ? (
            <>
              <ul>
                {data.redFlags.items.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
              {data.redFlags.recommendation && (
                <p><strong>Recommandation :</strong> {data.redFlags.recommendation}</p>
              )}
            </>
          ) : (
            <p>Aucun drapeau rouge détecté.</p>
          )}
        </>
      )}

      {/* 🔥 SECTION ÉDUCATION */}
      {data.education && (
        <>
          <h2>📘 Éducation</h2>

          {data.education.understanding && (
            <p><strong>Comprendre :</strong> {data.education.understanding}</p>
          )}

          {data.education.meaning && (
            <p><strong>Signification :</strong> {data.education.meaning}</p>
          )}

          {data.education.helpful && (
            <p><strong>Ce qui aide :</strong> {data.education.helpful}</p>
          )}

          {data.education.avoid && (
            <p><strong>À éviter :</strong> {data.education.avoid}</p>
          )}

          {data.education.progression && (
            <p><strong>Progression :</strong> {data.education.progression}</p>
          )}
        </>
      )}

      {/* 🔥 SECTION EXERCICES */}
      <h2>📌 Exercices recommandés</h2>

      {data.exercises?.length > 0 ? (
        data.exercises.map((ex, idx) => (
          <div key={idx} style={{ marginBottom: "24px" }}>
            <h3>{ex.name}</h3>
            <p>{ex.description}</p>

            {ex.dosage && (
              <p><strong>Dosage :</strong> {ex.dosage}</p>
            )}

            {ex.justification && (
              <p><strong>Pourquoi :</strong> {ex.justification}</p>
            )}

            {ex.imagePrompt && (
              <p><strong>Image suggérée :</strong> {ex.imagePrompt}</p>
            )}

            {ex.videoPrompt && (
              <p><strong>Vidéo suggérée :</strong> {ex.videoPrompt}</p>
            )}
          </div>
        ))
      ) : (
        <p>Aucun exercice généré.</p>
      )}
    </Layout>
  );
}
