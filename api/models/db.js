const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('connected to wayfarer db');
});

/**
 * Create Users Table
 */
const createUsersTable = () => {
  const userCreateQuery =
    `CREATE TABLE IF NOT EXISTS users
  (user_id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  is_admin BOOL DEFAULT(false),
  created_on DATE NOT NULL)`;

  pool.query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Buses Table
 */
const createBusTable = () => {
  const busCreateQuery =
    `CREATE TABLE IF NOT EXISTS buses
    (bus_id SERIAL PRIMARY KEY,
    number_plate VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(10) NOT NULL,
    capacity integer NOT NULL,
    created_on DATE NOT NULL)`;

  pool.query(busCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Trips Table
 */
const createTripsTable = () => {
  const tripCreateQuery =
    `CREATE TABLE IF NOT EXISTS trips
    (trip_id SERIAL PRIMARY KEY, 
    bus_id INTEGER REFERENCES bus(bus_id) ON DELETE CASCADE,
    origin VARCHAR(300) NOT NULL, 
    destination VARCHAR(300) NOT NULL,
    trip_date DATE NOT NULL,
    fare float NOT NULL,
    status float DEFAULT(1.00),
    created_on DATE NOT NULL)`;

  pool.query(tripCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Bookings Table
 */
const createBookingsTable = () => {
  const bookingCreateQuery =
    `CREATE TABLE IF NOT EXISTS booking
      (booking_id SERIAL, 
      trip_id INTEGER REFERENCES trip(trip_id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
      bus_id INTEGER REFERENCES bus(bus_id) ON DELETE CASCADE,
      created_on DATE NOT NULL,
      PRIMARY KEY (booking_id, trip_id, user_id, bus_id))`;

  pool.query(bookingCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Users Table
 */
const dropUsersTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS users returning *';
  pool.query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Buses Table
 */
const dropBusTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS bus returning *';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Trips Table
 */
const dropTripsTable = () => {
  const tripDropQuery = 'DROP TABLE IF EXISTS trip returning *';
  pool.query(tripDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Buses Table
 */
const dropBookingsTable = () => {
  const bookingDropQuery = 'DROP TABLE IF EXISTS booking returning *';
  pool.query(bookingDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUsersTable();
  createBusTable();
  createBookingsTable();
  createTripsTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUsersTable();
  dropBusTable();
  dropBookingsTable();
  dropTripsTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAllTables,
  dropAllTables,
};

require('make-runnable');