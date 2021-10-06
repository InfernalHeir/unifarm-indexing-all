"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

var _templateObject;

var typeDefs = (0, _apolloServerExpress.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n   enum OrderDirection {\n      ASC\n      DESC\n   }\n\n   input GlobalContext {\n      orderDir: OrderDirection\n      limit: Int\n      offset: Int\n   }\n\n   input CohortInputs {\n      chainId: Int!\n      cohortAddress: String!\n   }\n\n   input PoolInputs {\n      chainId: Int!\n      tokenAddress: String!\n   }\n\n   type Cohort {\n      id: ID!\n      cohortAddress: String!\n      stakeDuration: String!\n      poolStartTime: String!\n      tokensCount: String!\n      intervalDays: [String!]!\n      tokens: [String!]!\n      refferalPercentage: String\n      optionalBenefits: Int\n      cohortVersion: String!\n      rewardStrategy: String!\n      DAYS: Int!\n      HOURS: Int!\n      gaslessAvailablity: Boolean\n      tag: String!\n      proxies: [String]!\n   }\n\n   type Token {\n      id: ID!\n      tokenId: String!\n      decimals: String!\n      userMinStake: String!\n      userMaxStake: String!\n      totalStakeLimit: String!\n      lockableDays: String!\n      optionableStatus: String!\n      tokenSequenceList: [String!]!\n      tokenDailyDistribution: [String!]!\n      cohortId: String\n      rewardCap: String\n      chainId: Int!\n   }\n\n   type Pool {\n      token: Token!\n      cohort: Cohort!\n   }\n\n   type Stake {\n      id: ID!\n      userAddress: String!\n      tokenId: String!\n      cohortId: String!\n      stakeId: String\n      referrerAddress: String\n      stakedAmount: String!\n      time: String!\n      hash: String!\n      block: String!\n      chainId: Int!\n   }\n\n   type Unstake {\n      id: ID!\n      userAddress: String!\n      cohortId: String!\n      unStakedTokenAddress: String!\n      unStakedAmount: String!\n      stakeId: String\n      time: String!\n      hash: String!\n      block: String!\n      chainId: Int!\n   }\n\n   type Query {\n      cohort(where: CohortInputs!): Cohort\n      allCohorts(\n         first: Int!\n         chainId: Int!\n         orderDirection: OrderDirection\n      ): [Cohort]!\n      getPools(where: PoolInputs): [Pool!]!\n      getTokens(where: PoolInputs): [Token!]!\n      getAllStakes(chainId: Int!, cohortId: String!): [Stake!]!\n      getAllUnstakes(chainId: Int!, cohortId: String!): [Unstake!]!\n   }\n"])));
exports.typeDefs = typeDefs;