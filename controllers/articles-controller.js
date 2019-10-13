const {
  selectArticles,
  postArticle,
  selectArticleById,
  updateArticleById,
  deleteArticleById,
  insertComment,
  selectComments
} = require('../models/articles-model');

exports.sendArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      res.status(200).send( articles );
    })
    .catch(next);
}

exports.publishArticle = (req, res, next) => {
  postArticle(req.body)
    .then(article => {
      res.status(201).send({ article : { ...article, published: true } })
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

exports.removeArticleById = (req, res, next) => {
  deleteArticleById(req.params)
    .then(deleteCount => {
      res.status(204).send({ msg: `${deleteCount} article deleted` });
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