"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.validateRequest = exports.verifyOrigin = void 0;

var _cookie = _interopRequireDefault(require("cookie"));

var _helper = require("../helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyOrigin = function verifyOrigin(req, res, next) {
  var state = req.query.state;

  var stateCookie = _cookie["default"].parse(req.headers.cookie).state;

  if (state !== stateCookie) return res.status(403).send('Request origin cannot be verified');
  next();
};

exports.verifyOrigin = verifyOrigin;

var validateRequest =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$query, shop, hmac, code, valid;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, shop = _req$query.shop, hmac = _req$query.hmac, code = _req$query.code;

            if (!(!shop && !hmac && !code)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send('Required parameter missing'));

          case 3:
            _context.next = 5;
            return (0, _helper.verifyHmac)(req, hmac);

          case 5:
            valid = _context.sent;

            if (valid) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).send('HMAC validation failed'));

          case 8:
            next();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateRequest(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateRequest = validateRequest;

var generateToken =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var _req$query2, shop, code, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$query2 = req.query, shop = _req$query2.shop, code = _req$query2.code;
            _context2.next = 3;
            return (0, _helper.getAccessToken)(shop, code);

          case 3:
            token = _context2.sent;
            res.locals.token = token;
            res.locals.shop = shop;
            next();

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function generateToken(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.generateToken = generateToken;