"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccessToken = void 0;

var _config = require("../config");

var _requestPromise = _interopRequireDefault(require("request-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAccessToken = function getAccessToken(shop, code) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var requestUrl, requestPayload, tokenResponse, token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!shop && !code) reject({
                message: 'shop and code required'
              });
              requestUrl = "https://".concat(shop, "/admin/oauth/access_token");
              requestPayload = {
                client_id: _config.key,
                client_secret: _config.secret,
                code: code
              };
              _context.prev = 3;
              _context.next = 6;
              return _requestPromise["default"].post(requestUrl, {
                json: requestPayload
              });

            case 6:
              tokenResponse = _context.sent;
              token = tokenResponse.access_token;
              resolve(token);
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              reject({
                message: _context.t0
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 11]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.getAccessToken = getAccessToken;