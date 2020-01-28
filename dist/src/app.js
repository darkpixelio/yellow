"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  "origin": "*"
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'assets')));
app.use('/files', _express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', _path["default"].join(__dirname, 'views'));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use(_routes["default"]);
var _default = app;
exports["default"] = _default;