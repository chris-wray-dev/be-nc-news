const topicsRouter = require('./topics-router');
const usersRouter = require('./users-router');
const articlesRouter = require('./articles-router');
const commentsRouter = require('./comments-router')
const apiRouter = require('express').Router();
const fs = require('fs');

apiRouter.get('/', (req, res, next) => {
  fs.readFile('routes/endpoints.json', 'utf8', (err, data) => {
    if (err) next(err);
    else res.status(200).send(data);
  });
});
apiRouter.all('/', (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed'})
});

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
