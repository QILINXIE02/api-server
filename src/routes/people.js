'use strict';

const express = require('express');
const router = express.Router();

// RESTful route definitions
router.get('/people', getPeople);
router.get('/people/:id', getOnePerson);
router.post('/people', createPerson);
router.put('/people/:id', updatePerson);
router.delete('/people/:id', deletePerson);

// ROUTE HANDLERS
async function getPeople(request, response) {
  try {
    const people = await db.People.findAll({ include: [{ model: Foods, as: 'favoriteFoods' }] });
    response.status(200).json(people);
  } catch (error) {
    console.error('Error fetching people:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
}

async function getOnePerson(request, response) {
  try {
    const id = request.params.id;
    const data = await db.People.findOne({ where: { id: id } });
    response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching person:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
}

async function createPerson(request, response) {
  try {
    const data = request.body;
    const newPerson = await db.People.create(data);
    response.status(201).json(newPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
}

async function updatePerson(request, response) {
  try {
    const id = request.params.id;
    const data = request.body;
    const person = await db.People.findOne({ where: { id: id } });
    const updatedPerson = await person.update(data);
    response.status(200).json(updatedPerson);
  } catch (error) {
    console.error('Error updating person:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
}

async function deletePerson(request, response) {
  try {
    const id = request.params.id;
    const deletedPerson = await db.People.destroy({ where: { id: id } });
    if (typeof deletedPerson === 'number') {
      response.status(204).send(null);
    } else {
      throw new Error('Error deleting record');
    }
  } catch (error) {
    console.error('Error deleting person:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = (sequelize, DataTypes) => ({
  router,
  getPeople,
  getOnePerson,
  createPerson,
  updatePerson,
  deletePerson
});
