// Base de données des problématiques physio
export const problematiques = [
  {
    id: "lombalgie",
    name: "Lombalgie (Bas du dos)",
    category: "Colonne vertébrale",
    icon: "🔴",
    description: "Douleurs lombaires aigues ou chroniques",
    commonCauses: ["Mauvaise posture", "Traumatisme", "Dégénérescence", "Effort répété"],
  },
  {
    id: "cervicalgie",
    name: "Cervicalgie (Cou)",
    category: "Colonne vertébrale",
    icon: "🔵",
    description: "Douleurs cervicales et raideur du cou",
    commonCauses: ["Tension", "Whiplash", "Posture écran", "Arthrose"],
  },
  {
    id: "thoracique",
    name: "Dorsalgie (Haut du dos)",
    category: "Colonne vertébrale",
    icon: "🟢",
    description: "Douleurs thoraciques et dorsales",
    commonCauses: ["Scoliose", "Cyphose", "Tension musculaire"],
  },
  {
    id: "epaule",
    name: "Épaule",
    category: "Membre supérieur",
    icon: "💪",
    description: "Douleurs et dysfonctionnements de l'épaule",
    commonCauses: ["Tendinite", "Capsulite", "Impingement", "Instabilité"],
  },
  {
    id: "coude",
    name: "Coude (Tennis/Golf)",
    category: "Membre supérieur",
    icon: "🎾",
    description: "Epicondylite, épitrochlée, tendinite",
    commonCauses: ["Surcharge", "Gestes répétitifs", "Traumatisme"],
  },
  {
    id: "poignet",
    name: "Poignet",
    category: "Membre supérieur",
    icon: "✋",
    description: "Douleurs et raideur du poignet",
    commonCauses: ["Entorse", "Syndrome du canal carpien", "Tendinite", "Fracture"],
  },
  {
    id: "hanche",
    name: "Hanche",
    category: "Membre inférieur",
    icon: "🦵",
    description: "Douleurs hanchères et dysfonctionnements",
    commonCauses: ["Coxarthrose", "Bursite", "Impingement", "Labrum"],
  },
  {
    id: "genou",
    name: "Genou",
    category: "Membre inférieur",
    icon: "⚙️",
    description: "Douleurs génouales multiples",
    commonCauses: ["Ligamentaire", "Méniscale", "Patellaire", "Arthrose"],
  },
  {
    id: "cheville",
    name: "Cheville",
    category: "Membre inférieur",
    icon: "🔗",
    description: "Douleurs et instabilité de cheville",
    commonCauses: ["Entorse", "Syndesmose", "Tendinite", "Instabilité"],
  },
  {
    id: "pied",
    name: "Pied",
    category: "Membre inférieur",
    icon: "🦶",
    description: "Douleurs plantaires et achilléenne",
    commonCauses: ["Fasciite plantaire", "Tendinite achilléenne", "Hallux valgus"],
  },
];

export const categories = [...new Set(problematiques.map(p => p.category))];

export default problematiques;
