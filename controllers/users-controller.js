const { selectUserByUsername } = require('../models/users-model');

exports.sendUserByUsername = (req, res, next) => {
  selectUserByUsername(req.params)
    .then(user => {
      if (user.length === 0) res.status(404).send({ msg: `${req.params.username} not found!!!`});
      else res.status(200).send({ user });
    })
}