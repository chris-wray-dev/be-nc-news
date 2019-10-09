const { updateCommentById } = require('../models/comments-model');

exports.patchCommentById = (req, res, next) => {
  updateCommentById(req.params, req.body)
    .then(comment => {
      res.status(202).send({ comment });
    })
    .catch(next);
}
