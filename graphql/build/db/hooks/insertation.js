"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertRefferalEvent = exports.insertClaimEvent = exports.insertUnstakeEvent = exports.insertStakeEvent = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeorm = require("typeorm");

var _Claim = require("../entity/Claim");

var _RefferalClaim = require("../entity/RefferalClaim");

var _Stake = require("../entity/Stake");

var _Unstake = require("../entity/Unstake");

var insertStakeEvent = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _typeorm.getRepository)(_Stake.Stake, "unifarm").createQueryBuilder("stake").insert().values(data).execute();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function insertStakeEvent(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.insertStakeEvent = insertStakeEvent;

var insertUnstakeEvent = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _typeorm.getRepository)(_Unstake.Unstake, "unifarm").createQueryBuilder("unstake").insert().values(data).execute();

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function insertUnstakeEvent(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.insertUnstakeEvent = insertUnstakeEvent;

var insertClaimEvent = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _typeorm.getRepository)(_Claim.Claim, "unifarm").createQueryBuilder("claim").insert().values(data).execute();

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function insertClaimEvent(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.insertClaimEvent = insertClaimEvent;

var insertRefferalEvent = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _typeorm.getRepository)(_RefferalClaim.RefferralClaim, "unifarm").createQueryBuilder("refClaim").insert().values(data).execute();

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function insertRefferalEvent(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.insertRefferalEvent = insertRefferalEvent;