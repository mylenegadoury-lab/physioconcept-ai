import { useState } from "react";
import Layout from "../components/Layout";

export default function Home() {
  const [form, setForm] = useState({
    language: "fr",
    painLocation: "",
    painDirection: "",
    movementTolerance: "",
    fearLevel: "",
    duration: "",
    legWeakness: "",
    numbness: "",
    nightPain: "",
    fever: "",
    trauma: "",
  });

  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    window.location.href = `/result?data=${encodeURIComponent(
      JSON.stringify(data)
    )}`;
  }

  return (
    <Layout>
      <h1>Programme intelligent – Lombalgie</h1>

      <form onSubmit={handleSubmit} className="form">

        {/* LANGUE */}
        <h2>🌐 Langue</h2>
        <select onChange={(e) => updateField("language", e.target.value)}>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>

        {/* LOCALISATION */}
        <h2>📍 Localisation de la douleur</h2>
        <select onChange={(e) => updateField("painLocation", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="local">Bas du dos uniquement</option>
          <option value="glute">Bas du dos + fesse</option>
          <option value="leg">Bas du dos + jambe (au-dessus genou)</option>
          <option value="belowKnee">Douleur sous le genou</option>
        </select>

        {/* MOUVEMENT AGGRAVANT */}
        <h2>⚡ Mouvement aggravant principal</hh2>
        <select onChange={(e) => updateField("painDirection", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="flexion">Flexion (se pencher en avant)</option>
          <option value="extension">Extension (se pencher en arrière)</option>
          <option value="rotation">Rotation</option>
          <option value="load">Port de charges</option>
          <option value="prolonged">Positions prolongées</option>
        </select>

        {/* TOLÉRANCE AU MOUVEMENT */}
        <h2>📈 Tolérance au mouvement</h2>
        <select
          onChange={(e) => updateField("movementTolerance", e.target.value)}
        >
          <option value="">--Choisir--</option>
          <option value="low">Faible</option>
          <option value="moderate">Modérée</option>
          <option value="high">Bonne</option>
        </select>

        {/* FEAR AVOIDANCE */}
        <h2>😣 Niveau d'appréhension</h2>
        <select onChange={(e) => updateField("fearLevel", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="low">Faible</option>
          <option value="moderate">Modéré</option>
          <option value="high">Élevé</option>
        </select>

        {/* DURÉE */}
        <h2>🕒 Depuis combien de temps?</h2>
        <select onChange={(e) => updateField("duration", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="acute">Moins de 6 semaines</option>
          <option value="subacute">6 à 12 semaines</option>
          <option value="chronic">Plus de 3 mois</option>
        </select>

        {/* DRAPEAUX ROUGES */}
        <h2>🚨 Sécurité — Drapeaux rouges</h2>

        <label>Faiblesse dans une jambe?</label>
        <select onChange={(e) => updateField("legWeakness", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
        </select>

        <label>Engourdissements persistants?</label>
        <select onChange={(e) => updateField("numbness", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
        </select>

        <label>Douleur nocturne qui réveille?</label>
        <select onChange={(e) => updateField("nightPain", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
        </select>

        <label>Fièvre récente?</label>
        <select onChange={(e) => updateField("fever", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
        </select>

        <label>Trauma récent important?</label>
        <select onChange={(e) => updateField("trauma", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="yes">Oui</option>
          <option value="no">Non</option>
        </select>

        {/* SUBMIT */}
        <button type="submit" disabled={loading}>
          {loading ? "Génération..." : "Générer mon programme"}
        </button>
      </form>
    </Layout>
  );
}
