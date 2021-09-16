// for getting the ACTIONS from this enum
export enum ACTIONS {
   
  DERVIVE_STAKE_DURATION = "deriveStakeDuration",

  GET_POOL_START_TIME = "getPoolStartTime",

  GET_NO_OF_POOLS = "getNoOfPools",

  GET_OPTIONAL_BENEFITS = "getOptionalBenefits",

  GET_REFFERAL_PERCENTAGE = "getRefferralPercentage",

  GET_REWARD_STRATEGY = "getRewardStrategy",

  IS_GASLESS = "gasless",

  GET_TOKENS = "getTokens",

  GET_INTERVAL_DAYS = "getIntervalDays",

  GET_COHORT_TAG = "getTag"

}

export interface ActionProperties {
  [action: string]: string
}

// registered Action properties for mapping

/* export const actionProperties: ActionProperties = {
  DERVIVE_STAKE_DURATION: "stakeDuration",
  GET_POOL_START_TIME: "poolStartTime",
  GET_NO_OF_POOLS: "tokensCount",
  GET_OPTIONAL_BENEFITS: "getOptionalBenefits",
  GET_REFFERAL_PERCENTAGE: "refferalPercentage",
} */

export const actionsProperties = (type: string) => {
  switch (type) {
    case "deriveStakeDuration":
      return "stakeDuration";
    case "getPoolStartTime":
      return "poolStartTime";
    case "getNoOfPools":
      return "tokensCount";
    case "getOptionalBenefits":
      return "optionalBenefits";
    case "getRefferralPercentage":
      return "refferalPercentage";
    case "getRewardStrategy":
      return "rewardStrategy";
    case "gasless":
      return "gaslessAvailablity";
    case "getTokens":
      return "tokens";
    case "getIntervalDays":
      return "intervalDays";
    case "getTag":
      return "tag";
    default:
      return undefined;
  }
};
