"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bootstarp = bootstarp;
exports.appBoot = appBoot;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("reflect-metadata");

var _index = require("../log/index");

var _typeorm = require("typeorm");

var _connectionConfig = require("./connectionConfig");

function bootstarp() {
  return _bootstarp.apply(this, arguments);
} // please push the NODE_ENV = dev | Prod


function _bootstarp() {
  _bootstarp = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var client;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _typeorm.getConnectionManager)().create(_connectionConfig.clientOps);

          case 3:
            client = _context.sent;
            _context.next = 6;
            return client.connect();

          case 6:
            _index.logger.info("connection established to ".concat(client.name));

            return _context.abrupt("return", client);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);

            _index.logger.error(_context.t0);

            return _context.abrupt("return", undefined);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _bootstarp.apply(this, arguments);
}

function appBoot() {
  return _appBoot.apply(this, arguments);
}

function _appBoot() {
  _appBoot = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(0, _typeorm.getConnectionManager)().has("unifarm")) {
              bootstarp().then(function () {
                return Promise.resolve();
              })["catch"](function (err) {
                _index.logger.error("something wrong went with the database connection.", "NETWORK_ERROR", err.message);

                return Promise.reject("".concat(err.message));
              });
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _appBoot.apply(this, arguments);
}