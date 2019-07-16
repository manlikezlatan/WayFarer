import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import app from '../app';
import pool from '../models/dbPool';

chai.use(chaiHttp);
const should = chai.should();
should;

const email = 'zlatan@gmail.com';
const password = 'codacktesting';
const first_name = 'lanre';
const last_name = 'codack';
const is_admin = true;

beforeEach(() => {
  pool.query('TRUNCATE TABLE users CASCADE',
    err => err);
});

// Sign up admin Testing
describe('/POST create an admin', () => {
  it('it should not create an admin if not authorized', (done) => {
    chai.request(app)
      .post('/api/v1/admin/signup')
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Unauthorized');
        done(err);
      });
  });

  it('it should not create an admin without email', (done) => {
    const admin = {
      first_name,
      last_name,
      password,
      is_admin
    };
    chai.request(app)
      .post('/api/v1/admin/signup')
      .set('Accept', 'application/json')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Email, password, first name and last name are required');
        done(err);
      });
  });

  it('it should not create an admin without password', (done) => {
    const admin = {
      email,
      first_name,
      last_name,
      is_admin
    };
    chai.request(app)
      .post('/api/v1/admin/signup')
      .set('Accept', 'application/json')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Email, password, first name and last name are required');
        done(err);
      });
  });

  it('it should not create an admin without first name', (done) => {
    const admin = {
      first_name: '',
      last_name,
      password,
      email,
      is_admin
    };
    chai.request(app)
      .post('/api/v1/admin/signup')
      .set('Accept', 'application/json')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Email, password, first name and last name are required');
        done(err);
      });
  });

  it('it should not sign up an admin without last name', (done) => {
    const admin = {
      is_admin,
      password,
      first_name,
      last_name: '',
      email,
    };
    chai.request(app)
      .post('/api/v1/admin/signup')
      .set('Accept', 'application/json')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Email, password, first name and last name are required');
        done(err);
      });
  });

  it('it should not create an admin without any of first name, last name, email or password', (done) => {
    const admin = {
      is_admin: true,
      email: '',
      first_name: '',
      last_name: '',
      password: '',
    };
    chai.request(app)
      .post('/api/v1/admin/signup')
      .set('Accept', 'application/json')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Email, password, first name and last name are required');
        done(err);
      });
  });

  it('it should not post a admin, if email is not valid', (done) => {
    const admin = {
      is_admin,
      email: 'admin.com',
      first_name,
      last_name,
      password,
    };
    chai.request(app)
      .post('/api/v1/admin/signup')
      .set('Accept', 'application/json')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter a valid email address');
        done(err);
      });
  });

  it('it should not post a admin if password is invalid', (done) => {
    const admin = {
      is_admin,
      email,
      password: 'pass',
      first_name,
      last_name,
    };
    chai.request(app)
      .post('/api/v1/admin/signup')
      .set('Accept', 'application/json')
      .send(admin)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter a valid password with more than eight(8) characters');
        done(err);
      });
  });
});
