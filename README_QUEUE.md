BullMQ / Redis queue (optional)
================================

This project ships a simple file-backed job queue for development (`lib/jobQueue.js` + `workers/evidenceWorker.js`). For more reliable background processing (multiple workers, retries), you can enable Redis + BullMQ.

1) Install dependencies locally:

```bash
npm install bullmq ioredis
```

2) Set environment variables (example):

```bash
export REDIS_URL=redis://127.0.0.1:6379
export USE_BULL=true
export ASYNC_JOBS=true
```

3) Start the Next app as usual (`npm run dev`). When `USE_BULL=true` and `ASYNC_JOBS=true`, the API will enqueue jobs into Redis instead of the file queue.

4) Start the Bull worker in another terminal:

```bash
node workers/bullWorker.js
```

5) (Optional) Migrate existing pending file-backed jobs into Redis:

```bash
node scripts/migrate-to-bull.js
```

Notes
- The Bull worker writes processed outputs to `data/processedPrograms/<jobId>.json` so the existing polling endpoint `/api/job-status/[jobId]` still works.
- For production, run Redis in a managed service or container and scale workers as needed.
