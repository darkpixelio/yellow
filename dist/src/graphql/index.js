"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gqlMutations = exports.gqlQuery = void 0;

var _order = require("./queries/order");

var _location = require("./queries/location");

var _fulfillment = require("./mutations/fulfillment");

var gqlQuery = {
  fetchAllOrder: _order.getAllOrders,
  fetchOrderByDate: _order.getOrdersByDate,
  getLocation: _location.getLocation
};
exports.gqlQuery = gqlQuery;
var gqlMutations = {
  courierUpdate: _fulfillment.metafieldUpdate,
  fulfillmentCreate: _fulfillment.fulfillmentCreateMutation,
  fulfillmentClose: _fulfillment.fulfilmentCloseMutation
};
exports.gqlMutations = gqlMutations;