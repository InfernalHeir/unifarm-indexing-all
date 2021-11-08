import { gql } from "apollo-server-express";

export const typeDefs = gql`
   "Pool input for pool query"
   input PoolInputs {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "Specfic Token Address"
      tokenAddress: String!
   }

   input GroupUnstakes {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "group users wallet address"
      userAddresses: [String!]!
   }

   "Order Direction ASC | DESC"
   enum OrderDirection {
      ASC
      DESC
   }

   "Data Filteration"
   input Filter {
      "Limit - how many entites you want to take ?"
      limit: Int!
      "Offset - how many entities have to skip."
      offset: Int
      "Order Direction ASC | DESC"
      orderDirection: OrderDirection
   }

   "Cohort Input for cohort query"
   input CohortWhereClause {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "Specfic Cohort Address"
      cohortAddress: String!
   }

   " Cohort Group wise Fetch Input"
   input CohortGroupWhereClause {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
   }

   "Pool Group Fetching"
   input PoolsGroupWhereClause {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
   }

   "V1 Supports Specfic Pool Where Condition this is helpful for query the Staking Data"
   input SpecficPoolsWhere {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "Define Specfic Tokens"
      tokens: [String!]!
      "Define Specfic Cohorts"
      cohorts: [String!]!
   }

   input StakesWhere {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "cohort address"
      cohortId: String
   }

   input UnStakeWhere {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "user wallet address"
      userAddress: String!
   }

   input ClaimWhere {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "user wallet address"
      userAddress: String!
   }

   input ReferralEarnWhere {
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
      "user wallet address"
      userAddress: String!
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

   type Pools {
      "available pools"
      pools: [Pool!]!
      "total pools"
      total_pools: Int!
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

   "Supports V1 User Reward Claim Data"
   type Claim {
      "relation id for user"
      id: ID!
      "unstaker address."
      userAddress: String!
      "cohort address where token got unstaked."
      cohortId: String!
      "staked token address ?? | eg - 0x12"
      stakedTokenAddress: String!
      "reward token address which have been claimed a particular address."
      rewardTokenAddress: String!
      "how much claimed token was ?"
      claimedRewards: String
      "unstake epoch when was unstaking happens basically."
      time: String!
      "hash of unstaking transaction."
      hash: String!
      "blocknumber when unstaked."
      block: String!
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
   }

   "Supports V1 User Refferarl Reward Claim Data"
   type RefferalEarn {
      "relation id for user"
      id: ID!
      "unstaker address."
      userAddress: String!
      "cohort address where token got unstaked."
      cohortId: String!
      "refree address who have been refered ?? | eg - 0x12"
      refreeAddress: String!
      "reward token address which have been claimed a particular address."
      rewardTokenAddress: String!
      "how much refferral reward token was ?"
      rewardAmount: String
      "unstake epoch when was unstaking happens basically."
      time: String!
      "hash of unstaking transaction."
      hash: String!
      "blocknumber when unstaked."
      block: String!
      "Chain id eg : 1 | 56 | 137"
      chainId: Int!
   }

   "cohorts group fetching"
   type Cohorts {
      "list of cohorts."
      cohorts: [Cohort]!
      "total number of cohorts."
      total_cohorts: Int!
   }

   type CohortProxyGroupedAddresses {
      "cohort contract address."
      cohortAddress: String!
      "cohort proxies address."
      proxies: [String]!
   }

   type Query {
      "fetch specfic cohort with cohort id and chainid"
      getCohort(where: CohortWhereClause!): Cohort
      "fetch all cohorts by chainId and global context"
      allCohorts(where: CohortGroupWhereClause!, filter: Filter!): Cohorts!
      "fetch all cohorts and proxies addresses"
      allCohortsAndProxies(where: CohortGroupWhereClause!): [CohortProxyGroupedAddresses!]!
      "fetch all pools by chainId"
      allPools(where: PoolsGroupWhereClause!): Pools!
      "Fetch specfic token which is available in particular cohort."
      getTokens(where: PoolInputs): [Token!]!
      "Fetch Specfic Pools Just Defined The tokenAddress"
      getSpecficPools(where: SpecficPoolsWhere!): [Pool!]!
      "Fetch All Stakes in specfic chain"
      getAllStakes(where: StakesWhere!, filter: Filter!): [Stake!]!
      "Fetch All Unstakes in specfic chain by particular user wallet address."
      getAllUnstakes(where: UnStakeWhere): [Unstake]!
      "Fetch Group Unstakes for list of users."
      getSpecficUnstakes(where: GroupUnstakes): [Unstake]!
      "Fetch All Rewards Claims By a user"
      getAllClaimsByUser(where: ClaimWhere): [Claim]!
      "Fetch All the Refferral Address a user refered to anyone"
      getAllTheReferedUser(where: ReferralEarnWhere): [Stake!]
      "Fetch all the referral claim"
      getReferralClaimByUser(where: ReferralEarnWhere): [RefferalEarn!]
   }
`;
