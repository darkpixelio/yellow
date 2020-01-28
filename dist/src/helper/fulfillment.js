"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocation = exports.updateFulfilledBy = void 0;

var _graphqlRequest = require("graphql-request");

var _graphql = require("../graphql");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateFulfilledBy = function updateFulfilledBy(shop, token, mutation) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(resolve, reject) {
      var requestUrl, requestHeaders, client, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              requestUrl = "https://".concat(shop, "/admin/api/2020-01/graphql.json");
              requestHeaders = {
                'X-Shopify-Access-Token': token
              };
              client = new _graphqlRequest.GraphQLClient(requestUrl, {
                headers: requestHeaders
              });
              _context.prev = 3;
              _context.next = 6;
              return client.request(mutation);

            case 6:
              response = _context.sent;
              resolve(response);
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              reject(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 10]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.updateFulfilledBy = updateFulfilledBy;

var getLocation = function getLocation(shop, token) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var requestUrl, requestHeaders, client, locationQuery, location;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              requestUrl = "https://".concat(shop, "/admin/api/2020-01/graphql.json");
              requestHeaders = {
                'X-Shopify-Access-Token': token
              };
              client = new _graphqlRequest.GraphQLClient(requestUrl, {
                headers: requestHeaders
              });
              _context2.prev = 3;
              locationQuery = _graphql.gqlQuery.getLocation();
              _context2.next = 7;
              return client.request(locationQuery);

            case 7:
              location = _context2.sent;
              resolve(location.location);
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](3);
              reject(_context2.t0);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 11]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.getLocation = getLocation;