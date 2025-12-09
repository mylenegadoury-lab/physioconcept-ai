import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = "Simple line drawing of person in prone position supported on forearms doing McKenzie extension exercise, elbows placed under shoulders, neutral spine, minimal clean style, plain white background, side view perspective";

console.log("🎨 Génération d'une image test...");
console.log("📝 Prompt:", prompt);

try {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });

  const imageUrl = response.data[0].url;
  console.log("\n✅ Image générée!");
  console.log("🔗 URL:", imageUrl);
  console.log("\n💰 Coût: $0.04");
} catch (error) {
  console.error("❌ Erreur:", error.message);
}
