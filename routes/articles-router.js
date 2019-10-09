const articlesRouter = require('express').Router();
const { sendArticleById, patchArticleById } = require('../controllers/articles-controller');

articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.patch('/:article_id', patchArticleById);

module.exports = articlesRouter;