"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("@babel/polyfill");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _tripRoutes = _interopRequireDefault(require("./routes/tripRoutes"));

var _busRoutes = _interopRequireDefault(require("./routes/busRoutes"));

var _bookingRoutes = _interopRequireDefault(require("./routes/bookingRoutes"));

// load app dependencies
// Import routes
_dotenv["default"].config();

var app = (0, _express["default"])();
var port = process.env.PORT || 7000;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  return res.status(200).json({
    status: 'success',
    message: 'The API is necessary to run this application'
  });
});
app.listen(port, function () {
  console.log("This server is live on ".concat(port));
});
app.use('/api/v1', _userRoutes["default"]);
app.use('/api/v1', _userRoutes["default"]);
app.use('/api/v1', _tripRoutes["default"]);
app.use('/api/v1', _busRoutes["default"]);
app.use('/api/v1', _bookingRoutes["default"]);
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map