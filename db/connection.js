const ENV = process.env.NODE_ENV || 'development';

const config = 
  ENV === 'production'
  ? { client: 'pg', connection: process.env.DATABASE_URL }
  : require('../knexfile');
  
const connection = require('knex')(config);

module.exports = connection;