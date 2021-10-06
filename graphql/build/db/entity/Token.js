"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeorm = require("typeorm");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

var Token = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)("uuid"), _dec3 = (0, _typeorm.Column)("varchar"), _dec4 = (0, _typeorm.Column)("varchar"), _dec5 = (0, _typeorm.Column)("varchar"), _dec6 = (0, _typeorm.Column)("varchar"), _dec7 = (0, _typeorm.Column)("varchar"), _dec8 = (0, _typeorm.Column)("varchar"), _dec9 = (0, _typeorm.Column)("boolean"), _dec10 = (0, _typeorm.Column)("varchar", {
  array: true,
  nullable: true
}), _dec11 = (0, _typeorm.Column)("varchar", {
  array: true,
  nullable: true
}), _dec12 = (0, _typeorm.Column)("varchar"), _dec13 = (0, _typeorm.Column)("varchar", {
  nullable: true
}), _dec14 = (0, _typeorm.Column)("numeric"), _dec(_class = (_class2 = function Token() {
  (0, _classCallCheck2["default"])(this, Token);
  (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "tokenId", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "decimals", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "userMinStake", _descriptor4, this);
  (0, _initializerDefineProperty2["default"])(this, "userMaxStake", _descriptor5, this);
  (0, _initializerDefineProperty2["default"])(this, "totalStakeLimit", _descriptor6, this);
  (0, _initializerDefineProperty2["default"])(this, "lockableDays", _descriptor7, this);
  (0, _initializerDefineProperty2["default"])(this, "optionableStatus", _descriptor8, this);
  (0, _initializerDefineProperty2["default"])(this, "tokenSequenceList", _descriptor9, this);
  (0, _initializerDefineProperty2["default"])(this, "tokenDailyDistribution", _descriptor10, this);
  (0, _initializerDefineProperty2["default"])(this, "cohortId", _descriptor11, this);
  (0, _initializerDefineProperty2["default"])(this, "rewardCap", _descriptor12, this);
  (0, _initializerDefineProperty2["default"])(this, "chainId", _descriptor13, this);
}, (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tokenId", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "decimals", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "userMinStake", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "userMaxStake", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "totalStakeLimit", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "lockableDays", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "optionableStatus", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tokenSequenceList", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tokenDailyDistribution", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cohortId", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "rewardCap", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "chainId", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Token = Token;