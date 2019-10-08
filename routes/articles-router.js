const articlesRouter = require('express').Router();
const { sendArticleById } = require('../controllers/articles-controller');

articlesRouter.get('/:article_id', sendArticleById);

module.exports = articlesRouter;