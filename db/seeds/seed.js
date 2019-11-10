const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const {
  formatDates,
  formatComments,
  makeRefObj
} = require('../utils/utils');

exports.seed = function (knex) {
  const topicsInsertions = knex('topics')
    .insert(topicData)
    .returning('*');

  const usersInsertions = knex('users')
    .insert(userData)
    .returning('*');
  
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return Promise.all([topicsInsertions, usersInsertions])
        .then(([topics, users]) => {
          // console.log(topics);
          // console.log(users);
        });
    })
    .then(() => {
      const formattedArticleData = formatDates(articleData);
      return knex('articles')
        .insert(formattedArticleData)
        .returning('*');
    })
    .then(articles => {
      const refObj = makeRefObj(articles, 'title', 'article_id');
      let formattedComments = formatComments(commentData, refObj, 'belongs_to', 'article_id');
      formattedComments = formatDates(formattedComments);
      return knex('comments')
        .insert(formattedComments)
        .returning('*');
    });
    
};