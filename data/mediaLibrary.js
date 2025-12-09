/**
 * Bibliothèque de médias pré-générés pour exercices
 * 
 * Structure uniforme pour images, vidéos, et erreurs communes
 * Style DALL-E: "Professional physiotherapy illustration, clean white background, 
 *               anatomically accurate, demonstrating proper form"
 * 
 * Avantages:
 * - Uniformité visuelle (même style, qualité)
 * - Coûts réduits (génération unique vs à chaque programme)
 * - Chargement rapide (URLs statiques)
 * - Contrôle qualité (validation manuelle avant ajout)
 * - Marketing professionnel (images attractives)
 */

export const mediaLibrary = {
  // ===========================================
  // LOMBALGIE (Lower Back Pain)
  // ===========================================
  "mckenzie-elbows": {
    exerciseName: "Extension en appui sur les coudes (McKenzie)",
    images: {
      main: {
        url: null, // À générer: DALL-E 3 prompt below
        prompt: "Simple minimalist illustration: person lying on stomach, upper body propped on forearms, elbows directly under shoulders, gentle back extension, side view, clean line art style, pure white background, no text or labels",
        alt: "McKenzie extension en appui sur les coudes - Position correcte",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Simple minimalist illustration: person lying flat on stomach, arms relaxed at sides, side view, clean line art style, pure white background, no text",
        alt: "McKenzie extension - Position de départ",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Simple minimalist illustration: person doing McKenzie extension incorrectly with head tilted back too far and hips lifted off ground, large red X symbol overlay, side view, clean line art style, pure white background",
        alt: "Erreur à éviter: Hyperextension du cou et bassin décollé",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null, // À ajouter: lien YouTube/Vimeo
        platform: "youtube",
        duration: "0:45",
        description: "Démonstration complète de l'extension McKenzie avec conseils de progression",
      },
      progressions: {
        url: null,
        platform: "youtube", 
        duration: "1:30",
        description: "3 niveaux: coudes → mains → avec coussin",
      },
    },
    infographics: {
      dosage: {
        url: null,
        prompt: "Clean infographic showing McKenzie extension dosage: '3 séries × 10 répétitions, 2-3 fois/jour', with clock icons and set/rep visualization, professional medical style, blue and white color scheme",
        alt: "Dosage recommandé McKenzie extension",
        generated: false,
      },
    },
  },

  "cat-cow": {
    exerciseName: "Chat-vache (Mobilité lombaire)",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing cat-cow exercise, split view: LEFT side showing 'cat' position (rounded spine, flexed), RIGHT side showing 'cow' position (arched spine, extended), person on hands and knees, clean white background, side view, anatomically accurate spinal movement",
        alt: "Chat-vache - Positions chat et vache",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing neutral tabletop position on hands and knees, spine neutral, hands under shoulders, knees under hips, clean white background, side view",
        alt: "Position de départ quadrupédie neutre",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT cat-cow with red X overlay - person hyperextending neck, excessively arched lower back, shoulders elevated, demonstrating improper form to avoid",
        alt: "Erreur: Hyperextension cervicale et lombaire excessive",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:00",
        description: "Mouvement fluide chat-vache avec respiration coordonnée",
      },
    },
    infographics: {
      breathing: {
        url: null,
        prompt: "Clean infographic showing cat-cow breathing pattern: 'Inspir = Vache (extension)' with blue arrow, 'Expir = Chat (flexion)' with red arrow, lungs illustration, professional medical style",
        alt: "Coordination respiration chat-vache",
        generated: false,
      },
    },
  },

  "dead-bug": {
    exerciseName: "Dead Bug (Stabilisation lombaire)",
    images: {
      main: {
        url: null,
        prompt: "Simple minimalist illustration: person lying on back, one arm extended overhead with opposite knee bent at 90 degrees, other arm and leg extended, side view, clean line art style, pure white background, no text",
        alt: "Dead Bug - Bras et jambe opposés",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Simple minimalist illustration: person lying on back, both knees bent at 90 degrees above hips, both arms extended toward ceiling, side view, clean line art style, pure white background, no text",
        alt: "Dead Bug - Position de départ",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Simple minimalist illustration: person doing dead bug with lower back arched off ground, large red X symbol overlay, side view, clean line art style, pure white background",
        alt: "Erreur: Perte de contact lombaire et flaring des côtes",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:15",
        description: "Dead bug avec progression: 2 bras → 1 bras 1 jambe → opposés",
      },
      coreBreathing: {
        url: null,
        platform: "youtube",
        duration: "0:50",
        description: "Respiration 360° pendant dead bug (ventre, côtes, dos)",
      },
    },
    infographics: {
      progression: {
        url: null,
        prompt: "Clean progression infographic showing 3 levels of dead bug: Level 1 (arms only), Level 2 (one arm one leg same side), Level 3 (opposite arm and leg), with difficulty stars (★☆☆ to ★★★), professional medical style",
        alt: "Progression Dead Bug en 3 niveaux",
        generated: false,
      },
    },
  },

  "bridge": {
    exerciseName: "Pont (Renforcement fessiers et lombaires)",
    images: {
      main: {
        url: null,
        prompt: "Simple minimalist illustration: person lying on back with knees bent, hips lifted to create straight line from knees to shoulders, side view, clean line art style, pure white background, no text",
        alt: "Pont - Position haute avec activation fessiers",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Simple minimalist illustration: person lying on back with knees bent, feet flat on ground, hips on ground, arms at sides, side view, clean line art style, pure white background, no text",
        alt: "Pont - Position de départ au sol",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Simple minimalist illustration: person doing bridge with lower back excessively arched, large red X symbol overlay, side view, clean line art style, pure white background",
        alt: "Erreur: Hyperextension lombaire et manque d'activation fessiers",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:00",
        description: "Pont avec activation consciente des fessiers",
      },
      progressions: {
        url: null,
        platform: "youtube",
        duration: "1:45",
        description: "Progressions: 2 jambes → 1 jambe tendue → 1 jambe levée → pont sur épaules",
      },
    },
    infographics: {
      muscleFocus: {
        url: null,
        prompt: "Clean anatomical infographic highlighting muscles worked in bridge exercise: gluteus maximus (primary - red), hamstrings (secondary - orange), erector spinae (stabilizer - yellow), on transparent posterior view of body, professional medical illustration style",
        alt: "Muscles ciblés par le pont",
        generated: false,
      },
    },
  },

  // ===========================================
  // GENOU (Knee)
  // ===========================================
  "quad-sets": {
    exerciseName: "Contractions isométriques quadriceps",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing quad set exercise, person sitting with leg extended, pressing back of knee down into mat or rolled towel, quadriceps muscle engaged (highlighted in red), clean white background, side view, anatomically accurate muscle activation",
        alt: "Quad sets - Contraction isométrique avec serviette",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing quad sets starting position, person sitting with legs extended, rolled towel under knee, relaxed position before contraction, clean white background",
        alt: "Quad sets - Position de départ avec serviette sous genou",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT quad set with red X overlay - person holding breath with tense face, lifting heel excessively off mat, using hip flexors instead of quads, demonstrating improper form to avoid",
        alt: "Erreur: Apnée et compensation par fléchisseurs de hanche",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "0:45",
        description: "Technique de contraction quad avec respiration continue",
      },
      postOp: {
        url: null,
        platform: "youtube",
        duration: "1:00",
        description: "Quad sets post-opératoire (LCA, méniscectomie)",
      },
    },
    infographics: {
      holdTime: {
        url: null,
        prompt: "Clean infographic showing quad set hold progression: '5 sec × 10 reps' (week 1-2), '10 sec × 8 reps' (week 3-4), '15 sec × 6 reps' (week 5+), with stopwatch icons and progression arrows, professional medical style",
        alt: "Progression durée de contraction quad sets",
        generated: false,
      },
    },
  },

  "clamshells": {
    exerciseName: "Coquillages (Moyen fessier)",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing clamshell exercise, person lying on side with knees bent, top knee lifting while feet stay together, resistance band around thighs (optional), gluteus medius highlighted in red, clean white background, demonstrating hip abduction",
        alt: "Coquillages - Ouverture genou avec bande de résistance",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing clamshell starting position, person lying on side with knees and hips bent at 45°, knees together, bottom arm supporting head, clean white background",
        alt: "Coquillages - Position de départ sur le côté",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT clamshell with red X overlay - person rotating entire pelvis backward, lifting top hip off bottom hip, feet separating, demonstrating compensatory movement patterns to avoid",
        alt: "Erreur: Rotation du bassin et pieds décollés",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "0:50",
        description: "Coquillages avec isolation parfaite du moyen fessier",
      },
      progressions: {
        url: null,
        platform: "youtube",
        duration: "1:20",
        description: "Progression: sans bande → bande légère → bande forte → avec extension",
      },
    },
    infographics: {
      bandPlacement: {
        url: null,
        prompt: "Clean infographic showing 3 resistance band placements for clamshells: above knees (easiest - green), mid-thigh (moderate - yellow), just above ankles (hardest - red), with difficulty rating, professional medical style",
        alt: "Placement bande de résistance pour coquillages",
        generated: false,
      },
    },
  },

  "straight-leg-raise": {
    exerciseName: "Élévation jambe tendue (SLR)",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing straight leg raise exercise, person lying supine with one leg bent (foot flat), other leg extended and lifted 12 inches off mat, quadriceps engaged, hip flexors and core activated, clean white background, side view",
        alt: "SLR - Jambe tendue élevée à 30cm",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing SLR starting position, person lying supine with one knee bent, other leg extended flat on mat with quad contracted before lift, clean white background",
        alt: "SLR - Position de départ avec quad contracté",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT straight leg raise with red X overlay - person with bent knee on lifting leg, arched lower back, leg lifted too high causing hip flexor dominance instead of quad work, demonstrating improper form to avoid",
        alt: "Erreur: Genou fléchi et dos cambré",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "0:55",
        description: "SLR avec activation quad pré-contraction",
      },
      fourWay: {
        url: null,
        platform: "youtube",
        duration: "2:00",
        description: "SLR dans 4 directions: flexion, extension, abduction, adduction",
      },
    },
    infographics: {
      height: {
        url: null,
        prompt: "Clean infographic showing proper SLR height: foot lifted 30cm (12 inches) off ground, with ruler measurement, note 'NE PAS dépasser hauteur du genou opposé', professional medical style with red and green zones",
        alt: "Hauteur correcte pour SLR",
        generated: false,
      },
    },
  },

  // ===========================================
  // ÉPAULE (Shoulder)
  // ===========================================
  "pendulum-circles": {
    exerciseName: "Exercices du pendule (Codman)",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing pendulum exercise, person bent forward at waist with one hand supported on table, affected arm hanging freely performing small circular movements, arrows showing clockwise and counterclockwise motion, clean white background, side view",
        alt: "Pendule - Mouvements circulaires bras relâché",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing pendulum starting position, person bent at 90° with hand on stable surface, affected arm hanging straight down relaxed, clean white background, demonstrating proper setup",
        alt: "Pendule - Position de départ inclinée",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT pendulum with red X overlay - person using shoulder muscles to create movement instead of gravity, arm tensed, not bent forward enough, demonstrating active movement instead of passive pendulum to avoid",
        alt: "Erreur: Mouvement actif au lieu de passif par gravité",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:00",
        description: "Pendule de Codman: relâchement total de l'épaule",
      },
      variations: {
        url: null,
        platform: "youtube",
        duration: "1:30",
        description: "4 directions pendule: cercles, avant-arrière, gauche-droite, figure-8",
      },
    },
    infographics: {
      phase: {
        url: null,
        prompt: "Clean infographic showing pendulum exercise phases: 'Phase 1 Aiguë (J1-7): 10 reps × 3-4 fois/jour', 'Phase 2 Sub-aiguë (J8-21): avec poids 0.5-1kg', with calendar icons and weight progression, professional medical style",
        alt: "Phases de progression exercices pendule",
        generated: false,
      },
    },
  },

  "wall-slides": {
    exerciseName: "Glissements muraux (Wall slides)",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing wall slide exercise, person standing with back against wall, arms sliding up wall with elbows bent at 90°, maintaining shoulder blade contact with wall, clean white background, front view showing proper scapular position",
        alt: "Wall slides - Bras montant le long du mur",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing wall slide starting position, person standing with back flat against wall, arms at sides or bent at 90° (goal post position), feet 6 inches from wall, clean white background",
        alt: "Wall slides - Position de départ contre le mur",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT wall slide with red X overlay - person with lower back arched away from wall, shoulders shrugged toward ears, elbows coming off wall, demonstrating loss of scapular control to avoid",
        alt: "Erreur: Dos cambré et épaules haussées",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "0:45",
        description: "Wall slides avec contact scapulaire maintenu",
      },
      scapular: {
        url: null,
        platform: "youtube",
        duration: "1:10",
        description: "Contrôle scapulaire pendant wall slides (vue latérale)",
      },
    },
    infographics: {
      keyPoints: {
        url: null,
        prompt: "Clean infographic showing 4 key points for wall slides: '1. Bas du dos contre mur', '2. Épaules vers le bas (pas haussées)', '3. Coudes contre mur', '4. Mouvement lent 3-5 sec', with checkmarks and anatomical icons, professional medical style",
        alt: "Points clés wall slides",
        generated: false,
      },
    },
  },

  "resistance-band-rows": {
    exerciseName: "Tirage horizontal avec bande",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing seated resistance band row, person sitting with legs extended, band around feet, pulling elbows back while squeezing shoulder blades together, rhomboids and middle trapezius highlighted in red, clean white background, demonstrating proper scapular retraction",
        alt: "Tirage bande - Rétraction scapulaire",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing resistance band row starting position, person sitting with legs extended, band secured around feet, arms extended forward holding band with neutral spine, clean white background",
        alt: "Tirage bande - Position de départ bras tendus",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT resistance band row with red X overlay - person rounding upper back, shrugging shoulders, using momentum instead of controlled movement, elbows flaring out wide instead of staying close to body, demonstrating improper form to avoid",
        alt: "Erreur: Dos rond et épaules haussées",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "0:55",
        description: "Tirage bande avec activation rhomboïdes et trapèze moyen",
      },
      tempo: {
        url: null,
        platform: "youtube",
        duration: "0:40",
        description: "Tempo 2-1-2: 2 sec tirer, 1 sec pause, 2 sec retour",
      },
    },
    infographics: {
      bandColor: {
        url: null,
        prompt: "Clean infographic showing resistance band color progression: Yellow (1-3 lbs), Red (3-5 lbs), Green (5-8 lbs), Blue (8-12 lbs), Black (12-15 lbs), with difficulty progression arrows and recommendation by phase, professional medical style",
        alt: "Progression couleurs bandes de résistance",
        generated: false,
      },
    },
  },

  // ===========================================
  // HANCHE (Hip)
  // ===========================================
  "hip-flexor-stretch": {
    exerciseName: "Étirement fléchisseurs de hanche",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing hip flexor stretch, person in lunge position with back knee on mat, front knee bent at 90°, pelvis tucked under, feeling stretch in front of back hip, psoas and rectus femoris highlighted, clean white background, side view",
        alt: "Étirement fléchisseurs - Fente basse avec rétroversion",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing hip flexor stretch starting position, person kneeling on one knee (half-kneeling position), hands on front thigh for support, upright neutral spine, clean white background",
        alt: "Étirement fléchisseurs - Position de départ à genoux",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT hip flexor stretch with red X overlay - person hyperextending lower back (arched), leaning back instead of pelvis tuck, feeling stretch in lower back instead of front hip, demonstrating improper compensation pattern to avoid",
        alt: "Erreur: Hyperextension lombaire au lieu de rétroversion bassin",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:10",
        description: "Étirement fléchisseurs avec rétroversion pelvienne active",
      },
      variations: {
        url: null,
        platform: "youtube",
        duration: "1:40",
        description: "3 variations: de base, avec bras levé, avec rotation thoracique",
      },
    },
    infographics: {
      holdTime: {
        url: null,
        prompt: "Clean infographic showing static stretching protocol: '30 secondes × 3 répétitions', '2 fois par jour (matin et soir)', with timer icon and optimal timing (post-exercise or after warm-up), professional medical style",
        alt: "Protocole durée étirement statique",
        generated: false,
      },
    },
  },

  "clamshells-hip": {
    exerciseName: "Coquillages (Abduction hanche)",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing hip clamshell exercise, person lying on side with knees bent, top knee lifting outward while feet stay together, gluteus medius highlighted in red, resistance band around thighs, clean white background, demonstrating hip abduction without pelvic rotation",
        alt: "Coquillages hanche - Abduction isolée moyen fessier",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing hip clamshell starting position, person lying on side with hips and knees bent at 45°, knees together, spine neutral, bottom arm under head, clean white background",
        alt: "Coquillages hanche - Position latérale de départ",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT hip clamshell with red X overlay - person rotating entire pelvis backward instead of isolating hip movement, top hip lifting off bottom hip, using momentum, demonstrating compensatory pattern using TFL instead of glute med to avoid",
        alt: "Erreur: Rotation bassin au lieu d'abduction pure",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "0:50",
        description: "Coquillages avec isolation maximale moyen fessier (pas de rotation bassin)",
      },
      palpation: {
        url: null,
        platform: "youtube",
        duration: "0:45",
        description: "Palpation moyen fessier pendant coquillages pour feedback proprioceptif",
      },
    },
  },

  "single-leg-stance": {
    exerciseName: "Équilibre unipodal",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing single leg stance exercise, person standing on one leg with knee slightly bent, opposite hip and knee flexed at 90°, arms out for balance, maintaining level pelvis, clean white background, demonstrating hip stability and balance",
        alt: "Équilibre unipodal - Stabilisation hanche",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing single leg stance starting position, person standing on both feet with hands on hips or reaching toward stable surface for support, clean white background, ready to lift one leg",
        alt: "Équilibre unipodal - Position de départ bipodale",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT single leg stance with red X overlay - person with Trendelenburg sign (pelvis dropping on non-weight bearing side), hip adducting inward (knee diving medially), losing balance, demonstrating hip abductor weakness to avoid",
        alt: "Erreur: Signe de Trendelenburg et genou en valgus",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:00",
        description: "Équilibre unipodal avec progression: yeux ouverts → yeux fermés → surface instable",
      },
      progressions: {
        url: null,
        platform: "youtube",
        duration: "2:00",
        description: "6 niveaux: mur → sans support → yeux fermés → coussin → perturbations → squat unipodal",
      },
    },
    infographics: {
      holdTime: {
        url: null,
        prompt: "Clean infographic showing single leg stance hold time goals: 'Débutant: 10-15 sec', 'Intermédiaire: 30 sec', 'Avancé: 60+ sec', 'Yeux fermés: 50% du temps yeux ouverts', with progression timeline, professional medical style",
        alt: "Objectifs temps tenue équilibre unipodal",
        generated: false,
      },
    },
  },

  // ===========================================
  // CHEVILLE (Ankle)
  // ===========================================
  "ankle-alphabet": {
    exerciseName: "Alphabet cheville",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing ankle alphabet exercise, person sitting with leg extended, foot off ground, tracing large letters A B C with toes, arrows showing range of motion in all directions, clean white background, demonstrating ankle mobility exercise",
        alt: "Alphabet cheville - Tracer lettres avec orteil",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing ankle alphabet starting position, person sitting in chair with affected leg extended, foot hovering off ground, ankle in neutral position, clean white background",
        alt: "Alphabet cheville - Position assise jambe tendue",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT ankle alphabet with red X overlay - person moving entire leg from hip instead of isolating ankle joint, small movements instead of full range, demonstrating compensatory pattern to avoid",
        alt: "Erreur: Mouvement de la hanche au lieu de la cheville",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:30",
        description: "Alphabet cheville complet A-Z avec amplitude maximale",
      },
      progressions: {
        url: null,
        platform: "youtube",
        duration: "0:50",
        description: "Progression: majuscules → minuscules → cursive",
      },
    },
    infographics: {
      directions: {
        url: null,
        prompt: "Clean infographic showing 4 ankle movements in alphabet exercise: Dorsiflexion (↑), Plantarflexion (↓), Inversion (→), Eversion (←), with arrows and joint diagram, professional medical style",
        alt: "Directions de mouvement alphabet cheville",
        generated: false,
      },
    },
  },

  "calf-raises": {
    exerciseName: "Élévations mollet",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing standing calf raise, person standing with feet hip-width apart, rising up on toes to maximum height, gastrocnemius and soleus muscles highlighted in red, clean white background, side view demonstrating full plantarflexion range",
        alt: "Élévations mollet - Position haute sur pointes",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing calf raise starting position, person standing with feet flat on ground, hands on wall or chair for balance support, ankles in neutral position, clean white background",
        alt: "Élévations mollet - Position pieds à plat",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT calf raise with red X overlay - person bending knees during lift, using momentum by bouncing, not achieving full height on toes, ankles rolling outward (supination), demonstrating improper form to avoid",
        alt: "Erreur: Flexion genoux et manque d'amplitude",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "0:50",
        description: "Élévations mollet: tempo lent 2-1-3 (montée-pause-descente)",
      },
      progressions: {
        url: null,
        platform: "youtube",
        duration: "1:45",
        description: "Progression: 2 jambes → 1 jambe → sur marche (amplitude ++) → avec poids",
      },
    },
    infographics: {
      twoMuscles: {
        url: null,
        prompt: "Clean anatomical infographic comparing gastrocnemius vs soleus targeting: 'Genou tendu = Gastrocnemius (jumeaux)', 'Genou fléchi = Soleus (soléaire)', with posterior leg anatomy highlighting each muscle, professional medical illustration style",
        alt: "Ciblage gastrocnemius vs soléaire selon position genou",
        generated: false,
      },
    },
  },

  "resistance-band-ankle": {
    exerciseName: "Renforcement cheville avec bande",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing ankle strengthening with resistance band in 4 positions: dorsiflexion (toes toward shin), plantarflexion (toes pointing down), inversion (sole inward), eversion (sole outward), person sitting with band around foot, clean white background, demonstrating complete ankle strengthening",
        alt: "Renforcement bande - 4 directions cheville",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing resistance band ankle exercise starting position, person sitting with leg extended, band secured around forefoot, holding both ends of band with hands, ankle in neutral, clean white background",
        alt: "Renforcement bande - Position de départ avec bande au pied",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT resistance band ankle exercise with red X overlay - person using toes to create movement instead of ankle joint, moving too fast with momentum, band placement too close to toes (should be at ball of foot), demonstrating improper form to avoid",
        alt: "Erreur: Mouvement des orteils au lieu de cheville",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:20",
        description: "4 directions renforcement cheville: dorsi, plantar, inversion, eversion",
      },
      postSprain: {
        url: null,
        platform: "youtube",
        duration: "1:00",
        description: "Protocole post-entorse: quand débuter chaque direction",
      },
    },
    infographics: {
      directionPhases: {
        url: null,
        prompt: "Clean infographic showing ankle strengthening phases post-sprain: 'Phase 1 (J3-7): Dorsiflexion + Plantarflexion', 'Phase 2 (J8-14): + Inversion (prudence)', 'Phase 3 (J15+): + Eversion', with checkmarks and timeline, professional medical style",
        alt: "Phases introduction directions post-entorse",
        generated: false,
      },
    },
  },

  // ===========================================
  // COU (Neck/Cervical)
  // ===========================================
  "neck-isometric": {
    exerciseName: "Isométriques cervicales",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing neck isometric exercises in 4 directions: flexion (hand on forehead), extension (hand on back of head), lateral flexion right (hand on right side), lateral flexion left (hand on left side), person applying gentle pressure without movement, clean white background, demonstrating static cervical strengthening",
        alt: "Isométriques cervicales - 4 directions sans mouvement",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing neck isometric starting position, person sitting upright with neutral cervical spine, hand positioned on forehead ready to apply resistance, clean white background",
        alt: "Isométriques cervicales - Position neutre de départ",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT neck isometric with red X overlay - person allowing head to move against resistance (should be 100% static), using excessive force, breath holding, shoulders elevated, demonstrating improper technique to avoid",
        alt: "Erreur: Mouvement de la tête et force excessive",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:15",
        description: "Isométriques cervicales 4 directions avec respiration continue",
      },
      intensity: {
        url: null,
        platform: "youtube",
        duration: "0:45",
        description: "Dosage force isométrique: 20-30% max (pas de grimace)",
      },
    },
    infographics: {
      holdProtocol: {
        url: null,
        prompt: "Clean infographic showing cervical isometric protocol: '6-10 secondes hold × 5-8 reps', '20-30% force maximale', 'Respiration continue (ne PAS bloquer)', with icons for duration, intensity gauge, and breathing reminder, professional medical style",
        alt: "Protocole isométriques cervicales",
        generated: false,
      },
    },
  },

  "neck-stretch": {
    exerciseName: "Étirements cervicaux",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing neck stretches: lateral flexion (ear to shoulder), rotation (chin to shoulder), upper trapezius stretch (hand behind back, opposite hand gently pulling head), clean white background, demonstrating gentle cervical and upper trapezius stretching",
        alt: "Étirements cervicaux - Flexion latérale et trapèze",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing neck stretch starting position, person sitting upright with neutral spine, shoulders relaxed down, both hands resting on thighs, clean white background",
        alt: "Étirements cervicaux - Position assise neutre",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT neck stretch with red X overlay - person elevating shoulder on stretched side, pulling head too aggressively with hand, rotating head instead of pure lateral flexion, demonstrating improper technique causing excessive tension to avoid",
        alt: "Erreur: Épaule haussée et traction excessive",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "1:30",
        description: "Étirements cervicaux complets: flexion latérale, rotation, trapèze",
      },
      office: {
        url: null,
        platform: "youtube",
        duration: "1:00",
        description: "Routine bureau 5 min: étirements cervicaux + mobilité thoracique",
      },
    },
    infographics: {
      timing: {
        url: null,
        prompt: "Clean infographic showing cervical stretch timing: '30 secondes × 2-3 répétitions par côté', 'Sensation d'étirement léger (3-4/10)', 'Répéter 2-3 fois par jour', with timer icon and intensity scale, professional medical style",
        alt: "Durée et fréquence étirements cervicaux",
        generated: false,
      },
    },
  },

  "chin-tucks": {
    exerciseName: "Rentrée du menton (Chin tucks)",
    images: {
      main: {
        url: null,
        prompt: "Professional physiotherapy illustration showing chin tuck exercise, person sitting or standing with neutral spine, retracting chin posteriorly creating double chin appearance, maintaining level gaze (not looking down), deep neck flexors activating, clean white background, side view demonstrating correction of forward head posture",
        alt: "Chin tucks - Rétraction cervicale activant fléchisseurs profonds",
        generated: false,
      },
      starting: {
        url: null,
        prompt: "Professional physiotherapy illustration showing chin tuck starting position, person sitting upright with typical forward head posture (chin jutting forward), clean white background, side view showing before position",
        alt: "Chin tucks - Position de départ tête avancée",
        generated: false,
      },
      commonError: {
        url: null,
        prompt: "Professional physiotherapy illustration showing INCORRECT chin tuck with red X overlay - person looking down at floor (should maintain level gaze), flexing entire cervical spine instead of isolated retraction, excessive movement creating extreme double chin, demonstrating improper technique to avoid",
        alt: "Erreur: Regard vers le bas et flexion excessive",
        generated: false,
      },
    },
    videos: {
      demonstration: {
        url: null,
        platform: "youtube",
        duration: "0:50",
        description: "Chin tucks parfaits: activation fléchisseurs profonds sans compensation",
      },
      posture: {
        url: null,
        platform: "youtube",
        duration: "1:20",
        description: "Chin tucks dans différentes positions: assis, debout, allongé",
      },
    },
    infographics: {
      deepFlexors: {
        url: null,
        prompt: "Clean anatomical infographic comparing superficial vs deep neck flexors: Superficial (SCM, scalenes - red X for overactive), Deep (longus colli, longus capitis - green checkmark for target), with side view cervical anatomy, professional medical illustration style",
        alt: "Fléchisseurs cervicaux profonds vs superficiels",
        generated: false,
      },
    },
  },
};

/**
 * Fonction utilitaire pour récupérer tous les médias d'un exercice
 */
export function getExerciseMedia(exerciseId) {
  return mediaLibrary[exerciseId] || null;
}

/**
 * Fonction pour vérifier si un exercice a des images générées
 */
export function hasGeneratedImages(exerciseId) {
  const media = mediaLibrary[exerciseId];
  if (!media || !media.images) return false;

  return Object.values(media.images).some((img) => img.generated === true);
}

/**
 * Statistiques de la bibliothèque
 */
export function getLibraryStats() {
  const totalExercises = Object.keys(mediaLibrary).length;
  let totalImages = 0;
  let generatedImages = 0;
  let totalVideos = 0;
  let videosWithUrls = 0;

  Object.values(mediaLibrary).forEach((exercise) => {
    if (exercise.images) {
      totalImages += Object.keys(exercise.images).length;
      generatedImages += Object.values(exercise.images).filter((img) => img.generated).length;
    }
    if (exercise.videos) {
      totalVideos += Object.keys(exercise.videos).length;
      videosWithUrls += Object.values(exercise.videos).filter((vid) => vid.url).length;
    }
  });

  return {
    totalExercises,
    totalImages,
    generatedImages,
    pendingImages: totalImages - generatedImages,
    totalVideos,
    videosWithUrls,
    pendingVideos: totalVideos - videosWithUrls,
    completionRate: Math.round(((generatedImages + videosWithUrls) / (totalImages + totalVideos)) * 100),
  };
}
