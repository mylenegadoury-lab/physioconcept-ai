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
    patientSex: "",
    patientActivities: "",
    painIntensity: 5,
    painDuration: "",
    painLocation: "",
    painType: "",
    painTriggers: "",
    painRelief: "",
    movementRestriction: "",
    functionalLevel: "",
    affectedActivities: [],
    fearLevel: 5,
    treatmentHistory: "",
    comorbidities: "",
    surgicalHistory: "",
    medications: "",
    palpationFindings: "",
    rangeOfMotion: "",
    strength: "",
    objectif: "",
  });
  const [loading, setLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState("patient");

  // Charger la problématique sélectionnée
  useEffect(() => {
    if (probId) {
      const prob = problematiques.find((p) => p.id === probId);
      setSelectedProblematique(prob);
    }
  }, [probId]);

  // Mettre à jour problematique dans le formulaire
  useEffect(() => {
    if (selectedProblematique) {
      setForm((prev) => ({ ...prev, problematique: selectedProblematique.id }));
    }
  }, [selectedProblematique]);

  function updateField(field, value) {
    // Forcer le type string pour les champs texte
    const textFields = [
      "patientName", "patientSex", "patientActivities", "painDuration", "painLocation", "painType", "painTriggers", "painRelief", "movementRestriction", "functionalLevel", "treatmentHistory", "comorbidities", "surgicalHistory", "medications", "palpationFindings", "rangeOfMotion", "strength", "objectif"
    ];
    if (textFields.includes(field)) {
      setForm((prev) => ({ ...prev, [field]: value.toString() }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  }

  function toggleActivity(activity) {
    const newActivities = form.affectedActivities.includes(activity)
      ? form.affectedActivities.filter((a) => a !== activity)
      : [...form.affectedActivities, activity];
    setForm((prev) => ({ ...prev, affectedActivities: newActivities }));
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

  const Section = ({ id, icon, title, children }) => (
    <div style={{ marginBottom: "24px", border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
      <button
        type="button"
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
        style={{
          width: "100%",
          padding: "16px",
          backgroundColor: expandedSection === id ? "#eff6ff" : "#f9fafb",
          border: "none",
          borderBottom: expandedSection === id ? "2px solid #3b82f6" : "none",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "16px",
          fontWeight: "600",
          color: "#1f2937",
        }}
      >
        <span>{icon}</span>
        {title}
        <span style={{ marginLeft: "auto" }}>{expandedSection === id ? "▼" : "▶"}</span>
      </button>
      {expandedSection === id && (
        <div style={{ padding: "20px", borderTop: "1px solid #e5e7eb" }}>
          {children}
        </div>
      )}
    </div>
  );

  const FieldGroup = ({ label, help, children }) => (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontWeight: "500", marginBottom: "6px" }}>
        {label}
      </label>
      {help && <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px", fontStyle: "italic" }}>{help}</p>}
      {children}
    </div>
  );

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

      <h1 style={{ marginBottom: "8px" }}>
        {selectedProblematique.icon} {selectedProblematique.name}
      </h1>
      <p style={{ color: "#666", marginBottom: "24px", fontSize: "14px" }}>
        {selectedProblematique.description}
      </p>

      <form onSubmit={handleSubmit} className="form">
        {/* PATIENT */}
        <Section id="patient" icon="👤" title="Informations du patient">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <FieldGroup label="Nom" help="Optionnel">
              <input
                type="text"
                value={form.patientName}
                onChange={(e) => updateField("patientName", e.target.value)}
                placeholder="Nom complet"
                style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
              />
            </FieldGroup>
            <FieldGroup label="Âge" help="En années">
              <input
                type="number"
                value={form.patientAge === null ? "" : form.patientAge}
                onChange={(e) => updateField("patientAge", e.target.value === "" ? "" : e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Âge"
                style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
              />
            </FieldGroup>
          </div>
          <FieldGroup label="Sexe">
            <select
              value={form.patientSex}
              onChange={(e) => updateField("patientSex", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px", cursor: "pointer" }}
            >
              <option value="">--Choisir--</option>
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
              <option value="Autre">Autre</option>
            </select>
          </FieldGroup>
          <FieldGroup label="Activités principales" help="Ex: Bureau, sports, travaux manuels">
            <input
              type="text"
              value={form.patientActivities}
              onChange={(e) => updateField("patientActivities", e.target.value)}
              placeholder="Occupation, loisirs"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
            />
          </FieldGroup>
        </Section>

        {/* PAIN */}
        <Section id="pain" icon="🔴" title="Évaluation de la douleur">
          <FieldGroup label="Intensité actuelle" help="0 = Pas de douleur | 10 = Insupportable">
            <input
              type="range"
              min="0"
              max="10"
              value={typeof form.painIntensity === "number" ? form.painIntensity : Number(form.painIntensity)}
              onChange={(e) => updateField("painIntensity", Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: form.painIntensity > 6 ? "#dc2626" : form.painIntensity > 3 ? "#f59e0b" : "#10b981" }}>
              {form.painIntensity}/10
            </p>
          </FieldGroup>

          <FieldGroup label="Durée" help="Évolution temporelle">
            <select
              value={form.painDuration}
              onChange={(e) => updateField("painDuration", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px", cursor: "pointer" }}
            >
              <option value="">--Choisir--</option>
              <option value="acute">&lt; 6 semaines (aigü)</option>
              <option value="subacute">6-12 semaines (subaigu)</option>
              <option value="chronic">&gt; 3 mois (chronique)</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Localisation" help="Zone précise de la douleur">
            <input
              type="text"
              value={form.painLocation}
              onChange={(e) => updateField("painLocation", e.target.value)}
              placeholder="Ex: Lombaire basse droite"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
            />
          </FieldGroup>

          <FieldGroup label="Type de douleur">
            <select
              value={form.painType}
              onChange={(e) => updateField("painType", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px", cursor: "pointer" }}
            >
              <option value="">--Choisir--</option>
              <option value="sharp">Aiguë/Piqûre</option>
              <option value="dull">Sourde/Fatigue</option>
              <option value="burning">Brûlante</option>
              <option value="radiating">Irradiante</option>
              <option value="throbbing">Pulsatile</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Facteurs aggravants" help="Mouvements/activités qui augmentent la douleur">
            <input
              type="text"
              value={form.painTriggers}
              onChange={(e) => updateField("painTriggers", e.target.value)}
              placeholder="Ex: Flexion, torsion, marche prolongée"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
            />
          </FieldGroup>

          <FieldGroup label="Facteurs soulagants" help="Ce qui améliore la douleur">
            <input
              type="text"
              value={form.painRelief}
              onChange={(e) => updateField("painRelief", e.target.value)}
              placeholder="Ex: Repos, glace, position allongée"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
            />
          </FieldGroup>
        </Section>

        {/* FUNCTIONAL */}
        <Section id="functional" icon="🚫" title="Limitations fonctionnelles">
          <FieldGroup label="Restriction de mouvement" help="Étendue générale">
            <select
              value={form.movementRestriction}
              onChange={(e) => updateField("movementRestriction", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px", cursor: "pointer" }}
            >
              <option value="">--Choisir--</option>
              <option value="minimal">Minimale (&lt; 25%)</option>
              <option value="moderate">Modérée (25-50%)</option>
              <option value="severe">Sévère (&gt; 50%)</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Niveau fonctionnel" help="Capacité AVQ">
            <select
              value={form.functionalLevel}
              onChange={(e) => updateField("functionalLevel", e.target.value)}
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px", cursor: "pointer" }}
            >
              <option value="">--Choisir--</option>
              <option value="independent">Indépendant</option>
              <option value="modified">Modifié (adaptations)</option>
              <option value="dependent">Dépendant (aide requise)</option>
              <option value="disabled">Incapacité</option>
            </select>
          </FieldGroup>

          <FieldGroup label="Activités affectées" help="Cocher tous les cas affectés">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
              {["Marche", "Escaliers", "Levage", "Assise prolongée", "Debout prolongé", "Sport", "Sommeil", "Travail", "Ménage", "Conduite"].map((act) => (
                <label key={act} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={form.affectedActivities.includes(act)}
                    onChange={() => toggleActivity(act)}
                    style={{ width: "18px", height: "18px", cursor: "pointer" }}
                  />
                  <span>{act}</span>
                </label>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup label="Appréhension/Peur" help="Kinésiophobie: 0 = Aucune | 10 = Extrême">
            <input
              type="range"
              min="0"
              max="10"
              value={typeof form.fearLevel === "number" ? form.fearLevel : Number(form.fearLevel)}
              onChange={(e) => updateField("fearLevel", Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: form.fearLevel > 6 ? "#dc2626" : form.fearLevel > 3 ? "#f59e0b" : "#10b981" }}>
              {form.fearLevel}/10
            </p>
          </FieldGroup>
        </Section>

        {/* MEDICAL HISTORY */}
        <Section id="history" icon="📋" title="Antécédents médicaux">
          <FieldGroup label="Traitements antérieurs" help="Physio, infiltrations, chirurgies, etc.">
            <textarea
              value={form.treatmentHistory}
              onChange={(e) => updateField("treatmentHistory", e.target.value)}
              placeholder="Détails des traitements antérieurs"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px", minHeight: "70px", fontFamily: "inherit" }}
            />
          </FieldGroup>

          <FieldGroup label="Comorbidités" help="Conditions médicales associées">
            <input
              type="text"
              value={form.comorbidities}
              onChange={(e) => updateField("comorbidities", e.target.value)}
              placeholder="Ex: Diabète, hypertension, arthrose"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
            />
          </FieldGroup>

          <FieldGroup label="Historique chirurgical" help="Chirurgies pertinentes">
            <input
              type="text"
              value={form.surgicalHistory}
              onChange={(e) => updateField("surgicalHistory", e.target.value)}
              placeholder="Ex: Méniscectomie 2020"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
            />
          </FieldGroup>

          <FieldGroup label="Médications" help="Analgésiques, AINS, corticoïdes, etc.">
            <input
              type="text"
              value={form.medications}
              onChange={(e) => updateField("medications", e.target.value)}
              placeholder="Médicaments actuels pertinents"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
            />
          </FieldGroup>
        </Section>

        {/* CLINICAL */}
        <Section id="clinical" icon="🔬" title="Observations cliniques">
          <FieldGroup label="Palpation/Signes physiques" help="Douleur, spasmes, crépitements">
            <textarea
              value={form.palpationFindings}
              onChange={(e) => updateField("palpationFindings", e.target.value)}
              placeholder="Douleur à la palpation, spasmes..."
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px", minHeight: "70px", fontFamily: "inherit" }}
            />
          </FieldGroup>

          <FieldGroup label="Amplitude de mouvement" help="ROM et asymétries">
            <textarea
              value={form.rangeOfMotion}
              onChange={(e) => updateField("rangeOfMotion", e.target.value)}
              placeholder="Ex: Flexion 70%, rotation droite 50%"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px", minHeight: "70px", fontFamily: "inherit" }}
            />
          </FieldGroup>

          <FieldGroup label="Force musculaire (0-5)" help="Faiblesses observées">
            <input
              type="text"
              value={form.strength}
              onChange={(e) => updateField("strength", e.target.value)}
              placeholder="Ex: Glutes 4/5, Quad D 3/5"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px" }}
            />
          </FieldGroup>
        </Section>

        {/* OBJECTIVES */}
        <Section id="objectives" icon="🎯" title="Objectifs du traitement">
          <FieldGroup label="Objectif(s) principal(aux)" help="Ce que le patient veut atteindre">
            <textarea
              value={form.objectif}
              onChange={(e) => updateField("objectif", e.target.value)}
              placeholder="Réduire la douleur, reprendre le sport, améliorer mobilité, retour au travail"
              style={{ width: "100%", padding: "10px", border: "2px solid #e5e7eb", borderRadius: "6px", minHeight: "70px", fontFamily: "inherit" }}
            />
          </FieldGroup>
        </Section>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px 32px",
            marginTop: "30px",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: loading ? "#93c5fd" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            width: "100%",
            transition: "background-color 0.2s",
          }}
        >
          {loading ? "⏳ Génération..." : "🚀 Générer le programme"}
        </button>
      </form>
    </Layout>
  );
}
