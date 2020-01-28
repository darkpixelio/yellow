"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/set-courier', _middlewares.verifyShop, _middlewares.updateFulfillment, function (req, res) {
  res.status(200).json(res.locals.__update);
});
var _default = router;
exports["default"] = _default;