"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _log = require("../log");

var _resolvers = require("./resolvers");

var _typeDefs = require("./typeDefs");

var _createConnection = require("../db/createConnection");

function startApolloServer(_x, _x2) {
  return _startApolloServer.apply(this, arguments);
}

function _startApolloServer() {
  _startApolloServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(typeDefs, resolvers) {
    var app, server;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = (0, _express["default"])(); // take connection from database

            _context.next = 3;
            return (0, _createConnection.appBoot)();

          case 3:
            server = new _apolloServerExpress.ApolloServer({
              typeDefs: typeDefs,
              resolvers: resolvers
            });
            _context.next = 6;
            return server.start();

          case 6:
            server.applyMiddleware({
              app: app,
              cors: true
            });
            app.listen(4000, function () {
              _log.logger.info("\uD83D\uDE80 Server ready at http://localhost:4000".concat(server.graphqlPath));
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _startApolloServer.apply(this, arguments);
}

startApolloServer(_typeDefs.typeDefs, _resolvers.resolvers);