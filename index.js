'use strict';

require('dotenv').config();

const server = require('./src/server.js');
const { db } = require('./src/models/index.js');

async function start() {
  try {
    await db.sync();
    server.start(process.env.PORT);
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

start();
