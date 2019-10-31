const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const { handleCustomErrors, handlePsqlErrors, handleServerErrors } = require('./errors/index');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.all('/*', (req, res, next) => res.status(404).send({ msg: 'Route not found' }));
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;