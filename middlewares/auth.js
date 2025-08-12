const config = require('../config');
const UnauthorizedError = require('../errors/unauthorized');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try{
        const token = req.headers['x-access-token'];
        if(!token) {
            throw 'not token';
        }
        const decoder = jwt.verify(token, config.secretJwtToken);
        req.user = decoder;
        next();
    }
    catch (message) {
        next(new UnauthorizedError(message));
    }
};