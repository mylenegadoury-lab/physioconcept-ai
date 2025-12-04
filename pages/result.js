import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Result() {
  const router = useRouter();
  const data = JSON.parse(router.query.data || "{}");

  return (
    <Layout>
      <h1>Programme généré</h1>

      {data.error && <p>Erreur: {data.error}</p>}

      {data.exercises && data.exercises.map((ex, i) => (
        <div key={i} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <h3>{ex.name}</h3>
          <p><strong>Raison clinique :</strong> {ex.reason}</p>
          <p><strong>Instructions :</strong> {ex.instructions}</p>
          <p><strong>Progression :</strong> {ex.progression}</p>
          <p><strong>Séries/Répétitions :</strong> {ex.reps_sets}</p>
        </div>
      ))}

      <h3>Éducation</h3>
      <p>{data.education}</p>
    </Layout>
  );
}
