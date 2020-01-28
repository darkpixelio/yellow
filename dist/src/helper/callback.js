"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyHmac = void 0;

var _querystring = _interopRequireDefault(require("querystring"));

var _crypto = _interopRequireDefault(require("crypto"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var verifyHmac = function verifyHmac(req, hmac) {
  return new Promise(function (resolve, reject) {
    var map = Object.assign({}, req.query);
    delete map['signature'];
    delete map['hmac'];

    var message = _querystring["default"].stringify(map);

    var providedHmac = Buffer.from(hmac, 'utf-8');
    var generatedHash = Buffer.from(_crypto["default"].createHmac('sha256', _config.secret).update(message).digest('hex'), 'utf-8');
    var valid = false;

    try {
      valid = _crypto["default"].timingSafeEqual(generatedHash, providedHmac);
      resolve(valid);
    } catch (e) {
      valid = false;
      reject(e);
    }
  });
};

exports.verifyHmac = verifyHmac;