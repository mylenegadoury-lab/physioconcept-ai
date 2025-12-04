import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const { program } = router.query;

  let parsedProgram = null;

  try {
    if (program) parsedProgram = JSON.parse(program);
  } catch (e) {
    console.error("Erreur parsing:", e);
  }

  if (!parsedProgram) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Programme généré</h1>
        <p>Aucun programme reçu.</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Programme généré</h1>

      {/* 🔹 BLOC ÉDUCATION */}
      {parsedProgram.education && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-2">Éducation</h2>
          <p>{parsedProgram.education}</p>
        </section>
      )}

      {/* 🔹 BLOC EXERCICES */}
      <section>
        <h2 className="text-xl font-bold mb-4">Exercices</h2>

        {Array.isArray(parsedProgram.exercises) &&
          parsedProgram.exercises.map((ex, i) => (
            <div
              key={i}
              className="border rounded-lg shadow p-4 mb-6 bg-white"
            >
              <h3 className="text-lg font-semibold">{ex.name}</h3>

              {ex.image && (
                <img
                  src={ex.image}
                  alt={ex.name}
                  className="w-48 mt-2 rounded"
                />
              )}

              {ex.video && (
                <a
                  href={ex.video}
                  className="text-blue-600 underline block mt-2"
                  target="_blank"
                >
                  Vidéo
                </a>
              )}

              <p className="mt-2 text-gray-700">{ex.description}</p>

              {ex.dosage && (
                <p className="mt-2"><strong>Dosage :</strong> {ex.dosage}</p>
              )}

              {ex.justification && (
                <p className="mt-2 text-gray-600">
                  <strong>Pourquoi :</strong> {ex.justification}
                </p>
              )}
            </div>
          ))}
      </section>
    </div>
  );
}
