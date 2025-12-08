import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function Result() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [parseError, setParseError] = useState(null);
  const [view, setView] = useState('patient');

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
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="radio" name="view" defaultChecked onChange={() => setView('patient')} /> Version patient
        </label>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="radio" name="view" onChange={() => setView('clinician')} /> Version physiothérapeute
        </label>
      </div>

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

            {/* Try common image fields returned by the generator */}
            {(ex.image || ex.imageUrl || ex.mediaUrl || (ex.media && ex.media.image)) && (
              <div style={{ marginTop: "12px" }}>
                <img
                  src={ex.image || ex.imageUrl || ex.mediaUrl || (ex.media && ex.media.image)}
                  alt={ex.name}
                  style={{ maxWidth: "320px", width: "100%", borderRadius: "8px", display: "block", marginTop: "8px" }}
                />
                  {/* Source badge */}
                  <div style={{ marginTop: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
                    {ex.media?.source === "dalle" && (
                      <span style={{ backgroundColor: "#fde68a", padding: "4px 8px", borderRadius: "6px", fontSize: "12px" }}>Image générée par IA</span>
                    )}
                    {ex.media?.source === "pexels" && (
                      <span style={{ backgroundColor: "#d1fae5", padding: "4px 8px", borderRadius: "6px", fontSize: "12px" }}>Image libre (Pexels)</span>
                    )}
                    {ex.media?.source === "unsplash" && (
                      <span style={{ backgroundColor: "#eef2ff", padding: "4px 8px", borderRadius: "6px", fontSize: "12px" }}>Image libre (Unsplash)</span>
                    )}
                    {ex.media?.source === "cache" && (
                      <span style={{ backgroundColor: "#eef2ff", padding: "4px 8px", borderRadius: "6px", fontSize: "12px" }}>Image mise en cache</span>
                    )}
                    {ex.media?.source === "provided" && (
                      <span style={{ backgroundColor: "#f3f4f6", padding: "4px 8px", borderRadius: "6px", fontSize: "12px" }}>Image fournie</span>
                    )}
                  </div>
              </div>
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

            {/* Evidence display: local evidence first, then generated citations */}
            {(ex.evidence || ex.generatedEvidence) && (
              <div style={{ marginTop: "12px", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "8px" }}>
                <strong>Preuves / Références :</strong>
                {ex.evidence && (
                  <div style={{ marginTop: 8 }}>
                    <p style={{ margin: 0 }}><em>Niveau local:</em> {ex.evidence.evidence || ex.evidence.evidenceLevel || ex.evidence.evidenceLevelScore || "N/A"}</p>
                    {ex.evidence.recommendation && <p style={{ margin: 0 }}><strong>Recommandation:</strong> {ex.evidence.recommendation}</p>}
                  </div>
                )}

                {ex.generatedEvidence && ex.generatedEvidence.length > 0 ? (
                  <ul style={{ marginTop: 8 }}>
                    {ex.generatedEvidence.map((c, idx) => (
                      <li key={idx} style={{ marginBottom: 6 }}>
                        <div style={{ fontSize: "14px", fontWeight: 600 }}>{c.title || (c.doi || c.pmid) || "Étude"} <span style={{ fontWeight: 400, marginLeft: 8 }}>({c.year || "n/a"})</span></div>
                        <div style={{ fontSize: "13px", color: "#374151" }}>{c.authors || ""}</div>
                        {c.summary && <div style={{ marginTop: 4 }}>{c.summary}</div>}
                        <div style={{ marginTop: 4 }}>
                          {c.doi && (
                            <a href={`https://doi.org/${c.doi}`} target="_blank" rel="noreferrer">DOI: {c.doi}</a>
                          )}
                          {c.pmid && (
                            <span style={{ marginLeft: 8 }}>
                              <a href={`https://pubmed.ncbi.nlm.nih.gov/${c.pmid}/`} target="_blank" rel="noreferrer">PMID: {c.pmid}</a>
                            </span>
                          )}
                          {c.level && <span style={{ marginLeft: 8, fontStyle: "italic" }}>{c.level}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ex.generatedEvidence && ex.generatedEvidence.length === 0 && (
                    <p style={{ marginTop: 8, fontStyle: "italic" }}>Aucune étude spécifique trouvée par l'assistant IA pour cet exercice.</p>
                  )
                )}
              </div>
            )}

            {/* Instructions: patient or clinician */}
            <div style={{ marginTop: 12 }}>
              {view === 'patient' ? (
                ex.patientInstructions ? (
                  <div style={{ backgroundColor: '#f0fdf4', padding: 12, borderRadius: 8 }}>
                    <strong>Instructions pour le patient :</strong>
                    <div style={{ marginTop: 8 }}>{ex.patientInstructions}</div>
                  </div>
                ) : (
                  <p style={{ fontStyle: 'italic' }}>Pas d'instructions patient disponibles.</p>
                )
              ) : (
                ex.clinicianChecklist ? (
                  <div style={{ backgroundColor: '#f8fafc', padding: 12, borderRadius: 8 }}>
                    <strong>Checklist pour le physiothérapeute :</strong>
                    <ul style={{ marginTop: 8 }}>
                      {Array.isArray(ex.clinicianChecklist) ? ex.clinicianChecklist.map((c, ci) => (
                        <li key={ci}>{c}</li>
                      )) : <li>{ex.clinicianChecklist}</li>}
                    </ul>
                  </div>
                ) : (
                  <p style={{ fontStyle: 'italic' }}>Pas de checklist clinicien disponible.</p>
                )}
            </div>
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
        <div className="action-buttons">
          <button
            onClick={() =>
              window.location.href = `/library?exercises=${encodeURIComponent(
                JSON.stringify(data.exercises)
              )}`
            }
            style={{
              padding: "12px 24px",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              marginRight: "12px",
            }}
          >
            📚 Voir la bibliothèque
          </button>
          <button
            onClick={() => window.history.back()}
            style={{
              padding: "12px 24px",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            ← Retour
          </button>
        </div>
      </div>
    </Layout>
  );
}
