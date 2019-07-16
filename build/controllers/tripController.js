"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _query = _interopRequireDefault(require("../models/query"));

var Trips = {
  /**
     * Create a Trip
     * @param {object} req
     * @param {object} res
     * @returns {object} Trips object
     */
  createTrip: function () {
    var _createTrip = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var _req$body, bus_id, origin, destination, trip_date, fare, is_admin, createtripQuery, values, _ref, rows, data;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, bus_id = _req$body.bus_id, origin = _req$body.origin, destination = _req$body.destination, trip_date = _req$body.trip_date, fare = _req$body.fare;
              is_admin = req.user.is_admin;

              if (!(!is_admin === true)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                status: 'error',
                error: 'Sorry, you are not authorized to create a trip'
              }));

            case 4:
              if (!(!bus_id || !origin || !destination || !trip_date || !fare)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Kindly fill the all required details for the trip'
              }));

            case 6:
              createtripQuery = "INSERT INTO \n        trips(bus_id, origin, destination, trip_date, fare)\n        VALUES($1, $2, $3, $4, $5)\n        returning *";
              values = [bus_id, origin, destination, trip_date, fare];
              _context.prev = 8;
              _context.next = 11;
              return _query["default"].query(createtripQuery, values);

            case 11:
              _ref = _context.sent;
              rows = _ref.rows;
              data = rows[0];
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Trip created successfully.',
                data: data
              }));

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](8);
              return _context.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'Unable to create trip'
              }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 17]]);
    }));

    function createTrip(_x, _x2) {
      return _createTrip.apply(this, arguments);
    }

    return createTrip;
  }(),

  /**
   * cancel A Trip
   * @param {object} req
   * @param {object} res
   * @returns {void} return trip cancelled successfully
   */
  cancelTrip: function () {
    var _cancelTrip = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var tripId, is_admin, deleteTripQuery, _ref2, rows;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              tripId = req.params.tripId;
              is_admin = req.user.is_admin;
              console.log(req.params);

              if (!(!is_admin === true)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                status: 'error',
                error: 'Sorry, you are not authorized to cancel a trip'
              }));

            case 5:
              deleteTripQuery = 'DELETE FROM trips WHERE trip_id=$1 returning *';
              _context2.prev = 6;
              _context2.next = 9;
              return _query["default"].query(deleteTripQuery, [tripId]);

            case 9:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              console.log(rows);

              if (rows[0]) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'There is no trip with that id'
              }));

            case 14:
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Trip cancelled successfully',
                data: {}
              }));

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](6);
              return _context2.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'An error has occured, try again later'
              }));

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[6, 17]]);
    }));

    function cancelTrip(_x3, _x4) {
      return _cancelTrip.apply(this, arguments);
    }

    return cancelTrip;
  }(),

  /**
   * Get All Trips
   * @param {object} req
   * @param {object} res
   * @returns {object} trips array
   */
  getAllTrips: function () {
    var _getAllTrips = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res) {
      var getAllTripsQuery, _ref3, rows, data;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              getAllTripsQuery = 'SELECT * FROM trips ORDER BY trip_id ASC';
              _context3.prev = 1;
              _context3.next = 4;
              return _query["default"].query(getAllTripsQuery);

            case 4:
              _ref3 = _context3.sent;
              rows = _ref3.rows;
              data = rows;

              if (rows[0]) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'There are currently no trips'
              }));

            case 9:
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                data: data
              }));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'An error occured, please try again later'
              }));

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 12]]);
    }));

    function getAllTrips(_x5, _x6) {
      return _getAllTrips.apply(this, arguments);
    }

    return getAllTrips;
  }()
};
var _default = Trips;
exports["default"] = _default;
//# sourceMappingURL=tripController.js.map