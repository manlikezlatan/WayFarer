"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});
var _default = {
  /**
     * DB Query
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
  query: function query(quertText, params) {
    return new Promise(function (resolve, reject) {
      pool.query(quertText, params).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;
//# sourceMappingURL=query.js.map