const connection = require('../db/connection');

exports.selectArticleById = ({ article_id }) => {
  return connection
    .select('*')
    .from('articles')
    .where('article_id', article_id)
}