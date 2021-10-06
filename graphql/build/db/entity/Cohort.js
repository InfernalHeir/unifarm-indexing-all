"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cohort = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerDefineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(require("@babel/runtime/helpers/applyDecoratedDescriptor"));

var _initializerWarningHelper2 = _interopRequireDefault(require("@babel/runtime/helpers/initializerWarningHelper"));

var _typeorm = require("typeorm");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17;

var Cohort = (_dec = (0, _typeorm.Entity)(), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)("uuid"), _dec3 = (0, _typeorm.Column)({
  type: "varchar"
}), _dec4 = (0, _typeorm.Column)({
  type: "varchar"
}), _dec5 = (0, _typeorm.Column)({
  type: "varchar"
}), _dec6 = (0, _typeorm.Column)({
  type: "numeric"
}), _dec7 = (0, _typeorm.Column)({
  type: "varchar",
  array: true
}), _dec8 = (0, _typeorm.Column)({
  type: "varchar",
  array: true
}), _dec9 = (0, _typeorm.Column)({
  type: "varchar",
  nullable: true
}), _dec10 = (0, _typeorm.Column)("varchar", {
  nullable: true
}), _dec11 = (0, _typeorm.Column)("varchar"), _dec12 = (0, _typeorm.Column)("varchar"), _dec13 = (0, _typeorm.Column)("numeric"), _dec14 = (0, _typeorm.Column)("numeric"), _dec15 = (0, _typeorm.Column)("boolean"), _dec16 = (0, _typeorm.Column)("numeric"), _dec17 = (0, _typeorm.Column)("varchar"), _dec18 = (0, _typeorm.Column)("varchar", {
  nullable: true,
  array: true
}), _dec(_class = (_class2 = function Cohort() {
  (0, _classCallCheck2["default"])(this, Cohort);
  (0, _initializerDefineProperty2["default"])(this, "id", _descriptor, this);
  (0, _initializerDefineProperty2["default"])(this, "cohortAddress", _descriptor2, this);
  (0, _initializerDefineProperty2["default"])(this, "stakeDuration", _descriptor3, this);
  (0, _initializerDefineProperty2["default"])(this, "poolStartTime", _descriptor4, this);
  (0, _initializerDefineProperty2["default"])(this, "tokensCount", _descriptor5, this);
  (0, _initializerDefineProperty2["default"])(this, "intervalDays", _descriptor6, this);
  (0, _initializerDefineProperty2["default"])(this, "tokens", _descriptor7, this);
  (0, _initializerDefineProperty2["default"])(this, "refferalPercentage", _descriptor8, this);
  (0, _initializerDefineProperty2["default"])(this, "optionalBenefits", _descriptor9, this);
  (0, _initializerDefineProperty2["default"])(this, "cohortVersion", _descriptor10, this);
  (0, _initializerDefineProperty2["default"])(this, "rewardStrategy", _descriptor11, this);
  (0, _initializerDefineProperty2["default"])(this, "DAYS", _descriptor12, this);
  (0, _initializerDefineProperty2["default"])(this, "HOURS", _descriptor13, this);
  (0, _initializerDefineProperty2["default"])(this, "gaslessAvailablity", _descriptor14, this);
  (0, _initializerDefineProperty2["default"])(this, "chainId", _descriptor15, this);
  (0, _initializerDefineProperty2["default"])(this, "tag", _descriptor16, this);
  (0, _initializerDefineProperty2["default"])(this, "proxies", _descriptor17, this);
}, (_descriptor = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cohortAddress", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "stakeDuration", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "poolStartTime", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tokensCount", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "intervalDays", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tokens", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "refferalPercentage", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "optionalBenefits", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "cohortVersion", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "rewardStrategy", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "DAYS", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "HOURS", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "gaslessAvailablity", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "chainId", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "tag", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = (0, _applyDecoratedDescriptor2["default"])(_class2.prototype, "proxies", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Cohort = Cohort;