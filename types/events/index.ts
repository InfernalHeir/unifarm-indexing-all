export interface StakeEvent {
  userAddress: string;
  tokenId: string;
  cohortId: string;
  stakeId: string | null;
  referrerAddress: string | null;
  stakedAmount: string;
  time: string;
  hash: string;
  block: string;
  chainId: number;
}

export interface UnStakeEvent {
  userAddress: string;
  cohortId: string;
  unStakeTokenAddress: string;
  unStakedAmount: string;
  stakeId: string | null;
  time: string;
  hash: string;
  block: string;
  chainId: number;
}
