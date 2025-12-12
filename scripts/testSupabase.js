const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔗 Testing Supabase connection...\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? supabaseKey.substring(0, 20) + '...' : '❌ NOT FOUND');
console.log('');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('📡 Connecting to Supabase...\n');
    
    const { data, error, count } = await supabase
      .from('studies')
      .select('*', { count: 'exact', head: false });
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      console.error('Details:', error);
      process.exit(1);
    }
    
    console.log('✅ Connection successful!\n');
    console.log(`📊 Studies in database: ${data.length}`);
    
    if (data.length > 0) {
      console.log('\n📚 Sample studies:');
      data.slice(0, 3).forEach(study => {
        console.log(`   - ${study.title} (${study.year})`);
      });
    } else {
      console.log('ℹ️  Database is empty (ready for migration)');
    }
    
    // Test exercises table
    const { data: exercises } = await supabase.from('exercises').select('count');
    console.log(`\n💪 Exercises in database: ${exercises ? exercises.length : 0}`);
    
    console.log('\n✅ All tests passed! Ready to migrate data.\n');
    
  } catch (err) {
    console.error('\n❌ Unexpected error:', err.message);
    console.error(err);
    process.exit(1);
  }
}

testConnection();
