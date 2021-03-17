const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER
})

module.exports = CartItem;