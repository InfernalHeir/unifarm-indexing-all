export interface TokenDetails {
  decimals: string;
  userMinStake: string;
  userMaxStake: string;
  totalStakeLimit: string;
  lockableDays: string;
  optionableStatus: boolean;
}

export interface TokenMetaData extends TokenDetails {
  tokenId: string;
  tokenSequenceList: string[];
  tokenDailyDistribution: string[];
  cohortId: string;
  rewardCap: string;
  chainId: number;
}
