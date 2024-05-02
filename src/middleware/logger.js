'use strict';

function logger(req, res, next) {
    console.log(`${req.method}: ${req.path}: ${JSON.stringify(req.query)}: ${JSON.stringify(req.body)}`);
    next();
}

module.exports = logger;
