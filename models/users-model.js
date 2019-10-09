const connection = require('../db/connection');

exports.selectUserByUsername = ({ username }) => {
  return connection
    .select('*')
    .from('users')
    .where('username', username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `${username} not found!!!`
        });
      }
      return user;
    })
}