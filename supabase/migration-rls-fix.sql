-- Réactiver Row Level Security sur toutes les tables
ALTER TABLE studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE progressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocol_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinical_guidelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_metrics ENABLE ROW LEVEL SECURITY;

-- Permettre la LECTURE publique (pour que l'app fonctionne)
CREATE POLICY "Allow public read access" ON studies FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON exercises FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON protocols FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON progressions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON exercise_studies FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON protocol_exercises FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON clinical_guidelines FOR SELECT USING (true);
