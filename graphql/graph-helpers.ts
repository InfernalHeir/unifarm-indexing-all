import { first } from "lodash";
import { getRepository } from "typeorm";
import { Cohort } from "../db/entity/Cohort";
import { Token } from "../db/entity/Token";

export const MAXIMUM_LIMIT_FETCHED = 10;

export const getCohort = async (
   cohortId: string,
   chainId: number
): Promise<Cohort> => {
   const cohort = await getRepository(Cohort, "unifarm")
      .createQueryBuilder("cohort")
      .select()
      .where("cohort.cohortAddress =:cohortAddress", {
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
         "token.cohortId = cohort.cohortAddress"
      )
      .where("token.chainId =:chainId", {
         chainId,
      })
      .andWhere("token.tokenId =:tokenId", {
         tokenId: tokenAddress,
      })
      .getMany();

   return poolInformation;
};

export const getTokens = async (chainId: number, tokenAddress: string) => {
   const tokens = await getRepository(Token, "unifarm")
      .createQueryBuilder("token")
      .where("token.chainId =:chainId", { chainId })
      .andWhere("token.tokenId =:tokenId", { tokenId: tokenAddress })
      .getMany();
   return tokens;
};