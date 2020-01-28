"use strict";

var _app = _interopRequireDefault(require("./src/app"));

var _config = require("./src/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

~function () {
  _app["default"].listen(_config.port, function () {
    console.log("Server is running on port ".concat(_config.port));
  });
}();