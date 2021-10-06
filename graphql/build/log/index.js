"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _winston = require("winston");

var combine = _winston.format.combine,
    timestamp = _winston.format.timestamp,
    label = _winston.format.label,
    printf = _winston.format.printf;
var myFormat = printf(function (_ref) {
  var level = _ref.level,
      message = _ref.message,
      label = _ref.label,
      timestamp = _ref.timestamp;
  return "".concat(timestamp, " [").concat(label, "] ").concat(level, ": ").concat(message);
});
var logger = (0, _winston.createLogger)({
  level: 'info',
  format: combine(label({
    label: '__UNIFARM__'
  }), timestamp(), myFormat),
  transports: [new _winston.transports.Console(), new _winston.transports.File({
    filename: './storage/logs/errors.log',
    level: "error"
  }), new _winston.transports.File({
    filename: './storage/logs/access.log'
  })]
});
exports.logger = logger;