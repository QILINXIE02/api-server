'use strict';
const express = require('express');
const Food = require('../models/food');
const router = express.Router();

router.post('/', createFood);
router.get('/', getFoods);
router.get('/:id', getFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

async function createFood(req, res) {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getFoods(req, res) {
  try {
    const foods = await Food.findAll();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFood(req, res) {
  try {
    const food = await Food.findByPk(req.params.id);
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
    const food = await Food.findByPk(req.params.id);
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
    const food = await Food.findByPk(req.params.id);
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
