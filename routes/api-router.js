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
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);


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

/api	/topics	use	/topics
			
	    /users	get	/:username
			
      /articles	get	/
                get	/:article_id
                patch	/:article_id
                post	/:article_id/comments
                get	/:article_id/comments
          
      /comments	patch	/:comment_id
                delete	/:comment_id
*/