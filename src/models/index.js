const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./collection.js');

// Import the models
const foodSchema = require('./food.js'); // Updated file extension
const peopleSchema = require('./people.js'); // Updated file extension

// Initialize Sequelize with the database URL
let sequelize = new Sequelize(DATABASE_URL, { logging: false });

// Define models using schemas
const foodModel = foodSchema(sequelize, DataTypes);
const peopleModel = peopleSchema(sequelize, DataTypes);

// Define associations between models
// Example: A person can have many favorite foods
peopleModel.hasMany(foodModel, { foreignKey: 'personId', sourceKey: 'id' });
foodModel.belongsTo(peopleModel, { foreignKey: 'personId', targetKey: 'id' });

// Create collections for easier CRUD operations
const foodCollection = new Collection(foodModel);
const peopleCollection = new Collection(peopleModel);

module.exports = {
    db: sequelize,
    Foods: foodCollection,
    People: peopleCollection, // Corrected to match model name
};
