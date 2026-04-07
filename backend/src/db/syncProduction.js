const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Usar DATABASE_URL_PRODUCTION en lugar de DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL_PRODUCTION, {
  dialect: 'postgres',
  logging: console.log,
});

const User = require('../models/User');
const Post = require('../models/Post');

async function syncProduction() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a Supabase');

    await sequelize.sync({ alter: true });
    console.log('Tablas creadas/actualizadas en Supabase');

    await sequelize.close();
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
}

syncProduction();
