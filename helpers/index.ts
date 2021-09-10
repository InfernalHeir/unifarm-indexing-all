import { Contract } from "ethers";
import { DAYS } from "../constants";
import _ from "lodash";
import { Promise } from "bluebird";
/**
 * @param instance
 * @returns stakeDuration of a cohort.
 */

export const deriveStakeDuration = async (
  instance: Contract
): Promise<number | string> => {
  try {
    const stakeDuration: number = await instance.stakeDuration();
    const stakeDurationDays: number = _.divide(stakeDuration,DAYS);
    return stakeDurationDays;
  } catch (err) {
    return err.message;
  }
};

/**
 * @param instance
 * @returns get number of tokens in particular cohort.
 */

export const getNoOfPools = async (
  instance: Contract
): Promise<number> => {
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
): Promise<number[]> => {
  const promises = [];
  for (let i = 0; i < n; i++) {
    promises.push(instance.intervalDays(i));
  }
  return Promise.map(promises, (items) => {
    return items;
  });
};

export const getPoolStartTime = async (
  instance: Contract
): Promise<number> => {
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
  instance: any
): Promise<string> => {
  const refPercentage = await instance.refPercentage();
  return refPercentage;
};
