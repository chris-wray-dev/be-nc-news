const articlesRouter = require('express').Router();
const {
  sendArticles,
  publishArticle,
  sendArticleById,
  patchArticleById,
  removeArticleById,
  postComment,
  sendComments
} = require('../controllers/articles-controller');

articlesRouter.get('/', sendArticles);
articlesRouter.post('/', publishArticle);
articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.patch('/:article_id', patchArticleById);
articlesRouter.delete('/:article_id', removeArticleById);
articlesRouter.post('/:article_id/comments', postComment);
articlesRouter.get('/:article_id/comments', sendComments);

module.exports = articlesRouter;