const { sendUserByUsername } = require('../controllers/users-controller');
const usersRouter = require('express').Router();

usersRouter.get('/:username', sendUserByUsername);
usersRouter.all('/:username', (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed111' });
});

module.exports = usersRouter;