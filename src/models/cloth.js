'use strict';

const Cloth = (db, DataTypes) =>
 db.define('Cloth', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Cloth;
