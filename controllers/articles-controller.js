const {
  selectArticles,
  selectArticleById,
  updateArticleById,
  insertComment,
  selectComments
} = require('../models/articles-model');

exports.sendArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
}
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

exports.postComment = (req, res, next) => {
  insertComment(req.params, req.body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
}

exports.sendComments = (req, res, next) => {
  selectComments(req.query, req.params)
    .then(comments => {
      res.status(200).send(({ comments }));
    })
    .catch(next);
}