const { selectArticleById, updateArticleById } = require('../models/articles-model');

exports.sendArticleById = (req, res, next) => {
  selectArticleById(req.params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
}

exports.patchArticleById = (req, res, next) => {
  updateArticleById(req.params, req.body)
    .then(article => {
      res.status(202).send({ article })
    })
    .catch(next);
}