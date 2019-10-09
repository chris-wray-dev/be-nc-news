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

  describe('/users', () => {
    it('GET /api/users/:username returns 200 and an object containing a key of username and an array of user object', () => {
      return request(app).get('/api/users/butter_bridge')
        .expect(200)
        .then(user => {
          expect(user.body).to.be.an('object');
          expect(user.body).to.contain.keys('user');
          expect(user.body.user[0]).to.contain.keys('username', 'avatar_url', 'name');
        });
    });
    it('GET /api/users/:username returns 200 and an object containing the requested user details', () => {
      return request(app).get('/api/users/butter_bridge')
        .expect(200)
        .then(user => {
          expect(user.body.user[0]).to.eql({
            username: 'butter_bridge',
            name: 'jonny',
            avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
          });
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
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.contain.keys('article');
          expect(body.article).contain.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at',
            'comment_count'
          );
          expect((body.article)).to.eql({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            votes: 100,
            created_at: '2018-11-15T12:21:54.171Z',
            comment_count: '13'
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
    it('PATCH /:article_id takes an object of { incVotes: 2 } to return 202 and return the article object with the vote count increased', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes : -99 })
        .expect(202)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.contain.keys('article');
          expect(body.article).contain.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at'
          );
          expect(body.article).to.eql({ article_id: 1,
            title: 'Living in the shadow of a great man',
            body: 'I find this existence challenging',
            votes: 1,
            topic: 'mitch',
            author: 'butter_bridge',
            created_at: '2018-11-15T12:21:54.171Z' });
        });
    });
    it('PATCH /not-an-article-id to return 404 and a descriptive message', () => {
      return request(app)
        .patch('/api/articles/15')
        .send({ inc_votes : 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'article 15 not found!!!' });
        });
    });

    /*
    *************************** /articles/:id/comments ***************************
    */

    describe('/articles/:article_id/comments', () => {
      it('POST /1/comments - returns 201 and a comment object with certain keys', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'butter_bridge', body: "this is a comment!!!"})
          .expect(201)
          .then(({ body: { comment }}) => {
            expect(comment).to.contain.keys(
              'comment_id',
              'author',
              'article_id',
              'votes',
              'created_at',
              'body');
          });
      });
      it('POST /1/comments - returns 201 and a comment object', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'butter_bridge', body: "this is a comment!!!"})
          .expect(201)
          .then(({ body: { comment }}) => {
            // tested each object property rather than the whole object as we can't predict time value
            expect(comment.comment_id).to.equal(19);
            expect(comment.author).to.equal('butter_bridge');
            expect(comment.article_id).to.equal(1);
            expect(comment.votes).to.equal(0);
            expect(comment.body).to.equal('this is a comment!!!');
          });
      });
      it('POST /15/comments - returns 404 and a descriptive error message', () => {
        return request(app)
          .post('/api/articles/15/comments')
          .send({ username: 'butter_bridge', body: "this is a comment!!!"})
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({ msg: 'psql error: foreign_key_violation' });
          });
      });
    });
  });
});