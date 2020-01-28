"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.env = exports.scopes = exports.secret = exports.key = exports.uri = exports.port = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dev = _interopRequireDefault(require("./dev"));

var _prod = _interopRequireDefault(require("./prod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var uri = function () {
  return process.env.NODE_ENV === 'production' ? _prod["default"].appUri : _dev["default"].appUri;
}();

exports.uri = uri;
var port = process.env.PORT || 3000;
exports.port = port;
var key = process.env.SHOPIFY_API_KEY;
exports.key = key;
var secret = process.env.SHOPIFY_API_SECRET;
exports.secret = secret;
var scopes = process.env.SHOPIFY_API_SCOPES;
exports.scopes = scopes;
var env = process.env.NODE_ENV;
exports.env = env;