import { BSC_CHAIN, chainNameById, POLYGON_CHAIN } from "../constants";
import { logger } from "../log";
import _ from "lodash";
import { getOffset, setOffset } from "./cronHelpers";
import { getPastEventByMoralis } from "../events/events-helpers";
import { CohortsEvents } from "../events/events";
import {
   insertClaimEvent,
   insertRefferalEvent,
   insertStakeEvent,
   insertUnstakeEvent,
} from "../db/hooks/insertation";
import {
   ClaimEvent,
   RefferalClaimEvent,
   StakeEvent,
   UnStakeEvent,
} from "../types/events";
import jobs from "./jobs";

export async function processor(
   chainId: number,
   eventName: string,
   cohortId: string,
   EVENT_ABI: string,
   topic: string
) {
   try {
      if (!chainId) return null;

      const currentOffset = await getOffset(cohortId, eventName, chainId);
      // fetch the particular event

      const pastEvents = await getPastEventByMoralis(
         chainId,
         cohortId,
         topic,
         EVENT_ABI,
         currentOffset === null || undefined ? 0 : currentOffset
      );

      const total = pastEvents.total;

      if (currentOffset === total) {
         // stop the cron
         logger.info(
            `Job Successfully completed and now this will be stop forever ${cohortId} for ${chainNameById[chainId]} chain.`
         );

         return;
      }

      const diffrence = _.subtract(total, currentOffset);
      const newOffset =
         diffrence > pastEvents.page_size
            ? _.add(currentOffset, pastEvents.page_size)
            : _.add(currentOffset, diffrence);

      // store the new Offset in data base
      const updated = await setOffset(
         cohortId,
         eventName,
         chainId,
         String(newOffset)
      );

      if (!updated) {
         throw new Error(
            `Job Failed for the ${cohortId} and the eventName is ${eventName}. APP chain name is ${chainNameById[chainId]}`
         );
      }

      logger.info(
         `PROCESSOR:: Sync Happens for ${chainNameById[chainId]} chain. cohortId is ${cohortId} and eventName is ${eventName}`
      );

      // store the values in data base accordingly
      if (eventName === CohortsEvents.STAKE) {
         const stakeEventData: StakeEvent[] = pastEvents.result.map((items) => {
            return {
               userAddress: items.data.userAddress,
               tokenId: items.data.tokenAddress,
               cohortId: items.address,
               stakeId: items.data.stakeId,
               referrerAddress: items.data.referrerAddress,
               stakedAmount: items.data.stakedAmount,
               time: items.data.time,
               hash: items.transaction_hash,
               block: items.block_number,
               chainId: chainId,
            };
         });

         await insertStakeEvent(stakeEventData);
      } else if (eventName === CohortsEvents.UNSTAKE) {
         const unstakeEventData: UnStakeEvent[] = pastEvents.result.map(
            (items) => {
               return {
                  userAddress: items.data.userAddress,
                  cohortId: items.address,
                  unStakedTokenAddress: items.data.unStakedtokenAddress,
                  unStakedAmount: items.data.unStakedAmount,
                  stakeId: items.data.stakeId,
                  time: items.data.time,
                  hash: items.transaction_hash,
                  block: items.block_number,
                  chainId: chainId,
               };
            }
         );

         await insertUnstakeEvent(unstakeEventData);
      } else if (eventName === CohortsEvents.CLAIM) {
         const claimEventData: ClaimEvent[] = pastEvents.result.map((items) => {
            return {
               userAddress: items.data.userAddress,
               cohortId: items.address,
               stakedTokenAddress: items.data.stakedTokenAddress,
               rewardTokenAddress: items.data.tokenAddress,
               claimedRewards: items.data.claimRewards,
               time: items.data.time,
               hash: items.transaction_hash,
               block: items.block_number,
               chainId: chainId,
            };
         });

         await insertClaimEvent(claimEventData);
      } else if (eventName === CohortsEvents.REFERRALEARN) {
         const refferralEventData: RefferalClaimEvent[] = pastEvents.result.map(
            (items) => {
               return {
                  userAddress: items.data.userAddress,
                  cohortId: items.address,
                  refreeAddress: items.data.callerAddress,
                  rewardTokenAddress: items.data.rewardTokenAddress,
                  rewardAmount: items.data.rewardAmount,
                  time: items.data.time,
                  hash: items.transaction_hash,
                  block: items.block_number,
                  chainId: chainId,
               };
            }
         );

         await insertRefferalEvent(refferralEventData);
      } else {
         throw new Error(`No associated Event Name found.`);
      }
   } catch (err) {
      logger.error(
         `there is something wrong went with ${chainNameById[chainId]} chain. it will trying again. reason ${err.message}`
      );
   }
}

// stop All the jobs in 5 seconds
