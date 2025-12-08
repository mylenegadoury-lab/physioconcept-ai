// Exercices spécifiques par problématique
export const exercicesByProblematique = {
  lombalgie: [
    {
      name: "Extension en appui sur les coudes (McKenzie)",
      tags: ["extension", "centralisation"],
      description: "Allongé sur le ventre, extension progressive du dos",
      progression: "Extension bras tendus",
    },
    {
      name: "Chat-vache",
      tags: ["mobilité", "échauffement"],
      description: "À quatre pattes, mobilisation du rachis",
      progression: "Plus grande amplitude",
    },
    {
      name: "Dead Bug",
      tags: ["stabilité", "core"],
      description: "Contrôle du core en position dorsale",
      progression: "Dead bug avec poids",
    },
    {
      name: "Pont fessier",
      tags: ["renforcement", "chaîne-postérieure"],
      description: "Activation fessière et extension lombaire",
      progression: "Pont unilatéral",
    },
  ],
  cervicalgie: [
    {
      name: "Rotations cervicales",
      tags: ["mobilité", "cervical"],
      description: "Rotations douces du cou",
      progression: "Avec résistance",
    },
    {
      name: "Rétraction cervicale",
      tags: ["posture", "stabilité"],
      description: "Correction de la posture tête en avant",
      progression: "Avec isométrie",
    },
    {
      name: "Étirements trapèzes",
      tags: ["étirement", "relâchement"],
      description: "Relâchement des trapèzes supérieures",
      progression: "Étirement actif-passif",
    },
  ],
  epaule: [
    {
      name: "Rotation interne/externe",
      tags: ["mobilité", "épaule"],
      description: "Mobilisation des rotateurs de l'épaule",
      progression: "Avec résistance élastique",
    },
    {
      name: "Pendulaire Codman",
      tags: ["mobilité", "détente"],
      description: "Mobilité douce en décharge",
      progression: "Ajouter des mouvements actifs",
    },
    {
      name: "Renforcement coiffe des rotateurs",
      tags: ["renforcement", "stabilité"],
      description: "Stabilité de l'articulation gléno-humérale",
      progression: "Avec poids progressif",
    },
  ],
  genou: [
    {
      name: "Quadriceps isométrique",
      tags: ["renforcement", "quadriceps"],
      description: "Contraction du quadriceps sans mouvement",
      progression: "Avec contraction additionnelle",
    },
    {
      name: "Leg press",
      tags: ["renforcement", "global"],
      description: "Renforcement multiplanaire du genou",
      progression: "Augmenter la résistance",
    },
    {
      name: "Squat assisté",
      tags: ["fonctionnel", "renforcement"],
      description: "Squats avec support initial",
      progression: "Squat sans support",
    },
  ],
  cheville: [
    {
      name: "Inversions/Eversions",
      tags: ["mobilité", "proprioception"],
      description: "Mobilisation inversion/eversion",
      progression: "Avec résistance",
    },
    {
      name: "Flexion/Extension dorsale",
      tags: ["mobilité", "cheville"],
      description: "Flexion plantaire et dorsale",
      progression: "Avec élastique",
    },
    {
      name: "Proprioception",
      tags: ["équilibre", "proprioception"],
      description: "Équilibre monoculaire",
      progression: "Sur surface instable",
    },
  ],
};

export default exercicesByProblematique;
