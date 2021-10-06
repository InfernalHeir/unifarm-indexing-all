"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientOps = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Claim = require("./entity/Claim");

var _Cohort = require("./entity/Cohort");

var _RefferalClaim = require("./entity/RefferalClaim");

var _Stake = require("./entity/Stake");

var _Token = require("./entity/Token");

var _Unstake = require("./entity/Unstake");

// config
_dotenv["default"].config({
  path: ".env.".concat(process.env.NODE_ENV)
}); // client options


var clientOps = {
  type: "postgres",
  host: String(process.env.DB_HOSTNAME),
  port: Number(process.env.PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  synchronize: true,
  logging: false,
  entities: [_Cohort.Cohort, _Token.Token, _Stake.Stake, _Unstake.Unstake, _Claim.Claim, _RefferalClaim.RefferralClaim],
  logNotifications: true,
  name: "unifarm",
  extra: {
    connectionLimits: 5,
    keepConnectionAlive: true
  }
};
exports.clientOps = clientOps;