import { Contract } from "ethers";
import _ from "lodash";
import { Promise } from "bluebird";
import { V1, V2, V3 } from "../constants";
import {isAddress} from "@ethersproject/address"
/**
 * @param instance
 * @returns stakeDuration of a cohort.
 */

export const deriveStakeDuration = async (
  instance: Contract
): Promise<string | undefined> => {
  try {
    const stakeDuration: string = await instance.stakeDuration();
    return stakeDuration;
  } catch (err) {
    return;
  }
};

/**
 * @param instance
 * @returns get number of tokens in particular cohort.
 */

export const getNoOfPools = async (
  instance: Contract
): Promise<number> => {
  if (instance.address.toLowerCase() === V1.toLowerCase()) {
    return 5;
  } else if (
    instance.address.toLowerCase() === V2.toLowerCase()
  ) {
    return 6;
  }
  const noOfPools = await instance.viewTokensCount();
  return noOfPools;
};

/**
 * @param instance cohort instance.
 * @param n no of tokens in cohort.
 * @returns number[] interval days in cohort.
 */

export const getIntervalDays = async (
  instance: Contract,
  n: number
): Promise<string[]> => {
  const promises = [];
  
  if(instance.address.toLowerCase() === V3.toLowerCase()){
    return ['1','8','15','22','29','36']
  }

  for (let i = 0; i < n; i++) {
    promises.push(instance.intervalDays(i));
  }
  return Promise.map(promises,(items) => {
    return String(items);
  })
};

export const getPoolStartTime = async (
  instance: Contract
): Promise<string> => {
  if (instance.address.toLowerCase() === V1.toLowerCase()) {
    return "1612302959";
  } else if (
    instance.address.toLowerCase() === V2.toLowerCase()
  ) {
    return "1613215605";
  }
  const poolStartTime = await instance.poolStartTime();
  return poolStartTime;
};

export const getTokens = async (
  instance: Contract,
  n: number
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
  instance: Contract
): Promise<string | null> => {
  
  if (instance.address.toLowerCase() === V1.toLowerCase()) {
    return null;
  }
  const refPercentage = await instance.refPercentage();
  return refPercentage;
};

export const getOptionalBenefits = async (
  instance: Contract
) => {
  if (instance.address.toLowerCase() === V1.toLowerCase()) {
    return null;
  } else if (
    instance.address.toLowerCase() === V2.toLowerCase()
  ) {
    return null;
  }
  const optionalBenefits = await instance.optionableBenefit();
  return optionalBenefits;
};

export const getRewardStrategy = (instance: Contract) => {
  if (instance.address.toLowerCase() === V1.toLowerCase()) {
    return "daily";
  } else if (
    instance.address.toLowerCase() === V2.toLowerCase()
  ) {
    return "daily";
  }
  return "hourly";
};

export const gasless = async (instance: Contract): Promise<boolean | undefined> => {
  try{
    const trustForwarder = await instance.trustedForwarder();
    if(isAddress(trustForwarder)){
      return true;
    }else {
      return false;
    }
  }catch(err){
    return false;
  }
}

export const getTag = (tokensCount: number) => {
  if(tokensCount === 2){
    return 'Special'
  }else{
    return 'Normal'
  }
}
