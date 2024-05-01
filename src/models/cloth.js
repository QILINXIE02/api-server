'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Cloth = sequelize.define('Cloth', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Cloth;
