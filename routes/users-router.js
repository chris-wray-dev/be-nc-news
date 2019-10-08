const { sendUserByUsername } = require('../controllers/users-controller');
const usersRouter = require('express').Router();

usersRouter.get('/:username', sendUserByUsername);

module.exports = usersRouter;