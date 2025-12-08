import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { problematiques } from "../data/problematiques";

export default function Formulaire() {
  const router = useRouter();
  const { problematique: probId } = router.query;

  const [selectedProblematique, setSelectedProblematique] = useState(null);
  const [form, setForm] = useState({
    language: "fr",
    patientName: "",
    patientAge: "",
    painIntensity: "",
    painDuration: "",
    painLocation: "",
    movementRestriction: "",
    fearLevel: "",
    treatmentHistory: "",
    comorbidities: "",
    objectif: "",
  });
  const [loading, setLoading] = useState(false);

  // Charger la problématique sélectionnée
  useEffect(() => {
    if (probId) {
      const prob = problematiques.find((p) => p.id === probId);
      setSelectedProblematique(prob);
      setForm((prev) => ({ ...prev, problematique: probId }));
    }
  }, [probId]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Erreur: ${error.error}`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      window.location.href = `/result?data=${encodeURIComponent(
        JSON.stringify(data)
      )}`;
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur de connexion");
      setLoading(false);
    }
  }

  if (!selectedProblematique) {
    return (
      <Layout>
        <p>Chargement...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <button
        onClick={() => router.push("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          backgroundColor: "#e5e7eb",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        ← Retour
      </button>

      <h1>
        {selectedProblematique.icon} Évaluation - {selectedProblematique.name}
      </h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        {selectedProblematique.description}
      </p>

      <form onSubmit={handleSubmit} className="form">
        {/* INFOS PATIENT */}
        <h2>👤 Informations du patient</h2>

        <label>Nom du patient:</label>
        <input
          type="text"
          value={form.patientName}
          onChange={(e) => updateField("patientName", e.target.value)}
          placeholder="Nom (optionnel)"
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        <label>Âge:</label>
        <input
          type="number"
          value={form.patientAge}
          onChange={(e) => updateField("patientAge", e.target.value)}
          placeholder="Âge"
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        {/* ÉVALUATION DOULEUR */}
        <h2>🔴 Évaluation de la douleur</h2>

        <label>Intensité (0-10):</label>
        <input
          type="range"
          min="0"
          max="10"
          value={form.painIntensity}
          onChange={(e) => updateField("painIntensity", e.target.value)}
          style={{ width: "100%", marginTop: "8px" }}
        />
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          {form.painIntensity}/10
        </p>

        <label>Durée des symptômes:</label>
        <select
          value={form.painDuration}
          onChange={(e) => updateField("painDuration", e.target.value)}
        >
          <option value="">--Choisir--</option>
          <option value="acute">Moins de 6 semaines (aigü)</option>
          <option value="subacute">6 à 12 semaines (subaigu)</option>
          <option value="chronic">Plus de 3 mois (chronique)</option>
        </select>

        <label>Localisation de la douleur:</label>
        <input
          type="text"
          value={form.painLocation}
          onChange={(e) => updateField("painLocation", e.target.value)}
          placeholder="Ex: Douleur antérieure du genou"
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        {/* LIMITATION FONCTIONNELLE */}
        <h2>🚫 Limitations fonctionnelles</h2>

        <label>Restriction de mouvement:</label>
        <select
          value={form.movementRestriction}
          onChange={(e) => updateField("movementRestriction", e.target.value)}
        >
          <option value="">--Choisir--</option>
          <option value="minimal">Minimale</option>
          <option value="moderate">Modérée</option>
          <option value="severe">Sévère</option>
        </select>

        <label>Niveau d'appréhension (peur du mouvement):</label>
        <select
          value={form.fearLevel}
          onChange={(e) => updateField("fearLevel", e.target.value)}
        >
          <option value="">--Choisir--</option>
          <option value="low">Faible</option>
          <option value="moderate">Modéré</option>
          <option value="high">Élevé</option>
        </select>

        {/* ANTÉCÉDENTS */}
        <h2>📋 Antécédents</h2>

        <label>Traitements antérieurs:</label>
        <textarea
          value={form.treatmentHistory}
          onChange={(e) => updateField("treatmentHistory", e.target.value)}
          placeholder="Ex: Physiothérapie, infiltrations, etc."
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "16px",
            minHeight: "80px",
          }}
        />

        <label>Comorbidités:</label>
        <input
          type="text"
          value={form.comorbidities}
          onChange={(e) => updateField("comorbidities", e.target.value)}
          placeholder="Ex: Diabète, hypertension, etc."
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />

        {/* OBJECTIF */}
        <h2>🎯 Objectif du traitement</h2>

        <label>Objectif principal:</label>
        <textarea
          value={form.objectif}
          onChange={(e) => updateField("objectif", e.target.value)}
          placeholder="Ex: Réduire la douleur, reprendre le sport, améliorer la mobilité"
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "16px",
            minHeight: "80px",
          }}
        />

        {/* SUBMIT */}
        <button type="submit" disabled={loading}>
          {loading ? "Génération en cours..." : "Générer le programme"}
        </button>
      </form>
    </Layout>
  );
}
