/**
 * Application constants and configuration
 */

export const MODELS = {
  GPT4: 'gpt-4',
  GPT4O_MINI: 'gpt-4o-mini',
  GPT35: 'gpt-3.5-turbo',
};

export const OPENAI_CONFIG = {
  PROGRAM_GENERATION: {
    model: 'gpt-3.5-turbo', // Much faster than GPT-4o-mini for simple selection tasks
    temperature: 0.7,
    maxTokens: 800, // Reduced for faster generation - concise output only
  },
  EVIDENCE_REQUEST: {
    model: MODELS.GPT4,
    temperature: 0,
    maxTokens: 1500,
  },
  INSTRUCTIONS_GENERATION: {
    model: MODELS.GPT4,
    temperature: 0.2,
    maxTokens: 1200,
  },
};

export const CACHE_TTL = {
  IMAGE: 30 * 24 * 60 * 60 * 1000, // 30 days
  EVIDENCE: 365 * 24 * 60 * 60 * 1000, // 1 year
};

export const EXERCISE_LIMITS = {
  MIN: 2,
  MAX: 10,
  DEFAULT: 5,
};

export const PAIN_INTENSITY_THRESHOLDS = {
  HIGH: 8,    // >= 8: minimal exercises
  MEDIUM: 6,  // >= 6: moderate exercises
  LOW: 4,     // >= 4: standard exercises
  // < 4: more exercises
};

export const IMAGE_SOURCES = {
  PEXELS: 'pexels',
  UNSPLASH: 'unsplash',
  DALLE: 'dalle',
  PROVIDED: 'provided',
  CACHE: 'cache',
};

export const JOB_TYPES = {
  PROCESS_PROGRAM: 'processProgram',
};

export const JOB_STATUS = {
  QUEUED: 'queued',
  PROCESSING: 'processing',
  DONE: 'done',
  FAILED: 'failed',
};

export const EVIDENCE_LEVELS = {
  '1A': 100,
  '1B': 90,
  '2A': 75,
  '2B': 60,
  '3': 40,
  '4': 25,
  '5': 10,
};

export const API_ENDPOINTS = {
  GENERATE: '/api/generate',
  MEDIA: '/api/media',
  JOBS: '/api/jobs',
  QUEUE_STATUS: '/api/queue-status',
  JOB_STATUS: '/api/job-status',
  EVIDENCE_CACHE: '/api/evidence-cache',
  IMAGE_CACHE: '/api/image-cache',
  PROCESSED_PROGRAMS: '/api/processed-programs',
};

export const ADMIN_PAGES = [
  '/admin/jobs',
  '/admin/evidence-cache',
  '/admin/image-cache',
];

export const WORKER_POLL_INTERVAL = Number(process.env.WORKER_POLL_MS || 3000);
