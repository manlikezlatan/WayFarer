"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _faker = _interopRequireDefault(require("faker"));

var _app = _interopRequireDefault(require("../app"));

var _dbPool = _interopRequireDefault(require("../models/dbPool"));

_chai["default"].use(_chaiHttp["default"]);

var should = _chai["default"].should();

should;
var email = 'zlatan@gmail.com';
var password = 'codacktesting';
var first_name = 'lanre';
var last_name = 'codack';
var is_admin = true;
beforeEach(function () {
  _dbPool["default"].query('TRUNCATE TABLE users CASCADE', function (err) {
    return err;
  });
}); // Sign up admin Testing

describe('/POST create an admin', function () {
  it('it should not create an admin if not authorized', function (done) {
    _chai["default"].request(_app["default"]).post('/api/v1/admin/signup').set('Accept', 'application/json').end(function (err, res) {
      res.should.have.status(401);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Unauthorized');
      done(err);
    });
  });
  it('it should not create an admin without email', function (done) {
    var admin = {
      first_name: first_name,
      last_name: last_name,
      password: password,
      is_admin: is_admin
    };

    _chai["default"].request(_app["default"]).post('/api/v1/admin/signup').set('Accept', 'application/json').send(admin).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Email, password, first name and last name are required');
      done(err);
    });
  });
  it('it should not create an admin without password', function (done) {
    var admin = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      is_admin: is_admin
    };

    _chai["default"].request(_app["default"]).post('/api/v1/admin/signup').set('Accept', 'application/json').send(admin).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Email, password, first name and last name are required');
      done(err);
    });
  });
  it('it should not create an admin without first name', function (done) {
    var admin = {
      first_name: '',
      last_name: last_name,
      password: password,
      email: email,
      is_admin: is_admin
    };

    _chai["default"].request(_app["default"]).post('/api/v1/admin/signup').set('Accept', 'application/json').send(admin).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Email, password, first name and last name are required');
      done(err);
    });
  });
  it('it should not sign up an admin without last name', function (done) {
    var admin = {
      is_admin: is_admin,
      password: password,
      first_name: first_name,
      last_name: '',
      email: email
    };

    _chai["default"].request(_app["default"]).post('/api/v1/admin/signup').set('Accept', 'application/json').send(admin).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Email, password, first name and last name are required');
      done(err);
    });
  });
  it('it should not create an admin without any of first name, last name, email or password', function (done) {
    var admin = {
      is_admin: true,
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    };

    _chai["default"].request(_app["default"]).post('/api/v1/admin/signup').set('Accept', 'application/json').send(admin).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Email, password, first name and last name are required');
      done(err);
    });
  });
  it('it should not post a admin, if email is not valid', function (done) {
    var admin = {
      is_admin: is_admin,
      email: 'admin.com',
      first_name: first_name,
      last_name: last_name,
      password: password
    };

    _chai["default"].request(_app["default"]).post('/api/v1/admin/signup').set('Accept', 'application/json').send(admin).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Please enter a valid email address');
      done(err);
    });
  });
  it('it should not post a admin if password is invalid', function (done) {
    var admin = {
      is_admin: is_admin,
      email: email,
      password: 'pass',
      first_name: first_name,
      last_name: last_name
    };

    _chai["default"].request(_app["default"]).post('/api/v1/admin/signup').set('Accept', 'application/json').send(admin).end(function (err, res) {
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status').eql('error');
      res.body.should.have.property('error').eql('Please enter a valid password with more than eight(8) characters');
      done(err);
    });
  }); // Normal User sign up Testing

  describe('/POST sign up a user', function () {
    it('it should not sign up a user without email', function (done) {
      var user = {
        first_name: first_name,
        last_name: last_name,
        password: password
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
    });
    it('it should not create a user without password', function (done) {
      var user = {
        email: email,
        first_name: first_name,
        last_name: last_name
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
    });
    it('it should not create a user without first name', function (done) {
      var user = {
        first_name: '',
        last_name: last_name,
        password: password,
        email: email
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
    });
    it('it should not create a user without last name', function (done) {
      var user = {
        password: password,
        first_name: first_name,
        last_name: '',
        email: email
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
    });
    it('it should not create a user without any of email, password, first name or password', function (done) {
      var user = {
        email: '',
        first_name: '',
        last_name: '',
        password: ''
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
    });
    it('it should not post a user, if user already exists', function (done) {
      var user = {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name
      };

      _dbPool["default"].query('INSERT INTO users(email, password, first_name, last_name) values($1, $2, $3, $4)', [email, password, first_name, last_name], function () {
        _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('User with that email already exist');
          done(err);
        });
      });
    });
    it('it should not post a user, if email is not valid', function (done) {
      var user = {
        email: 'face.com',
        first_name: first_name,
        last_name: last_name,
        password: password
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter a valid email address');
        done(err);
      });
    });
    it('it should not post a user, if password is not valid', function (done) {
      var user = {
        email: email,
        password: 'pass',
        first_name: first_name,
        last_name: last_name
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter a valid password with more than eight(8) characters');
        done(err);
      });
    });
    it('it should post a user', function (done) {
      var user = {
        email: _faker["default"].internet.email(),
        password: _faker["default"].internet.password(),
        first_name: _faker["default"].name.firstName(),
        last_name: _faker["default"].name.lastName()
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done(err);
      });
    });
  }); // User sign in testing

  describe('/POST Sign user in', function () {
    it('it should not log in a user without email', function (done) {
      var user = {
        password: password
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter your email and password');
        done(err);
      });
    });
    it('it should not log in a user without password', function (done) {
      var user = {
        email: email
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter your email and password');
        done(err);
      });
    });
    it('it should not log a user in, if email is empty', function (done) {
      var user = {
        email: '',
        password: password
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter your email and password');
        done(err);
      });
    });
    it('it should not log a user in, if email is incorrect', function (done) {
      var user = {
        email: 'test.com',
        password: password
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter a valid email address');
        done(err);
      });
    });
    it('it should not log a user in, if password is not valid or correct', function (done) {
      var user = {
        email: email,
        password: 'pass'
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('The email or password you provided is incorrect');
        done(err);
      });
    });
    it('it should not log a user in if user does not exist', function (done) {
      var user = {
        email: _faker["default"].internet.email(),
        password: _faker["default"].internet.password(8)
      };

      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(user).end(function (err, res) {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('The email or password you provided is incorrect');
        done(err);
      });

      process.exit(0);
    });
  });
});
//# sourceMappingURL=userTest.js.map