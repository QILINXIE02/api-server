'use strict';

const supertest = require('supertest');
const { app } = require('../server.js');
const mockRequest = supertest(app);

describe('API Server', () => {
  it('should respond with a 404 on an invalid route', async () => {
    let response = await mockRequest.get('/api/cloth/no-thing');
    expect(response.status).toBe(404);
  });

  it('can add a record to clothes', async () => {
    let data = { "type": "Shirt", "price": 20 };
    let response = await (mockRequest.post('/api/cloth').send(data));
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.type).toBe('Shirt');
    expect(response.body.price).toBe(20);
  });

  it('can get a list of clothes records', async () => {
    let response = await mockRequest.get('/api/cloth');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('type');
  });

  it('can get a clothes record', async () => {
    let response = await mockRequest.get('/api/cloth/1');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('type');
    expect(response.body.type).toBeDefined();
  });

  it('can update a clothes record', async () => {
    let data = { "type": "Pants", "price": 25 };
    let response = await mockRequest.put('/api/cloth/1').send(data);
    expect(response.status).toBe(200);
    expect(response.body.type).toBe('Pants');
    expect(response.body.price).toBe(25);
  });

  it('can delete a clothes record', async () => {
    let data = { "type": "Shirt", "price": 20 };
    let postResponse = await (mockRequest.post('/api/cloth').send(data));
    let id = postResponse.body.id;
    let deleteResponse = await mockRequest.delete(`/api/cloth/${id}`);
    expect(deleteResponse.status).toBe(200);
  });

  it('can add a record to food', async () => {
    let data = { "type": "Apple", "price": 1 };
    let response = await (mockRequest.post('/api/food').send(data));
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.type).toBe('Apple');
    expect(response.body.price).toBe(1);
  });

  it('can get a list of food records', async () => {
    let response = await mockRequest.get('/api/food');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('type');
  });

  it('can get a food record', async () => {
    let response = await mockRequest.get('/api/food/1');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('type');
    expect(response.body.type).toBeDefined();
  });

  it('can update a food record', async () => {
    let data = { "type": "Banana", "price": 2 };
    let response = await mockRequest.put('/api/food/1').send(data);
    expect(response.status).toBe(200);
    expect(response.body.type).toBe('Banana');
    expect(response.body.price).toBe(2);
  });

  it('can delete a food record', async () => {
    let data = { "type": "Apple", "price": 1 };
    let postResponse = await (mockRequest.post('/api/food').send(data));
    let id = postResponse.body.id;
    let deleteResponse = await mockRequest.delete(`/api/food/${id}`);
    expect(deleteResponse.status).toBe(200);
  });
});
