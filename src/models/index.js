'use strict';

const { Sequelize } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL, { logging: false });

let Food, Cloth;
try {
  Food = require('./food');
  Cloth = require('./cloth');
} catch (error) {
  console.error('Error loading models:', error);
}

module.exports = {
  db: sequelize,
  Food,
  Cloth,
};
