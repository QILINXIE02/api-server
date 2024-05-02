const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');

// The "url" argument must be of type string. Received undefined
// This typically means that the environment variable expected to contain the database URL isn't set or isn't being accessed correctly.

// Specify the dialect based on the environment
// Error: Dialect needs to be explicitly supplied as of v4.0.0
let sequelizeOptions = {
    dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres' // Assuming PostgreSQL for non-test environments
};

if (process.env.NODE_ENV === 'test') {
    sequelizeOptions.storage = 'memory'; // For SQLite
}

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const peopleModel = require('./people.js');
const foodModel = require('./food.js');

module.exports = {
    db: sequelize,
    People: peopleModel(sequelize, DataTypes),
    Food: foodModel(sequelize, DataTypes),
};
