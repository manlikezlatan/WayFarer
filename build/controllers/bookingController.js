"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _query = _interopRequireDefault(require("../models/query"));

var Bookings = {
  /**
     * Book a trip
     * @param {object} req
     * @param {object} res
     * @returns {object} Bookings object
     */
  createBooking: function () {
    var _createBooking = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var _req$body, trip_id, bus_id, trip_date, seat_number, _req$user, first_name, last_name, user_id, email, createBookingQuery, values, _ref, rows, data;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, trip_id = _req$body.trip_id, bus_id = _req$body.bus_id, trip_date = _req$body.trip_date, seat_number = _req$body.seat_number;
              _req$user = req.user, first_name = _req$user.first_name, last_name = _req$user.last_name, user_id = _req$user.user_id, email = _req$user.email;

              if (trip_id) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Kindly enter a correct trip ID'
              }));

            case 4:
              createBookingQuery = "INSERT INTO\n        bookings(user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email)\n        VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n        returning *";
              values = [user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email];
              _context.prev = 6;
              _context.next = 9;
              return _query["default"].query(createBookingQuery, values);

            case 9:
              _ref = _context.sent;
              rows = _ref.rows;
              data = rows[0];
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Booking successfully created',
                data: data
              }));

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](6);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 19;
                break;
              }

              return _context.abrupt("return", res.status(409).json({
                status: 'error',
                error: 'Your preferred seat is taken already, kindly choose another'
              }));

            case 19:
              return _context.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'An error occured. Kindly try again with correct trip details'
              }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 15]]);
    }));

    function createBooking(_x, _x2) {
      return _createBooking.apply(this, arguments);
    }

    return createBooking;
  }(),

  /**
     * Get All Bookings
     * @param {object} req
     * @param {object} res
     * @returns {object} returns bookings
     */
  getAllBookings: function () {
    var _getAllBookings = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var _req$user2, is_admin, user_id, _getAllBookingsQuery, _ref2, rows, data, getAllBookingsQuery, _ref3, _rows, _data;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$user2 = req.user, is_admin = _req$user2.is_admin, user_id = _req$user2.user_id;

              if (!(!is_admin === true)) {
                _context2.next = 17;
                break;
              }

              _getAllBookingsQuery = 'SELECT * FROM bookings WHERE user_id = $1';
              _context2.prev = 3;
              _context2.next = 6;
              return _query["default"].query(_getAllBookingsQuery, [user_id]);

            case 6:
              _ref2 = _context2.sent;
              rows = _ref2.rows;

              if (!(rows[0] === undefined)) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'you have no bookings at the moment'
              }));

            case 10:
              data = rows;
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                data: data
              }));

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'An error occured. Please try again later'
              }));

            case 17:
              // Admin can view all bookings
              getAllBookingsQuery = 'SELECT * FROM bookings ORDER BY booking_id ASC';
              _context2.prev = 18;
              _context2.next = 21;
              return _query["default"].query(getAllBookingsQuery);

            case 21:
              _ref3 = _context2.sent;
              _rows = _ref3.rows;

              if (!(_rows[0] === undefined)) {
                _context2.next = 25;
                break;
              }

              return _context2.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'There are currently no bookings'
              }));

            case 25:
              _data = _rows;
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                data: _data
              }));

            case 29:
              _context2.prev = 29;
              _context2.t1 = _context2["catch"](18);
              return _context2.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'Sorry, an error occured. Please try again later'
              }));

            case 32:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 14], [18, 29]]);
    }));

    function getAllBookings(_x3, _x4) {
      return _getAllBookings.apply(this, arguments);
    }

    return getAllBookings;
  }(),

  /**
   * Delete booking
   * @param {object} req
   * @param {object} res
   * @returns {void} returns booking deleted
   */
  deleteBooking: function () {
    var _deleteBooking = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res) {
      var bookingId, user_id, deleteBookingQuery, _ref4, rows;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              bookingId = req.params.bookingId;
              user_id = req.user.user_id;
              deleteBookingQuery = 'DELETE FROM bookings WHERE booking_id = $1 AND user_id = $2 returning *';
              _context3.prev = 3;
              _context3.next = 6;
              return _query["default"].query(deleteBookingQuery, [bookingId, user_id]);

            case 6:
              _ref4 = _context3.sent;
              rows = _ref4.rows;
              console.log(rows);

              if (rows[0]) {
                _context3.next = 11;
                break;
              }

              return _context3.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'You have no booking with the specified booking ID'
              }));

            case 11:
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Your booking was deleted successfully',
                data: {}
              }));

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](3);
              return _context3.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'Sorry, an error occured. Try again later'
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 14]]);
    }));

    function deleteBooking(_x5, _x6) {
      return _deleteBooking.apply(this, arguments);
    }

    return deleteBooking;
  }(),

  /**
  * Update seat number on a booking
  * @param {object} req 
  * @param {object} res 
  * @returns {object} updated user
  */
  updateSeat: function () {
    var _updateSeat = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(req, res) {
      var bookingId, seat_number, user_id, getBookingQuery, updateBookingSeat, _ref5, rows, values, result, data;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              bookingId = req.params.bookingId;
              seat_number = req.body.seat_number;
              user_id = req.user.user_id;

              if (seat_number) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Choose a seat number'
              }));

            case 5:
              getBookingQuery = 'SELECT * FROM booking WHERE booking_id=$1';
              updateBookingSeat = "UPDATE bookings\n        SET seat_number=$1 WHERE user_id=$2 AND booking_id=$3 returning *";
              _context4.prev = 7;
              _context4.next = 10;
              return _query["default"].query(getBookingQuery, [bookingId]);

            case 10:
              _ref5 = _context4.sent;
              rows = _ref5.rows;

              if (rows[0]) {
                _context4.next = 14;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                status: 'error',
                error: 'This booking cannot be found'
              }));

            case 14:
              values = [seat_number, user_id, booking_id];
              _context4.next = 17;
              return _query["default"].query(updateBookingSeat, values);

            case 17:
              result = _context4.sent;
              data = result.rows[0];
              delete data.seat_number;
              return _context4.abrupt("return", res.status(200).json({
                status: 'success',
                message: 'Booking updated successfully',
                data: data
              }));

            case 23:
              _context4.prev = 23;
              _context4.t0 = _context4["catch"](7);

              if (!(_context4.t0.routine === '_bt_check_unique')) {
                _context4.next = 27;
                break;
              }

              return _context4.abrupt("return", res.status(409).json({
                status: 'error',
                error: 'Your preferred seat number is already taken. Kindly choose another.'
              }));

            case 27:
              return _context4.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'An error occured'
              }));

            case 28:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[7, 23]]);
    }));

    function updateSeat(_x7, _x8) {
      return _updateSeat.apply(this, arguments);
    }

    return updateSeat;
  }()
};
var _default = Bookings;
exports["default"] = _default;
//# sourceMappingURL=bookingController.js.map