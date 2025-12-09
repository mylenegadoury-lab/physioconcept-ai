import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function getAuthHeaders() {
  const secret = typeof window !== 'undefined' ? localStorage.getItem('admin_secret') : null;
  return secret ? { 'x-admin-auth': secret } : {};
}

export default function ImageCacheAdmin() {
  const [cache, setCache] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCache();
  }, []);

  async function fetchCache() {
    setLoading(true);
    const res = await fetch("/api/image-cache");
    const j = await res.json();
    setCache(j.cache || {});
    setLoading(false);
  }

  async function clearCache() {
    if (!confirm("Vider le cache des images ?")) return;
    setLoading(true);
    await fetch("/api/image-cache", { method: "DELETE" });
    await fetchCache();
    setLoading(false);
  }

  async function migrateCache() {
    if (!confirm("Normaliser les clés du cache maintenant ?")) return;
    setLoading(true);
    const res = await fetch("/api/image-cache/migrate", { method: "POST" });
    const j = await res.json();
    alert(`Migration terminée : ${j.migrated} clés migrées, ${j.keys} clés totales`);
    await fetchCache();
    setLoading(false);
  }

  return (
    <Layout>
      <h1>Admin — Cache d'images</h1>
      <p>Visualisez et videz le cache des images utilisées pour les exercices.</p>
      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <button onClick={clearCache} disabled={loading} style={{ padding: "8px 12px", borderRadius: 6 }}>
          {loading ? "..." : "Vider le cache"}
        </button>
        <button onClick={migrateCache} disabled={loading} style={{ padding: "8px 12px", borderRadius: 6, marginLeft: 8 }}>
          {loading ? "..." : "Normaliser les clés"}
        </button>
        <button onClick={fetchCache} disabled={loading} style={{ padding: "8px 12px", borderRadius: 6, marginLeft: 8 }}>
          Rafraîchir
        </button>
      </div>

      {cache === null ? (
        <p>Chargement...</p>
      ) : (
        <div>
          {Object.keys(cache).length === 0 ? (
            <p>Cache vide.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: 8 }}>Prompt (clé)</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Source</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Image</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Créé le</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cache).map(([k, v]) => (
                  <tr key={k} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: 8, maxWidth: 400, wordBreak: "break-word" }}>{k}</td>
                    <td style={{ padding: 8 }}>{v.source}</td>
                    <td style={{ padding: 8 }}>
                      <a href={v.url} target="_blank" rel="noreferrer">Voir</a>
                    </td>
                    <td style={{ padding: 8 }}>{new Date(v.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </Layout>
  );
}
