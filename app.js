const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const { handleCustomErrors } = require('./errors/index');

app.use(express.json());
app.use('/api', apiRouter);

app.all('/*', (req, res, next) => res.status(404).send('Route not found'));
app.use(handleCustomErrors);

module.exports = app;