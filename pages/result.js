import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Result() {
  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data) : null;

  if (!data) return <Layout>Chargement...</Layout>;

  return (
    <Layout>
      <h1>Votre programme personnalisé</h1>

      {/* ---- SECTION DRAPEAUX ROUGES ---- */}
      {data.redFlags && (
        <>
          <h2>⚠️ Drapeaux rouges</h2>

          {data.redFlags.present ? (
            <>
              <ul>
                {data.redFlags.items.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <p><strong>Recommandation :</strong> {data.redFlags.recommendation}</p>
            </>
          ) : (
            <p>Aucun drapeau rouge détecté.</p>
          )}
        </>
      )}

      {/* ---- SECTION ÉDUCATION ---- */}
      {data.education && (
        <>
          <h2>📘 Éducation</h2>
          <p><strong>Comprendre ce que vous vivez :</strong> {data.education.understanding}</p>
          <p><strong>Ce que cela signifie :</strong> {data.education.meaning}</p>
          <p><strong>Ce qui aide :</strong> {data.education.helpful}</p>
          <p><strong>À éviter :</strong> {data.education.avoid}</p>
          <p><strong>Progression attendue :</strong> {data.education.progression}</p>
        </>
      )}

      {/* ---- SECTION EXERCICES ---- */}
      <h2>📌 Exercices recommandés</h2>
      {data.exercises?.length > 0 ? (
        data.exercises.map((ex, i) => (
          <div key={i} className="exercise-card">
            <h3>{ex.name}</h3>
            <p>{ex.description}</p>

            {/* affichage prompts pour images/vidéos IA */}
            <p><strong>Image suggérée :</strong> {ex.imagePrompt}</p>
            <p><strong>Vidéo suggérée :</strong> {ex.videoPrompt}</p>

            <p><strong>Dosage :</strong> {ex.dosage}</p>
            <p><strong>Justification :</strong> {ex.justification}</p>
          </div>
        ))
      ) : (
        <p>Aucun exercice généré.</p>
      )}
    </Layout>
  );
}
