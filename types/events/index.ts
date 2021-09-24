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
   unStakedTokenAddress: string;
   unStakedAmount: string;
   stakeId: string | null;
   time: string;
   hash: string;
   block: string;
   chainId: number;
}

export interface ClaimEvent {
   userAddress: string;
   cohortId: string;
   stakedTokenAddress: string;
   rewardTokenAddress: string;
   claimedRewards: string;
   time: string;
   hash: string;
   block: string;
   chainId: number;
}

export interface RefferalClaimEvent {
   userAddress: string;
   cohortId: string;
   refreeAddress: string;
   rewardTokenAddress: string;
   rewardAmount: string;
   time: string;
   hash: string;
   block: string;
   chainId: number;
}
