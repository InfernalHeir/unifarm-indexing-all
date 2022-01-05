import { logger } from "../../log";
import {
   getAggregatedPoolInformation,
   getAllClaims,
   getAllCohorts,
   getAllReferralClaim,
   getAllReferralUsers,
   getAllStakes,
   getAllUnstakes,
   getCohortByAddress,
   getCohortContractAddress,
   getSpecficPools,
   getSpecificUserUnstakes,
   getTokens,
} from "../graph-helpers";

export const resolvers = {
   Query: {
      getCohort: async (_parent, args, _context, _info) => {
         try {
            const { chainId, cohortAddress } = args.where;
            return await getCohortByAddress(chainId, cohortAddress);
         } catch (err) {
            logger.error(`GET_COHORT:: fetching failed reason ${err.message}`);
            throw new Error(`GET_COHORT:: fetching failed reason ${err.message}`);
         }
      },
      allCohorts: async (_parent, args, _context, _info) => {
         const { chainId } = args.where;
         const { limit, offset, orderDirection } = args.filter;
         try {
            return await getAllCohorts(chainId, limit, orderDirection, offset);
         } catch (err) {
            logger.error(
               `ALL_COHORTS:: there is some problem to derive all the cohorts reason ${err.message}`
            );
            throw new Error(
               `ALL_COHORTS:: there is some problem to derive all the cohorts reason ${err.message}`
            );
         }
      },
      allCohortsAndProxies: async (_parent, args, _context, _info) => {
         const { chainId } = args.where;
         try {
            return await getCohortContractAddress(chainId);
         } catch (err) {
            logger.error(
               `ALL_COHORTS_AND_PROXIES:: Cohorts and Proxies Addresses Fetching Failed. reason ${err.message}.`
            );
            throw new Error(
               `ALL_COHORTS_AND_PROXIES:: Cohorts and Proxies Addresses Fetching Failed. reason ${err.message}.`
            );
         }
      },
      allPools: async (_parent, args, _context, _info) => {
         try {
            const { chainId } = args.where;

            return await getAggregatedPoolInformation(chainId);
         } catch (err) {
            logger.error(`ALL_POOLS:: pools derivation failed reason ${err.message}`);
            throw new Error(`ALL_POOLS:: pools derivation failed reason ${err.message}`);
         }
      },
      getTokens: async (_parent, args, _context, _info) => {
         try {
            const { chainId, tokenAddress } = args.where;
            return await getTokens(chainId, tokenAddress);
         } catch (err) {
            logger.error(
               `GET_TOKENS:: tokens derivation failed please try again. reason ${err.message}`
            );
            throw new Error(
               `GET_TOKENS:: tokens derivation failed please try again. reason ${err.message}`
            );
         }
      },
      getSpecficPools: async (_parent, args, _context, _info) => {
         try {
            const { chainId, tokens, cohorts } = args.where;
            return await getSpecficPools(chainId, tokens, cohorts);
         } catch (err) {
            logger.error(`GET_SPECFIC_POOLS:: there is some issue reason ${err.message}.`);
            throw new Error(`GET_SPECFIC_POOLS:: there is some issue reason ${err.message}`);
         }
      },
      getAllStakes: async (_parent, args, _context, _info) => {
         try {
            const { chainId } = args.where;
            const { limit, offset, orderDirection } = args.filter;
            return await getAllStakes(chainId, args.where?.cohortId, limit, offset, orderDirection);
         } catch (err) {
            logger.error(`GET_ALL_STAKES:: stakes cannot fetched tackle by ${err.message}.`);
            throw new Error(`GET_ALL_STAKES:: stakes cannot fetched tackle by ${err.message}.`);
         }
      },
      getAllUnstakes: async (_parent, args, _context, _info) => {
         try {
            const { chainId } = args.where;
            return await getAllUnstakes(chainId);
         } catch (err) {
            logger.error(`GET_ALL_UNSTAKES:: fetch failed by ${err.message}.`);
            throw new Error(`GET_ALL_UNSTAKES:: fetch failed by ${err.message}.`);
         }
      },
      getSpecficUnstakes: async (_parent, args, _context, _info) => {
         try {
            const { chainId, userAddresses } = args.where;
            return await getSpecificUserUnstakes(chainId, userAddresses);
         } catch (err) {
            logger.error(`GET_SPECFIC_USER_UNSTAKES:: error thrown ${err.message}.`);
            throw new Error(`GET_SPECFIC_USER_UNSTAKES:: error thrown ${err.message}.`);
         }
      },
      getAllClaimsByUser: async (_parent, args, _context, _info) => {
         try {
            const { chainId, userAddress } = args.where;
            return await getAllClaims(chainId, userAddress);
         } catch (err) {
            logger.error(`GET_ALL_CLAIMS:: fetch failed by ${err.message}.`);
            throw new Error(`GET_ALL_CLAIMS:: fetch failed by ${err.message}.`);
         }
      },
      getAllTheReferedUser: async (_parent, args, _context, _info) => {
         try {
            const { chainId, userAddress } = args.where;
            return await getAllReferralUsers(chainId, userAddress);
         } catch (err) {
            logger.error(`GET_ALL_THE_REFERED_USER:: fetch failed by ${err.message}.`);
            throw new Error(`GET_ALL_THE_REFERED_USER:: fetch failed by ${err.message}.`);
         }
      },
      getReferralClaimByUser: async (_parent, args, _context, _info) => {
         try {
            const { chainId, userAddress } = args.where;
            return await getAllReferralClaim(chainId, userAddress);
         } catch (err) {
            logger.error(`GET_REFERRAL_CLAIM_BY_USER:: fetch failed by ${err.message}.`);
            throw new Error(`GET_REFERRAL_CLAIM_BY_USER:: fetch failed by ${err.message}.`);
         }
      },
   },
};
