import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Result() {
  const router = useRouter();
  const data = router.query.data ? JSON.parse(router.query.data) : null;

  if (!data) return <Layout>Chargement...</Layout>;

  return (
    <Layout>
      <h1>Votre programme personnalisé</h1>

      {/* ---- SECTION EXERCICES ---- */}
      <h2>📌 Exercices recommandés</h2>
      {data.exercises?.length > 0 ? (
        data.exercises.map((ex, i) => (
          <div key={i} className="exercise-card">
            <h3>{ex.name}</h3>
            <p>{ex.description}</p>
            {ex.image && <img src={ex.image} alt={ex.name} />}
            {ex.video && (
              <p>
                <a href={ex.video} target="_blank">Voir la vidéo</a>
              </p>
            )}
            <p><strong>Dosage :</strong> {ex.dosage}</p>
            <p><strong>Pourquoi :</strong> {ex.justification}</p>
          </div>
        ))
      ) : (
        <p>Aucun exercice sélectionné.</p>
      )}

      {/* ---- SECTION ÉDUCATION ---- */}
      {data.education && (
        <>
          <h2>📘 Éducation</h2>
          <p>{data.education}</p>
        </>
      )}

      {/* ---- SECTION CONSEILS ---- */}
      {data.advice && (
        <>
          <h2>🎯 Conseils personnalisés</h2>
          <p>{data.advice}</p>
        </>
      )}

      {/* ---- SECTION DRAPEAUX ROUGES ---- */}
      {(data.flags?.redFlags?.length > 0 || data.flags?.yellowFlags?.length > 0) && (
        <>
          <h2>⚠️ Points de vigilance</h2>

          {data.flags.redFlags?.length > 0 && (
            <>
              <h3 style={{ color: "red" }}>Drapeaux rouges</h3>
              <ul>
                {data.flags.redFlags.map((flag, i) => <li key={i}>{flag}</li>)}
              </ul>
            </>
          )}

          {data.flags.yellowFlags?.length > 0 && (
            <>
              <h3 style={{ color: "#c5a000" }}>Drapeaux jaunes</h3>
              <ul>
                {data.flags.yellowFlags.map((flag, i) => <li key={i}>{flag}</li>)}
              </ul>
            </>
          )}
        </>
      )}

    </Layout>
  );
}
