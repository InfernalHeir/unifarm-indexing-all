import { gql } from "apollo-server-express";

export const typeDefs = gql`
   "Cohort Input for cohort query"
   input CohortInputs {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "Specfic Cohort Address"
      cohortAddress: String!
   }

   "Pool input for pool query"
   input PoolInputs {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "Specfic Token Address"
      tokenAddress: String!
   }

   "Cohort Data Defination"
   type Cohort {
      "Cohort Registered ID"
      id: ID!
      "cohort contract address"
      cohortAddress: String!
      "Stake Duration of a cohort."
      stakeDuration: String!
      "Pool StartTime of a cohort."
      poolStartTime: String!
      "Participants Tokens in particular cohort."
      tokensCount: String!
      "IntervalDays of a particular cohort."
      intervalDays: [String!]!
      "tokens in particular cohort."
      tokens: [String!]!
      "Ref Percentage in specfic cohort."
      refferalPercentage: String
      "Optional benefits in specfic cohort. most probabaly is 2."
      optionalBenefits: Int
      "Version of a cohort."
      cohortVersion: String!
      "RewardStatergy tell you daily | hourly."
      rewardStrategy: String!
      "DAYS 86400 seconds."
      DAYS: Int!
      "HOURS 3600 seconds."
      HOURS: Int!
      "Gas less Availablity eg true | false"
      gaslessAvailablity: Boolean
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "Tag defined eg 'special' | 'normal'"
      tag: String!
      "Proxies of that cohort."
      proxies: [String]!
   }

   "Token Data Type Which Consist Token Related Data."
   type Token {
      "Registered Id of particular token in single cohort."
      id: ID!
      "token id stands for participant token address."
      tokenId: String!
      "decimals of participant token."
      decimals: String!
      "user minimum cap value of the specfic token which should be staked here."
      userMinStake: String!
      "user maximum cap value of the specfic token which should be staked here."
      userMaxStake: String!
      "total stake limit value of the specfic token which should be total staked here in this pool."
      totalStakeLimit: String!
      "lockable days eg 15552000 | 7960000"
      lockableDays: String!
      "optionable status  0 - get 1x reward 1 - get 1x reward 2 - get 2x reward"
      optionableStatus: String!
      "token sequencelist of particular pool token."
      tokenSequenceList: [String!]!
      "token daily distribution for particular pool."
      tokenDailyDistribution: [String!]!
      "cohort contract address."
      cohortId: String
      "reward cap for particular pool."
      rewardCap: String
      "chain id eg : 1 | 56 | 137"
      chainId: Int!
   }

   "Supports V1"
   type Pool {
      "Token Manifest."
      token: Token!
      "Cohort Manifest."
      cohort: Cohort!
   }

   "Supports V1 User Staking Data"
   type Stake {
      "Refernce stake id just for relation."
      id: ID!
      "user address which have been staked here."
      userAddress: String!
      "token address of staked token."
      tokenId: String!
      "cohort address where token got staked."
      cohortId: String!
      "stake id for tracing."
      stakeId: String
      "wallet address refered person if user have been refer someone and refered user staked here. default - 0x"
      referrerAddress: String
      "user staked amount"
      stakedAmount: String!
      "when staked basically epoch"
      time: String!
      "hash of staking transaction."
      hash: String!
      "block number when staked."
      block: String!
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
   }

   "Supports V1 User UnStaking Data"
   type Unstake {
      "relation id for user"
      id: ID!
      "unstaker address."
      userAddress: String!
      "cohort address where token got unstaked."
      cohortId: String!
      "unStaked Token address | eg - 0x12"
      unStakedTokenAddress: String!
      "how much unstaked amount ?"
      unStakedAmount: String!
      "stake id"
      stakeId: String
      "unstake epoch when was unstaking happens basically."
      time: String!
      "hash of unstaking transaction."
      hash: String!
      "blocknumber when unstaked."
      block: String!
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
   }

   type Query {
      "fetch specfic cohort"
      cohort(where: CohortInputs!): Cohort
      allCohorts(first: Int!, chainId: Int!): [Cohort]!
      getPools(where: PoolInputs): [Pool!]!
      getTokens(where: PoolInputs): [Token!]!
      getAllStakes(chainId: Int!, cohortId: String!): [Stake!]!
      getAllUnstakes(chainId: Int!, cohortId: String!): [Unstake!]!
   }
`;
