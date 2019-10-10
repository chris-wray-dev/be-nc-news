const { patchCommentById, removeCommentById } = require('../controllers/comments-controller');
const commentsRouter = require('express').Router();

commentsRouter.patch('/:comment_id', patchCommentById);
commentsRouter.delete('/:comment_id', removeCommentById);
commentsRouter.all('', (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed!!!' });
});

module.exports = commentsRouter;