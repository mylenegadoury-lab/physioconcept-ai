/**
 * Schema validation helpers for API requests
 */

export function validateGenerateRequest(body) {
  const errors = [];

  // Either patientFolderText OR structured fields required
  if (!body.patientFolderText) {
    if (!body.problematique || typeof body.problematique !== 'string') {
      errors.push('problematique is required');
    }
    if (!body.painIntensity || isNaN(Number(body.painIntensity))) {
      errors.push('painIntensity must be a number');
    }
    if (!body.painDuration || typeof body.painDuration !== 'string') {
      errors.push('painDuration is required');
    }
  }

  // Optional fields validation
  if (body.painIntensity && (Number(body.painIntensity) < 0 || Number(body.painIntensity) > 10)) {
    errors.push('painIntensity must be between 0 and 10');
  }

  if (body.fearLevel && (Number(body.fearLevel) < 0 || Number(body.fearLevel) > 10)) {
    errors.push('fearLevel must be between 0 and 10');
  }

  if (body.patientAge && (isNaN(Number(body.patientAge)) || Number(body.patientAge) < 0 || Number(body.patientAge) > 120)) {
    errors.push('patientAge must be a valid number between 0 and 120');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  // Basic XSS prevention
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export function validateJobId(jobId) {
  if (!jobId || typeof jobId !== 'string') return false;
  // UUID v4 format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(jobId);
}
