/**
 * Mapping minimal des exercices vers les courants / approches de physiothérapie
 * Ceci permet d'indiquer quelles approches soutiennent ou utilisent un exercice donné.
 * Ajoutez/éditez selon vos connaissances cliniques.
 */

export const exerciseSchools = {
  // lombalgie
  "mckenzie-elbows": ["McKenzie", "Approche mécaniste"],
  "cat-cow": ["Approche globale / mobilité", "Yoga-informed"],
  "dead-bug": ["Stabilité du tronc", "Approche par exercices"],
  "bridge": ["Renforcement global", "Approche par exercices"],

  // genou
  "quad-sets": ["Renforcement musculaire", "Rééducation posturale"],
  "clamshells": ["Stabilité de la hanche", "Approche par exercices"],
  "straight-leg-raise": ["Renforcement", "Approche traditionnelle"],

  // epaule
  "pendulum-circles": ["Mobilité précoce", "Thérapie manuelle"],
  "wall-slides": ["Stabilité scapulaire", "Rééducation posturale"],
  "resistance-band-rows": ["Renforcement scapulaire", "Approche par exercices"],

  // hanche
  "hip-flexor-stretch": ["Étirements", "Approche manuelle"],
  "clamshells-hip": ["Renforcement", "Approche par exercices"],
  "single-leg-stance": ["Proprioception", "Approche fonctionnelle"],

  // cheville
  "ankle-alphabet": ["Proprioception", "Rééducation fonctionnelle"],
  "calf-raises": ["Renforcement", "Approche par exercices"],
  "resistance-band-ankle": ["Force et contrôle", "Approche par exercices"],

  // cou
  "neck-isometric": ["Renforcement cervical", "Approche par exercices"],
  "neck-stretch": ["Étirements", "Approche manuelle"],
  "chin-tucks": ["Posture", "Approche neuro-musculaire"],
};

export default exerciseSchools;
