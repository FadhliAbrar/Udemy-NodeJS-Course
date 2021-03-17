const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'belajar-mysql',
    'root',
    'kraken1288',
    {
    dialect: 'mysql', 
    host: 'localhost'
    }
    );

module.exports = sequelize;