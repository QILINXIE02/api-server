'use strict';

const express = require('express');
const { db } = require('../models/index.js');

const router = express.Router();

router.post('/food', createFood);
router.get('/food', getFoods);
router.get('/food/:id', getFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);

async function createFood(req, res) {
  try {
    const food = await db.Foods.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getFoods(req, res) {
  try {
    const foods = await db.Foods.findAll();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFood(req, res) {
  try {
    const food = await db.Foods.findByPk(req.params.id);
    if (!food) {
      res.status(404).json({ error: 'Food not found' });
    } else {
      res.json(food);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateFood(req, res) {
  try {
    const food = await db.Foods.findByPk(req.params.id);
    if (!food) {
      res.status(404).json({ error: 'Food not found' });
    } else {
      await food.update(req.body);
      res.json(food);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteFood(req, res) {
  try {
    const food = await db.Foods.findByPk(req.params.id);
    if (!food) {
      res.status(404).json({ error: 'Food not found' });
    } else {
      await food.destroy();
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = router;
