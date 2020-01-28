"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _install = _interopRequireDefault(require("./install"));

var _orders = _interopRequireDefault(require("./orders"));

var _fulfillment = _interopRequireDefault(require("./fulfillment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/install', _install["default"]);
router.use('/orders', _orders["default"]);
router.use('/fulfillment', _fulfillment["default"]);
router.get('/', function (req, res) {
  res.status(200).render('index');
});
var _default = router;
exports["default"] = _default;