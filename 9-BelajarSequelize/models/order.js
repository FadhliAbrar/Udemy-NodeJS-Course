const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = Order;