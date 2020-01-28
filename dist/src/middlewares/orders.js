"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrdersMiddleware = exports.generateReport = void 0;

var _helper = require("../helper");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getOrdersMiddleware =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var shop, token, orders, filteredOrder, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, draft, order, activeFulfillment;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shop = res.locals.shop;
            token = res.locals.token;
            _context.prev = 2;
            _context.next = 5;
            return (0, _helper.getAllOrders)(shop, token, null);

          case 5:
            orders = _context.sent;
            filteredOrder = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;

            for (_iterator = orders[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              item = _step.value;
              draft = {};
              order = item.node;
              draft['id'] = order.id;
              draft['name'] = order.name;
              draft['created_at'] = new Date(order.createdAt).toDateString();
              draft['customer'] = {};
              draft['customer']['first_name'] = order.customer ? order.customer.firstName : 'No';
              draft['customer']['last_name'] = order.customer ? order.customer.lastName : 'Customer';
              draft['total_price'] = order.totalPriceSet.shopMoney.amount;
              draft['fulfilled_by'] = !order.metafield ? null : order.metafield.value;
              draft['metafield_id'] = !order.metafield ? null : order.metafield.id;
              draft['fulfillment_status'] = order.displayFulfillmentStatus;
              draft['payment_status'] = order.displayFinancialStatus;
              activeFulfillment = order.fulfillments.find(function (item) {
                return item.status === 'SUCCESS';
              });
              draft['fulfillment_order_id'] = !activeFulfillment ? null : activeFulfillment.id;
              filteredOrder.push(draft);
            }

            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](10);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:
            res.locals.orders = filteredOrder;
            next();
            _context.next = 34;
            break;

          case 30:
            _context.prev = 30;
            _context.t1 = _context["catch"](2);

            if (!_context.t1) {
              _context.next = 34;
              break;
            }

            return _context.abrupt("return", res.status(400).send('Something went wrong'));

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 30], [10, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function getOrdersMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getOrdersMiddleware = getOrdersMiddleware;

var generateReport =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var shop, token, query, orders, file, _orders, _file;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            shop = res.locals.shop;
            token = res.locals.token;
            query = {
              start: req.body.startDate,
              end: req.body.endDate
            };

            if (!(!req.body.startDate || !req.body.endDate)) {
              _context2.next = 20;
              break;
            }

            _context2.prev = 4;
            _context2.next = 7;
            return (0, _helper.getAllOrders)(shop, token, null);

          case 7:
            orders = _context2.sent;
            _context2.next = 10;
            return (0, _helper.generateXLSX)(orders);

          case 10:
            file = _context2.sent;
            res.locals.exportedFile = file;
            next();
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](4);
            console.log(_context2.t0);

          case 18:
            _context2.next = 34;
            break;

          case 20:
            _context2.prev = 20;
            _context2.next = 23;
            return (0, _helper.getOrdersByDate)(shop, token, query);

          case 23:
            _orders = _context2.sent;
            _context2.next = 26;
            return (0, _helper.generateXLSX)(_orders);

          case 26:
            _file = _context2.sent;
            res.locals.exportedFile = _file;
            next();
            _context2.next = 34;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t1 = _context2["catch"](20);
            console.log(_context2.t1);

          case 34:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 15], [20, 31]]);
  }));

  return function generateReport(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.generateReport = generateReport;