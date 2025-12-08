import fs from "fs";
import path from "path";

const CACHE_PATH = path.resolve(process.cwd(), "data", "imageCache.json");

function readCache() {
  try {
    if (!fs.existsSync(CACHE_PATH)) return {};
    const raw = fs.readFileSync(CACHE_PATH, "utf8");
    return JSON.parse(raw || "{}");
  } catch (err) {
    console.error("Failed to read cache:", err.message || err);
    return {};
  }
}

function writeCache(obj) {
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(obj, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write cache:", err.message || err);
  }
}

export default function handler(req, res) {
  if (req.method === "GET") {
    const cache = readCache();
    return res.status(200).json({ success: true, cache });
  }

  if (req.method === "DELETE") {
    try {
      writeCache({});
      return res.status(200).json({ success: true, message: "Cache vidée" });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  res.setHeader("Allow", ["GET", "DELETE"]);
  return res.status(405).end("Method Not Allowed");
}
