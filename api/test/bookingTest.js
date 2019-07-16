import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import faker from 'faker';
import app from '../app';
import pool from '../models/dbPool';

chai.use(chaiHttp);
const should = chai.should();
should;

const trip_id = 10;
const bus_id = 10;
const trip_date = '25-07-2019';
const seat_number = faker.random.number();
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
  pool.query('TRUNCATE TABLE bookings CASCADE',
    err => err);
});


// Test for booking a trip
describe('/POST create new booking', () => {
  it('it should not create a booking if authorization token is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/bookings')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly provide token');
        done(err);
      });
  });

  it('it should not create a booking without a trip id', (done) => {
    const booking = {
      trip_id: '',
      bus_id,
      trip_date,
      seat_number,
    };
    chai.request(app)
      .post('/api/v1/bookings')
      .set('token', token)
      .send(booking)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly enter a correct trip ID');
        done(err);
      });
  });

  it('it should book a trip', (done) => {
    const booking = {
      trip_id,
      bus_id,
      trip_date,
      seat_number,
    };
    chai.request(app)
      .post('/api/v1/bookings')
      .set('token', token)
      .send(booking)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        done(err);
      });
  });
});


// Get all bookings
describe('/GET/ view all bookings', () => {
  it('it should return no bookings if there are no bookings', (done) => {
    chai.request(app)
      .get('/api/v1/bookings')
      .set('token', token)
      .end((err, res) => {
        if (res.body.data === undefined) {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('There are currently no bookings');
        }
        done(err);
      });
  });
  it('it should get all bookings for an admin', (done) => {
    chai.request(app)
      .get('/api/v1/bookings')
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

// delete a booking
describe('/DELETE/ delete a booking', () => {
  it('it should return no bookings with that id if specified booking id is incorrect', (done) => {
    chai.request(app)
      .delete('/api/v1/bookings/1')
      .set('token', token)
      .end((err, res) => {
        if (res.body.data === undefined) {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('You have no booking with the specified booking ID');
        }
        done(err);
      });
  });

  it('it should return booking deleted successfully if specified booking id is correct', (done) => {
    chai.request(app)
      .delete('/api/v1/bookings/1')
      .set('token', token)
      .end((err, res) => {
        if (!res.body.data === undefined) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.data.should.have.property('message').eql('Booking deleted successfully');
        }
        done(err);
      });
  });
});

// Update seat number of a booking
describe('/PUT update seat number of a booking', () => {
  it('it should not UPDATE booking seat number if auth token is not provided', (done) => {
    chai.request(app)
      .put('/api/v1/bookings/1')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly provide token');
        done(err);
      });
  });

  it('it should not update booking seat number if seat number is not provided', (done) => {
    const booking = {
      seat_number: '',
    };
    chai.request(app)
      .put('/api/v1/bookings/1')
      .set('token', token)
      .send(booking)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Choose a seat number');
        done(err);
      });
  });
});
