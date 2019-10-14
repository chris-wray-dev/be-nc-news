const connection = require('../db/connection');

exports.selectArticles = ({ sort_by = 'created_at', order = "desc", author, topic, limit, p }) => {
  const articlesQuery = connection
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
      if (limit) query.limit(limit).offset(limit * (p -1));
    });
  
  const articlesCount = connection
    .select('*')
    .from('articles')
    .modify(query => {
      if (author) query.where('articles.author', author);
      if (topic) query.where('articles.topic', topic);
    });

  const userQuery = connection
    .select('*')
    .from('users')
    .where('username', author || '');
  
  const topicQuery = connection
    .select('*')
    .from('topics')
    .where('slug', topic || '');

  return Promise.all([ articlesQuery, articlesCount, userQuery, topicQuery ])
    .then(([articles, articleCount, userReponse, topicResponse]) => {
      if (articles.length === 0 
        && userReponse.length === 0 
        && topicResponse.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `${author || topic} not found!!!`
        })
      }
      const resultIndex = `page ${p}: results ${limit * (p - 1) + 1} to ${(limit * p) > articleCount.length ? articleCount.length : (limit * p)} of ${articleCount.length}`;
      return { articles, results: resultIndex };
    });
}

exports.postArticle = (article) => {
  return connection('articles')
    .insert(article)
    .returning('*')
    .then(article => {
      return article[0];
    });
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

exports.updateArticleById = ({ article_id }, { inc_votes = 0 }) => {
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

  const commentsQuery = connection
    .select('*')
    .from('comments')
    .orderBy(sort_by, order)
    .modify(query => {
      if (article_id) query.where('article_id', article_id);
    });
  
  const articleQuery = connection
    .select('*')
    .from('articles')
    .where('article_id', article_id);

  return Promise.all([ commentsQuery, articleQuery ])
    .then(([ comments, article ]) => {
      if (comments.length === 0 && article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `article ${article_id} not found!!!`
        });
      }
      return comments;
    })
}