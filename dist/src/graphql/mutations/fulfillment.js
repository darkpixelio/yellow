"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fulfilmentCloseMutation = exports.fulfillmentCreateMutation = exports.metafieldUpdate = void 0;

var metafieldUpdate = function metafieldUpdate(data, fulfillmentCreate, fulfillmentClose) {
  return "mutation {\n    ".concat(data.fulfilled_by_courier != 'Unfulfilled' ? fulfillmentCreate : fulfillmentClose, "\n    orderUpdate(input: {\n      id: \"").concat(data.id, "\",\n      metafields: {\n        id: ").concat(!data.metafield_id ? null : "\"".concat(data.metafield_id, "\""), ",\n        namespace: \"fulfillment_service\",\n        key: \"fulfillment_by\",\n        value: \"").concat(data.fulfilled_by_courier, "\",\n        valueType: STRING\n      }\n    }) {\n      order {\n        id\n        name\n        createdAt\n        customer{\n          firstName\n          lastName\n        }\n        displayFinancialStatus\n        displayFulfillmentStatus\n        totalPriceSet {\n          shopMoney {\n            amount\n            currencyCode\n          }\n        }\n        fulfillments{\n          id\n          status\n        }\n        metafield(\n          namespace: \"fulfillment_service\",\n          key: \"fulfillment_by\",\n        ) {\n          id\n          value\n        }\n      }\n    }\n  }\n  ");
};

exports.metafieldUpdate = metafieldUpdate;

var fulfillmentCreateMutation = function fulfillmentCreateMutation(data) {
  return "fulfillmentCreate(input: {\n    orderId: \"".concat(data.id, "\"\n    locationId: \"").concat(data.location.id, "\"\n  }) {\n    fulfillment {\n      id\n      name\n      status\n    }\n  }\n  ");
};

exports.fulfillmentCreateMutation = fulfillmentCreateMutation;

var fulfilmentCloseMutation = function fulfilmentCloseMutation(data) {
  return "fulfillmentCancel(id: \"".concat(data.fulfillment_order_id, "\") {\n      fulfillment {\n      id\n    }\n  }\n  ");
};

exports.fulfilmentCloseMutation = fulfilmentCloseMutation;