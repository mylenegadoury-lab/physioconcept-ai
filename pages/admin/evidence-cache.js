import React, { useEffect, useState } from 'react';

function getAuthHeaders() {
  const secret = typeof window !== 'undefined' ? localStorage.getItem('admin_secret') : null;
  return secret ? { 'x-admin-auth': secret } : {};
}

export default function EvidenceCacheAdmin() {
  const [cache, setCache] = useState(null);

  async function fetchCache() {
    const res = await fetch('/api/evidence-cache', { headers: getAuthHeaders() });
    const j = await res.json();
    setCache(j);
  }

  useEffect(() => { fetchCache(); }, []);

  if (!cache) return <div>Loading...</div>;

  const keys = Object.keys(cache).sort();

  return (
    <div style={{ padding: 20 }}>
      <h2>Evidence Cache</h2>
      <button onClick={fetchCache}>Refresh</button>
      <button style={{ marginLeft: 8 }} onClick={async () => { await fetch('/api/evidence-cache', { method: 'DELETE', headers: getAuthHeaders() }); fetchCache(); }}>Clear All</button>
      <div style={{ marginTop: 16 }}>
        {keys.length === 0 && <div>No cached entries</div>}
        {keys.map(k => (
          <div key={k} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
            <div><strong>Key:</strong> {k}</div>
            <div><strong>Data:</strong> <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(cache[k], null, 2)}</pre></div>
            <div>
              <button onClick={async () => { await fetch('/api/evidence-cache/approve', { method: 'POST', headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify({ key: k, approved: true }) }); fetchCache(); }}>Approve</button>
              <button style={{ marginLeft: 8 }} onClick={async () => { await fetch('/api/evidence-cache/approve', { method: 'POST', headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify({ key: k, approved: false }) }); fetchCache(); }}>Unapprove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
