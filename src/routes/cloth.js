'use strict';
const express = require('express');
const { Cloth } = require('../models/cloth');
const router = express.Router();

router.post('/api/cloth', createCloth);
router.get('/api/cloth', getClothes);
router.get('/api/cloth/:id', getCloth);
router.put('api/cloth/:id', updateCloth);
router.delete('api/cloth/:id', deleteCloth);

async function createCloth(req, res) {
  try {
    const cloth = await Cloth.create(req.body);
    res.status(201).json(cloth);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getClothes(req, res) {
  try {
    const clothes = await Cloth.findAll();
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCloth(req, res) {
  try {
    const cloth = await Cloth.findByPk(req.params.id);
    if (!cloth) {
      res.status(404).json({ error: 'Cloth not found' });
    } else {
      res.json(cloth);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCloth(req, res) {
  try {
    const cloth = await Cloth.findByPk(req.params.id);
    if (!cloth) {
      res.status(404).json({ error: 'Cloth not found' });
    } else {
      await cloth.update(req.body);
      res.json(cloth);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteCloth(req, res) {
  try {
    const cloth = await Cloth.findByPk(req.params.id);
    if (!cloth) {
      res.status(404).json({ error: 'Cloth not found' });
    } else {
      await cloth.destroy();
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = router;
