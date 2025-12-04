import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Home() {
  const router = useRouter();

  const [form, setForm] = useState({
    painLocation: "",
    painDirection: "",
    movementTolerance: "",
    activityLevel: "",
    language: "fr"
  });

  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    router.push({
      pathname: "/result",
      query: { data: JSON.stringify(data) }
    });
  }

  return (
    <Layout>
      <h1>Programme intelligent – Lombalgie</h1>
      <form onSubmit={handleSubmit}>

        <label>Langue du programme</label>
        <select onChange={(e) => updateField("language", e.target.value)}>
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
        </select>

        <label>Où est la douleur?</label>
        <select onChange={(e) => updateField("painLocation", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="local">Locale au bas du dos</option>
          <option value="glute">Vers la fesse</option>
          <option value="leg">Dans la jambe (au-dessus du genou)</option>
          <option value="belowKnee">Sous le genou</option>
        </select>

        <label>Quel mouvement aggrave le plus?</label>
        <select onChange={(e) => updateField("painDirection", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="flexion">Flexion</option>
          <option value="extension">Extension</option>
          <option value="rotation">Rotation</option>
          <option value="load">Port de charge</option>
        </select>

        <label>Tolérance au mouvement?</label>
        <select onChange={(e) => updateField("movementTolerance", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="low">Faible</option>
          <option value="moderate">Modérée</option>
          <option value="high">Bonne</option>
        </select>

        <label>Niveau d’activité?</label>
        <select onChange={(e) => updateField("activityLevel", e.target.value)}>
          <option value="">--Choisir--</option>
          <option value="sedentary">Sédentaire</option>
          <option value="light">Actif léger</option>
          <option value="sport">Actif sportif</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Génération..." : "Générer le programme"}
        </button>
      </form>
    </Layout>
  );
}
