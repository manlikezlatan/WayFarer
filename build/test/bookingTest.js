"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _faker = _interopRequireDefault(require("faker"));

var _app = _interopRequireDefault(require("../app"));

var _dbPool = _interopRequireDefault(require("../models/dbPool"));

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should();

should;
var trip_id = 10;
var bus_id = 10;
var trip_date = '25-07-2019';

var seat_number = _faker["default"].random.number();

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
  _dbPool["default"].query('TRUNCATE TABLE bookings CASCADE', function (err) {
    return err;
  });
}); // Test for booking a trip

describe('/POST create new booking', function () {
  it('it should not create a booking if authorization token is not provided', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/bookings').end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly provide token');
      done(err);
    });
  });
  it('it should not create a booking without a trip id', function (done) {
    var booking = {
      trip_id: '',
      bus_id: bus_id,
      trip_date: trip_date,
      seat_number: seat_number
    };

    _chai["default"].request(_app["default"]).post('/api/v1/bookings').set('token', token).send(booking).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly enter a correct trip ID');
      done(err);
    });
  });
  it('it should book a trip', function (done) {
    var booking = {
      trip_id: trip_id,
      bus_id: bus_id,
      trip_date: trip_date,
      seat_number: seat_number
    };

    _chai["default"].request(_app["default"]).post('/api/v1/bookings').set('token', token).send(booking).end(function (err, res) {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('success');
      res.body.should.have.property('data');
      done(err);
    });
  });
}); // Get all bookings

describe('/GET/ view all bookings', function () {
  it('it should return no bookings if there are no bookings', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/bookings').set('token', token).end(function (err, res) {
      if (res.body.data === undefined) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('There are currently no bookings');
      }

      done(err);
    });
  });
  it('it should get all bookings for an admin', function (done) {
    _chai["default"].request(_app["default"]).get('/api/v1/bookings').set('token', token).end(function (err, res) {
      if (!res.body.data === undefined) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
      }

      done(err);
    });
  });
}); // delete a booking

describe('/DELETE/ delete a booking', function () {
  it('it should return no bookings with that id if specified booking id is incorrect', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/bookings/1').set('token', token).end(function (err, res) {
      if (res.body.data === undefined) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('You have no booking with the specified booking ID');
      }

      done(err);
    });
  });
  it('it should return booking deleted successfully if specified booking id is correct', function (done) {
    _chai["default"].request(_app["default"])["delete"]('/api/v1/bookings/1').set('token', token).end(function (err, res) {
      if (!res.body.data === undefined) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.data.should.have.property('message').eql('Booking deleted successfully');
      }

      done(err);
    });
  });
}); // Update seat number of a booking

describe('/PUT update seat number of a booking', function () {
  it('it should not UPDATE booking seat number if auth token is not provided', function (done) {
    _chai["default"].request(_app["default"]).put('/api/v1/bookings/1').end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Kindly provide token');
      done(err);
    });
  });
  it('it should not update booking seat number if seat number is not provided', function (done) {
    var booking = {
      seat_number: ''
    };

    _chai["default"].request(_app["default"]).put('/api/v1/bookings/1').set('token', token).send(booking).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Choose a seat number');
      done(err);
    });
  });
});
//# sourceMappingURL=bookingTest.js.map