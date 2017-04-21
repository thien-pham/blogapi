const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('BlogPost', function () {

    before(function () {
        return runServer();
    });

    after(function () {
        return closeServer();
    });

    it('should list blogpost on GET', function () {
        return chai.request(app)
            .get('/blog-posts')
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                const expectedKeys = ['title', 'content', 'author', 'publishDate'];
                res.body.should.include.keys(expectedKeys);
                // res.body.length.should.be.at.least(1);
            });
        });

    it('should add blogpost on POST', function () {
        const newPost = { title: 'firstEntry', content: 'apple', author: 'orange', publishDate: 'blue' };
        return chai.request(app)
            .post('/blog-posts')
            .send(newPost)
            .then(function (res) {
                res.should.have.status(201);
                // res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('title', 'content', 'author', 'publishDate');
                res.body.id.should.not.be.null;
                res.body.should.deep.equal(Object.assign(newPost, { id: res.body.id }));
            });
    });
    it('should update blogpost on PUT', function () {
        const updatePost = {
            title: 'foo',
            content: 'bar',
            author: 'bizz',
            publishDate: 'bang'
        };

        return chai.request(app)
            .get('/blog-posts')
            .then(function (res) {
                updatePost.id = res.body[0].id;

                return chai.request(app)
                    .put(`/blog-posts/${updatePost.id}`)
                    .send(updatePost);
            })

            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.deep.equal(updatePost);
            });
    });


    it('should delete post on DELETE', function () {
        return chai.request(app)
            .get('/blog-posts')
            .then(function (res) {
                return chai.request(app)
                    .delete(`/blog-posts/${res.body[0].id}`);
            })
            .then(function (res) {
                res.should.have.status(204);
            });
    });


});
// mocha.run();