"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bookingController = _interopRequireDefault(require("../controllers/bookingController"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

var router = _express["default"].Router(); // Routes for bookings


router.post('/bookings', _auth["default"].verifyToken, _bookingController["default"].createBooking);
router.get('/bookings', _auth["default"].verifyToken, _bookingController["default"].getAllBookings);
router["delete"]('/bookings/:bookingId', _auth["default"].verifyToken, _bookingController["default"].deleteBooking);
router.put('/bookings/:bookingId', _auth["default"].verifyToken, _bookingController["default"].updateSeat);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=bookingRoutes.js.map