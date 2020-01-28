"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/get-orders', _middlewares.verifyShop, _middlewares.getOrdersMiddleware, function (req, res) {
  var orders = res.locals.orders;
  res.status(200).json(orders);
});
router.post('/generate-report', _middlewares.verifyShop, _middlewares.generateReport, function (req, res) {
  var file = res.locals.exportedFile;
  res.status(200).json(file);
});
var _default = router;
exports["default"] = _default;