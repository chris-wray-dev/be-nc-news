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
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `article ${article_id} not found!!!`
        });
      } else { return {
          ...article[0],
          comment_count: parseInt(commentCount[0].count)
        };
      }
    });
}

exports.updateArticleById = ({
  article_id
}, {
  inc_votes
}) => {
  return connection('articles')
    .where('article_id', article_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then(article => {
      return article[0];
    });
}