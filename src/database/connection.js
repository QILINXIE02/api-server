'use strict';

let foodData = {
  1: { type: "Pizza", price: 10.99 },
  2: { type: "Burger", price: 8.99 },
};

let clothData = {
  1: { type: "T-shirt", price: 19.99 },
  2: { type: "Jeans", price: 29.99 },
};

function findAllFood() {
  return Object.values(foodData);
}

function findOneFood(id) {
  return foodData[id];
}

function createFood(record) {
  record.id = Math.random();
  foodData[record.id] = record;
  return foodData[record.id];
}

function updateFood(id, record) {
  foodData[id] = record;
  return foodData[id];
}

function destroyFood(id) {
  delete foodData[id];
  return foodData[id];
}

function findAllCloth() {
  return Object.values(clothData);
}

function findOneCloth(id) {
  return clothData[id];
}

function createCloth(record) {
  record.id = Math.random();
  clothData[record.id] = record;
  return clothData[record.id];
}

function updateCloth(id, record) {
  clothData[id] = record;
  return clothData[id];
}

function destroyCloth(id) {
  delete clothData[id];
  return clothData[id];
}

module.exports = {
  findAllFood,
  findOneFood,
  createFood,
  updateFood,
  destroyFood,
  findAllCloth,
  findOneCloth,
  createCloth,
  updateCloth,
  destroyCloth
};
