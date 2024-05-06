'use strict';

require('dotenv').config();
const supertest = require('supertest');
const { app } = require('../server.js');
const exp = require('constants');

const mockRequest = supertest(app);

const {db} = require('../models/index.js');

beforeAll(async () => {
    await db.sync();
});

afterAll(async () => {
    await db.drop();
});

describe('API Server', () => {

  it('should respond with a 404 on an invalid route', async () => {
    let response = await mockRequest.get('/no-thing');
    expect(response.status).toBe(404);
  },  15000);

  it('should respond with a 500 when errors are thrown', async () => {
    let response = await mockRequest.get('/broken');
    expect(response.status).toBe(500);
  },  15000);

  it('can add a record', async () => {
    let data = {"firstName":"Rosie", "lastName":"Sullivan",age: 9};
    let response = await (mockRequest.post('/people').send(data));
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.firstName).toBe('Rosie');
    expect(response.body.lastName).toBe('Sullivan');
  },  15000);

  it('can get a list of records', async () => {
    let response = await mockRequest.get('/people');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('firstName');
    // expect a list of people in the body...
  },  15000);

  it('can get a record', async () => {
    let response = await mockRequest.get('/people/1');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('firstName');
    expect(response.body.firstName).toBeDefined();
    // expect the right record in the body...
  },  15000);

  it('can update a record', async () => {
    let data = {};
    let response = await mockRequest.put('/people/1',data);
    expect(response.status).toBe(200);
    // expect the right record in the body...
  },  15000);

  it('can delete a record', async () => {
    // Add a record first
    let data = {"firstName":"Rosie", "lastName":"Sullivan",age: 9};
    let response = await (mockRequest.post('/people').send(data));
    let id = response.body.id;

    // Delete that record
    let deleteResponse = await mockRequest.delete(`/people/${id}`);
    expect(deleteResponse.status).toBe(204);
    expect(deleteResponse.text).toBe('');
  },  15000);

});
