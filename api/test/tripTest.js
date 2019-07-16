import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import app from '../app';
import pool from '../models/dbPool';

chai.use(chaiHttp);
const should = chai.should();
should;

const fare = 3000.00;
const bus_id = 1;
const origin = 'Duai';
const destination = 'London';
const trip_date = moment(new Date());
const token = jwt.sign(
  {
    email: 'zlatan@gmail.com',
    user_id: 1,
    is_admin: true,
    first_name: 'Ibrahim',
    last_name: 'Babatunde',
  },
  process.env.SECRET,
  {
    expiresIn: '2h',
  },
);
beforeEach(() => {
  pool.query('TRUNCATE TABLE trips CASCADE',
    err => err);
});

// Test for creating a trip
describe('/POST create new trip', () => {
  it('it should not create a trip if authorization token is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/trips')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly provide token');
        done(err);
      });
  });

  it('it should not create a trip with no specified origin', (done) => {
    const trip = {
      bus_id,
      origin: '',
      destination,
      trip_date,
      fare,
    };
    chai.request(app)
      .post('/api/v1/trips')
      .set('token', token)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill the all required details for the trip');
        done(err);
      });
  });

  it('it should not create a trip without a specified destination', (done) => {
    const trip = {
      bus_id,
      origin,
      trip_date,
      fare,
      destination: ''
    };
    chai.request(app)
      .post('/api/v1/trips')
      .set('token', token)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill the all required details for the trip');
        done(err);
      });
  });

  it('it should not create a trip without a specified bus id', (done) => {
    const trip = {
      bus_id: '',
      origin,
      destination,
      trip_date,
      fare,
    };
    chai.request(app)
      .post('/api/v1/trips')
      .set('token', token)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill the all required details for the trip');
        done(err);
      });
  });

  it('it should post and create a trip', (done) => {
    const trip = {
      bus_id,
      origin,
      destination,
      trip_date,
      fare,
    };
    chai.request(app)
      .post('/api/v1/trips')
      .set('token', token)
      .send(trip)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('message').eql('Trip created successfully');
        res.body.should.have.property('data');
        done(err);
      });
  });
});

describe('/GET/ all trips', () => {
  it('it should return no trips if there are no trips yet', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('token', token)
      .end((err, res) => {
        if (res.body.data === undefined) {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('There are currently no trips');
        }
        done(err);
      });
  });

  it('it should get trips for all users', (done) => {
    chai.request(app)
      .get('/api/v1/trips')
      .set('token', token)
      .end((err, res) => {
        if (!res.body.data === undefined) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
        }
        done(err);
      });
  });
});

// Cancel a trip
describe('/DELETE/ Cancel trips', () => {
  it('it should return a response if there are no trips with that id', (done) => {
    chai.request(app)
      .patch('/api/v1/trips/1')
      .set('token', token)
      .end((err, res) => {
        if (res.body.data === undefined) {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('There is no trip with that id');        
        }
        done(err);
      });
  });
  it('it should return trip cancelled successfully', (done) => {
    chai.request(app)
      .patch('/api/v1/trips/1')
      .set('token', token)
      .end((err, res) => {
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
