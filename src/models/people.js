'use strict';

const People = (sequelize, DataTypes) => {
  const People = sequelize.define('People', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return People;
};

module.exports = People;
