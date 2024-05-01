'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Food = sequelize.define('Food', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Food;
