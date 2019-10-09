const { patchCommentById } = require('../controllers/comments-controller');
const commentsRouter = require('express').Router();

commentsRouter.patch('/:comment_id', patchCommentById);

module.exports = commentsRouter;