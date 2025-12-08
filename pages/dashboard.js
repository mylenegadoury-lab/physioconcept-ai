import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { problematiques, categories } from "../data/problematiques";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredProblematiques = selectedCategory
    ? problematiques.filter((p) => p.category === selectedCategory)
    : problematiques;

  return (
    <Layout>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
          🏥 PhysioConcept Pro
        </h1>
        <p style={{ fontSize: "16px", color: "#666" }}>
          Générateur intelligent de programmes de rééducation
        </p>
      </div>

      {/* SÉLECTION DES CATÉGORIES */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Sélectionner une catégorie:</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: "10px 20px",
              backgroundColor: selectedCategory === null ? "#3b82f6" : "#e5e7eb",
              color: selectedCategory === null ? "white" : "#1f2937",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "10px 20px",
                backgroundColor:
                  selectedCategory === cat ? "#3b82f6" : "#e5e7eb",
                color: selectedCategory === cat ? "white" : "#1f2937",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRILLE DE PROBLÉMATIQUES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {filteredProblematiques.map((problematique) => (
          <Link
            key={problematique.id}
            href={`/formulaire?problematique=${problematique.id}`}
          >
            <a
              style={{
                display: "block",
                padding: "20px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#f9fafb",
                textDecoration: "none",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#eff6ff";
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(59, 130, 246, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                {problematique.icon}
              </div>
              <h3 style={{ margin: "10px 0", fontSize: "18px" }}>
                {problematique.name}
              </h3>
              <p style={{ margin: "10px 0", color: "#666", fontSize: "14px" }}>
                {problematique.description}
              </p>
              <div style={{ marginTop: "12px", fontSize: "12px", color: "#999" }}>
                {problematique.commonCauses.join(" • ")}
              </div>
            </a>
          </Link>
        ))}
      </div>

      {/* SECTION INFO */}
      <div
        style={{
          marginTop: "50px",
          padding: "20px",
          backgroundColor: "#f0f9ff",
          borderRadius: "12px",
          border: "1px solid #bfdbfe",
        }}
      >
        <h3>ℹ️ Comment ça marche?</h3>
        <ol style={{ marginLeft: "20px", lineHeight: "1.8" }}>
          <li>Sélectionnez la problématique de votre patient</li>
          <li>Complétez le formulaire d'évaluation</li>
          <li>L'IA génère un programme personnalisé</li>
          <li>Exportez et partager avec votre patient</li>
        </ol>
      </div>
    </Layout>
  );
}
