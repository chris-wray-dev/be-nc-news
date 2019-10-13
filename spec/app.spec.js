process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const chai = require('chai');
const chaiSorted = require('chai-sorted');
const request = require('supertest');
const connection = require('../db/connection');
const app = require('../app');

chai.use(chaiSorted);

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
    it('GET / returns 200 and an array of article objects', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body : { articles }}) => {
          expect(articles).to.be.an('array');
          expect(articles[0]).to.contain.keys(
            'article_id',
            'title',
            'votes',
            'topic',
            'author',
            'created_at',
            'comment_count'
          );
          expect(articles).to.be.sortedBy('created_at', { descending: true });
        });
    });
    it('POST / accepts an article object and responds with 201 and the succesfully posted article', () => {
      return request(app)
        .post('/api/articles')
        .send({
          title: 'this is the title!',
          body: 'this is the body!!',
          topic: 'mitch',
          author: 'butter_bridge'
        })
        .expect(201)
        .then(({ body : { article }}) => {
          expect(article).to.contain.keys(
            'article_id',
            'title',
            'body',
            'votes',
            'topic',
            'author',
            'created_at',
            'published'
          );
          expect(article.title).to.equal('this is the title!');
          expect(article.body).to.equal('this is the body!!');
          expect(article.topic).to.equal('mitch');
          expect(article.author).to.equal('butter_bridge');
        });
    });

    /*
    ********************* /articles with queries *********************
    */

    it('GET ?sort_by=author returns an array of articles in descending order by author', () => {
      return request(app)
        .get('/api/articles?sort_by=author')
        .expect(200)
        .then(({ body: { articles }}) => {
          expect(articles).to.be.sortedBy('author', { descending: true });
        });
    });
    it('GET ?sort_by=article_id&order=asc returns an array of articles in ascending order by author', () => {
      return request(app)
        .get('/api/articles?sort_by=article_id&order=asc')
        .expect(200)
        .then(({ body: { articles }}) => {
          expect(articles).to.be.sortedBy('article_id', { ascending: true });
        });
    });
    it('GET ?author=butter_bridge returns 200 and an array of articles by butter_bridge', () => {
      return request(app)
        .get('/api/articles?author=butter_bridge')
        .expect(200)
        .then(({ body: { articles }}) => {
          articles.forEach(article => {
            expect(article.author).to.equal('butter_bridge');
          });
        });
    });
    it('GET ?topic=mitch reutrns 200 and an array of articles with the topic mitch', () => {
      return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(({ body: { articles }}) => {
          articles.forEach(article => {
            expect(article.topic).to.equal('mitch');
          });
        });
    });
    /*
    ************************* handle article query errors *********************
    */

   it('GET ?author=not-an-author', () => {
    return request(app)
      .get('/api/articles?author=not-an-author')
      .expect(404)
      .then(({ body }) => {
        expect(body).to.eql({ msg: 'not-an-author not found!!!'});
      });
    });
    it('GET ?topic=not-a-topic', () => {
      return request(app)
        .get('/api/articles?topic=not-a-topic')
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'not-a-topic not found!!!'});
        });
    });

    /*
    ************************** /articles with params *************************
    */

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
    it('PATCH /:article_id takes an object of { inc_votes: 0 } to return 202 and return the article object with the vote count increased', () => {
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
    it('DELETE /:article_id to return 204 and a descriptive message', () => {
      return request(app)
        .delete('/api/articles/1')
        .expect(204);
    });
    it('DELETE /:not_article_id to return 204 and a descriptive message', () => {
      return request(app)
        .delete('/api/articles/32')
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ msg: 'article 32 not found!!!'})
        });
    });

    /*
    *************************** /articles/:id/comments ***************************
    */

    describe('/:article_id/comments', () => {
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
            expect(body).to.eql({ msg: 'psql error 23503: foreign_key_violation' });
          });
      });
      it('GET / - returns 200 and an array of article comment objects', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body: { comments }}) => {
            expect(comments[0]).to.contain.keys(
              'comment_id',
              'author',
              'article_id',
              'votes',
              'created_at',
              'body');
          });
      });
      it('GET article_id_not_exist/comments - returns 200 and an array of article comment objects', () => {
        return request(app)
          .get('/api/articles/30/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body).to.eql({ msg: 'article 30 not found!!!'});
          });
      });
      it('GET /?sort_by=article_id - returns 200 and an array comment objects sorted in article_id order', () => {
        return request(app)
          .get('/api/articles/1/comments/?sort_by=article_id')
          .expect(200)
          .then(({ body: { comments }}) => {
            expect(comments[0]).to.contain.keys(
              'comment_id',
              'author',
              'article_id',
              'votes',
              'created_at',
              'body'
            );
            expect(comments).to.be.sortedBy('article_id', { descending: true });
          });
      });
      it('GET /?sort_by=article_id&order=desc - returns 200 and an array comment objects sorted in article_id order', () => {
        return request(app)
          .get('/api/articles/1/comments/?sort_by=article_id&order=desc')
          .expect(200)
          .then(({ body: { comments }}) => {
            expect(comments).to.be.sortedBy('article_id', { descending: true });
          });
      });
      it('GET / - returns 200 and an array comment objects defaulted to descending order by created_at', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body: { comments }}) => {
            expect(comments).to.be.sortedBy('created_at', { descending: true });
          });
      });
      it('GET / - testing if query sort_by is not correct...', () => {
        return request(app)
          .get('/api/articles/1/comments/?sort_by=not_a_key&order=desc')
          .expect(400)
          .then(({ body }) => {
            expect(body).to.eql({ msg: 'psql error 42703: undefined_column'});
          });
      });
      it('GET / - testing if query order is not correct - should return in ascending order by default', () => {
        return request(app)
          .get('/api/articles/1/comments/?sort_by=article_id&order=not_asc_or_desc')
          .expect(200)
          .then(({ body: { comments } }) => {
            expect(comments).to.be.sortedBy('article_id', { ascending: true});
          });
      });
    });
  });
  
  /*
  ************************ /API/COMMENTS *******************************
  */

  describe('/comments', () => {
    it('PATCH /:comment_id expect 202 and an updated comment', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: 1 })
        .expect(202)
        .then(({ body : { comment }}) => {
          expect(comment).to.contain.keys(
            'comment_id',
            'author',
            'article_id',
            'votes',
            'created_at',
            'body');
          expect(comment).to.eql({
            comment_id: 1,
            article_id: 9,
            author: 'butter_bridge',
            body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            votes: 17, // originally 16
            created_at: '2017-11-22T12:36:03.389Z'
          });
        });
    });
    it('PATCH /:not_a_comment_id expect 404 and a nice message', () => {
      return request(app)
        .patch('/api/comments/123')
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('comment 123 not found!!!')
        });
    });
    it('DELETE /:comment_id returns a 204 and deletes the comment', () => {
      return request(app)
        .delete('/api/comments/1')
        .expect(204);
    });
    it('DELETE /:not_a_comment_id returns a 404 and a nice message', () => {
      return request(app)
        .delete('/api/comments/20')
        .expect(404);
    });
  });
});