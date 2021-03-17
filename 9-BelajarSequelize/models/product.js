const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product =  sequelize.define('Product', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
    },
    imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    }

})

module.exports = Product;