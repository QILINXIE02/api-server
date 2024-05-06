'use strict';

require('dotenv').config();
const express = require('express');
const server = require('./src/server.js');
const { db } = require('./src/models/index.js');
const peopleRoutes = require('./src/routes/people');
const foodRoutes = require('./src/routes/food');

async function start() {
    try {
        await db.sync();
        const app = express();
        app.use(express.json());

        // Mounting routers
        app.use('/people', peopleRoutes);
        app.use('/food', foodRoutes);

        server.start(process.env.PORT);
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

start();
