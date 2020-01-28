"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrdersByDate = exports.getAllOrders = void 0;

var getAllOrders = function getAllOrders(cursor) {
  if (!cursor) {
    return "query {\n      orders(first: 100) {\n        edges {\n          cursor,\n          node {\n            id,\n            name,\n            email,\n            displayFinancialStatus,\n            displayFulfillmentStatus,\n            createdAt,\n            customer {\n              firstName,\n              lastName\n            },\n            fulfillments {\n              id,\n              status\n            },\n            transactions(first: 110) {\n              accountNumber,\n              amountSet {\n                presentmentMoney {\n                  amount,\n                  currencyCode\n                }\n                shopMoney {\n                  amount,\n                  currencyCode\n                }\n              }\n              authorizationCode,\n              createdAt,\n              errorCode,\n              formattedGateway,\n              gateway,\n              id,\n              kind,\n              status,\n              order {\n                id,\n                name\n              }\n            },\n            totalPriceSet {\n              shopMoney {\n                amount\n              }\n              presentmentMoney {\n                amount\n              }\n            }\n            metafield(namespace: \"fulfillment_service\", key: \"fulfillment_by\") {\n              id,\n              value\n            }\n          }\n        }\n      }\n    }";
  } else {
    return "query {\n      orders(after: \"".concat(cursor, "\", first: 100) {\n        edges {\n          cursor,\n          node {\n            id,\n            name,\n            email,\n            displayFinancialStatus,\n            displayFulfillmentStatus,\n            createdAt,\n            customer {\n              firstName,\n              lastName\n            },\n            fulfillments {\n              id,\n              status\n            },\n            transactions(first: 100) {\n              accountNumber,\n              amountSet {\n                presentmentMoney {\n                  amount,\n                  currencyCode\n                }\n                shopMoney {\n                  amount,\n                  currencyCode\n                }\n              }\n              authorizationCode,\n              createdAt,\n              errorCode,\n              formattedGateway,\n              gateway,\n              id,\n              kind,\n              status,\n              order {\n                id,\n                name\n              }\n            },\n            totalPriceSet {\n              shopMoney {\n                amount\n              }\n              presentmentMoney {\n                amount\n              }\n            }\n            metafield(namespace: \"fulfillment_service\", key: \"fulfillment_by\") {\n              id,\n              value\n            }\n          }\n        }\n      }\n    }");
  }
};

exports.getAllOrders = getAllOrders;

var getOrdersByDate = function getOrdersByDate(cursor, query) {
  if (!query) throw new Error('query parameter must be needed');
  var dateQuery = {
    start: new Date(new Date(query.start).getTime() + 60 * 60 * 6 * 1000),
    end: new Date(new Date(query.end).getTime() + (60 * 60 * 24 * 1000 + 60 * 60 * 6 * 1000))
  };
  var formattedQuery = {
    start: "".concat(dateQuery.start.getFullYear(), "-").concat(dateQuery.start.getMonth() + 1, "-").concat(dateQuery.start.getDate()),
    end: "".concat(dateQuery.end.getFullYear(), "-").concat(dateQuery.end.getMonth() + 1, "-").concat(dateQuery.end.getDate())
  };

  if (!cursor) {
    return "query {\n      orders(first: 100, query:\"created_at:>".concat(formattedQuery.start, " created_at:<").concat(formattedQuery.end, "\") {\n        edges {\n          cursor,\n          node {\n            id,\n            email,\n            transactions(first: 50) {\n              accountNumber,\n              amountSet {\n                presentmentMoney {\n                  amount\n                  currencyCode\n                }\n                shopMoney {\n                  amount\n                  currencyCode\n                }\n              }\n              authorizationCode\n              createdAt\n              errorCode\n              formattedGateway\n              gateway\n              id\n              kind\n              status\n              order {\n                id\n                name\n              }\n            }\n            metafield(namespace: \"fulfillment_service\", key: \"fulfillment_by\") {\n              value\n            }\n          }\n        }\n      }\n    }");
  } else {
    return "query {\n      orders(after: \"".concat(cursor, "\", first: 100, query:\"created_at:>").concat(formattedQuery.start, " created_at:<").concat(formattedQuery.end, "\") {\n        edges {\n          cursor,\n          node {\n            id,\n            email,\n            transactions(first: 50) {\n              accountNumber,\n              amountSet {\n                presentmentMoney {\n                  amount\n                  currencyCode\n                }\n                shopMoney {\n                  amount\n                  currencyCode\n                }\n              }\n              authorizationCode\n              createdAt\n              errorCode\n              formattedGateway\n              gateway\n              id\n              kind\n              status\n              order {\n                id\n                name\n              }\n            }\n            metafield(namespace: \"fulfillment_service\", key: \"fulfillment_by\") {\n              value\n            }\n          }\n        }\n      }\n    }");
  }
};

exports.getOrdersByDate = getOrdersByDate;