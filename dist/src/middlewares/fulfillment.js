"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFulfillment = void 0;

var _graphql = require("../graphql");

var _helper = require("../helper");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateFulfillment =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var shop, token, data, location, fulfillmentCreate, fulfillmentClose, mutation, updateCourier, updateResponse;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shop = res.locals.shop;
            token = res.locals.token;
            data = req.body;
            _context.prev = 3;
            _context.next = 6;
            return (0, _helper.getLocation)(shop, token);

          case 6:
            location = _context.sent;
            data = _objectSpread({}, data, {
              location: location
            });
            fulfillmentCreate = _graphql.gqlMutations.fulfillmentCreate(data);
            fulfillmentClose = _graphql.gqlMutations.fulfillmentClose(data);
            mutation = _graphql.gqlMutations.courierUpdate(data, fulfillmentCreate, fulfillmentClose);
            _context.next = 13;
            return (0, _helper.updateFulfilledBy)(shop, token, mutation);

          case 13:
            updateCourier = _context.sent;
            updateResponse = {};
            updateResponse['fulfillment_status'] = updateCourier.orderUpdate.order.displayFulfillmentStatus;
            updateResponse['fulfilled_by'] = updateCourier.orderUpdate.order.metafield.value;
            res.locals.__update = updateResponse;
            next();
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 21]]);
  }));

  return function updateFulfillment(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateFulfillment = updateFulfillment;