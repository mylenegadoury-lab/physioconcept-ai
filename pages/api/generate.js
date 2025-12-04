export default function handler(req, res) {
  try {
    console.log("⭐ API appelée");
    console.log("Reçu :", req.body);

    if (!req.body) {
      console.log("⚠️ req.body est vide !");
      return res.status(400).json({ error: "req.body vide" });
    }

    return res.status(200).json({
      ok: true,
      received: req.body,
    });

  } catch (error) {
    console.error("🔥 ERREUR API:", error);
    res.status(500).json({ error: "Erreur interne" });
  }
}
