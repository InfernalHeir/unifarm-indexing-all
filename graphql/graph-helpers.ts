import { getRepository } from "typeorm";
import { Cohort } from "../db/entity/Cohort";
import { Stake } from "../db/entity/Stake";
import { Token } from "../db/entity/Token";
import { Unstake } from "../db/entity/Unstake";

export const MAXIMUM_LIMIT_FETCHED = 10;

export const DEFAULT_OFFSET = 0;

export const MAX_LIMIT = 500;

export const getCohort = async (
   cohortId: string,
   chainId: number
): Promise<Cohort> => {
   const cohort = await getRepository(Cohort, "unifarm")
      .createQueryBuilder("cohort")
      .select()
      .where("LOWER(cohort.cohortAddress) =:cohortAddress", {
         cohortAddress: cohortId,
      })
      .andWhere("cohort.chainId =:chainId", {
         chainId,
      })
      .getOne();
   return cohort;
};

type OrderDirection = "ASC" | "DESC";

export const getAllCohorts = async (
   chainId: number,
   maximumLimit: number,
   orderDirection: OrderDirection
): Promise<Cohort[]> => {
   var limit: number;
   if (maximumLimit > 10) {
      limit = MAXIMUM_LIMIT_FETCHED;
   } else {
      limit = maximumLimit;
   }
   const cohorts = await getRepository(Cohort, "unifarm")
      .createQueryBuilder("cohort")
      .select()
      .where("cohort.chainId =:chainId", {
         chainId,
      })
      .limit(limit)
      .orderBy("cohort.poolStartTime", orderDirection)
      .getMany();
   return cohorts;
};

export const getPoolInformation = async (
   chainId: number,
   tokenAddress: string
) => {
   const poolInformation = await getRepository(Token, "unifarm")
      .createQueryBuilder("token")
      .innerJoinAndMapOne(
         "token.cohortId",
         Cohort,
         "cohort",
         "cohort.cohortAddress = token.cohortId"
      )
      .where("token.chainId =:chainId", {
         chainId,
      })
      .andWhere("LOWER(token.tokenId) =:tokenId", {
         tokenId: tokenAddress,
      })
      .getMany();

   const pools = getPoolsResult(poolInformation);
   return pools;
};

export const getTokens = async (chainId: number, tokenAddress: string) => {
   const tokens = await getRepository(Token, "unifarm")
      .createQueryBuilder("token")
      .where("token.chainId =:chainId", { chainId })
      .andWhere("token.tokenId =:tokenId", { tokenId: tokenAddress })
      .getMany();
   return tokens;
};

export const getAllStakes = async (chainId: number, cohortId: string) => {
   /*    var offset = DEFAULT_OFFSET;

   if (globalContext?.offset !== undefined) {
      offset = globalContext.offset;
   }

   var limit = MAX_LIMIT;

   if (globalContext?.limit !== undefined) {
      limit = globalContext.limit > MAX_LIMIT ? MAX_LIMIT : globalContext.limit;
   } */

   const stakes = await getRepository(Stake, "unifarm")
      .createQueryBuilder("stake")
      .where("stake.chainId =:chainId", { chainId })
      .andWhere("stake.cohortId =:cohortId", {
         cohortId,
      })
      .getMany();
   console.log(stakes);
   return stakes;
};

export const getAllUnstakes = async (chainId: number, cohortId: string) => {
   const unstakes = await getRepository(Unstake, "unifarm")
      .createQueryBuilder("unstake")
      .where("unstake.chainId =:chainId", { chainId })
      .andWhere("LOWER(unstake.cohortId) =:cohortId", {
         cohortId,
      })
      .getMany();
   return unstakes;
};

export const getPoolsResult = (poolInformation: Token[]) => {
   var pools = [];
   for (var k = 0; k < poolInformation.length; k++) {
      const cohort = poolInformation[k].cohortId;
      delete poolInformation[k].cohortId;
      pools.push({
         token: { ...poolInformation[k] },
         cohort,
      });
   }
   return pools;
};
