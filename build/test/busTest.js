"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../app"));

var _dbPool = _interopRequireDefault(require("../models/dbPool"));

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should();

should;
var number_plate = 'CODACK';
var manufacturer = 'Bugatti';
var model = 'Chiron';
var year = 2020;
var capacity = 20;

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
  _dbPool["default"].query('TRUNCATE TABLE buses CASCADE', function (err) {
    return err;
  });
}); // ADD buses Testing

describe('/POST add a bus', function () {
  it('it should not add a bus if authorization token is not provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/buses').end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly provide token');
      done(err);
    });
  });
  it('it should not add a bus without any bus details', function (done) {
    var bus = {
      number_plate: '',
      manufacturer: '',
      model: '',
      year: '',
      capacity: ''
    };

    _chai["default"].request(_app["default"]).post('/api/v1/buses').set('token', token).send(bus).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly fill the required fields');
      done(err);
    });
  });
  it('it should not add a bus without number plate only', function (done) {
    var bus = {
      model: model,
      year: year,
      manufacturer: manufacturer,
      capacity: capacity
    };

    _chai["default"].request(_app["default"]).post('/api/v1/buses').set('token', token).send(bus).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly fill the required fields');
      done(err);
    });
  });
  it('it should not add a bus without a manufacturer', function (done) {
    var bus = {
      number_plate: number_plate,
      manufacturer: '',
      model: model,
      year: year,
      capacity: capacity
    };

    _chai["default"].request(_app["default"]).post('/api/v1/buses').set('token', token).send(bus).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly fill the required fields');
      done(err);
    });
  });
  it('it should add a bus', function (done) {
    var bus = {
      number_plate: number_plate,
      manufacturer: manufacturer,
      model: model,
      year: year,
      capacity: capacity
    };

    _chai["default"].request(_app["default"]).post('/api/v1/buses').set('token', token).send(bus).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('data');
      done(err);
    });
  });
}); // Get all buses

describe('/GET/ all buses', function () {
  it('it should return a response of no buses if there are no buses yet', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/buses').set('token', token).end(function (err, res) {
      if (res.body.data === undefined) {
        res.should.have.status(status.notfound);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('There are no buses');
      }

      done(err);
    });
  });
  it('it should make an admin GET all buses', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/buses').set('token', token).end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('data');
      done(err);
    });
  });
});
//# sourceMappingURL=busTest.js.map