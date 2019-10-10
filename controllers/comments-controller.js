const { updateCommentById, deleteCommentById } = require('../models/comments-model');

exports.patchCommentById = (req, res, next) => {
  updateCommentById(req.params, req.body)
    .then(comment => {
      res.status(202).send({ comment });
    })
    .catch(next);
}

exports.removeCommentById = (req, res, next) => {
  deleteCommentById(req.params)
    .then(commentsDeleted => {
        res.status(204).send({ msg: `${commentsDeleted} comment deleted`});
    })
    .catch(next);
}
