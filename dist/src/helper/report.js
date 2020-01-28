"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateXLSX = void 0;

var _xlsx = _interopRequireDefault(require("xlsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateXLSX = function generateXLSX(data) {
  return new Promise(function (resolve, reject) {
    var reportArray = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;
        var order = item.node;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = order.transactions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var transaction = _step2.value;
            var reportObject = {};
            reportObject['Order'] = transaction.order.id.split('/').slice(-1)[0];
            reportObject['Name'] = transaction.order.name;
            reportObject['Created At'] = new Date(transaction.createdAt).toGMTString();
            reportObject['Amount'] = transaction.amountSet.shopMoney.amount;
            reportObject['Currency'] = transaction.amountSet.shopMoney.currencyCode;
            reportObject['Gateway'] = transaction.gateway;
            reportObject['Card Type'] = "";
            reportObject['Payment Status'] = transaction.status;
            reportObject['Fulllment Status'] = !order.metafield ? "Unfulfilled" : order.metafield.value;
            reportObject['Retrun/Refund Amount'] = "";
            reportObject['Delivery charge'] = "";
            reportObject['Cash collection charge'] = "";
            reportObject['Deposit amount'] = "";
            reportObject['Courier payment reference'] = "";
            reportObject['Consigmnent ID'] = "";
            reportObject['Transaction ID'] = transaction.id.split('/').slice(-1)[0];
            reportArray.push(reportObject);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    try {
      var ws = _xlsx["default"].utils.json_to_sheet(reportArray, {});

      var wb = _xlsx["default"].utils.book_new();

      _xlsx["default"].utils.book_append_sheet(wb, ws, 'Report');

      var date = new Date();
      var fileName = "report_".concat(date.getFullYear(), "-").concat(date.getMonth() + 1, "-").concat(date.getDate(), "_at_").concat(date.getHours(), "-").concat(date.getMinutes());

      _xlsx["default"].writeFileAsync("./src/public/exports/".concat(fileName, ".xlsx"), wb, function (success) {
        resolve({
          download_link: "/files/exports/".concat(fileName, ".xlsx")
        });
      });
    } catch (e) {
      console.log(e);
      reject({
        error: e
      });
    }
  });
};

exports.generateXLSX = generateXLSX;