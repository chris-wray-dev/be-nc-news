const articlesRouter = require('express').Router();
const {
  sendArticles,
  sendArticleById,
  patchArticleById,
  postComment,
  sendComments
} = require('../controllers/articles-controller');

articlesRouter.get('/', sendArticles);
articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.patch('/:article_id', patchArticleById);
articlesRouter.post('/:article_id/comments', postComment);
articlesRouter.get('/:article_id/comments', sendComments);

module.exports = articlesRouter;