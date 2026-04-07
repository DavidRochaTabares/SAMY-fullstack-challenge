const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

async function resetDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    
    await client.query('DROP TABLE IF EXISTS users CASCADE;');
    
    await client.end();
    
    process.exit(0);
  } catch (error) {
    console.log(' Error:', error.message);
    process.exit(1);
  }
}

resetDatabase();
