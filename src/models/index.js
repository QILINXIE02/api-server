const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./collection.js');

// Import the models
const foodSchema = require('./food.js');
const peopleSchema = require('./people.js');

// Initialize Sequelize with the database URL
let sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres', // Assuming you're using PostgreSQL
  dialectOptions: {
    ssl: {
      require: true, // Require SSL/TLS
      rejectUnauthorized: false // Don't reject self-signed certificates
    }
  },
  logging: false
});

// Define models using schemas
const foodModel = foodSchema(sequelize, DataTypes);
const peopleModel = peopleSchema(sequelize, DataTypes);

// Define associations between models
peopleModel.hasMany(foodModel, { foreignKey: 'personId', sourceKey: 'id' });
foodModel.belongsTo(peopleModel, { foreignKey: 'personId', targetKey: 'id' });

// Create collections for easier CRUD operations
const foodCollection = new Collection(foodModel);
const peopleCollection = new Collection(peopleModel);

module.exports = {
  db: sequelize,
  Foods: foodCollection,
  People: peopleCollection
};
