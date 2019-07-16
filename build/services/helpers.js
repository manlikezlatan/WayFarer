"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword: function hashPassword(password) {
    return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(8));
  },

  /**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
  validatePassword: function validatePassword(password) {
    if (password.length <= 8 || password === '' || /\s/.test(password) === true) {
      return false;
    }

    return true;
  },

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcrypt["default"].compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail: function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  /**
   * isEmpty method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
  isEmpty: function isEmpty(input) {
    if (input === undefined || input === '') {
      return true;
    }

    if (input.replace(/\s/g, '').length) {
      return false;
    }

    return true;
  },

  /**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
  empty: function empty(input) {
    if (input === undefined || input === '') {
      return true;
    }
  },

  /**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken["default"].sign({
      userId: id
    }, process.env.SECRET, {
      expiresIn: '10d'
    });

    return token;
  }
};
var _default = Helper;
exports["default"] = _default;
//# sourceMappingURL=helpers.js.map