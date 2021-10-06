"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChainId = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeorm = require("typeorm");

var _Cohort = require("../entity/Cohort");

var updateChainId = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(fromChainId, newChainId) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _typeorm.getRepository)(_Cohort.Cohort, "unifarm").createQueryBuilder("cohort").update(_Cohort.Cohort, {
              chainId: newChainId
            }).where("chainId = :chainId", {
              chainId: fromChainId
            }).updateEntity(true).execute();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function updateChainId(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.updateChainId = updateChainId;