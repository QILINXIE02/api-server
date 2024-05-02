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
  });

  return Food;
};

module.exports = Food;
