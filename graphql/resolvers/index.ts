import { logger } from "../../log";
import {
   getAllCohorts,
   getCohort,
   getPoolInformation,
   getTokens,
} from "../graph-helpers";

export const resolvers = {
   Query: {
      cohort: async (_parent, args, _context, _info) => {
         try {
            const { chainId, cohortAddress } = args.where;
            return await getCohort(cohortAddress, chainId);
         } catch (err) {
            logger.error(`Cohort:: Single Cohort Fetched Failed`);
            throw new Error(`Cohort:: ${err.message}`);
         }
      },
      allCohorts: async (_parent, args, _context, _info) => {
         try {
            return await getAllCohorts(
               args.chainId,
               args.first,
               args.orderDirection
            );
         } catch (err) {
            logger.error(`AllCohorts:: Cohorts Fetched Failed`);
            throw new Error(`AllCohorts:: ${err.message}`);
         }
      },
      getPools: async (_parent, args, _context, _info) => {
         try {
            const { chainId, tokenAddress } = args.where;
            return await getPoolInformation(chainId, tokenAddress);
         } catch (err) {
            logger.error(`Pools:: Pools Fetched Failed`);
            throw new Error(`Pools:: ${err.message}`);
         }
      },
      getTokens: async (_parent, args, _context, _info) => {
         try {
            const { chainId, tokenAddress } = args.where;
            return await getTokens(chainId, tokenAddress);
         } catch (err) {
            logger.error(`Tokens:: Tokens Fetched Failed`);
            throw new Error(`Tokens:: ${err.message}`);
         }
      },
   },
};
