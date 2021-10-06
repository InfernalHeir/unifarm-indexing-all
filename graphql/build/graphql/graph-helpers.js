"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPoolsResult = exports.getAllUnstakes = exports.getAllStakes = exports.getTokens = exports.getPoolInformation = exports.getAllCohorts = exports.getCohort = exports.MAX_LIMIT = exports.DEFAULT_OFFSET = exports.MAXIMUM_LIMIT_FETCHED = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeorm = require("typeorm");

var _Cohort = require("../db/entity/Cohort");

var _Stake = require("../db/entity/Stake");

var _Token = require("../db/entity/Token");

var _Unstake = require("../db/entity/Unstake");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var MAXIMUM_LIMIT_FETCHED = 10;
exports.MAXIMUM_LIMIT_FETCHED = MAXIMUM_LIMIT_FETCHED;
var DEFAULT_OFFSET = 0;
exports.DEFAULT_OFFSET = DEFAULT_OFFSET;
var MAX_LIMIT = 500;
exports.MAX_LIMIT = MAX_LIMIT;

var getCohort = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cohortId, chainId) {
    var cohort;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _typeorm.getRepository)(_Cohort.Cohort, "unifarm").createQueryBuilder("cohort").select().where("LOWER(cohort.cohortAddress) =:cohortAddress", {
              cohortAddress: cohortId
            }).andWhere("cohort.chainId =:chainId", {
              chainId: chainId
            }).getOne();

          case 2:
            cohort = _context.sent;
            return _context.abrupt("return", cohort);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getCohort(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getCohort = getCohort;

var getAllCohorts = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(chainId, maximumLimit, orderDirection) {
    var limit, cohorts;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (maximumLimit > 10) {
              limit = MAXIMUM_LIMIT_FETCHED;
            } else {
              limit = maximumLimit;
            }

            _context2.next = 3;
            return (0, _typeorm.getRepository)(_Cohort.Cohort, "unifarm").createQueryBuilder("cohort").select().where("cohort.chainId =:chainId", {
              chainId: chainId
            }).limit(limit).orderBy("cohort.poolStartTime", orderDirection).getMany();

          case 3:
            cohorts = _context2.sent;
            return _context2.abrupt("return", cohorts);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getAllCohorts(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getAllCohorts = getAllCohorts;

var getPoolInformation = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(chainId, tokenAddress) {
    var poolInformation, pools;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _typeorm.getRepository)(_Token.Token, "unifarm").createQueryBuilder("token").innerJoinAndMapOne("token.cohortId", _Cohort.Cohort, "cohort", "cohort.cohortAddress = token.cohortId").where("token.chainId =:chainId", {
              chainId: chainId
            }).andWhere("LOWER(token.tokenId) =:tokenId", {
              tokenId: tokenAddress
            }).getMany();

          case 2:
            poolInformation = _context3.sent;
            pools = getPoolsResult(poolInformation);
            return _context3.abrupt("return", pools);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getPoolInformation(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getPoolInformation = getPoolInformation;

var getTokens = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(chainId, tokenAddress) {
    var tokens;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _typeorm.getRepository)(_Token.Token, "unifarm").createQueryBuilder("token").where("token.chainId =:chainId", {
              chainId: chainId
            }).andWhere("token.tokenId =:tokenId", {
              tokenId: tokenAddress
            }).getMany();

          case 2:
            tokens = _context4.sent;
            return _context4.abrupt("return", tokens);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getTokens(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getTokens = getTokens;

var getAllStakes = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(chainId, cohortId) {
    var stakes;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _typeorm.getRepository)(_Stake.Stake, "unifarm").createQueryBuilder("stake").where("stake.chainId =:chainId", {
              chainId: chainId
            }).andWhere("stake.cohortId =:cohortId", {
              cohortId: cohortId
            }).getMany();

          case 2:
            stakes = _context5.sent;
            console.log(stakes);
            return _context5.abrupt("return", stakes);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getAllStakes(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getAllStakes = getAllStakes;

var getAllUnstakes = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(chainId, cohortId) {
    var unstakes;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _typeorm.getRepository)(_Unstake.Unstake, "unifarm").createQueryBuilder("unstake").where("unstake.chainId =:chainId", {
              chainId: chainId
            }).andWhere("LOWER(unstake.cohortId) =:cohortId", {
              cohortId: cohortId
            }).getMany();

          case 2:
            unstakes = _context6.sent;
            return _context6.abrupt("return", unstakes);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getAllUnstakes(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAllUnstakes = getAllUnstakes;

var getPoolsResult = function getPoolsResult(poolInformation) {
  var pools = [];

  for (var k = 0; k < poolInformation.length; k++) {
    var cohort = poolInformation[k].cohortId;
    delete poolInformation[k].cohortId;
    pools.push({
      token: _objectSpread({}, poolInformation[k]),
      cohort: cohort
    });
  }

  return pools;
};

exports.getPoolsResult = getPoolsResult;