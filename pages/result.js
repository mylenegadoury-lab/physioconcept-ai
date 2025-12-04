import Layout from "../components/Layout";

export default function ResultPage({ program, error }) {
  return (
    <Layout>
      <h1>Programme généré</h1>

      {error && (
        <p style={{ color: "red" }}>
          Erreur: {error}
        </p>
      )}

      {!error && program && (
        <>
          <h2>Exercices</h2>

          {program.exercises && program.exercises.length > 0 ? (
            <ul>
              {program.exercises.map((ex) => (
                <li key={ex.id} style={{ marginBottom: "20px" }}>
                  <h3>{ex.name}</h3>
                  <p>{ex.description}</p>
                  <p><strong>Dosage :</strong> {ex.dosage}</p>
                  <p><strong>Justification :</strong> {ex.justification}</p>

                  {ex.image && (
                    <img 
                      src={ex.image} 
                      alt={ex.name} 
                      style={{ width: "200px", borderRadius: "8px" }} 
                    />
                  )}

                  {ex.video && (
                    <p>
                      <a href={ex.video} target="_blank">Vidéo</a>
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun exercice généré.</p>
          )}
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const { data } = query;

  if (!data) {
    return { props: { program: null, error: "Aucune donnée reçue." } };
  }

  try {
    const parsed = JSON.parse(data);
    return { props: { program: parsed.program, error: null } };
  } catch (err) {
    return { props: { program: null, error: "Impossible de lire le programme." } };
  }
}
