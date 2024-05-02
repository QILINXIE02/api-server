'use strict';

const Food = (db, DataTypes) =>
 db.define('Food', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Food;
