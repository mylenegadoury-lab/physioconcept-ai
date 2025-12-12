/**
 * Supabase Client Configuration
 * Evidence-Based Exercise Library Database
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables - À configurer dans .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase client instance (singleton)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'X-Client-Info': 'physioconcept-ai-v1',
    },
  },
});

// ============================================
// EXERCISES QUERIES
// ============================================

/**
 * Get exercises by body region with evidence
 * @param {string} bodyRegion - 'lumbar', 'knee', 'shoulder', etc.
 * @param {object} filters - Additional filters
 * @returns {Promise<Array>} Exercises with evidence
 */
export async function getExercisesByRegion(bodyRegion, filters = {}) {
  // Use exercises table directly instead of view for better performance
  let query = supabase
    .from('exercises')
    .select('*')
    .eq('body_region', bodyRegion)
    .eq('status', 'active');

  // Apply additional filters
  if (filters.difficulty) {
    query = query.eq('difficulty_level', filters.difficulty);
  }
  if (filters.exerciseType) {
    query = query.eq('exercise_type', filters.exerciseType);
  }
  if (filters.minEffectiveness) {
    query = query.gte('effectiveness_score', filters.minEffectiveness);
  }
  if (filters.evidenceLevel) {
    query = query.in('evidence_level', filters.evidenceLevel);
  }

  // Order by effectiveness
  query = query.order('effectiveness_score', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching exercises:', error);
    throw new Error(`Failed to fetch exercises: ${error.message}`);
  }

  return data || [];
}

/**
 * Get exercise by ID with full details
 * @param {string} exerciseId - Exercise ID
 * @returns {Promise<object>} Exercise with studies
 */
export async function getExerciseById(exerciseId) {
  const { data, error } = await supabase
    .from('exercises_with_evidence')
    .select('*')
    .eq('id', exerciseId)
    .single();

  if (error) {
    console.error('Error fetching exercise:', error);
    throw new Error(`Failed to fetch exercise: ${error.message}`);
  }

  // Fetch associated studies
  const { data: studies, error: studiesError } = await supabase
    .from('exercise_studies')
    .select('*, studies(*)')
    .eq('exercise_id', exerciseId)
    .order('relevance_score', { ascending: false });

  if (!studiesError && studies) {
    data.studies = studies.map(s => s.studies);
  }

  return data;
}

/**
 * Search exercises by text (full-text search)
 * @param {string} searchText - Search query
 * @param {object} filters - Additional filters
 * @returns {Promise<Array>} Matching exercises
 */
export async function searchExercises(searchText, filters = {}) {
  let query = supabase
    .from('exercises')
    .select('*')
    .textSearch('tsv', searchText, {
      type: 'websearch',
      config: 'french',
    })
    .eq('status', 'active');

  // Apply filters
  if (filters.bodyRegion) {
    query = query.eq('body_region', filters.bodyRegion);
  }

  query = query.order('effectiveness_score', { ascending: false }).limit(50);

  const { data, error } = await query;

  if (error) {
    console.error('Error searching exercises:', error);
    throw new Error(`Failed to search exercises: ${error.message}`);
  }

  return data || [];
}

/**
 * Get exercises for specific clinical indication
 * @param {string} indication - Clinical condition
 * @returns {Promise<Array>} Recommended exercises
 */
export async function getExercisesForIndication(indication) {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .contains('primary_indications', [indication])
    .eq('status', 'active')
    .order('effectiveness_score', { ascending: false });

  if (error) {
    console.error('Error fetching exercises for indication:', error);
    throw new Error(`Failed to fetch exercises: ${error.message}`);
  }

  return data || [];
}

// ============================================
// PROTOCOLS QUERIES
// ============================================

/**
 * Get protocol by condition with exercises
 * @param {string} condition - Clinical condition
 * @param {object} filters - Phase, severity filters
 * @returns {Promise<object>} Protocol with exercises
 */
export async function getProtocolByCondition(condition, filters = {}) {
  let query = supabase
    .from('protocols')
    .select('*')
    .eq('condition', condition)
    .eq('status', 'active');

  if (filters.phase) {
    query = query.eq('phase', filters.phase);
  }
  if (filters.severity) {
    query = query.eq('severity', filters.severity);
  }

  query = query.order('evidence_level', { ascending: true }).limit(1);

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    console.error('Error fetching protocol:', error);
    return null;
  }

  const protocol = data[0];

  // Fetch exercises for this protocol
  const { data: protocolExercises, error: exError } = await supabase
    .from('protocol_exercises')
    .select('*, exercises(*)')
    .eq('protocol_id', protocol.id)
    .order('week_start', { ascending: true })
    .order('order_in_session', { ascending: true });

  if (!exError && protocolExercises) {
    protocol.exercises = protocolExercises;
  }

  // Fetch progressions
  const { data: progressions, error: progError } = await supabase
    .from('progressions')
    .select('*')
    .eq('protocol_id', protocol.id)
    .order('week_number', { ascending: true });

  if (!progError && progressions) {
    protocol.progressions = progressions;
  }

  return protocol;
}

/**
 * Get all protocols for a condition
 * @param {string} condition - Clinical condition
 * @returns {Promise<Array>} Available protocols
 */
export async function getAllProtocols(condition = null) {
  let query = supabase
    .from('protocols_with_exercises')
    .select('*')
    .eq('status', 'active');

  if (condition) {
    query = query.eq('condition', condition);
  }

  query = query.order('evidence_level', { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching protocols:', error);
    throw new Error(`Failed to fetch protocols: ${error.message}`);
  }

  return data || [];
}

// ============================================
// STUDIES QUERIES
// ============================================

/**
 * Get studies by condition/keyword
 * @param {string} keyword - Search term
 * @param {object} filters - Evidence level, year filters
 * @returns {Promise<Array>} Matching studies
 */
export async function getStudies(keyword, filters = {}) {
  let query = supabase
    .from('studies')
    .select('*')
    .textSearch('tsv', keyword, { type: 'websearch' });

  if (filters.evidenceLevel) {
    query = query.in('evidence_level', filters.evidenceLevel);
  }
  if (filters.minYear) {
    query = query.gte('year', filters.minYear);
  }
  if (filters.minPedroScore) {
    query = query.gte('pedro_score', filters.minPedroScore);
  }

  query = query.order('year', { ascending: false }).order('effectiveness_score', { ascending: false });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching studies:', error);
    throw new Error(`Failed to fetch studies: ${error.message}`);
  }

  return data || [];
}

/**
 * Get study by ID
 * @param {string} studyId - Study ID
 * @returns {Promise<object>} Study details
 */
export async function getStudyById(studyId) {
  const { data, error } = await supabase
    .from('studies')
    .select('*')
    .eq('id', studyId)
    .single();

  if (error) {
    console.error('Error fetching study:', error);
    throw new Error(`Failed to fetch study: ${error.message}`);
  }

  return data;
}

// ============================================
// CLINICAL GUIDELINES QUERIES
// ============================================

/**
 * Get clinical guidelines by condition
 * @param {string} condition - Clinical condition
 * @returns {Promise<Array>} Guidelines
 */
export async function getGuidelinesByCondition(condition) {
  const { data, error } = await supabase
    .from('clinical_guidelines')
    .select('*')
    .eq('condition', condition)
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching guidelines:', error);
    throw new Error(`Failed to fetch guidelines: ${error.message}`);
  }

  return data || [];
}

/**
 * Get guidelines by organization
 * @param {string} organization - 'APTA', 'AAOS', etc.
 * @returns {Promise<Array>} Guidelines
 */
export async function getGuidelinesByOrganization(organization) {
  const { data, error } = await supabase
    .from('clinical_guidelines')
    .select('*')
    .eq('organization', organization)
    .order('year', { ascending: false });

  if (error) {
    console.error('Error fetching guidelines:', error);
    throw new Error(`Failed to fetch guidelines: ${error.message}`);
  }

  return data || [];
}

// ============================================
// QUALITY METRICS QUERIES
// ============================================

/**
 * Get quality dashboard metrics
 * @returns {Promise<object>} Quality metrics summary
 */
export async function getQualityDashboard() {
  const { data, error } = await supabase
    .from('quality_dashboard')
    .select('*');

  if (error) {
    console.error('Error fetching quality dashboard:', error);
    throw new Error(`Failed to fetch quality metrics: ${error.message}`);
  }

  // Transform array to object for easier access
  const metrics = {};
  data.forEach(row => {
    metrics[row.category] = row;
  });

  return metrics;
}

/**
 * Get items needing review
 * @returns {Promise<object>} Items requiring review
 */
export async function getItemsNeedingReview() {
  const [exercises, protocols, studies] = await Promise.all([
    supabase
      .from('exercises')
      .select('id, name_fr, last_reviewed_date, next_review_date')
      .or('status.eq.under-review,next_review_date.lt.' + new Date().toISOString()),
    
    supabase
      .from('protocols')
      .select('id, name, last_reviewed_date')
      .or('status.eq.under-review,last_reviewed_date.lt.' + new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString()),
    
    supabase
      .from('studies')
      .select('id, title, next_review_date')
      .lt('next_review_date', new Date().toISOString()),
  ]);

  return {
    exercises: exercises.data || [],
    protocols: protocols.data || [],
    studies: studies.data || [],
  };
}

// ============================================
// ADMIN MUTATIONS
// ============================================

/**
 * Create new exercise
 * @param {object} exercise - Exercise data
 * @param {string} createdBy - User identifier
 * @returns {Promise<object>} Created exercise
 */
export async function createExercise(exercise, createdBy) {
  const { data, error } = await supabase
    .from('exercises')
    .insert({
      ...exercise,
      created_by: createdBy,
      created_at: new Date().toISOString(),
      status: 'under-review', // Require review before activation
      next_review_date: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(), // 6 months
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating exercise:', error);
    throw new Error(`Failed to create exercise: ${error.message}`);
  }

  return data;
}

/**
 * Update exercise
 * @param {string} exerciseId - Exercise ID
 * @param {object} updates - Updated fields
 * @param {string} updatedBy - User identifier
 * @returns {Promise<object>} Updated exercise
 */
export async function updateExercise(exerciseId, updates, updatedBy) {
  const { data, error } = await supabase
    .from('exercises')
    .update({
      ...updates,
      version: supabase.rpc('increment_version', { x: 1 }), // Increment version
      updated_at: new Date().toISOString(),
    })
    .eq('id', exerciseId)
    .select()
    .single();

  if (error) {
    console.error('Error updating exercise:', error);
    throw new Error(`Failed to update exercise: ${error.message}`);
  }

  return data;
}

/**
 * Link exercise to study
 * @param {string} exerciseId - Exercise ID
 * @param {string} studyId - Study ID
 * @param {number} relevanceScore - 1-10
 * @returns {Promise<object>} Link record
 */
export async function linkExerciseToStudy(exerciseId, studyId, relevanceScore = 10) {
  const { data, error } = await supabase
    .from('exercise_studies')
    .insert({
      exercise_id: exerciseId,
      study_id: studyId,
      relevance_score: relevanceScore,
    })
    .select()
    .single();

  if (error) {
    console.error('Error linking exercise to study:', error);
    throw new Error(`Failed to link exercise to study: ${error.message}`);
  }

  return data;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Calculate evidence strength score
 * @param {string} evidenceLevel - '1A', '1B', etc.
 * @param {number} effectivenessScore - 0-100
 * @param {number} studyCount - Number of supporting studies
 * @returns {number} Composite score 0-100
 */
export function calculateEvidenceStrength(evidenceLevel, effectivenessScore, studyCount = 1) {
  const levelWeights = {
    '1A': 1.0,
    '1B': 0.9,
    '2A': 0.75,
    '2B': 0.6,
    '3A': 0.45,
    '3B': 0.3,
    '4': 0.15,
    '5': 0.05,
  };

  const levelWeight = levelWeights[evidenceLevel] || 0.5;
  const studyWeight = Math.min(studyCount / 5, 1); // Max weight at 5+ studies

  return Math.round(effectivenessScore * levelWeight * (0.7 + 0.3 * studyWeight));
}

/**
 * Format citation
 * @param {object} study - Study object
 * @returns {string} APA-style citation
 */
export function formatCitation(study) {
  return `${study.authors} (${study.year}). ${study.title}. ${study.journal}. ${study.doi ? `https://doi.org/${study.doi}` : ''}`;
}

export default supabase;
