//import { bootstarp } from "../db/createConnection";
import { logger } from "ethers";

/* import { ethereumCohorts } from "../providers/provider";
import { DAYS, HOURS } from "../constants/index";
import {
  deriveStakeDuration,
  gasless,
  getIntervalDays, 
  getNoOfPools,
  getOptionalBenefits,
  getPoolStartTime,
  getRefferralPercentage,
  getRewardStrategy,
  getTag,
  getTokens,
} from "../helpers";
import { Promise } from "bluebird"; */
import { CohortOptions /* , Cohorts */ } from "../types/Cohorts";
import {  multicall , yamlParser } from "../helpers/scripters";
import { getCohorts } from "../providers/provider";
import { cohortActions } from "../actions/defaultActions";
import { Promise } from "bluebird"; 

//const client = bootstarp();

async function ethereum(opts: CohortOptions) {
  try {
    const cohorts = yamlParser(opts.chainId);
    
    logger.info(
      `manifest loaded. cohorts found ${cohorts.length}`
    );

    var n = 0;

    var contract = getCohorts(opts.chainId);
    
    if (!contract)
      throw new Error(
        `Fatal Error Contract Not found for the related ChainId`
      );

    var multiPromise = [];    
    
    while (n < cohorts.length) {
      const items = cohorts[n];
      const address = items.address;
      const instance = contract(address);
      console.log(instance);
      multiPromise.push(multicall(cohortActions,[[instance]]));
      n++;
    }

    const results = await Promise.map(multiPromise,(values) => {
      return values;
    });

    console.log(results);

  } catch (err) {
    console.log(err);
    return;
  }
}

/* var n = 0;
    var multiPromises = [];

    while (n < cohorts.length) {
      const cohort = cohorts[n];
      const instance = ethereumCohorts(cohort.address);

      const stakeDuration = deriveStakeDuration(instance);
      const poolStartTime = getPoolStartTime(instance);
      const noOfPools = getNoOfPools(instance);
      const optionalBenefits = getOptionalBenefits(instance);
      const refPercentage = getRefferralPercentage(instance);
      const rewardStrategy = getRewardStrategy(instance);
      const isGasLess = gasless(instance);

      multiPromises.push({
        stakeDuration,
        poolStartTime,
        noOfPools,
        optionalBenefits,
        refPercentage,
        rewardStrategy,
        DAYS,
        HOURS,
        isGasLess,
        cohortAddress: cohort.address,
        version: cohort.version,
        chainId: opts.chainId,
      });

      n++;
    }

    const mappingBasicDetails = await Promise.map(
      multiPromises,
      async (values) => {
        return await Promise.all([
          values.noOfPools,
          values.poolStartTime,
          values.stakeDuration,
          values.optionalBenefits,
          values.refPercentage,
          values.rewardStrategy,
          values.DAYS,
          values.HOURS,
          values.isGasLess,
          values.cohortAddress,
          values.version,
          values.chainId,
        ]).then((items) => {
          return {
            tokensCount: String(items[0]),
            poolStartTime: String(items[1]),
            stakeDuration: String(items[2]),
            optionalBenefits: String(items[3]),
            refPercentage: String(items[4]),
            rewardStrategy: String(items[5]),
            DAYS: String(items[6]),
            HOURS: String(items[7]),
            gaslessAvailablity: items[8],
            cohortAddress: items[9],
            version: items[10],
            chainId: items[11],
          };
        });
      }
    );

    var otherDetails = [];

    for (var k = 0; k < mappingBasicDetails.length; k++) {
      const items = mappingBasicDetails[k];
      const cohortAddress = items.cohortAddress;
      const tokensCount = items.tokensCount;
      const instance = ethereumCohorts(cohortAddress);
      const tokens = getTokens(instance, Number(tokensCount));
      const intervalDays = getIntervalDays(
        instance,
        Number(tokensCount)
      ); 

      otherDetails.push({
        tokens,
        intervalDays
      });
    }

    const aggregatedCohortOtherResults = await Promise.map(
      otherDetails,
      async (values) => {
        return await Promise.all([
          values.tokens,
          values.intervalDays,
        ]).then((items) => {
          return {
            tokens: items[0],
            intervalDays: items[1],
          };
        });
      }
    );

    var COHORTS: Cohorts[] = mappingBasicDetails.map((items,i) => {
        const values = aggregatedCohortOtherResults[i];
        const tag = getTag(Number(items.tokensCount));
        return {
          cohortAddress: items.cohortAddress,
          stakeDuration: items.stakeDuration,
          poolStartTime: items.poolStartTime,
          tokensCount: Number(items.tokensCount),
          intervalDays: values.intervalDays,
          tokens: values.tokens,
          refferalPercentage: items.refPercentage,
          optionalBenefits: items.optionalBenefits,
          cohortVersion: items.version,
          rewardStrategy: items.rewardStrategy,
          DAYS: Number(items.DAYS),
          HOURS: Number(items.HOURS),
          gaslessAvailablity: items.gaslessAvailablity,
          chainId: items.chainId,
          tag
        }  
    }); */

ethereum({
  chainId: 1,
});
