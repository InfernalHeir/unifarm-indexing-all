"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _log = require("../../log");

var _graphHelpers = require("../graph-helpers");

var resolvers = {
  Query: {
    cohort: function () {
      var _cohort = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_parent, args, _context, _info) {
        var _args$where, chainId, cohortAddress;

        return _regenerator["default"].wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _args$where = args.where, chainId = _args$where.chainId, cohortAddress = _args$where.cohortAddress;
                _context2.next = 4;
                return (0, _graphHelpers.getCohort)(cohortAddress, chainId);

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);

                _log.logger.error("Cohort:: Single Cohort Fetched Failed");

                throw new Error("Cohort:: ".concat(_context2.t0.message));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function cohort(_x, _x2, _x3, _x4) {
        return _cohort.apply(this, arguments);
      }

      return cohort;
    }(),
    allCohorts: function () {
      var _allCohorts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_parent, args, _context, _info) {
        return _regenerator["default"].wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _graphHelpers.getAllCohorts)(args.chainId, args.first, args.orderDirection);

              case 3:
                return _context3.abrupt("return", _context3.sent);

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);

                _log.logger.error("AllCohorts:: Cohorts Fetched Failed");

                throw new Error("AllCohorts:: ".concat(_context3.t0.message));

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function allCohorts(_x5, _x6, _x7, _x8) {
        return _allCohorts.apply(this, arguments);
      }

      return allCohorts;
    }(),
    getPools: function () {
      var _getPools = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_parent, args, _context, _info) {
        var _args$where2, chainId, tokenAddress;

        return _regenerator["default"].wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _args$where2 = args.where, chainId = _args$where2.chainId, tokenAddress = _args$where2.tokenAddress;
                _context4.next = 4;
                return (0, _graphHelpers.getPoolInformation)(chainId, tokenAddress);

              case 4:
                return _context4.abrupt("return", _context4.sent);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);

                _log.logger.error("Pools:: Pools Fetched Failed");

                throw new Error("Pools:: ".concat(_context4.t0.message));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function getPools(_x9, _x10, _x11, _x12) {
        return _getPools.apply(this, arguments);
      }

      return getPools;
    }(),
    getTokens: function () {
      var _getTokens2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_parent, args, _context, _info) {
        var _args$where3, chainId, tokenAddress;

        return _regenerator["default"].wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _args$where3 = args.where, chainId = _args$where3.chainId, tokenAddress = _args$where3.tokenAddress;
                _context5.next = 4;
                return (0, _graphHelpers.getTokens)(chainId, tokenAddress);

              case 4:
                return _context5.abrupt("return", _context5.sent);

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);

                _log.logger.error("Tokens:: Tokens Fetched Failed");

                throw new Error("Tokens:: ".concat(_context5.t0.message));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function getTokens(_x13, _x14, _x15, _x16) {
        return _getTokens2.apply(this, arguments);
      }

      return getTokens;
    }(),
    getAllStakes: function () {
      var _getAllStakes2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_parent, args, _context, _info) {
        var chainId, cohortId;
        return _regenerator["default"].wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                chainId = args.chainId;
                cohortId = args.cohortId;
                _context6.next = 5;
                return (0, _graphHelpers.getAllStakes)(chainId, cohortId);

              case 5:
                return _context6.abrupt("return", _context6.sent);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);

                _log.logger.error("AllStakes:: Stakes cannot found.");

                throw new Error("AllStakes:: ".concat(_context6.t0.message));

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, null, [[0, 8]]);
      }));

      function getAllStakes(_x17, _x18, _x19, _x20) {
        return _getAllStakes2.apply(this, arguments);
      }

      return getAllStakes;
    }(),
    getAllUnstakes: function () {
      var _getAllUnstakes2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_parent, args, _context, _info) {
        var chainId, cohortId;
        return _regenerator["default"].wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                chainId = args.chainId;
                cohortId = args.cohortId;
                _context7.next = 5;
                return (0, _graphHelpers.getAllUnstakes)(chainId, cohortId);

              case 5:
                return _context7.abrupt("return", _context7.sent);

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);

                _log.logger.error("AllStakes:: Stakes cannot found.");

                throw new Error("AllStakes:: ".concat(_context7.t0.message));

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6, null, [[0, 8]]);
      }));

      function getAllUnstakes(_x21, _x22, _x23, _x24) {
        return _getAllUnstakes2.apply(this, arguments);
      }

      return getAllUnstakes;
    }()
  }
};
exports.resolvers = resolvers;