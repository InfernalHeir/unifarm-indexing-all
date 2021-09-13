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
      return;
  }
};
