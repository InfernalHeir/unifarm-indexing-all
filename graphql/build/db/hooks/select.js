"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTokensFromDatabase = getTokensFromDatabase;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeorm = require("typeorm");

var _Cohort = require("../../db/entity/Cohort");

function getTokensFromDatabase(_x, _x2) {
  return _getTokensFromDatabase.apply(this, arguments);
}

function _getTokensFromDatabase() {
  _getTokensFromDatabase = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cohort, chainId) {
    var tokens;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _typeorm.getRepository)(_Cohort.Cohort, "unifarm").createQueryBuilder("cohort").select("tokens").where("cohort.cohortAddress = :cohortAddress", {
              cohortAddress: cohort
            }).andWhere("cohort.chainId = :chainId", {
              chainId: String(chainId)
            }).execute();

          case 3:
            tokens = _context.sent;
            return _context.abrupt("return", tokens[0].tokens);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            Promise.reject(_context.t0.message);
            return _context.abrupt("return", undefined);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getTokensFromDatabase.apply(this, arguments);
}