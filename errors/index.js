const { psqlErrorCodes } = require('./psql-error-codes');

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
}

exports.handlePsqlErrors = (err, req, res, next) => {
  // console.log(err);
  if (psqlErrorCodes.hasOwnProperty(err.code)) {
    res.status(400).send({ msg: `psql error ${err.code}: ${psqlErrorCodes[err.code]}`})
  } else {
    next(err);
  }
}

exports.handleServerErrors = (err, req, res, next) => {
  // console.log(err);
  res.status(500).send({ msg: 'Internal server error' });
}