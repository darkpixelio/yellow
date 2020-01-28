"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cookie = _interopRequireDefault(require("cookie"));

var _nonce = _interopRequireDefault(require("nonce"));

var _config = require("../config");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', function (req, res) {
  var shop = req.query.shop;
  if (!shop) return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
  var state = (0, _nonce["default"])()();
  var installUrl = "https://".concat(shop, "/admin/oauth/authorize?client_id=").concat(_config.key, "&scope=").concat(_config.scopes, "&state=").concat(state, "&redirect_uri=").concat(_config.uri, "/install/callback");
  res.cookie('state', state);
  res.redirect(installUrl);
});
router.get('/callback', _middlewares.verifyOrigin, _middlewares.validateRequest, _middlewares.generateToken, function (req, res) {
  var _res$locals = res.locals,
      shop = _res$locals.shop,
      token = _res$locals.token;
  res.cookie('shop', shop);
  res.cookie('token', token);
  res.redirect('/');
});
var _default = router;
exports["default"] = _default;