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
articlesRouter.all('/', (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed'})
});

articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.patch('/:article_id', patchArticleById);
articlesRouter.delete('/:article_id', removeArticleById);
articlesRouter.all('/:article_id', (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed'})
});


articlesRouter.post('/:article_id/comments', postComment);
articlesRouter.get('/:article_id/comments', sendComments);
articlesRouter.all('/:article_id/comments', (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed'})
});

module.exports = articlesRouter;