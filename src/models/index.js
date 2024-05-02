'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, { logging: false });

let Food = require ("./food");
let Cloth = require ("./cloth");

module.exports = {
  db: sequelize,
  Food:Food(sequelize, DataTypes),
  Cloth:Cloth(sequelize, DataTypes),
};
