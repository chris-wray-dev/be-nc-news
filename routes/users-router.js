const { sendUserByUsername } = require('../controllers/users-controller');
const usersRouter = require('express').Router();

usersRouter.route('/:username')
  .get(sendUserByUsername)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed111' });
  });

module.exports = usersRouter;