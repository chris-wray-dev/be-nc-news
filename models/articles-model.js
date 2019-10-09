const connection = require('../db/connection');

exports.selectArticleById = ({ article_id }) => {
  return connection
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', article_id)
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comments.comment_id as comment_count')
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `article ${article_id} not found!!!`
        });
      }
      return article[0];
    });
}

exports.updateArticleById = ({ article_id }, { inc_votes }) => {
  return connection('articles')
    .where('article_id', article_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `article ${article_id} not found!!!`
        });
      }
      return article[0];
    });
}