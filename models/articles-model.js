const connection = require('../db/connection');

exports.selectArticleById = ({ article_id }) => {
  const articlePromise = connection
    .select('*')
    .from('articles')
    .where('article_id', article_id);

  const commentCountPromise = connection('comments')
    .count('article_id')
    .where('article_id', article_id);

  return Promise.all([articlePromise, commentCountPromise])
    .then(([article, commentCount]) => {
      return { ...article[0], comment_count: parseInt(commentCount[0].count) };
    });
}