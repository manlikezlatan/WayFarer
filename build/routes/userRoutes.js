"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var router = _express["default"].Router(); // Users Routes


router.post('/auth/signup', _userController["default"].signup);
router.post('/auth/signin', _userController["default"].signin); // Admin Routes

router.post('/admin/signup', _userController["default"].AdminSignup);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=userRoutes.js.map