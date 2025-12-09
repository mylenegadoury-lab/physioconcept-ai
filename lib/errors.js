/**
 * Centralized error handling utilities
 */

export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

/**
 * Safe error response for API - don't leak internal details
 */
export function errorResponse(error, isDev = false) {
  const response = {
    error: error.message || 'Internal server error'
  };

  if (error instanceof AppError) {
    response.statusCode = error.statusCode;
    if (error.details) response.details = error.details;
  } else {
    response.statusCode = 500;
    // Only show stack trace in dev
    if (isDev && error.stack) {
      response.stack = error.stack;
    }
  }

  return response;
}

/**
 * Log error safely (can be extended with external logging service)
 */
export function logError(error, context = {}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    message: error.message,
    stack: error.stack,
    context,
    ...(error.statusCode && { statusCode: error.statusCode })
  };

  // Console log for now, can extend to Winston/Pino/DataDog
  console.error('[ERROR]', JSON.stringify(logEntry, null, 2));
}

/**
 * Async error wrapper for API routes
 */
export function asyncHandler(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      logError(error, { url: req.url, method: req.method });
      const errorRes = errorResponse(error, process.env.NODE_ENV === 'development');
      res.status(errorRes.statusCode || 500).json(errorRes);
    }
  };
}
