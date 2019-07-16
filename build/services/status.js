"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.status = exports.errorMessage = exports.successMessage = void 0;
var successMessage = {
  status: 'success'
};
exports.successMessage = successMessage;
var errorMessage = {
  status: 'error'
};
exports.errorMessage = errorMessage;
var status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204
};
exports.status = status;
//# sourceMappingURL=status.js.map