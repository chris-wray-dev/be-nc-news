const topicsRouter = require('express').Router();
const { sendTopics } = require('../controllers/topics-controller');

topicsRouter.route('/')
  .get(sendTopics)
  .all((req, res, send) => {
    res.status(405).send({ msg: 'Method not allowed!!!' });
  });

module.exports = topicsRouter;