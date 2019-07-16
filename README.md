[![Build Status](https://travis-ci.org/manlikezlatan/WayFarer.svg?branch=develop)](https://travis-ci.org/manlikezlatan/WayFarer)

[![Coverage Status](https://coveralls.io/repos/github/manlikezlatan/WayFarer/badge.svg?branch=develop)](https://coveralls.io/github/manlikezlatan/WayFarer?branch=develop)

<a href="https://codeclimate.com/github/manlikezlatan/WayFarer/maintainability"><img src="https://api.codeclimate.com/v1/badges/c8e9ea16b166407320fa/maintainability" /></a>

# WayFarer
WayFarer is a public transportation booking application

#### Technologies Used

This Project was created with:

- JavaScript - The Programming Language for the Web
- NodeJS - An open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser. ( A javascript server-side engine)
- Express Library - A web application framework for Node.js.
- Mocha/Chai - Unit testing frameworks
- Pivotal Tracker - A project management/planning tool.
- Travis CI - A continuous integration and testing platform.
- Coveralls - A hosted analysis tool, providing statistics about your code coverage.


## Getting Started


## Installation
-Clone the repo or download the zip file
-git clone "https://github.com/manlikezlatan/WayFarer.git"
-cd Wayfarer
-run npm install
-run npm run start

#### Running Tests

run npm test

## API Endpoints

POST /auth/signup Create User Account

POST /auth/signin Login a user

POST /trips Create a trip 

GET /trips Get all trips

POST /bookings Book a seat on a trip

GET /bookings See all of your bookings

DELETE /bookings/:bookingId Delete A Booking

PATCH /trips/:tripId Cancel A Trip 

PUT /bookings/:bookingId Update Booking Seat Number

POST /buses Add a bus 

GET /buses Get all buses 

GET /trips/origin Filter trips by origin

GET /trips/destination Filter trips by destination


## Author
***Ibrahim Babatunde**
