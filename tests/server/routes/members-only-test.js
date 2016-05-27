// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

xdescribe('User Routes', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Unauthenticated request', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('should get a 404 response', function (done) {
			guestAgent.get('/api/user')
				.expect(404)
				.end(done);
		});

	});

	describe('Authenticated request', function () {

		var loggedInAgent;

		var userInfo = {
			name: 'Justin',
			facebook: {
                id: "somerandomid"
            },
            friends: [],
            board: [[1,2,3,4,5], [6,7,8,9,0]]
		};

		beforeEach('Create a user', function (done) {
			User.create(userInfo, done);
		});

		beforeEach('Create loggedIn user agent and authenticate', function (done) {
			loggedInAgent = supertest.agent(app);
			loggedInAgent.post('/login').send(userInfo).end(done);
		});

		it('to the friends route returns an array of friends', function (done) {
			loggedInAgent.get('/api/user/friends').expect(200).end(function (err, response) {
				if (err) return done(err);
				expect(response.body).to.be.an('array');
                expect(response.body).to.have.length(2)
				done();
			});
		});

        it('should accept user updates', function (done) {
            loggedInAgent.put('/api/user/', {name: 'Jason'}).expect(201).end(function (err, response) {
                if (err) return done(err);
                expect(response.body.name).to.be('Jason');
                done();
            });
        });

	});

});
