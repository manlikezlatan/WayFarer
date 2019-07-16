"use strict";

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();
var dbConfig = {
  connectionString: process.env.DATABASE_URL
};
var pool = new Pool(dbConfig);
pool.on('connect', function () {
  console.log('connected to wayfarer database');
});
/**
 * Create Users Table
 */

var createUsersTable = function createUsersTable() {
  var userCreateQuery = "CREATE TABLE IF NOT EXISTS users\n    (user_id BIGSERIAL PRIMARY KEY, \n    email VARCHAR(100) UNIQUE NOT NULL, \n    first_name VARCHAR(100), \n    last_name VARCHAR(100), \n    password VARCHAR(100) NOT NULL,\n    is_admin BOOLEAN DEFAULT(false),\n    created_on TIMESTAMP DEFAULT current_timestamp NOT NULL)";
  pool.query(userCreateQuery).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Create Buses Table
 */


var createBusesTable = function createBusesTable() {
  var userCreateQuery = "CREATE TABLE IF NOT EXISTS buses\n    (bus_id BIGSERIAL PRIMARY KEY, \n    number_plate VARCHAR(100) NOT NULL,\n    manufacturer VARCHAR(100) NOT NULL,\n    model VARCHAR(100) NOT NULL,\n    year VARCHAR(10) NOT NULL,\n    capacity BIGINT DEFAULT 0 NOT NULL,\n    created_on TIMESTAMP DEFAULT current_timestamp NOT NULL)";
  pool.query(userCreateQuery).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Create Trips Table
 */


var createTripsTable = function createTripsTable() {
  var tripsCreateQuery = "CREATE TABLE IF NOT EXISTS trips \n    (trip_id BIGSERIAL PRIMARY KEY,\n    bus_id BIGINT REFERENCES buses(bus_id) NOT NULL,\n    origin VARCHAR(255) NOT NULL,\n    destination VARCHAR(255) NOT NULL,\n    trip_date DATE NOT NULL,\n    fare FLOAT NOT NULL,\n    status FLOAT DEFAULT(1.00)\n  )";
  pool.query(tripsCreateQuery).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Create Bookings Table
 */


var createBookingsTable = function createBookingsTable() {
  var bookingCreateQuery = "CREATE TABLE IF NOT EXISTS bookings\n  (booking_id BIGSERIAL NOT NULL, \n    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE, \n    trip_id INTEGER REFERENCES trips(trip_id) ON DELETE CASCADE, \n    bus_id INTEGER REFERENCES buses(bus_id) ON DELETE CASCADE, \n    trip_date DATE NOT NULL, seat_number INTEGER UNIQUE, \n    first_name VARCHAR(100) NOT NULL, \n    last_name VARCHAR(100) NOT NULL, \n    email VARCHAR(100) NOT NULL, \n    created_on TIMESTAMP DEFAULT current_timestamp NOT NULL, \n    PRIMARY KEY(trip_id, user_id)\n  )";
  pool.query(bookingCreateQuery).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop Users Table
 */


var dropUsersTable = function dropUsersTable() {
  var usersDropQuery = 'DROP TABLE IF EXISTS users';
  pool.query(usersDropQuery).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop Buses Table
 */


var dropBusesTable = function dropBusesTable() {
  var busesDropQuery = 'DROP TABLE IF EXISTS buses';
  pool.query(busesDropQuery).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop Trips Table
 */


var dropTripsTable = function dropTripsTable() {
  var tripsDropQuery = 'DROP TABLE IF EXISTS trips';
  pool.query(tripsDropQuery).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Drop Bookings Table
 */


var dropBookingsTable = function dropBookingsTable() {
  var bookingsDropQuery = 'DROP TABLE IF EXISTS bookings';
  pool.query(bookingsDropQuery).then(function (res) {
    console.log(res);
    pool.end();
  })["catch"](function (err) {
    console.log(err);
    pool.end();
  });
};
/**
 * Create All Tables
 */


var createAllTables = function createAllTables() {
  createUsersTable();
  createBusesTable();
  createTripsTable();
  createBookingsTable();
};
/**
 * Drop All Tables
 */


var dropAllTables = function dropAllTables() {
  dropUsersTable();
  dropBusesTable();
  dropTripsTable();
  dropBookingsTable();
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});
module.exports = {
  createAllTables: createAllTables,
  dropAllTables: dropAllTables
};

require('make-runnable');
//# sourceMappingURL=db.js.map