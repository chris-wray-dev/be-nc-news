process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const connection = require('../db/connection');
const app = require('../app');

describe('/api', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/topics', () => {
    it('GET / returns 200', () => {
      return request(app).get('/api/topics')
        .expect(200);
    });
    it('GET / returns 200 and an object containing a key of topics and an array of topics objects', () => {
      return request(app).get('/api/topics')
        .expect(200)
        .then((topics) => {
          expect(topics.body).to.be.an('object');
          expect(topics.body).to.contain.keys('topics');
          expect(topics.body.topics[0]).to.contain.keys('slug', 'description');
        });
    });
  });
});