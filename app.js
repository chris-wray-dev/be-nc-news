const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

module.exports = app;