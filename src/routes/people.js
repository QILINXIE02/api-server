'use strict';

const express = require('express');
const router = express.Router();
const { People } = require('../models/index.js'); // Import your People collection

router.get('/people', getPeople);
router.get('/people/:id', getOnePerson);
router.post('/people', createPerson);
router.put('/people/:id', updatePerson);
router.delete('/people/:id', deletePerson);

async function getPeople(req, res) {
  try {
    const people = await People.read(); // Use read method from the People collection
    res.status(200).json(people);
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getOnePerson(req, res) {
  try {
    const person = await People.read(req.params.id); // Use read method with id from the People collection
    if (!person) {
      res.status(404).json({ error: 'Person not found' });
    } else {
      res.status(200).json(person);
    }
  } catch (error) {
    console.error('Error fetching person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createPerson(req, res) {
  try {
    const newPerson = await People.create(req.body); // Use create method from the People collection
    res.status(201).json(newPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updatePerson(req, res) {
  try {
    const updatedPerson = await People.update(req.params.id, req.body); // Use update method from the People collection
    res.status(200).json(updatedPerson);
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deletePerson(req, res) {
  try {
    const deletedCount = await People.delete(req.params.id); // Use delete method from the People collection
    if (deletedCount === 1) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = router;
