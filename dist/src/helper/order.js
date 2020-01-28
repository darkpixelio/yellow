"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrdersByDate = exports.getAllOrders = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _graphqlRequest = require("graphql-request");

var _graphql = require("../graphql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllOrders =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(shop, token, query) {
    return regeneratorRuntime.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee2(resolve, reject) {
                return regeneratorRuntime.wrap(function _callee2$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!shop || !token) reject({
                          message: 'getOrdersByDate function expect shop & token parameter'
                        });
                        _context3.prev = 1;
                        return _context3.delegateYield(
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _callee() {
                          var ordersArray, requestObject, client, cursor, _loop, _ret;

                          return regeneratorRuntime.wrap(function _callee$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  ordersArray = [];
                                  requestObject = {
                                    url: "https://".concat(shop, "/admin/api/2020-01/graphql.json"),
                                    headers: {
                                      'X-Shopify-Access-Token': token
                                    }
                                  };
                                  client = new _graphqlRequest.GraphQLClient(requestObject.url, {
                                    headers: requestObject.headers
                                  });
                                  _loop =
                                  /*#__PURE__*/
                                  regeneratorRuntime.mark(function _loop() {
                                    var orderQuery, response;
                                    return regeneratorRuntime.wrap(function _loop$(_context) {
                                      while (1) {
                                        switch (_context.prev = _context.next) {
                                          case 0:
                                            orderQuery = _graphql.gqlQuery.fetchAllOrder(cursor);
                                            _context.next = 3;
                                            return client.request(orderQuery);

                                          case 3:
                                            response = _context.sent;

                                            if (!(response.orders.edges.length === 0)) {
                                              _context.next = 6;
                                              break;
                                            }

                                            return _context.abrupt("return", "break");

                                          case 6:
                                            response.orders.edges.forEach(function (item, i) {
                                              if (i == response.orders.edges.length - 1) cursor = item.cursor;
                                              ordersArray.push(item);
                                            });

                                          case 7:
                                          case "end":
                                            return _context.stop();
                                        }
                                      }
                                    }, _loop);
                                  });

                                case 4:
                                  if (!true) {
                                    _context2.next = 11;
                                    break;
                                  }

                                  return _context2.delegateYield(_loop(), "t0", 6);

                                case 6:
                                  _ret = _context2.t0;

                                  if (!(_ret === "break")) {
                                    _context2.next = 9;
                                    break;
                                  }

                                  return _context2.abrupt("break", 11);

                                case 9:
                                  _context2.next = 4;
                                  break;

                                case 11:
                                  resolve(ordersArray);

                                case 12:
                                case "end":
                                  return _context2.stop();
                              }
                            }
                          }, _callee);
                        })(), "t0", 3);

                      case 3:
                        _context3.next = 9;
                        break;

                      case 5:
                        _context3.prev = 5;
                        _context3.t1 = _context3["catch"](1);
                        console.log(_context3.t1);
                        if (_context3.t1) reject(_context3.t1);

                      case 9:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee2, null, [[1, 5]]);
              }));

              return function (_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3);
  }));

  return function getAllOrders(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAllOrders = getAllOrders;

var getOrdersByDate = function getOrdersByDate(shop, token, query) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee5$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!query) reject({
                message: "getOrdersByDate function expect query parameter but receive ".concat(query)
              });
              if (!shop || !token) reject({
                message: 'getOrdersByDate function expect shop & token parameter'
              });
              _context7.prev = 2;
              return _context7.delegateYield(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee4() {
                var ordersArray, requestObject, client, cursor, _loop2, _ret2;

                return regeneratorRuntime.wrap(function _callee4$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        ordersArray = [];
                        requestObject = {
                          url: "https://".concat(shop, "/admin/api/2020-01/graphql.json"),
                          headers: {
                            'X-Shopify-Access-Token': token
                          }
                        };
                        client = new _graphqlRequest.GraphQLClient(requestObject.url, {
                          headers: requestObject.headers
                        });
                        _loop2 =
                        /*#__PURE__*/
                        regeneratorRuntime.mark(function _loop2() {
                          var orderQuery, response;
                          return regeneratorRuntime.wrap(function _loop2$(_context5) {
                            while (1) {
                              switch (_context5.prev = _context5.next) {
                                case 0:
                                  orderQuery = _graphql.gqlQuery.fetchOrderByDate(cursor, query);
                                  _context5.next = 3;
                                  return client.request(orderQuery);

                                case 3:
                                  response = _context5.sent;

                                  if (!(response.orders.edges.length === 0)) {
                                    _context5.next = 6;
                                    break;
                                  }

                                  return _context5.abrupt("return", "break");

                                case 6:
                                  response.orders.edges.forEach(function (item, i) {
                                    if (i == response.orders.edges.length - 1) cursor = item.cursor;
                                    ordersArray.push(item);
                                  });

                                case 7:
                                case "end":
                                  return _context5.stop();
                              }
                            }
                          }, _loop2);
                        });

                      case 4:
                        if (!true) {
                          _context6.next = 11;
                          break;
                        }

                        return _context6.delegateYield(_loop2(), "t0", 6);

                      case 6:
                        _ret2 = _context6.t0;

                        if (!(_ret2 === "break")) {
                          _context6.next = 9;
                          break;
                        }

                        return _context6.abrupt("break", 11);

                      case 9:
                        _context6.next = 4;
                        break;

                      case 11:
                        resolve(ordersArray);

                      case 12:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee4);
              })(), "t0", 4);

            case 4:
              _context7.next = 9;
              break;

            case 6:
              _context7.prev = 6;
              _context7.t1 = _context7["catch"](2);
              console.log(_context7.t1);

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee5, null, [[2, 6]]);
    }));

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }());
};

exports.getOrdersByDate = getOrdersByDate;