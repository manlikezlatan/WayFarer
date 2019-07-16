import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import pool from '../models/dbPool';

chai.use(chaiHttp);
const should = chai.should();
should;

const number_plate = 'CODACK';
const manufacturer = 'Bugatti';
const model = 'Chiron';
const year = 2020;
const capacity = 20;
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
  pool.query('TRUNCATE TABLE buses CASCADE',
    err => err);
});

// ADD buses Testing
describe('/POST add a bus', () => {
  it('it should not add a bus if authorization token is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/buses')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly provide token');
        done(err);
      });
  });

  it('it should not add a bus without any bus details', (done) => {
    const bus = {
      number_plate: '',
      manufacturer: '',
      model: '',
      year: '',
      capacity: '',
    };
    chai.request(app)
      .post('/api/v1/buses')
      .set('token', token)
      .send(bus)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill the required fields');
        done(err);
      });
  });

  it('it should not add a bus without number plate only', (done) => {
    const bus = {
      model,
      year,
      manufacturer,
      capacity
    };
    chai.request(app)
      .post('/api/v1/buses')
      .set('token', token)
      .send(bus)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill the required fields');
        done(err);
      });
  });

  it('it should not add a bus without a manufacturer', (done) => {
    const bus = {
      number_plate,
      manufacturer: '',
      model,
      year,
      capacity,
    };
    chai.request(app)
      .post('/api/v1/buses')
      .set('token', token)
      .send(bus)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('error').eql('Kindly fill the required fields');
        done(err);
      });
  });

  it('it should add a bus', (done) => {
    const bus = {
      number_plate,
      manufacturer,
      model,
      year,
      capacity,
    };
    chai.request(app)
      .post('/api/v1/buses')
      .set('token', token)
      .send(bus)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        done(err);
      });
  });
});

// Get all buses
describe('/GET/ all buses', () => {
  it('it should return a response of no buses if there are no buses yet', (done) => {
    chai.request(app)
      .get('/api/v1/buses')
      .set('token', token)
      .end((err, res) => {
        if (res.body.data === undefined) {
          res.should.have.status(status.notfound);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('error').eql('There are no buses');
        }
        done(err);
      });
  });
  it('it should make an admin GET all buses', (done) => {
    chai.request(app)
      .get('/api/v1/buses')
      .set('token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data');
        done(err);
      });
  });
});
