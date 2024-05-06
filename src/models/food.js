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
    personId: { // Add personId column
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Food;
};

module.exports = Food;
