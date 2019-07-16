"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _query = _interopRequireDefault(require("../models/query"));

var _helpers = _interopRequireDefault(require("../services/helpers"));

/* eslint-disable camelcase */
var Users = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} User object
   */
  signup: function () {
    var _signup = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res) {
      var _req$body, email, password, first_name, last_name, hashedPassword, createQuery, values, _ref, rows, id, is_admin, token;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, password = _req$body.password, first_name = _req$body.first_name, last_name = _req$body.last_name;

              if (!(!email || !password || !first_name || !last_name)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Kindly fill your complete details'
              }));

            case 3:
              if (_helpers["default"].isValidEmail(email)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Please enter a valid email address'
              }));

            case 5:
              if (_helpers["default"].validatePassword(password)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Please enter a valid password with more than eight(8) characters'
              }));

            case 7:
              hashedPassword = _helpers["default"].hashPassword(password);
              createQuery = "INSERT INTO\n      users(email, first_name, last_name, password)\n      VALUES($1, $2, $3, $4)\n      returning *";
              values = [email, first_name, last_name, hashedPassword];
              _context.prev = 10;
              _context.next = 13;
              return _query["default"].query(createQuery, values);

            case 13:
              _ref = _context.sent;
              rows = _ref.rows;
              id = rows[0].user_id;
              is_admin = rows[0].is_admin;
              token = _helpers["default"].generateToken(id);
              return _context.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'Account created successfully',
                data: {
                  id: id,
                  is_admin: is_admin,
                  token: token
                }
              }));

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](10);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 25;
                break;
              }

              return _context.abrupt("return", res.status(409).json({
                status: 'error',
                error: 'User with that email already exist'
              }));

            case 25:
              return _context.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'Request failed. Try again later.'
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[10, 21]]);
    }));

    function signup(_x, _x2) {
      return _signup.apply(this, arguments);
    }

    return signup;
  }(),

  /**
    * Admin Sign Up
    * @param {object} req
    * @param {object} res
    * @returns {object} Admin object
    */
  AdminSignup: function () {
    var _AdminSignup = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res) {
      var _req$body2, email, first_name, last_name, password, is_admin, hashedPassword, createAdminQuery, values, _ref2, rows, userId, token;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body2 = req.body, email = _req$body2.email, first_name = _req$body2.first_name, last_name = _req$body2.last_name, password = _req$body2.password, is_admin = _req$body2.is_admin;

              if (!(!is_admin === true)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", res.status(401).json({
                status: 'error',
                error: 'Unauthorized'
              }));

            case 3:
              if (!(!email || !first_name || !last_name || !password)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Email, password, first name and last name are required'
              }));

            case 5:
              if (_helpers["default"].isValidEmail(email)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Please enter a valid email address'
              }));

            case 7:
              if (_helpers["default"].validatePassword(password)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Please enter a valid password with more than eight(8) characters'
              }));

            case 9:
              hashedPassword = _helpers["default"].hashPassword(password);
              createAdminQuery = "INSERT INTO\n      users(email, first_name, last_name, password, is_admin)\n      VALUES($1, $2, $3, $4, $5)\n      returning *";
              values = [email, first_name, last_name, hashedPassword, is_admin];
              _context2.prev = 12;
              _context2.next = 15;
              return _query["default"].query(createAdminQuery, values);

            case 15:
              _ref2 = _context2.sent;
              rows = _ref2.rows;
              delete rows[0].password;
              userId = rows[0].user_id;
              token = _helpers["default"].generateToken(rows[0].user_id);
              return _context2.abrupt("return", res.status(201).json({
                status: 'success',
                message: 'An admin has been created successfully',
                data: {
                  userId: userId,
                  token: token
                }
              }));

            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](12);

              if (!(_context2.t0.routine === '_bt_check_unique')) {
                _context2.next = 27;
                break;
              }

              return _context2.abrupt("return", res.status(409).json({
                status: 'error',
                error: 'Admin with that email already exist'
              }));

            case 27:
              return _context2.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Request failed. Try again later.'
              }));

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[12, 23]]);
    }));

    function AdminSignup(_x3, _x4) {
      return _AdminSignup.apply(this, arguments);
    }

    return AdminSignup;
  }(),

  /**
   * User Sign in
   * @param {object} req
   * @param {object} res
   * @returns {object} User object
   */
  signin: function () {
    var _signin = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res) {
      var _req$body3, email, password, signinQuery, _ref3, rows, token, id, is_admin;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;

              if (!(!email || !password)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Please enter your email and password'
              }));

            case 3:
              if (_helpers["default"].isValidEmail(email)) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Please enter a valid email address'
              }));

            case 5:
              signinQuery = 'SELECT * FROM users WHERE email = $1';
              _context3.prev = 6;
              _context3.next = 9;
              return _query["default"].query(signinQuery, [email]);

            case 9:
              _ref3 = _context3.sent;
              rows = _ref3.rows;

              if (rows[0]) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'The email or password you provided is incorrect'
              }));

            case 13:
              if (_helpers["default"].comparePassword(rows[0].password, password)) {
                _context3.next = 15;
                break;
              }

              return _context3.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'The password you provided is incorrect'
              }));

            case 15:
              token = _helpers["default"].generateToken(rows[0].user_id);
              id = rows[0].user_id;
              is_admin = rows[0].is_admin;
              return _context3.abrupt("return", res.status(200).json({
                status: 'success',
                data: {
                  id: id,
                  is_admin: is_admin,
                  token: token
                }
              }));

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](6);
              return _context3.abrupt("return", res.status(500).json({
                status: 'error',
                error: 'Unable to process request'
              }));

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[6, 21]]);
    }));

    function signin(_x5, _x6) {
      return _signin.apply(this, arguments);
    }

    return signin;
  }()
};
var _default = Users;
exports["default"] = _default;
//# sourceMappingURL=userController.js.map