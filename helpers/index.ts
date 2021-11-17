import { Contract } from "ethers";
import { Promise } from "bluebird";
import {
   BSC_CHAIN,
   BUSD,
   ETH_CHAIN,
   OROWBTC,
   OROWETH,
   POLYGON_CHAIN,
   SMG,
   UFARMUSDC,
   USDC,
   V1,
   V18,
   V1REPROXY,
   V2,
   V3,
   WBTC,
   WETH,
} from "../constants";
import { isAddress } from "@ethersproject/address";
import { TokenDetails } from "../types/Tokens";
import rewards from "../constants/miscellaneous/rewards.json";
import _ from "lodash";
import V1REPROXYABI from "../constants/ethereum/Proxy/V1/V1PROXY.json";
import { ethProvider } from "../providers/provider";

/**
 * @param instance
 * @returns stakeDuration of a cohort.
 */

export const deriveStakeDuration = async (
   instance: Contract,
   chainId?: number
): Promise<string | undefined> => {
   try {
      const stakeDuration: string = await instance.stakeDuration();
      return String(stakeDuration);
   } catch (err) {
      return undefined;
   }
};

/**
 * @param instance
 * @returns get number of tokens in particular cohort.
 */

export const getNoOfPools = async (instance: Contract, chainId: number): Promise<number> => {
   if (instance.address.toLowerCase() === V1.toLowerCase() && chainId === ETH_CHAIN) {
      return 5;
   } else if (
      (instance.address.toLowerCase() === V2.toLowerCase() ||
         instance.address.toLowerCase() === V3.toLowerCase()) &&
      chainId === ETH_CHAIN
   ) {
      return 6;
   }
   const noOfPools = await instance.viewTokensCount();
   return Number(noOfPools);
};

/**
 * @param instance cohort instance.
 * @param n no of tokens in cohort.
 * @returns number[] interval days in cohort.
 */

export const getIntervalDays = async (
   instance: Contract,
   n: number,
   chainId: number
): Promise<string[]> => {
   const promises = [];

   if (
      (instance.address.toLowerCase() === V3.toLowerCase() ||
         instance.address.toLowerCase() === V2.toLowerCase()) &&
      chainId === ETH_CHAIN
   ) {
      return ["1", "8", "15", "22", "29", "36"];
   }

   for (let i = 0; i < n; i++) {
      promises.push(instance.intervalDays(i));
   }
   return Promise.map(promises, (items) => {
      return String(items);
   });
};

export const getPoolStartTime = async (instance: Contract, chainId: number): Promise<string> => {
   if (instance.address.toLowerCase() === V1.toLowerCase() && chainId === ETH_CHAIN) {
      return "1612302959";
   } else if (instance.address.toLowerCase() === V2.toLowerCase() && chainId === ETH_CHAIN) {
      return "1613215605";
   }
   const poolStartTime = await instance.poolStartTime();
   return String(poolStartTime);
};

export const getTokens = async (
   instance: Contract,
   n: number,
   chainId: number
): Promise<string[]> => {
   const promises = [];
   for (let i = 0; i < n; i++) {
      promises.push(instance.tokens(i));
   }
   return Promise.map(promises, (items) => {
      return items;
   });
};

export const getRefferralPercentage = async (
   instance: Contract,
   chainId: number
): Promise<string | null> => {
   if (instance.address.toLowerCase() === V1.toLowerCase() && chainId === ETH_CHAIN) {
      return null;
   }
   const refPercentage = await instance.refPercentage();
   return String(refPercentage);
};

export const getOptionalBenefits = async (instance: Contract, chainId: number) => {
   if (instance.address.toLowerCase() === V1.toLowerCase() && chainId === ETH_CHAIN) {
      return null;
   } else if (instance.address.toLowerCase() === V2.toLowerCase() && chainId === ETH_CHAIN) {
      return null;
   }
   const optionalBenefits = await instance.optionableBenefit();
   return String(optionalBenefits);
};

export const getRewardStrategy = (instance: Contract, chainId: number) => {
   if (instance.address.toLowerCase() === V1.toLowerCase() && chainId === ETH_CHAIN) {
      return "daily";
   } else if (instance.address.toLowerCase() === V2.toLowerCase() && chainId === ETH_CHAIN) {
      return "daily";
   }
   return "hourly";
};

export const gasless = async (
   instance: Contract,
   chainId: number
): Promise<boolean | undefined> => {
   try {
      const trustForwarder = await instance.trustedForwarder();
      if (isAddress(trustForwarder)) {
         return true;
      } else {
         return false;
      }
   } catch (err) {
      return false;
   }
};

export const getTag = (tokensCount: number) => {
   if (tokensCount === 2) {
      return "Special";
   } else {
      return "Normal";
   }
};

export const getPoolInformation = async (
   instance: Contract,
   tokenAddress: string,
   chainId: number
): Promise<TokenDetails> => {
   const pool = await instance.tokenDetails(tokenAddress);

   if (instance.address.toLowerCase() === V1.toLowerCase() && chainId === ETH_CHAIN) {
      return {
         decimals: String(pool.decimal),
         userMinStake: "0",
         userMaxStake: String(pool.userStakeLimit),
         totalStakeLimit: String(pool.maxStake),
         lockableDays: "0",
         optionableStatus: false,
      };
   } else if (instance.address.toLowerCase() === V2.toLowerCase() && chainId === ETH_CHAIN) {
      return {
         decimals: String(pool.decimal),
         userMinStake: "0",
         userMaxStake: String(pool.userStakeLimit),
         totalStakeLimit: String(pool.maxStake),
         lockableDays: String(pool.lockableDays),
         optionableStatus: pool.optionableStatus,
      };
   } else {
      return {
         decimals: tokenAddress.toLowerCase() === SMG.toLowerCase() ? "8" : String(pool.decimal),
         userMinStake: String(pool.userMinStake),
         userMaxStake: String(pool.userMaxStake),
         totalStakeLimit: String(pool.totalMaxStake),
         lockableDays: String(pool.lockableDays),
         optionableStatus: pool.optionableStatus,
      };
   }
};

// only throw locking tokens.
export const locking = (cohort: string, locking: string, chainId: number): string => {
   if (
      chainId === ETH_CHAIN &&
      cohort.toLowerCase() === V18.toLowerCase() &&
      cohort.toLowerCase() === OROWETH.toLowerCase() &&
      cohort.toLowerCase() === UFARMUSDC.toLowerCase()
   ) {
      return locking;
   } else if (chainId === POLYGON_CHAIN && cohort.toLowerCase() === OROWBTC.toLowerCase()) {
      return locking;
   }
   return "0";
};

export const getTokenSequenceList = async (
   instance: Contract,
   address: string,
   n: number //
): Promise<string[]> => {
   const promises: any[] = [];
   if (
      address.toLowerCase() === BUSD.toLowerCase() ||
      address.toLowerCase() === WETH.toLowerCase() ||
      address.toLowerCase() === USDC.toLowerCase() ||
      address.toLowerCase() === WBTC.toLowerCase()
   ) {
      return [];
   }
   for (let r = 0; r < n; r++) {
      promises.push(instance.tokensSequenceList(address, r));
   }
   return Promise.map(promises, (values) => {
      return String(values);
   });
};

export const getTokenDailyDistribution = async (
   instance: Contract,
   tokenSequence: string[],
   tokenAddress: string,
   chainId: number
): Promise<string[]> => {
   // on v1 case it will read from the proxy one
   if (instance.address.toLowerCase() === V1REPROXY.toLowerCase() && chainId === ETH_CHAIN) {
      instance = new Contract(V1REPROXY, V1REPROXYABI, ethProvider);
   }

   const promises = [];

   for (let k = 0; k < tokenSequence.length; k++) {
      const address = tokenSequence[k];
      promises.push(instance.tokenDailyDistribution(tokenAddress, address));
   }
   return Promise.map(promises, (values, i) => {
      return String(values);
   });
};

export const getRewardCap = (chainId: number, cohort: string, token: string): string | null => {
   const tokenReward = rewards?.filter((e) => {
      return (
         Number(e.chainId) === chainId &&
         String(e.cohortAddress).toLowerCase() === cohort.toLowerCase() &&
         String(e.tokenAddress).toLowerCase() === token.toLowerCase()
      );
   });
   if (_.isEmpty(tokenReward)) return null;
   return tokenReward[0].rewardCap;
};
