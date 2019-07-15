const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('connected to wayfarer database');
});

/**
 * Create Users Table
 */
const createUsersTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (user_id BIGSERIAL PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    first_name VARCHAR(100), 
    last_name VARCHAR(100), 
    password VARCHAR(100) NOT NULL,
    is_admin BOOLEAN DEFAULT(false),
    created_on TIMESTAMP DEFAULT current_timestamp NOT NULL)`;

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
const createBusesTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS buses
    (bus_id BIGSERIAL PRIMARY KEY, 
    number_plate VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(10) NOT NULL,
    capacity BIGINT DEFAULT 0 NOT NULL,
    created_on TIMESTAMP DEFAULT current_timestamp NOT NULL)`;

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
 * Create Trips Table
 */
const createTripsTable = () => {
  const tripsCreateQuery = `CREATE TABLE IF NOT EXISTS trips 
    (trip_id BIGSERIAL PRIMARY KEY,
    bus_id BIGINT REFERENCES buses(bus_id) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    trip_date DATE NOT NULL,
    fare FLOAT NOT NULL,
    status FLOAT DEFAULT(1.00)
  )`;

  pool.query(tripsCreateQuery)
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
  const bookingCreateQuery = `CREATE TABLE IF NOT EXISTS bookings
  (booking_id BIGSERIAL NOT NULL, 
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE, 
    trip_id INTEGER REFERENCES trips(trip_id) ON DELETE CASCADE, 
    bus_id INTEGER REFERENCES buses(bus_id) ON DELETE CASCADE, 
    trip_date DATE NOT NULL, seat_number INTEGER UNIQUE, 
    first_name VARCHAR(100) NOT NULL, 
    last_name VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    created_on TIMESTAMP DEFAULT current_timestamp NOT NULL, 
    PRIMARY KEY(trip_id, user_id)
  )`;

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
  const usersDropQuery = 'DROP TABLE IF EXISTS users';
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
const dropBusesTable = () => {
  const busesDropQuery = 'DROP TABLE IF EXISTS buses';
  pool.query(busesDropQuery)
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
  const tripsDropQuery = 'DROP TABLE IF EXISTS trips';
  pool.query(tripsDropQuery)
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
 * Drop Bookings Table
 */
const dropBookingsTable = () => {
  const bookingsDropQuery = 'DROP TABLE IF EXISTS bookings';
  pool.query(bookingsDropQuery)
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
  createBusesTable();
  createTripsTable();
  createBookingsTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUsersTable();
  dropBusesTable();
  dropTripsTable();
  dropBookingsTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAllTables,
  dropAllTables
};

require('make-runnable');
