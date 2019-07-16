"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _query = _interopRequireDefault(require("../models/query"));

_dotenv["default"].config();

var auth = {
  /**
   * Verification of to Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} Token object
   */
  verifyToken: function () {
    var _verifyToken = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(req, res, next) {
      var token, result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers.token;

              if (token) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Kindly provide token'
              }));

            case 3:
              _context.prev = 3;
              _context.next = 6;
              return _jsonwebtoken["default"].verify(token, process.env.SECRET);

            case 6:
              result = _context.sent;
              req.user = {
                user_id: result.userId,
                email: result.email,
                first_name: result.first_name,
                last_name: result.last_name,
                is_admin: result.is_admin
              };
              next();
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(400).json({
                status: 'error',
                error: 'Authentication error!'
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));

    function verifyToken(_x, _x2, _x3) {
      return _verifyToken.apply(this, arguments);
    }

    return verifyToken;
  }()
};
var _default = auth;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map