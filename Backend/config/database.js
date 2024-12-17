const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => console.log(`[Sequelize]: ${msg}`), 
});
module.exports = sequelize;
