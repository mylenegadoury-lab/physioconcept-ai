-- ============================================
-- TEMPORARILY ALLOW INSERTS FOR IMPORT
-- Run this in Supabase SQL Editor before import
-- ============================================

-- Option 1: Allow inserts with service role (SECURE - recommended)
-- Nothing needed if using SUPABASE_SERVICE_ROLE_KEY - it bypasses RLS

-- Option 2: Temporarily allow public inserts (INSECURE - for testing only)
CREATE POLICY "Allow public insert for import" 
  ON exercises 
  FOR INSERT 
  WITH CHECK (true);

-- After import, delete this policy:
-- DROP POLICY "Allow public insert for import" ON exercises;

-- Option 3: Allow inserts for authenticated users only
-- CREATE POLICY "Allow authenticated insert" 
--   ON exercises 
--   FOR INSERT 
--   TO authenticated
--   WITH CHECK (true);

-- ============================================
-- INSTRUCTIONS:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Run: node scripts/importExercisesToSupabase.js
-- 3. After import, remove policy:
--    DROP POLICY "Allow public insert for import" ON exercises;
-- ============================================
