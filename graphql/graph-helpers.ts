import { getRepository } from "typeorm";
import { Claim } from "../db/entity/Claim";
import { Cohort } from "../db/entity/Cohort";
import { RefferralClaim } from "../db/entity/RefferalClaim";
import { Stake } from "../db/entity/Stake";
import { Token } from "../db/entity/Token";
import { Unstake } from "../db/entity/Unstake";

// COHORT Maximum fetch limit
export const MAXIMUM_LIMIT_FETCHED = 10;

// DEFAULT OFFSET
export const DEFAULT_OFFSET = 0;

// MAX_LIMIT
export const MAX_STAKE_FETCH_LIMIT = 500;

// MAXIMUM POOL_FETCH_LIMIT
export const POOL_FETCH_LIMIT = 30;

// DEFAULT ORDERDIRECTION OF POOL
export const DEFAULT_ORDER_DIRECTION = "DESC";

export const getCohortByAddress = async (chainId: number, cohortId: string): Promise<Cohort> => {
   const cohort = await getRepository(Cohort, "unifarm")
      .createQueryBuilder("cohort")
      .where("LOWER(cohort.cohortAddress) =:cohortAddress", {
         cohortAddress: cohortId.toLowerCase(),
      })
      .andWhere("cohort.chainId =:chainId", {
         chainId,
      })
      .getOne();
   return cohort;
};

export const getCohortByVersion = async (version: string) => {
   const cohort = await getRepository(Cohort, "unifarm")
      .createQueryBuilder("cohort")
      .select()
      .where("cohort.cohortVersion =:cohortVersion", {
         cohortVersion: version,
      })
      .getOne();
   return cohort;
};

type OrderDirection = "ASC" | "DESC";

export const getAllCohorts = async (
   chainId: number,
   maximumLimit: number,
   orderDirection: OrderDirection,
   offset: number
) => {
   var limit: number;
   if (maximumLimit > MAXIMUM_LIMIT_FETCHED) {
      limit = MAXIMUM_LIMIT_FETCHED;
   } else {
      limit = maximumLimit;
   }

   const OFFSET = getOffset(offset);

   const cohorts = await getRepository(Cohort, "unifarm")
      .createQueryBuilder("cohort")
      .select()
      .where("cohort.chainId =:chainId", {
         chainId,
      })
      .offset(OFFSET)
      .limit(limit)
      .orderBy("cohort.poolStartTime", orderDirection ? orderDirection : "DESC")
      .getManyAndCount();
   return {
      cohorts: cohorts[0],
      total_cohorts: cohorts[1],
   };
};

export const getCohortContractAddress = async (chainId: number) => {
   const cohorts = await getRepository(Cohort, "unifarm")
      .createQueryBuilder("cohort")
      .select(["cohort.cohortAddress", "cohort.proxies"])
      .where("cohort.chainId =:chainId", {
         chainId,
      })
      .getMany();
   return cohorts;
};

export const getOffset = (offset: number) => {
   return offset === undefined ? DEFAULT_OFFSET : offset;
};

export const getAggregatedPoolInformation = async (chainId: number) => {
   const poolInformation = await getRepository(Token, "unifarm")
      .createQueryBuilder("token")
      .innerJoinAndMapOne(
         "token.cohortId",
         Cohort,
         "cohort",
         "cohort.cohortAddress = token.cohortId and cohort.chainId = token.chainId"
      )
      .orderBy("cohort.poolStartTime", "DESC")
      .where("token.chainId =:chainId", {
         chainId,
      })
      .getManyAndCount();

   const pools = getPoolsResult(poolInformation);
   return pools;
};

export const getSpecificUserUnstakes = async (chainId: number, userAddresses: string[]) => {
   const unstakes = await getRepository(Unstake, "unifarm")
      .createQueryBuilder("unstake")
      .where("unstake.chainId =:chainId", {
         chainId,
      })
      .andWhere("LOWER(unstake.userAddress) IN (:...userAddresses)", {
         userAddresses,
      })
      .getMany();
   return unstakes;
};

export const getPoolInformation = async (chainId: number, tokenAddress: string) => {
   const poolInformation = await getRepository(Token, "unifarm")
      .createQueryBuilder("token")
      .innerJoinAndMapOne(
         "token.cohortId",
         Cohort,
         "cohort",
         "cohort.cohortAddress = token.cohortId and cohort.chainId = token.chainId"
      )
      .where("token.chainId =:chainId", {
         chainId,
      })
      .andWhere("LOWER(token.tokenId) =:tokenId", {
         tokenId: tokenAddress.toLowerCase(),
      })
      .getManyAndCount();

   const pools = getPoolsResult(poolInformation);
   return pools;
};

export const getTokens = async (chainId: number, tokenAddress: string) => {
   const tokens = await getRepository(Token, "unifarm")
      .createQueryBuilder("token")
      .where("token.chainId =:chainId", { chainId })
      .andWhere("LOWER(token.tokenId) =:tokenId", {
         tokenId: tokenAddress.toLowerCase(),
      })
      .getMany();
   return tokens;
};

export const stringArrayLowerCase = (array: string[]) => {
   return array.map((address) => {
      return address.toLowerCase();
   });
};

export const getSpecficPools = async (chainId: number, tokens: string[], cohorts: string[]) => {
   const _tokens = stringArrayLowerCase(tokens);

   const _cohorts = stringArrayLowerCase(cohorts);

   const poolInformation = await getRepository(Token, "unifarm")
      .createQueryBuilder("token")
      .innerJoinAndMapOne(
         "token.cohortId",
         Cohort,
         "cohort",
         "cohort.cohortAddress = token.cohortId and cohort.chainId = token.chainId"
      )
      .where("token.chainId =:chainId", {
         chainId,
      })
      .andWhere("LOWER(token.tokenId) IN (:...tokens)", {
         tokens: _tokens,
      })
      .andWhere("LOWER(token.cohortId) IN (:...cohorts)", {
         cohorts: _cohorts,
      })
      .getMany();
   return getPoolSingleResult(poolInformation);
};

export const getAllStakes = async (
   chainId: number,
   cohortId: string | undefined,
   limit: number,
   offset: number,
   orderDirection: OrderDirection
) => {
   var _offset = getOffset(offset);

   var take = limit > MAX_STAKE_FETCH_LIMIT ? MAXIMUM_LIMIT_FETCHED : limit;

   if (cohortId !== undefined) {
      const stakes = await getRepository(Stake, "unifarm")
         .createQueryBuilder("stake")
         .offset(_offset)
         .limit(take)
         .orderBy("stake.time", orderDirection ? orderDirection : "DESC")
         .where("stake.chainId =:chainId", { chainId })
         .andWhere("LOWER(stake.cohortId) =:cohortId", {
            cohortId: cohortId.toLowerCase(),
         })
         .getMany();
      return stakes;
   } else {
      const stakes = await getRepository(Stake, "unifarm")
         .createQueryBuilder("stake")
         .offset(_offset)
         .limit(take)
         .orderBy("stake.time", orderDirection ? orderDirection : "DESC")
         .where("stake.chainId =:chainId", { chainId })
         .getMany();
      return stakes;
   }
};

export const getAllUnstakes = async (chainId: number, userAddress: string) => {
   const unstakes = await getRepository(Unstake, "unifarm")
      .createQueryBuilder("unstake")
      .where("unstake.chainId =:chainId", { chainId })
      .andWhere("LOWER(unstake.userAddress) =:userAddress", {
         userAddress: userAddress.toLowerCase(),
      })
      .getMany();
   return unstakes;
};

export const getAllClaims = async (chainId: number, userAddress: string) => {
   const claims = await getRepository(Claim, "unifarm")
      .createQueryBuilder("claim")
      .where("claim.chainId =:chainId", { chainId })
      .andWhere("LOWER(claim.userAddress) =:userAddress", {
         userAddress: userAddress.toLowerCase(),
      })
      .getMany();
   return claims;
};

export const getAllReferralUsers = async (chainId: number, referrerAddress: string) => {
   const stakes = await getRepository(Stake, "unifarm")
      .createQueryBuilder("stake")
      .where("stake.chainId =:chainId", { chainId })
      .andWhere("LOWER(stake.referrerAddress) =:referrerAddress", {
         referrerAddress: referrerAddress.toLowerCase(),
      })
      .getMany();
   return stakes;
};

export const getAllReferralClaim = async (chainId: number, userAddress: string) => {
   const refferal_claim = await getRepository(RefferralClaim, "unifarm")
      .createQueryBuilder("ref")
      .where("ref.chainId =:chainId", { chainId })
      .andWhere("LOWER(ref.userAddress) =:userAddress", {
         userAddress: userAddress.toLowerCase(),
      })
      .getMany();
   return refferal_claim;
};

export const getPoolsResult = (poolInformation: [Token[], number]) => {
   var pools = [];
   var tokens = poolInformation[0];
   var total_pools = poolInformation[1];

   for (var k = 0; k < tokens.length; k++) {
      const cohort = tokens[k].cohortId;
      delete tokens[k].cohortId;
      pools.push({
         token: { ...tokens[k] },
         cohort,
      });
   }

   return {
      pools,
      total_pools,
   };
};

export const getPoolSingleResult = (poolInformation: Token[]) => {
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
