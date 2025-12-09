export default function handler(req, res) {
  const useBull = process.env.USE_BULL === 'true';
  const asyncJobs = process.env.ASYNC_JOBS === 'true';
  const redis = process.env.REDIS_URL || process.env.REDIS || null;
  return res.status(200).json({ useBull, asyncJobs, redis });
}
