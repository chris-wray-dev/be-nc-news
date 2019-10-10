const { patchCommentById, removeCommentById } = require('../controllers/comments-controller');
const commentsRouter = require('express').Router();

commentsRouter.patch('/:comment_id', patchCommentById);
commentsRouter.delete('/:comment_id', removeCommentById);

module.exports = commentsRouter;