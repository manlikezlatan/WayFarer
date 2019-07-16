"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pg = require("pg");

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var dbConfig = {
  connectionString: process.env.database_url
};
var pool = new _pg.Pool(dbConfig);
var _default = pool;
exports["default"] = _default;
//# sourceMappingURL=dbPool.js.map