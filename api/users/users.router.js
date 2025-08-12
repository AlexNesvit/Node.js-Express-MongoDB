const express = require('express');
const usersController = require('./users.controller');
const router = express.Router();

router.post('/login', usersController.login);
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;