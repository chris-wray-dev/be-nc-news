const connection = require('../db/connection');

exports.updateCommentById = ({ comment_id }, { inc_votes }) => {
  return connection('comments')
    .where('comment_id', comment_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then(comment => {
      if (comment.length === 0) { return Promise.reject({
          status: 404,
          msg: `comment ${comment_id} not found!!!`
        });
      }
      return comment[0];
    });
}

exports.deleteCommentById = ({ comment_id }) => {
  return connection('comments')
    .where('comment_id', comment_id)
    .del()
    .then(commentsDeleted => {
      if (!commentsDeleted) {
        return Promise.reject({
          status: 404,
          msg: `comment ${comment_id} not found!!!`
        });
      }
      return commentsDeleted;
    })
}