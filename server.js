const express = require('express');
const NotFoundError = require('./errors/not-found');
const app = express();

app.use((req, res, next) => {
    next(new NotFoundError());
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    res.status(status);
    res.json({
        status,
        message,
    });
});

module.exports = {
    app
};