import { gql } from "apollo-server-express";

export const typeDefs = gql`
   enum OrderDirection {
      ASC
      DESC
   }

   input GlobalContext {
      orderDir: OrderDirection
      limit: Int
      offset: Int
   }

   input CohortInputs {
      chainId: Int!
      cohortAddress: String!
   }

   input PoolInputs {
      chainId: Int!
      tokenAddress: String!
   }

   type Cohort {
      id: ID!
      cohortAddress: String!
      stakeDuration: String!
      poolStartTime: String!
      tokensCount: String!
      intervalDays: [String!]!
      tokens: [String!]!
      refferalPercentage: String
      optionalBenefits: Int
      cohortVersion: String!
      rewardStrategy: String!
      DAYS: Int!
      HOURS: Int!
      gaslessAvailablity: Boolean
      tag: String!
      proxies: [String]!
   }

   type Token {
      id: ID!
      tokenId: String!
      decimals: String!
      userMinStake: String!
      userMaxStake: String!
      totalStakeLimit: String!
      lockableDays: String!
      optionableStatus: String!
      tokenSequenceList: [String!]!
      tokenDailyDistribution: [String!]!
      cohortId: String
      rewardCap: String
      chainId: Int!
   }

   type Pool {
      token: Token!
      cohort: Cohort!
   }

   type Stake {
      id: ID!
      userAddress: String!
      tokenId: String!
      cohortId: String!
      stakeId: String
      referrerAddress: String
      stakedAmount: String!
      time: String!
      hash: String!
      block: String!
      chainId: Int!
   }

   type Unstake {
      id: ID!
      userAddress: String!
      cohortId: String!
      unStakedTokenAddress: String!
      unStakedAmount: String!
      stakeId: String
      time: String!
      hash: String!
      block: String!
      chainId: Int!
   }

   type Query {
      cohort(where: CohortInputs!): Cohort
      allCohorts(
         first: Int!
         chainId: Int!
         orderDirection: OrderDirection
      ): [Cohort]!
      getPools(where: PoolInputs): [Pool!]!
      getTokens(where: PoolInputs): [Token!]!
      getAllStakes(chainId: Int!, cohortId: String!): [Stake!]!
      getAllUnstakes(chainId: Int!, cohortId: String!): [Unstake!]!
   }
`;
