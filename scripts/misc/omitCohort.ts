import { getConnection, getRepository } from "typeorm";
import { Claim } from "../../db/entity/Claim";
import { Cohort } from "../../db/entity/Cohort";
import { RefferralClaim } from "../../db/entity/RefferalClaim";
import { Stake } from "../../db/entity/Stake";
import { Token } from "../../db/entity/Token";
import { Unstake } from "../../db/entity/Unstake";
import { promisify } from "util";
import { client } from "../../cron/cronHelpers";
import _, { isEmpty } from "lodash";
import { logger } from "../../log";
import { POLYGON_CHAIN } from "../../constants";
import { appBoot } from "../../db/createConnection";

export const storeFutureCohorts = async (
   chainId: number,
   newCohorts: string[]
): Promise<boolean> => {
   const update: boolean = await client.set(`FUTURE_COHORT_${chainId}`, JSON.stringify(newCohorts));
   return update;
};

export const deleteSingleCohort = async (cohortId: string, chainId: number) => {
   await getConnection("unifarm")
      .createQueryBuilder()
      .delete()
      .from(Cohort)
      .where("LOWER(cohortAddress) =:cohortAddress", { cohortAddress: cohortId.toLowerCase() })
      .andWhere("chainId =:chainId", {
         chainId,
      })
      .execute();
};

export const deleteCohortTokens = async (cohortId: string, chainId: number) => {
   await getConnection("unifarm")
      .createQueryBuilder()
      .delete()
      .from(Token)
      .where("LOWER(cohortId) =:cohortId", { cohortId: cohortId.toLowerCase() })
      .andWhere("chainId =:chainId", {
         chainId,
      })
      .execute();
};

export const deleteStakeEvents = async (cohortId: string, chainId: number) => {
   await getConnection("unifarm")
      .createQueryBuilder()
      .delete()
      .from(Stake)
      .where("LOWER(cohortId) =:cohortId", { cohortId: cohortId.toLowerCase() })
      .andWhere("chainId =:chainId", {
         chainId,
      })
      .execute();
};

export const deleteUnStakeEvents = async (cohortId: string, chainId: number) => {
   await getConnection("unifarm")
      .createQueryBuilder()
      .delete()
      .from(Unstake)
      .where("LOWER(cohortId) =:cohortId", { cohortId: cohortId.toLowerCase() })
      .andWhere("chainId =:chainId", {
         chainId,
      })
      .execute();
};

export const deleteClaimEvents = async (cohortId: string, chainId: number) => {
   await getConnection("unifarm")
      .createQueryBuilder()
      .delete()
      .from(Claim)
      .where("LOWER(cohortId) =:cohortId", { cohortId: cohortId.toLowerCase() })
      .andWhere("chainId =:chainId", {
         chainId,
      })
      .execute();
};

export const deleteReferralEvents = async (cohortId: string, chainId: number) => {
   await getConnection("unifarm")
      .createQueryBuilder()
      .delete()
      .from(RefferralClaim)
      .where("LOWER(cohortId) =:cohortId", { cohortId: cohortId.toLowerCase() })
      .andWhere("chainId =:chainId", {
         chainId,
      })
      .execute();
};

export const getAsync = promisify(client.get).bind(client);

const deleteCohortListenerFromRedis = async (cohortsShouldbeDelete: string[], chainid: number) => {
   if (_.isEmpty(cohortsShouldbeDelete)) return null;
   var remainingCohorts = [];
   const cohortsFromRedis = await getAsync(`FUTURE_COHORT_80001`);
   const parse = JSON.parse(cohortsFromRedis);

   console.log("parse", parse);
   /* if (_.isEmpty(cohortsFromRedis)) {
      logger.info(`Returning over here no cohort found in redis store`);
      return;
   }
   for (var e = 0; e < cohortsFromRedis.length; e++) {
      const address = cohortsFromRedis[e];
      const isMatch = cohortsShouldbeDelete.filter((e) => {
         return e.toLowerCase() === address.toLowerCase();
      });
      if (_.isEmpty(isMatch)) {
         remainingCohorts.push(address);
      }
   }
   // save this remaing to the
   const isStored = storeFutureCohorts(chainid, remainingCohorts);
   if (isStored) {
      logger.info(`updated cohort listeners`);
   } else {
      logger.info(`Failed to store`);
   } */
};

const main = async (cohortId: string, chainId: number) => {
   if (!cohortId || !chainId) return null;
   // delete cohort details
   await deleteSingleCohort(cohortId, chainId);
   logger.info(`Cohort Deleted`);

   // delete cohort tokens
   await deleteCohortTokens(cohortId, chainId);
   logger.info(`Cohort Tokens Deleted`);

   // delete stake events
   await deleteStakeEvents(cohortId, chainId);
   logger.info(`Cohort Stakes Deleted`);

   // delete unstake events
   await deleteUnStakeEvents(cohortId, chainId);
   logger.info(`Cohort Unstakes Deleted`);

   // delete claim events
   await deleteClaimEvents(cohortId, chainId);
   logger.info(`Cohort Claims Deleted`);

   // delete referral events
   await deleteReferralEvents(cohortId, chainId);
   logger.info(`Cohort Referral Events Deleted`);

   await deleteCohortListenerFromRedis([cohortId], chainId);
   logger.info(`Cohort Listner Deleted from redis`);
};

appBoot().then(() => {
   setTimeout(() => {
      main("0xd54b6e5cdc11145ed4c51dc0d3e787b96f026402", POLYGON_CHAIN);
   }, 3300);
});
