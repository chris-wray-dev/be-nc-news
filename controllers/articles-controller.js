const { selectArticleById } = require('../models/articles-model');

exports.sendArticleById = (req, res, next) => {
  selectArticleById(req.params)
    .then((article) => {
      if (article.length === 0) res.status(404).send({ msg: `article ${req.params.article_id} not found!!!` });
      else res.status(200).send({ article });
    })
    .catch(next);
}