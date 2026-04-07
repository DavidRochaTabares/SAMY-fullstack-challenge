const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const sequelize = new Sequelize(process.env.DATABASE_URL_PRODUCTION, {
  dialect: 'postgres',
  logging: console.log,
});

async function createTables() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a Supabase');

    // Crear tabla users
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        avatar VARCHAR(500),
        reqres_id INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla users creada');

    // Crear tabla posts
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_user_id INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_author FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('Tabla posts creada');

    await sequelize.close();
    console.log('\n Todas las tablas creadas exitosamente');
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
}

createTables();
