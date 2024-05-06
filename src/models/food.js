'use strict';

const Food = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {         // Define foreign key constraints
        model: 'People',   // Name of the referenced model
        key: 'id',         // Name of the referenced column
      },
    },
  });

  return Food;
};

module.exports = Food;
