"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _busController = _interopRequireDefault(require("../controllers/busController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var router = _express["default"].Router(); // Routes for buses


router.post('/buses', _auth["default"].verifyToken, _busController["default"].addBusDetails);
router.get('/buses', _auth["default"].verifyToken, _busController["default"].getAllBuses);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=busRoutes.js.map