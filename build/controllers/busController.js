"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _query = _interopRequireDefault(require("../models/query"));

var Buses = {
  /**
     * Add A Bus
     * @param {object} req
     * @param {object} res
     * @returns {object} Bus object
     */
  addBusDetails: function () {
    var _addBusDetails = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var _req$body, number_plate, manufacturer, model, year, capacity, is_admin, createBusQuery, values, _ref, rows, data;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, number_plate = _req$body.number_plate, manufacturer = _req$body.manufacturer, model = _req$body.model, year = _req$body.year, capacity = _req$body.capacity;
              is_admin = req.user.is_admin;

              if (!(!is_admin === true)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                status: 'error',
                error: 'Sorry, you are not authorized to edit or add a bus details'
              }));

            case 4:
              if (!(!number_plate || !manufacturer || !model || !year || !capacity)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Kindly fill the required fields'
              }));

            case 6:
              createBusQuery = "INSERT INTO\n        buses(number_plate, manufacturer, model, year, capacity)\n        VALUES($1, $2, $3, $4, $5)\n        returning *";
              values = [number_plate, manufacturer, model, year, capacity];
              _context.prev = 8;
              _context.next = 11;
              return _query["default"].query(createBusQuery, values);

            case 11:
              _ref = _context.sent;
              rows = _ref.rows;
              data = rows[0];
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Bus added successfully',
                data: data
              }));

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](8);
              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Unable to add bus'
              }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[8, 17]]);
    }));

    function addBusDetails(_x, _x2) {
      return _addBusDetails.apply(this, arguments);
    }

    return addBusDetails;
  }(),

  /**
     * Get All Buses
     * @param {object} req
     * @param {object} res
     * @returns {object} buses array
     */
  getAllBuses: function () {
    var _getAllBuses = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var is_admin, getAllBusQuery, _ref2, rows, data;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              is_admin = req.user.is_admin;

              if (!(!is_admin === true)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                status: 'error',
                error: 'Sorry You are unauthorized to view all buses'
              }));

            case 3:
              getAllBusQuery = 'SELECT * FROM buses ORDER BY bus_id ASC';
              _context2.prev = 4;
              _context2.next = 7;
              return _query["default"].query(getAllBusQuery);

            case 7:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              data = rows;

              if (rows) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'There are currently no buses'
              }));

            case 12:
              return _context2.abrupt("return", res.status(200).json({
                status: 'success',
                data: data
              }));

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](4);
              return _context2.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'An error occured. Try again later'
              }));

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[4, 15]]);
    }));

    function getAllBuses(_x3, _x4) {
      return _getAllBuses.apply(this, arguments);
    }

    return getAllBuses;
  }()
};
var _default = Buses;
exports["default"] = _default;
//# sourceMappingURL=busController.js.map