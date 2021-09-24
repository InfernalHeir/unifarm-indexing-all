import { gql } from "apollo-server-express";

export const typeDefs = gql`
   enum OrderDirection {
      ASC
      DESC
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
      userMaxStake: String!
      totalStakeLimit: String!
      lockableDays: String!
      optionableStatus: String!
      tokenSequenceList: [String!]!
      tokenDailyDistribution: [String!]!
      cohortId: String!
      rewardCap: String
      chainId: Int!
   }

   type Query {
      cohort(where: CohortInputs!): Cohort
      allCohorts(
         first: Int!
         chainId: Int!
         orderDirection: OrderDirection
      ): [Cohort]!
      getPools(where: PoolInputs): [Token!]!
      getTokens(where: PoolInputs): [Token!]!
   }
`;
