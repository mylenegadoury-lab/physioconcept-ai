/**
 * TEST SUPABASE CONNECTION
 * Vérifie connexion et structure table exercises
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('\n🔍 Testing Supabase Connection...\n');
  
  // Test 1: Connection
  console.log('1️⃣ Testing connection...');
  try {
    const { data, error } = await supabase.from('exercises').select('count', { count: 'exact', head: true });
    if (error) {
      console.log(`   ⚠️ Table 'exercises' error: ${error.message}`);
      console.log('   💡 Table may not exist yet. Run: supabase/schema.sql');
      return false;
    }
    console.log('   ✅ Connection successful!');
  } catch (err) {
    console.error(`   ❌ Connection failed: ${err.message}`);
    return false;
  }
  
  // Test 2: Check existing exercises
  console.log('\n2️⃣ Checking existing exercises...');
  const { data: existing, error: existError } = await supabase
    .from('exercises')
    .select('id, name, body_region, evidence_level')
    .eq('body_region', 'lumbar');
    
  if (existError) {
    console.error(`   ❌ Error: ${existError.message}`);
    return false;
  }
  
  if (existing && existing.length > 0) {
    console.log(`   ⚠️ Found ${existing.length} existing lumbar exercises:`);
    existing.slice(0, 5).forEach(ex => {
      console.log(`      - ${ex.name} (${ex.evidence_level})`);
    });
    if (existing.length > 5) console.log(`      ... and ${existing.length - 5} more`);
  } else {
    console.log('   ✅ No existing lumbar exercises (ready for import)');
  }
  
  // Test 3: Check table structure
  console.log('\n3️⃣ Verifying table structure...');
  try {
    const { data: testInsert, error: testError } = await supabase
      .from('exercises')
      .select('*')
      .limit(1);
      
    if (testError) {
      console.error(`   ❌ Table structure error: ${testError.message}`);
      return false;
    }
    
    console.log('   ✅ Table structure OK');
    
    // Show column names
    if (testInsert && testInsert.length > 0) {
      const columns = Object.keys(testInsert[0]);
      console.log(`   📋 Columns (${columns.length}): ${columns.slice(0, 10).join(', ')}...`);
    }
  } catch (err) {
    console.error(`   ❌ Structure check failed: ${err.message}`);
    return false;
  }
  
  console.log('\n✅ All tests passed! Ready for import.\n');
  return true;
}

testConnection()
  .then(success => {
    if (success) {
      console.log('🚀 Next step: node scripts/importExercisesToSupabase.js\n');
    } else {
      console.log('\n⚠️ Fix issues above before importing.\n');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('\n❌ Test failed:', err.message, '\n');
    process.exit(1);
  });
