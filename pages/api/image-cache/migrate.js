import fs from "fs";
import path from "path";
import { normalizeKey } from "../../../lib/media";

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
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const cache = readCache();
    const newCache = {};
    let migrated = 0;
    Object.entries(cache).forEach(([k, v]) => {
      const key = normalizeKey(k) || normalizeKey(v?.url) || k;
      // if collision, prefer existing preserved entry (do not overwrite)
      if (!newCache[key]) {
        newCache[key] = v;
        migrated += key !== k ? 1 : 0;
      }
    });

    writeCache(newCache);

    return res.status(200).json({ success: true, migrated, keys: Object.keys(newCache).length });
  } catch (err) {
    console.error("Migration failed:", err.message || err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
