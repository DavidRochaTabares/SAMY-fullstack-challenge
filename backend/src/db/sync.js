const { sequelize, testConnection } = require('../config/database');
const User = require('../models/User');

async function syncDatabase() {
  try {
    await testConnection();
        
    await sequelize.sync({ alter: true });
    
    process.exit(0);
  } catch (error) {
    console.log(' Database sync failed:', error.message);
    process.exit(1);
  }
}

syncDatabase();
