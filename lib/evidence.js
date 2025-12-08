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
    if (c.doi) {
      const v = await verifyDOI(c.doi);
      if (v) return { ...c, verified: true, metadata: v };
    }
    if (c.pmid) {
      const v = await verifyPMID(c.pmid);
      if (v) return { ...c, verified: true, metadata: v };
    }
    // No doi/pmid or verification failed
    return { ...c, verified: false };
  } catch (err) {
    console.warn('verifyCitation error', err?.message || err);
    return { ...c, verified: false };
  }
}

export async function verifyCitationsList(list) {
  if (!Array.isArray(list)) return [];
  const out = await Promise.all(list.map(async (c) => await verifyCitation(c)));
  return out;
}
