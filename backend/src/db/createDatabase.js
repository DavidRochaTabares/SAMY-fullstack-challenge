const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

async function createDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  });

  try {
    await client.connect();

    const checkDb = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = 'fullstack_challenge'"
    );

    if (checkDb.rows.length === 0) {
      await client.query('CREATE DATABASE fullstack_challenge');
    } else {
    }

    await client.end();
    process.exit(0);
  } catch (error) {
    console.log(' Error creating database:', error.message);
    process.exit(1);
  }
}

createDatabase();
