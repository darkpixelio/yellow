"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "verifyOrigin", {
  enumerable: true,
  get: function get() {
    return _callback.verifyOrigin;
  }
});
Object.defineProperty(exports, "validateRequest", {
  enumerable: true,
  get: function get() {
    return _callback.validateRequest;
  }
});
Object.defineProperty(exports, "generateToken", {
  enumerable: true,
  get: function get() {
    return _callback.generateToken;
  }
});
Object.defineProperty(exports, "getOrdersMiddleware", {
  enumerable: true,
  get: function get() {
    return _orders.getOrdersMiddleware;
  }
});
Object.defineProperty(exports, "generateReport", {
  enumerable: true,
  get: function get() {
    return _orders.generateReport;
  }
});
Object.defineProperty(exports, "updateFulfillment", {
  enumerable: true,
  get: function get() {
    return _fulfillment.updateFulfillment;
  }
});
exports.verifyShop = void 0;

var _cookie = _interopRequireDefault(require("cookie"));

var _callback = require("./callback");

var _orders = require("./orders");

var _fulfillment = require("./fulfillment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyShop = function verifyShop(req, res, next) {
  var shop = _cookie["default"].parse(req.headers.cookie).shop;

  var token = _cookie["default"].parse(req.headers.cookie).token;

  res.locals.shop = shop;
  res.locals.token = token;
  if (!shop && !token) return res.status(400).send('Something went wrong! Please reload the app');
  next();
};

exports.verifyShop = verifyShop;