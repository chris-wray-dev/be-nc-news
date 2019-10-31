const ENV = process.env.NODE_ENV || 'development';

const newsData = {
  production: require('./development-data/index'),
  development: require('./development-data/index'),
  test: require('./test-data/index')
}

module.exports = newsData[ENV]