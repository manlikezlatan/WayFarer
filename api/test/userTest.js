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


// Normal User sign up Testing
describe('/POST sign up a user', () => {
  it('it should not sign up a user without email', (done) => {
    const user = {
      first_name,
      last_name,
      password
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
  });

  it('it should not create a user without password', (done) => {
    const user = {
      email,
      first_name,
      last_name,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
  });

  it('it should not create a user without first name', (done) => {
    const user = {
      first_name: '',
      last_name,
      password,
      email,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
  });

  it('it should not create a user without last name', (done) => {
    const user = {
      password,
      first_name,
      last_name: '',
      email,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
  });

  it('it should not create a user without any of email, password, first name or password', (done) => {
    const user = {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill your complete details');
        done(err);
      });
  });

  it('it should not post a user, if user already exists', (done) => {
    const user = {
      email,
      password,
      first_name,
      last_name,
    };
    pool.query('INSERT INTO users(email, password, first_name, last_name) values($1, $2, $3, $4)', [email, password, first_name, last_name], () => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('User with that email already exist');
          done(err);
        });
    });
  });
  it('it should not post a user, if email is not valid', (done) => {
    const user = {
      email: 'face.com',
      first_name,
      last_name,
      password,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter a valid email address');
        done(err);
      });
  });

  it('it should not post a user, if password is not valid', (done) => {
    const user = {
      email,
      password: 'pass',
      first_name,
      last_name,
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter a valid password with more than eight(8) characters');
        done(err);
      });
  });

  it('it should post a user', (done) => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done(err);
      });
  });
});

// User sign in testing
describe('/POST Sign user in', () => {
  it('it should not log in a user without email', (done) => {
    const user = {
      password,
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter your email and password');
        done(err);
      });
  });

  it('it should not log in a user without password', (done) => {
    const user = {
      email,
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter your email and password');
        done(err);
      });
  });

  it('it should not log a user in, if email is empty', (done) => {
    const user = {
      email: '',
      password,
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter your email and password');
        done(err);
      });
  });

  it('it should not log a user in, if email is incorrect', (done) => {
    const user = {
      email: 'test.com',
      password,
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Please enter a valid email address');
        done(err);
      });
  });

  it('it should not log a user in, if password is not valid or correct', (done) => {
    const user = {
      email,
      password: 'pass',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('The email or password you provided is incorrect');
        done(err);
      });
  });

  it('it should not log a user in if user does not exist', (done) => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(8),
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('User with this email does not exist');
        done(err);
      });
    process.exit(0);
  });
});
});
