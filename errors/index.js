const { psqlErrorCodes } = require('./psql-error-codes');

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
}

exports.handlePsqlErrors = (err, req, res, next) => {
  if (psqlErrorCodes.hasOwnProperty(err.code)) {
    res.status(400).send({ msg: `psql error: ${psqlErrorCodes[err.code]}`})
  }
}