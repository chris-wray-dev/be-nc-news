process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const connection = require('../db/connection');
const app = require('../app');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  /* 
  **********************   TOPICS!!!   ***********************
  */

  describe('/topics', () => {
    it('GET / returns 200 and an object containing a key of topics and an array of topics objects', () => {
      return request(app).get('/api/topics')
        .expect(200)
        .then(topics => {
          expect(topics.body).to.be.an('object');
          expect(topics.body).to.contain.keys('topics');
          expect(topics.body.topics[0]).to.contain.keys('slug', 'description');
        });
    });
  });

  /* 
  **********************   USERS!!!   ***********************
  */

  describe('users/', () => {
    it('GET /api/users/:username returns 200 and an object containing a key of username and an array of user object', () => {
      return request(app).get('/api/users/butter_bridge')
        .expect(200)
        .then(user => {
          expect(user.body).to.be.an('object');
          expect(user.body).to.contain.keys('user');
          expect(user.body.user[0]).to.contain.keys('username', 'avatar_url', 'name');
        });
    });
    it('GET /not-a-user-name returns 404 and a useful message', () => {
      return request(app)
        .get('/api/users/not-a-user-name')
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg : 'not-a-user-name not found!!!'});
        });
    });
  });

  /* 
  **********************   ARTICLES!!!   ***********************
  */

  describe('/articles', () => {
    it('GET /:article_id to return 200 and an object containing article key and an array of article', () => {
      return request(app)
        .get('/api/articles/4')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.contain.keys('article');
          expect(body.article[0]).contain.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at'
          );
          expect((body.article[0])).to.eql({
            article_id: 4,
            title: 'Student SUES Mitch!',
            topic: 'mitch',
            votes: 0,
            author: 'rogersop',
            body:
              'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
            created_at: '2006-11-18T12:21:54.171Z'
          });
        });
    });
    it('GET /not-an-article-id to return 404 and a descriptive message', () => {
      return request(app)
        .get('/api/articles/15')
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'article 15 not found!!!' });
        });
    });
  });
});