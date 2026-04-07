const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });
const { sequelize } = require('../config/database');

async function createPostsTable() {
  try {
    await sequelize.authenticate();

    // Create posts table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_user_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    process.exit(0);
  } catch (error) {
    console.log(' Error creating posts table:', error);
    process.exit(1);
  }
}

createPostsTable();
