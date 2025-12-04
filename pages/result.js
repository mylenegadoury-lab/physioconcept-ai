import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Result() {
  const router = useRouter();
  const { data } = router.query;

  if (!data) return (
    <Layout>
      <h1>Programme généré</h1>
      <p>Chargement...</p>
    </Layout>
  );

  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch (e) {
    return (
      <Layout>
        <h1>Programme généré</h1>
        <p>Erreur : données invalides.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Programme généré</h1>

      {parsed.error && (
        <p>Erreur : {parsed.error}</p>
      )}

      {parsed.exercises?.map((ex) => (
        <div key={ex.id} style={{ marginBottom: "20px" }}>
          <h2>{ex.name}</h2>
          <p>{ex.description}</p>
          <p><strong>Dosage:</strong> {ex.dosage}</p>
          <p><strong>Why:</strong> {ex.justification}</p>
        </div>
      ))}
    </Layout>
  );
}
