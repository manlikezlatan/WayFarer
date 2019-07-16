"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _moment = _interopRequireDefault(require("moment"));

var _app = _interopRequireDefault(require("../app"));

var _dbPool = _interopRequireDefault(require("../models/dbPool"));

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should();

should;
var fare = 3000.00;
var bus_id = 1;
var origin = 'Duai';
var destination = 'London';
var trip_date = (0, _moment["default"])(new Date());

var token = _jsonwebtoken["default"].sign({
  email: 'zlatan@gmail.com',
  user_id: 1,
  is_admin: true,
  first_name: 'Ibrahim',
  last_name: 'Babatunde'
}, process.env.SECRET, {
  expiresIn: '2h'
});

beforeEach(function () {
  _dbPool["default"].query('TRUNCATE TABLE trips CASCADE', function (err) {
    return err;
  });
}); // Test for creating a trip

describe('/POST create new trip', function () {
  it('it should not create a trip if authorization token is not provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/trips').end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly provide token');
      done(err);
    });
  });
  it('it should not create a trip with no specified origin', function (done) {
    var trip = {
      bus_id: bus_id,
      origin: '',
      destination: destination,
      trip_date: trip_date,
      fare: fare
    };

    _chai["default"].request(_app["default"]).post('/api/v1/trips').set('token', token).send(trip).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly fill the all required details for the trip');
      done(err);
    });
  });
  it('it should not create a trip without a specified destination', function (done) {
    var trip = {
      bus_id: bus_id,
      origin: origin,
      trip_date: trip_date,
      fare: fare,
      destination: ''
    };

    _chai["default"].request(_app["default"]).post('/api/v1/trips').set('token', token).send(trip).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly fill the all required details for the trip');
      done(err);
    });
  });
  it('it should not create a trip without a specified bus id', function (done) {
    var trip = {
      bus_id: '',
      origin: origin,
      destination: destination,
      trip_date: trip_date,
      fare: fare
    };

    _chai["default"].request(_app["default"]).post('/api/v1/trips').set('token', token).send(trip).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly fill the all required details for the trip');
      done(err);
    });
  });
  it('it should post and create a trip', function (done) {
    var trip = {
      bus_id: bus_id,
      origin: origin,
      destination: destination,
      trip_date: trip_date,
      fare: fare
    };

    _chai["default"].request(_app["default"]).post('/api/v1/trips').set('token', token).send(trip).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('message').eql('Trip created successfully');
      res.body.should.have.property('data');
      done(err);
    });
  });
});
describe('/GET/ all trips', function () {
  it('it should return no trips if there are no trips yet', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/trips').set('token', token).end(function (err, res) {
      if (res.body.data === undefined) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('There are currently no trips');
      }

      done(err);
    });
  });
  it('it should get trips for all users', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/trips').set('token', token).end(function (err, res) {
      if (!res.body.data === undefined) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
      }

      done(err);
    });
  });
}); // Cancel a trip

describe('/DELETE/ Cancel trips', function () {
  it('it should return a response if there are no trips with that id', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/trips/1').set('token', token).end(function (err, res) {
      if (res.body.data === undefined) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('There is no trip with that id');
      }

      done(err);
    });
  });
  it('it should return trip cancelled successfully', function (done) {
    _chai["default"].request(_app["default"]).patch('/api/v1/trips/1').set('token', token).end(function (err, res) {
      if (!res.body.data === undefined) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.data.should.have.property('message').eql('Trip cancelled successfully');
      }

      done(err);
    });
  });
});
//# sourceMappingURL=tripTest.js.map