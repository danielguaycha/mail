const Sequelize = require('sequelize');

let sequelize = new Sequelize('nodemail', 'postgres', '12345',  { host: 'localhost', dialect: 'postgres' });

module.exports = sequelize;