import fs from "fs";
import path from "path";

const CACHE_PATH = path.resolve(process.cwd(), "data", "verifiedCitations.json");
const DEFAULT_TTL_DAYS = Number(process.env.EVIDENCE_CACHE_TTL_DAYS || 365);

function readCache() {
  try {
    if (!fs.existsSync(CACHE_PATH)) return {};
    const raw = fs.readFileSync(CACHE_PATH, "utf8");
    return JSON.parse(raw || "{}");
  } catch (err) {
    console.warn("Failed to read evidence cache:", err?.message || err);
    return {};
  }
}

function writeCache(obj) {
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(obj, null, 2), "utf8");
  } catch (err) {
    console.warn("Failed to write evidence cache:", err?.message || err);
  }
}

function normalizeKeyForCitation(c) {
  if (!c) return null;
  if (c.doi) return `doi:${c.doi.toString().toLowerCase()}`;
  if (c.pmid) return `pmid:${c.pmid}`;
  if (c.title) return `title:${c.title.toString().trim().toLowerCase().replace(/\s+/g, ' ' )}`;
  return null;
}

async function getCachedCitation(c) {
  try {
    const key = normalizeKeyForCitation(c);
    if (!key) return null;
    const cache = readCache();
    const entry = cache[key];
    if (!entry) return null;
    const created = new Date(entry.createdAt);
    const ageDays = (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > DEFAULT_TTL_DAYS) {
      // expired
      delete cache[key];
      writeCache(cache);
      return null;
    }
    return entry.value;
  } catch (err) {
    console.warn('getCachedCitation error', err?.message || err);
    return null;
  }
}

async function setCachedCitation(c, value) {
  try {
    const key = normalizeKeyForCitation(c);
    if (!key) return;
    const cache = readCache();
    cache[key] = { value, createdAt: new Date().toISOString() };
    writeCache(cache);
  } catch (err) {
    console.warn('setCachedCitation error', err?.message || err);
  }
}

export async function verifyDOI(doi) {
  try {
    const url = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) return null;
    const j = await res.json();
    const item = j.message;
    return {
      title: item.title?.[0] || null,
      authors: (item.author || []).map(a => [a.given, a.family].filter(Boolean).join(' ')).join(', '),
      year: item.issued?.['date-parts']?.[0]?.[0] || null,
      doi: item.DOI || doi,
      source: 'crossref',
      verified: true,
      raw: item,
    };
  } catch (err) {
    console.warn('verifyDOI error', err?.message || err);
    return null;
  }
}

export async function verifyPMID(pmid) {
  try {
    // Use NCBI ESummary to fetch basic metadata
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${encodeURIComponent(pmid)}&retmode=json`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) return null;
    const j = await res.json();
    const doc = j.result?.[pmid];
    if (!doc) return null;
    return {
      title: doc.title || null,
      authors: (doc.authors || []).map(a => a.name).join(', '),
      year: doc.pubdate ? doc.pubdate.split(' ')[0] : null,
      pmid,
      source: 'pubmed',
      verified: true,
      raw: doc,
    };
  } catch (err) {
    console.warn('verifyPMID error', err?.message || err);
    return null;
  }
}

export async function verifyCitation(c) {
  // c: {doi, pmid, title, authors, year}
  try {
    // consult cache first
    const cached = await getCachedCitation(c);
    if (cached) {
      return { ...c, verified: cached.verified || false, metadata: cached.metadata || cached, fromCache: true };
    }
    if (c.doi) {
      const v = await verifyDOI(c.doi);
      if (v) return { ...c, verified: true, metadata: v };
    }
    if (c.pmid) {
      const v = await verifyPMID(c.pmid);
      if (v) return { ...c, verified: true, metadata: v };
    }
    // No doi/pmid or verification failed
    // cache negative result (to avoid repeated failed lookups)
    await setCachedCitation(c, { verified: false });
    return { ...c, verified: false };
  } catch (err) {
    console.warn('verifyCitation error', err?.message || err);
    return { ...c, verified: false };
  }
}

export async function verifyCitationsList(list) {
  if (!Array.isArray(list)) return [];
  const out = await Promise.all(list.map(async (c) => {
    const res = await verifyCitation(c);
    // store positive verification in cache
    try {
      if (res.verified && (c.doi || c.pmid || c.title)) {
        await setCachedCitation(c, { verified: true, metadata: res.metadata || null });
      }
    } catch (e) {
      // ignore cache errors
    }
    return res;
  }));
  return out;
}
