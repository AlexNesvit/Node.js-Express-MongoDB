const express = require('express');
const cors = require('cors');
const NotFoundError = require('./errors/not-found');
const userRouter = require('./api/users/users.router');
const usersController = require('./api/users/users.controller');
const authMiddleware = require('./middlewares/auth');
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", authMiddleware, userRouter);
app.post("login", usersController.login);

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