const ENV = process.env.NODE_ENV || 'development';

const newsData = {
  development: require('./development-data/index'),
  test: require('./test-data/index')
}

module.exports = newsData[ENV]