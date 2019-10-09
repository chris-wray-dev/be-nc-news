const articlesRouter = require('express').Router();
const { sendArticleById, patchArticleById, postComment } = require('../controllers/articles-controller');

articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.patch('/:article_id', patchArticleById);
articlesRouter.post('/:article_id/comments', postComment)

module.exports = articlesRouter;