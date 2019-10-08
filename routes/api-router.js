const { sendTopics } = require('../controllers/topics-controller');
const apiRouter = require('express').Router();

console.log('in the api router');
apiRouter.get('/topics', sendTopics);

module.exports = apiRouter;