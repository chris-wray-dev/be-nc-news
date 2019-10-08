const topicsRouter = require('./topics-router');
const usersRouter = require('./users-router')
const apiRouter = require('express').Router();

console.log('in the api router');
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);


module.exports = apiRouter;

/*
X GET /api/topics

X GET /api/users/:username

GET /api/articles/:article_id
PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api
*/