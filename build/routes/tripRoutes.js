"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _tripController = _interopRequireDefault(require("../controllers/tripController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var router = _express["default"].Router(); // trips Routes


router.post('/trips', _auth["default"].verifyToken, _tripController["default"].createTrip);
router.get('/trips', _auth["default"].verifyToken, _tripController["default"].getAllTrips);
router.patch('/trips/:tripId', _auth["default"].verifyToken, _tripController["default"].cancelTrip);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=tripRoutes.js.map