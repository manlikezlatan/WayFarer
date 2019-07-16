"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUserToken = exports.empty = exports.isEmpty = exports.validatePassword = exports.isValidEmail = exports.comparePassword = exports.hashPassword = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _env = _interopRequireDefault(require("../../env"));

/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
var saltRounds = 10;

var salt = _bcrypt["default"].genSaltSync(saltRounds);

var hashPassword = function hashPassword(password) {
  return _bcrypt["default"].hashSync(password, salt);
};
/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */


exports.hashPassword = hashPassword;

var comparePassword = function comparePassword(hashedPassword, password) {
  return _bcrypt["default"].compareSync(password, hashedPassword);
};
/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */


exports.comparePassword = comparePassword;

var isValidEmail = function isValidEmail(email) {
  var regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};
/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */


exports.isValidEmail = isValidEmail;

var validatePassword = function validatePassword(password) {
  if (password.length <= 5 || password === '') {
    return false;
  }

  return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */


exports.validatePassword = validatePassword;

var isEmpty = function isEmpty(input) {
  if (input === undefined || input === '') {
    return true;
  }

  if (input.replace(/\s/g, '').length) {
    return false;
  }

  return true;
};
/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */


exports.isEmpty = isEmpty;

var empty = function empty(input) {
  if (input === undefined || input === '') {
    return true;
  }
};
/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */


exports.empty = empty;

var generateUserToken = function generateUserToken(email, user_id, is_admin, first_name, last_name) {
  var token = _jsonwebtoken["default"].sign({
    email: email,
    user_id: user_id,
    is_admin: is_admin,
    first_name: first_name,
    last_name: last_name
  }, _env["default"].secret, {
    expiresIn: '3d'
  });

  return token;
};

exports.generateUserToken = generateUserToken;
//# sourceMappingURL=validation.js.map