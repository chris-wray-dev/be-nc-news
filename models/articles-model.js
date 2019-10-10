const connection = require('../db/connection');

exports.selectArticles = ({ sort_by = 'created_at', order = "desc", author, topic }) => {
  return connection
    .select(
      'articles.article_id',
      'articles.title',
      'articles.votes',
      'articles.topic',
      'articles.author',
      'articles.created_at'
    )
    .from('articles')
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comments.comment_id as comment_count')
    .orderBy(sort_by, order)
    .modify(query => {
      if (author) query.where('articles.author', author);
      if (topic) query.where('articles.topic', topic);
    })
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `${author || topic} not found!!!`
        });
      }
      return articles;
    })
}

exports.postArticle = (article) => {
  return connection('articles')
    .insert(article)
    .returning('*')
    .then(article => {
      return article[0];
    })

}

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

exports.deleteArticleById = ({ article_id }) => {
  return connection('articles')
    .where('article_id', article_id)
    .del()
    .then(articleDeleted => {
      if (!articleDeleted) {
        return Promise.reject({
          status: 404,
          msg: `article ${article_id} not found!!!`
        });
      }
      return articleDeleted;
    })
}

exports.insertComment = ({ article_id }, { username, body }) => {
  return connection('comments')
    .insert({
      author: username,
      article_id: article_id,
      body: body
    })
    .returning('*')
    .then(comment => {
      return comment[0];
    });
}

exports.selectComments = ({ sort_by = 'created_at', order = 'desc' }, { article_id }) => {
  return connection
    .select('*')
    .from('comments')
    .orderBy(sort_by, order)
    .modify(query => {
      if (article_id) query.where('article_id', article_id);
    })
    .then(comments => {
      if (comments.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `article ${article_id} not found!!!`
        });
      }
      return comments;
    })
}