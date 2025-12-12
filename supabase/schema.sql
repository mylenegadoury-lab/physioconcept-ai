-- ============================================
-- PHYSIOCONCEPT AI - DATABASE SCHEMA
-- Evidence-Based Exercise Library
-- Version: 1.0.0
-- Date: 2025-12-11
-- ============================================

-- ============================================
-- 1. SCIENTIFIC STUDIES TABLE
-- Toutes les études scientifiques de référence
-- ============================================
CREATE TABLE IF NOT EXISTS studies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  year INTEGER NOT NULL,
  journal TEXT NOT NULL,
  doi TEXT UNIQUE,
  pmid TEXT UNIQUE,
  
  -- Evidence Quality
  study_type TEXT NOT NULL CHECK (study_type IN ('RCT', 'Meta-Analysis', 'Systematic Review', 'Cohort', 'Case-Control')),
  evidence_level TEXT NOT NULL CHECK (evidence_level IN ('1A', '1B', '2A', '2B', '3A', '3B', '4', '5')),
  pedro_score INTEGER CHECK (pedro_score BETWEEN 0 AND 10),
  sample_size INTEGER,
  
  -- Results
  effectiveness_score INTEGER CHECK (effectiveness_score BETWEEN 0 AND 100),
  nnt INTEGER, -- Number Needed to Treat
  conclusion TEXT NOT NULL,
  statistical_significance TEXT,
  
  -- Quality Metadata
  quality_evidence TEXT CHECK (quality_evidence IN ('High', 'Moderate', 'Low', 'Very Low')),
  risk_of_bias TEXT CHECK (risk_of_bias IN ('Low', 'Some concerns', 'High')),
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_by TEXT,
  last_reviewed_date DATE,
  next_review_date DATE,
  
  -- Search optimization
  tsv tsvector GENERATED ALWAYS AS (
    to_tsvector('english', title || ' ' || authors || ' ' || conclusion)
  ) STORED
);

CREATE INDEX idx_studies_evidence_level ON studies(evidence_level);
CREATE INDEX idx_studies_year ON studies(year DESC);
CREATE INDEX idx_studies_tsv ON studies USING GIN(tsv);
CREATE INDEX idx_studies_doi ON studies(doi);
CREATE INDEX idx_studies_pmid ON studies(pmid);

-- ============================================
-- 2. EXERCISES TABLE
-- Bibliothèque complète d'exercices validés
-- ============================================
CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  
  -- Anatomical Classification
  body_region TEXT NOT NULL CHECK (body_region IN (
    'lumbar', 'cervical', 'thoracic', 'shoulder', 'elbow', 'wrist', 
    'hip', 'knee', 'ankle', 'foot', 'full-body'
  )),
  muscle_groups TEXT[], -- Array: ['quadriceps', 'hamstrings']
  joint_actions TEXT[], -- Array: ['knee_extension', 'hip_flexion']
  
  -- Exercise Type
  exercise_type TEXT NOT NULL CHECK (exercise_type IN (
    'strength', 'mobility', 'stability', 'proprioception', 
    'cardiovascular', 'flexibility', 'neuromuscular-control'
  )),
  equipment_required TEXT[], -- Array: ['resistance_band', 'none']
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  
  -- Clinical Indications
  primary_indications TEXT[] NOT NULL, -- Conditions principales
  secondary_indications TEXT[], -- Conditions secondaires
  
  -- Contraindications
  absolute_contraindications TEXT[] DEFAULT '{}',
  relative_contraindications TEXT[] DEFAULT '{}',
  precautions TEXT[] DEFAULT '{}',
  red_flags TEXT[] DEFAULT '{}',
  
  -- Evidence-Based Dosage
  reps_min INTEGER,
  reps_max INTEGER,
  reps_optimal INTEGER,
  sets_min INTEGER,
  sets_max INTEGER,
  sets_optimal INTEGER,
  frequency_per_week INTEGER,
  duration_weeks INTEGER,
  rest_seconds INTEGER,
  tempo TEXT, -- '3-0-1-0' format
  
  -- Progressions & Regressions
  regression_exercise_id TEXT REFERENCES exercises(id),
  progression_exercise_id TEXT REFERENCES exercises(id),
  
  -- Instructions
  description TEXT NOT NULL,
  instructions_patient TEXT NOT NULL,
  instructions_professional TEXT NOT NULL,
  key_points TEXT[] NOT NULL,
  common_errors TEXT[] DEFAULT '{}',
  
  -- Scientific Evidence
  evidence_level TEXT NOT NULL CHECK (evidence_level IN ('1A', '1B', '2A', '2B', '3A', '3B', '4', '5')),
  effectiveness_score INTEGER CHECK (effectiveness_score BETWEEN 0 AND 100),
  confidence_interval TEXT, -- '95% CI: 0.45-0.78'
  
  -- Media
  image_url TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  
  -- Quality Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT,
  reviewed_by TEXT,
  last_reviewed_date DATE,
  next_review_date DATE,
  version INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'under-review', 'deprecated')),
  
  -- Search optimization
  tsv tsvector GENERATED ALWAYS AS (
    to_tsvector('french', name_fr || ' ' || description || ' ' || ARRAY_TO_STRING(primary_indications, ' '))
  ) STORED
);

CREATE INDEX idx_exercises_body_region ON exercises(body_region);
CREATE INDEX idx_exercises_type ON exercises(exercise_type);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty_level);
CREATE INDEX idx_exercises_evidence ON exercises(evidence_level, effectiveness_score DESC);
CREATE INDEX idx_exercises_status ON exercises(status);
CREATE INDEX idx_exercises_tsv ON exercises USING GIN(tsv);
CREATE INDEX idx_exercises_indications ON exercises USING GIN(primary_indications);

-- ============================================
-- 3. EXERCISE_STUDIES (Junction Table)
-- Lien exercices ↔ études scientifiques
-- ============================================
CREATE TABLE IF NOT EXISTS exercise_studies (
  exercise_id TEXT REFERENCES exercises(id) ON DELETE CASCADE,
  study_id TEXT REFERENCES studies(id) ON DELETE CASCADE,
  relevance_score INTEGER CHECK (relevance_score BETWEEN 1 AND 10),
  notes TEXT,
  PRIMARY KEY (exercise_id, study_id)
);

CREATE INDEX idx_exercise_studies_exercise ON exercise_studies(exercise_id);
CREATE INDEX idx_exercise_studies_study ON exercise_studies(study_id);

-- ============================================
-- 4. PROTOCOLS TABLE
-- Protocoles de traitement par condition
-- ============================================
CREATE TABLE IF NOT EXISTS protocols (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  condition TEXT NOT NULL, -- 'lumbar_chronic_pain', 'knee_oa'
  
  -- Classification
  phase TEXT CHECK (phase IN ('acute', 'subacute', 'chronic', 'maintenance')),
  severity TEXT CHECK (severity IN ('mild', 'moderate', 'severe')),
  
  -- Protocol Details
  description TEXT NOT NULL,
  goals TEXT[] NOT NULL,
  duration_weeks INTEGER NOT NULL,
  frequency_per_week INTEGER NOT NULL,
  
  -- Clinical Guidelines
  inclusion_criteria TEXT[] NOT NULL,
  exclusion_criteria TEXT[] NOT NULL,
  red_flags_check TEXT[] NOT NULL,
  
  -- Expected Outcomes
  expected_pain_reduction INTEGER, -- Percentage
  expected_function_improvement INTEGER, -- Percentage
  success_rate INTEGER CHECK (success_rate BETWEEN 0 AND 100),
  
  -- Evidence
  evidence_level TEXT NOT NULL CHECK (evidence_level IN ('1A', '1B', '2A', '2B', '3A', '3B', '4', '5')),
  guideline_organizations TEXT[], -- ['APTA', 'AAOS']
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT,
  reviewed_by TEXT,
  last_reviewed_date DATE,
  version INTEGER DEFAULT 1,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'under-review', 'deprecated'))
);

CREATE INDEX idx_protocols_condition ON protocols(condition);
CREATE INDEX idx_protocols_phase ON protocols(phase);
CREATE INDEX idx_protocols_status ON protocols(status);

-- ============================================
-- 5. PROTOCOL_EXERCISES (Junction Table)
-- Exercices dans chaque protocole avec ordre
-- ============================================
CREATE TABLE IF NOT EXISTS protocol_exercises (
  protocol_id TEXT REFERENCES protocols(id) ON DELETE CASCADE,
  exercise_id TEXT REFERENCES exercises(id) ON DELETE RESTRICT,
  
  -- Ordering & Phasing
  week_start INTEGER NOT NULL,
  week_end INTEGER NOT NULL,
  order_in_session INTEGER NOT NULL,
  priority TEXT CHECK (priority IN ('essential', 'recommended', 'optional')),
  
  -- Dosage Overrides (if different from exercise defaults)
  custom_reps INTEGER,
  custom_sets INTEGER,
  custom_frequency INTEGER,
  custom_notes TEXT,
  
  PRIMARY KEY (protocol_id, exercise_id, week_start)
);

CREATE INDEX idx_protocol_exercises_protocol ON protocol_exercises(protocol_id);
CREATE INDEX idx_protocol_exercises_week ON protocol_exercises(week_start, week_end);

-- ============================================
-- 6. PROGRESSIONS TABLE
-- Plans de progression validés 6 semaines
-- ============================================
CREATE TABLE IF NOT EXISTS progressions (
  id TEXT PRIMARY KEY,
  protocol_id TEXT REFERENCES protocols(id) ON DELETE CASCADE,
  
  -- Progression Details
  week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 52),
  phase_name TEXT NOT NULL, -- 'Pain Management', 'Strength Building'
  
  -- Objectives
  objectives TEXT[] NOT NULL,
  progression_criteria TEXT[] NOT NULL, -- Quand progresser
  
  -- Dosage Parameters
  volume_load TEXT, -- 'Low', 'Moderate', 'High'
  intensity TEXT, -- 'Light', 'Moderate', 'Heavy'
  complexity TEXT, -- 'Simple', 'Moderate', 'Complex'
  
  -- Instructions
  focus_areas TEXT[] NOT NULL,
  modifications TEXT[],
  warnings TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_progressions_protocol ON progressions(protocol_id);
CREATE INDEX idx_progressions_week ON progressions(week_number);

-- ============================================
-- 7. CLINICAL_GUIDELINES TABLE
-- Guidelines des organisations professionnelles
-- ============================================
CREATE TABLE IF NOT EXISTS clinical_guidelines (
  id TEXT PRIMARY KEY,
  organization TEXT NOT NULL, -- 'APTA', 'AAOS', 'NICE'
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  condition TEXT NOT NULL,
  
  -- Recommendation
  recommendation TEXT NOT NULL,
  strength TEXT CHECK (strength IN ('Strong', 'Moderate', 'Weak', 'Conditional')),
  quality_of_evidence TEXT CHECK (quality_of_evidence IN ('High', 'Moderate', 'Low', 'Very Low')),
  
  -- Reference
  url TEXT,
  doi TEXT,
  citation TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_guidelines_organization ON clinical_guidelines(organization);
CREATE INDEX idx_guidelines_condition ON clinical_guidelines(condition);
CREATE INDEX idx_guidelines_year ON clinical_guidelines(year DESC);

-- ============================================
-- 8. AUDIT_LOG TABLE
-- Tracking toutes les modifications (version control)
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
  id SERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  
  -- Changes
  old_values JSONB,
  new_values JSONB,
  changed_fields TEXT[],
  
  -- Context
  changed_by TEXT NOT NULL,
  change_reason TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Review
  requires_review BOOLEAN DEFAULT FALSE,
  reviewed BOOLEAN DEFAULT FALSE,
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_audit_table_record ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_timestamp ON audit_log(timestamp DESC);
CREATE INDEX idx_audit_requires_review ON audit_log(requires_review) WHERE requires_review = TRUE;

-- ============================================
-- 9. QUALITY_METRICS TABLE
-- Métriques de qualité calculées automatiquement
-- ============================================
CREATE TABLE IF NOT EXISTS quality_metrics (
  id TEXT PRIMARY KEY,
  metric_type TEXT NOT NULL, -- 'exercise', 'protocol', 'study'
  record_id TEXT NOT NULL,
  
  -- Scores
  overall_quality_score INTEGER CHECK (overall_quality_score BETWEEN 0 AND 100),
  evidence_strength_score INTEGER CHECK (evidence_strength_score BETWEEN 0 AND 100),
  clinical_utility_score INTEGER CHECK (clinical_utility_score BETWEEN 0 AND 100),
  safety_score INTEGER CHECK (safety_score BETWEEN 0 AND 100),
  
  -- Flags
  needs_review BOOLEAN DEFAULT FALSE,
  review_reason TEXT,
  
  -- Calculations
  calculation_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  calculated_by TEXT DEFAULT 'system',
  
  -- Recommendations
  improvement_suggestions TEXT[]
);

CREATE INDEX idx_quality_metrics_type_id ON quality_metrics(metric_type, record_id);
CREATE INDEX idx_quality_metrics_needs_review ON quality_metrics(needs_review) WHERE needs_review = TRUE;

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_studies_updated_at BEFORE UPDATE ON studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON exercises
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_protocols_updated_at BEFORE UPDATE ON protocols
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guidelines_updated_at BEFORE UPDATE ON clinical_guidelines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create audit log entries
CREATE OR REPLACE FUNCTION audit_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO audit_log (table_name, record_id, action, old_values, changed_by)
    VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', row_to_json(OLD), current_user);
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO audit_log (table_name, record_id, action, old_values, new_values, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW), current_user);
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO audit_log (table_name, record_id, action, new_values, changed_by)
    VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', row_to_json(NEW), current_user);
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Apply audit triggers to critical tables
CREATE TRIGGER audit_exercises AFTER INSERT OR UPDATE OR DELETE ON exercises
  FOR EACH ROW EXECUTE FUNCTION audit_changes();

CREATE TRIGGER audit_protocols AFTER INSERT OR UPDATE OR DELETE ON protocols
  FOR EACH ROW EXECUTE FUNCTION audit_changes();

CREATE TRIGGER audit_studies AFTER INSERT OR UPDATE OR DELETE ON studies
  FOR EACH ROW EXECUTE FUNCTION audit_changes();

-- ============================================
-- VIEWS - Queries optimisées fréquentes
-- ============================================

-- Vue: Exercices avec leur évidence complète
CREATE OR REPLACE VIEW exercises_with_evidence AS
SELECT 
  e.*,
  COUNT(DISTINCT es.study_id) as study_count,
  AVG(s.effectiveness_score) as avg_study_effectiveness,
  ARRAY_AGG(DISTINCT s.id) FILTER (WHERE s.id IS NOT NULL) as study_ids,
  ARRAY_AGG(DISTINCT s.doi) FILTER (WHERE s.doi IS NOT NULL) as study_dois
FROM exercises e
LEFT JOIN exercise_studies es ON e.id = es.exercise_id
LEFT JOIN studies s ON es.study_id = s.id
GROUP BY e.id;

-- Vue: Protocoles avec exercices
CREATE OR REPLACE VIEW protocols_with_exercises AS
SELECT 
  p.*,
  COUNT(DISTINCT pe.exercise_id) as exercise_count,
  ARRAY_AGG(DISTINCT e.name_fr ORDER BY pe.week_start, pe.order_in_session) as exercise_names,
  AVG(e.effectiveness_score) as avg_exercise_effectiveness
FROM protocols p
LEFT JOIN protocol_exercises pe ON p.id = pe.protocol_id
LEFT JOIN exercises e ON pe.exercise_id = e.id
GROUP BY p.id;

-- Vue: Dashboard qualité
CREATE OR REPLACE VIEW quality_dashboard AS
SELECT 
  'exercises' as category,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE evidence_level IN ('1A', '1B')) as high_quality_count,
  AVG(effectiveness_score) as avg_effectiveness,
  COUNT(*) FILTER (WHERE status = 'under-review') as needs_review_count,
  COUNT(*) FILTER (WHERE next_review_date < CURRENT_DATE) as overdue_review_count
FROM exercises
UNION ALL
SELECT 
  'protocols' as category,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE evidence_level IN ('1A', '1B')) as high_quality_count,
  AVG(success_rate) as avg_effectiveness,
  COUNT(*) FILTER (WHERE status = 'under-review') as needs_review_count,
  COUNT(*) FILTER (WHERE last_reviewed_date < CURRENT_DATE - INTERVAL '6 months') as overdue_review_count
FROM protocols
UNION ALL
SELECT 
  'studies' as category,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE evidence_level IN ('1A', '1B')) as high_quality_count,
  AVG(effectiveness_score) as avg_effectiveness,
  0 as needs_review_count,
  COUNT(*) FILTER (WHERE next_review_date < CURRENT_DATE) as overdue_review_count
FROM studies;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Public read access to active content
CREATE POLICY "Public read access" ON exercises
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public read access" ON protocols
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public read access" ON studies
  FOR SELECT USING (true);

CREATE POLICY "Public read access" ON clinical_guidelines
  FOR SELECT USING (true);

-- Admin full access (authenticated users with admin role)
CREATE POLICY "Admin full access" ON exercises
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access" ON protocols
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access" ON studies
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access" ON audit_log
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- COMMENTS - Documentation
-- ============================================

COMMENT ON TABLE exercises IS 'Bibliothèque complète d''exercices validés scientifiquement avec dosages, contraindications, et evidence-based data';
COMMENT ON TABLE studies IS 'Base de données des études scientifiques (RCT, méta-analyses) avec scores qualité PEDro et GRADE';
COMMENT ON TABLE protocols IS 'Protocoles de traitement par condition clinique avec progressions 6 semaines validées';
COMMENT ON TABLE audit_log IS 'Journal de toutes les modifications avec version control pour traçabilité complète';
COMMENT ON TABLE quality_metrics IS 'Métriques de qualité calculées automatiquement pour exercices, protocoles et études';

COMMENT ON COLUMN exercises.evidence_level IS 'Oxford CEBM Levels of Evidence: 1A (méta-analyse RCT) → 5 (expert opinion)';
COMMENT ON COLUMN exercises.effectiveness_score IS 'Score 0-100 basé sur effect size, NNT, et qualité études';
COMMENT ON COLUMN exercises.pedro_score IS 'Physiotherapy Evidence Database quality score (0-10)';

-- ============================================
-- INITIAL DATA - Sample for testing
-- ============================================

-- Insert sample study (Hayden 2021 - Gold standard)
INSERT INTO studies (
  id, title, authors, year, journal, doi, pmid,
  study_type, evidence_level, pedro_score, sample_size,
  effectiveness_score, nnt, conclusion,
  quality_evidence, risk_of_bias,
  last_reviewed_date, next_review_date
) VALUES (
  'hayden-2021-exercise',
  'Exercise therapy for chronic low back pain',
  'Hayden JA, Ellis J, Ogilvie R, et al.',
  2021,
  'Cochrane Database Syst Rev',
  '10.1002/14651858.CD009790.pub2',
  '34891454',
  'Meta-Analysis',
  '1A',
  9,
  24486,
  85,
  4,
  'Exercise reduces pain (MD -15.2/100 points, 95% CI -18.3 to -12.2) and disability (SMD -0.54, CI -0.69 to -0.40) vs control at post-treatment',
  'High',
  'Low',
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '12 months'
);

COMMENT ON DATABASE postgres IS 'PhysioConcept AI - Evidence-Based Exercise Library Database v1.0.0';
