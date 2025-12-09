import React, { useEffect, useState } from 'react';

function getAuthHeaders() {
  const secret = typeof window !== 'undefined' ? localStorage.getItem('admin_secret') : null;
  return secret ? { 'x-admin-auth': secret } : {};
}

export default function JobsAdmin() {
  const [jobs, setJobs] = useState(null);
  const [processed, setProcessed] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);
  const [migrating, setMigrating] = useState(false);
  const [authError, setAuthError] = useState(false);

  async function fetchJobs() {
    try {
      const r = await fetch('/api/jobs', { headers: getAuthHeaders() });
      if (r.status === 401) { setAuthError(true); return; }
      setJobs(await r.json());
    } catch (e) {
      console.error('Fetch jobs failed:', e);
    }
  }

  async function fetchProcessed() {
    try {
      const r = await fetch('/api/processed-programs', { headers: getAuthHeaders() });
      if (r.status === 401) { setAuthError(true); return; }
      setProcessed(await r.json());
    } catch (e) {
      console.error('Fetch processed failed:', e);
    }
  }

  async function fetchQueueStatus() {
    const r = await fetch('/api/queue-status');
    setQueueStatus(await r.json());
  }

  async function doMigrate() {
    if (!confirm('Migrate queued file-backed jobs into Redis/Bull?')) return;
    setMigrating(true);
    try {
      const r = await fetch('/api/migrate-jobs', { method: 'POST', headers: getAuthHeaders() });
      if (r.status === 401) { setAuthError(true); return; }
      const j = await r.json();
      alert(`Migrated ${j.migrated} jobs`);
      fetchJobs(); fetchProcessed(); fetchQueueStatus();
    } catch (e) {
      alert('Migration failed: ' + (e?.message || e));
    } finally { setMigrating(false); }
  }

  useEffect(() => {
    // Check for admin secret
    if (!localStorage.getItem('admin_secret')) {
      const secret = prompt('Admin password:');
      if (secret) localStorage.setItem('admin_secret', secret);
      else { setAuthError(true); return; }
    }
    fetchJobs(); fetchProcessed(); fetchQueueStatus();
  }, []);

  if (authError) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Authentication Required</h2>
        <p>Invalid or missing admin credentials.</p>
        <button onClick={() => { localStorage.removeItem('admin_secret'); window.location.reload(); }}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Jobs / Worker</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => { fetchJobs(); fetchProcessed(); fetchQueueStatus(); }}>Refresh</button>
        <span style={{ marginLeft: 12 }}>
          {queueStatus ? (
            <>
              <strong>Queue:</strong> {queueStatus.useBull ? 'BullMQ (Redis)' : 'File-backed'}
              <span style={{ marginLeft: 8 }}><strong>Async:</strong> {queueStatus.asyncJobs ? 'enabled' : 'disabled'}</span>
            </>
          ) : 'Checking queue...'}
        </span>
        {queueStatus && queueStatus.useBull && (
          <button style={{ marginLeft: 12 }} disabled={migrating} onClick={doMigrate}>{migrating ? 'Migrating…' : 'Migrate pending jobs to Bull'}</button>
        )}
      </div>

      <section style={{ marginBottom: 20 }}>
        <h3>Pending Jobs</h3>
        {!jobs && <div>Loading...</div>}
        {jobs && jobs.length === 0 && <div>No pending jobs</div>}
        {jobs && jobs.map(j => (
          <div key={j.id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <div><strong>Id:</strong> {j.id}</div>
            <div><strong>Type:</strong> {j.type}</div>
            <div><strong>Created:</strong> {j.createdAt}</div>
            <div style={{ marginTop: 8 }}>
              <button onClick={async () => { await fetch('/api/jobs', { method: 'POST', headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify({ jobId: j.id }) }); fetchJobs(); }}>Re-enqueue</button>
              <button style={{ marginLeft: 8 }} onClick={async () => { await fetch('/api/jobs', { method: 'DELETE', headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify({ jobId: j.id }) }); fetchJobs(); }}>Delete</button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3>Processed Programs</h3>
        {!processed && <div>Loading...</div>}
        {processed && processed.length === 0 && <div>No processed outputs</div>}
        {processed && processed.map(p => (
          <div key={p.id} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <div><strong>JobId:</strong> {p.id}</div>
            <div style={{ marginTop: 8 }}>
              <a href={`/api/job-status/${p.id}`} target="_blank" rel="noreferrer">View JSON</a>
              <button style={{ marginLeft: 8 }} onClick={async () => { await fetch('/api/processed-programs', { method: 'DELETE', headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' }, body: JSON.stringify({ id: p.id }) }); fetchProcessed(); }}>Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
