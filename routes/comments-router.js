const { patchCommentById, removeCommentById } = require('../controllers/comments-controller');
const commentsRouter = require('express').Router();

commentsRouter.route('/:comment_id')
  .patch(patchCommentById)
  .delete(removeCommentById)
  .all((req, res, next) => {
    res.status(405).send({ msg: 'Method not allowed!!!' });
  });

module.exports = commentsRouter;