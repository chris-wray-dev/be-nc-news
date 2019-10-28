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

articlesRouter.route('/')
  .get(sendArticles)
  .post(publishArticle)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed'})
  });

articlesRouter.route('/:article_id')
  .get(sendArticleById)
  .patch(patchArticleById)
  .delete(removeArticleById)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed'})
  });


articlesRouter.route('/:article_id/comments')
  .post(postComment)
  .get(sendComments)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed'})
});

module.exports = articlesRouter;