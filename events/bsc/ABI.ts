export const STAKE_ABI = {
   anonymous: false,
   inputs: [
      {
         indexed: true,
         internalType: "address",
         name: "userAddress",
         type: "address",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "stakeId",
         type: "uint256",
      },
      {
         indexed: true,
         internalType: "address",
         name: "referrerAddress",
         type: "address",
      },
      {
         indexed: true,
         internalType: "address",
         name: "tokenAddress",
         type: "address",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "stakedAmount",
         type: "uint256",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "time",
         type: "uint256",
      },
   ],
   name: "Stake",
   type: "event",
};

export const UNSTAKE_ABI = {
   anonymous: false,
   inputs: [
      {
         indexed: true,
         internalType: "address",
         name: "userAddress",
         type: "address",
      },
      {
         indexed: true,
         internalType: "address",
         name: "unStakedtokenAddress",
         type: "address",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "unStakedAmount",
         type: "uint256",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "time",
         type: "uint256",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "stakeId",
         type: "uint256",
      },
   ],
   name: "UnStake",
   type: "event",
};

export const CLAIM_ABI = {
   anonymous: false,
   inputs: [
      {
         indexed: true,
         internalType: "address",
         name: "userAddress",
         type: "address",
      },
      {
         indexed: true,
         internalType: "address",
         name: "stakedTokenAddress",
         type: "address",
      },
      {
         indexed: true,
         internalType: "address",
         name: "tokenAddress",
         type: "address",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "claimRewards",
         type: "uint256",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "time",
         type: "uint256",
      },
   ],
   name: "Claim",
   type: "event",
};

export const REFFERAL_CLAIM_ABI = {
   anonymous: false,
   inputs: [
      {
         indexed: true,
         internalType: "address",
         name: "userAddress",
         type: "address",
      },
      {
         indexed: true,
         internalType: "address",
         name: "callerAddress",
         type: "address",
      },
      {
         indexed: true,
         internalType: "address",
         name: "rewardTokenAddress",
         type: "address",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "rewardAmount",
         type: "uint256",
      },
      {
         indexed: false,
         internalType: "uint256",
         name: "time",
         type: "uint256",
      },
   ],
   name: "ReferralEarn",
   type: "event",
};
