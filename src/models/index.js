'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./collection.js');
const foodSchema = require('./food.js');
const peopleSchema = require('./people.js');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

let sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: false // Disable SSL
  },
  logging: false
});

const foodModel = foodSchema(sequelize, DataTypes);
const peopleModel = peopleSchema(sequelize, DataTypes);

peopleModel.hasMany(foodModel, { foreignKey: 'personId', sourceKey: 'id' });
foodModel.belongsTo(peopleModel, { foreignKey: 'personId', targetKey: 'id' });

const foodCollection = new Collection(foodModel);
const peopleCollection = new Collection(peopleModel);

module.exports = {
  db: sequelize,
  Foods: foodCollection,
  People: peopleCollection
};
