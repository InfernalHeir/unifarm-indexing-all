import { LogDescription } from "@ethersproject/abi";
import { EntityTarget, getConnection, getRepository } from "typeorm";
import { Claim } from "../../db/entity/Claim";
import { RefferralClaim } from "../../db/entity/RefferalClaim";
import { Stake } from "../../db/entity/Stake";
import { Unstake } from "../../db/entity/Unstake";
import {
   insertClaimEvent,
   insertRefferalEvent,
   insertStakeEvent,
   insertUnstakeEvent,
} from "../../db/hooks/insertation";
import { logger } from "../../log";
import { ClaimEvent, RefferalClaimEvent, StakeEvent, UnStakeEvent } from "../../types/events";
import { CohortsEvents } from "../events";

const CHAIN_ID = Number(process.env.CHAIN_ID);

interface ImportEventOptions {
   transactionHash: string;
   blockNumber: number;
   address: string;
   eventlogs: LogDescription;
}

export async function importEvents(importOptions: ImportEventOptions) {
   try {
      const { transactionHash, blockNumber, address, eventlogs } = importOptions;
      if (!transactionHash || !blockNumber || !address || !eventlogs) {
         throw new Error(
            `failed to import ${eventlogs.name} event. it will restart service and omitted this block.`
         );
      }
      if (eventlogs.name === CohortsEvents.STAKE) {
         const stakeEventData: StakeEvent = {
            userAddress: eventlogs.args[0],
            tokenId: eventlogs.args[3],
            cohortId: address,
            stakeId: String(eventlogs.args[1]),
            referrerAddress: String(eventlogs.args[2]),
            stakedAmount: String(eventlogs.args[4]),
            time: String(eventlogs.args[5]),
            hash: transactionHash,
            block: String(blockNumber),
            chainId: CHAIN_ID,
         };
         await insertStakeEvent(stakeEventData);
      } else if (eventlogs.name === CohortsEvents.UNSTAKE) {
         const unstakeEventData: UnStakeEvent = {
            userAddress: eventlogs.args[0],
            cohortId: address,
            unStakedTokenAddress: eventlogs.args[1],
            unStakedAmount: String(eventlogs.args[2]),
            stakeId: String(eventlogs.args[4]),
            time: String(eventlogs.args[3]),
            hash: transactionHash,
            block: String(blockNumber),
            chainId: CHAIN_ID,
         };
         await insertUnstakeEvent(unstakeEventData);
      } else if (eventlogs.name === CohortsEvents.CLAIM) {
         const claimEventData: ClaimEvent = {
            userAddress: eventlogs.args[0],
            cohortId: address,
            stakedTokenAddress: eventlogs.args[1],
            rewardTokenAddress: eventlogs.args[2],
            claimedRewards: String(eventlogs.args[3]),
            time: String(eventlogs.args[4]),
            hash: transactionHash,
            block: String(blockNumber),
            chainId: CHAIN_ID,
         };
         await insertClaimEvent(claimEventData);
      } else if (eventlogs.name === CohortsEvents.REFERRALEARN) {
         const refferralEventData: RefferalClaimEvent = {
            userAddress: eventlogs.args[0],
            cohortId: address,
            refreeAddress: eventlogs.args[1],
            rewardTokenAddress: eventlogs.args[2],
            rewardAmount: String(eventlogs.args[3]),
            time: String(eventlogs.args[4]),
            hash: transactionHash,
            block: String(blockNumber),
            chainId: CHAIN_ID,
         };

         await insertRefferalEvent(refferralEventData);
      } else {
         logger.info(`it seems other events occurred as well.`);
         return;
      }
   } catch (err) {
      logger.error(`Something wrong went insertation failed ${err.message}`);
      return;
   }
}

async function deleteAll(target: EntityTarget<unknown>, chainId: number, hash: string) {
   try {
      await getConnection("unifarm")
         .createQueryBuilder()
         .delete()
         .from(target)
         .where("chainId =:chainId", {
            chainId,
         })
         .andWhere("LOWER(hash) =:hash", {
            hash: hash.toLowerCase(),
         });

      logger.info(
         `Deleled the event from the blockchain ${chainId} CHAINID. transactionHash is ${hash}`
      );
   } catch (err) {
      logger.error(`Event Not deleted ${err.message}. chainId is ${chainId}`);
   }
}

export async function removedEvents(chainId: number, hash: string, event: LogDescription) {
   if (!chainId || !hash) return null;

   if (event.name === CohortsEvents.STAKE) {
      await deleteAll(Stake, chainId, hash);
   } else if (event.name === CohortsEvents.UNSTAKE) {
      await deleteAll(Unstake, chainId, hash);
   } else if (event.name === CohortsEvents.CLAIM) {
      await deleteAll(Claim, chainId, hash);
   } else if (event.name === CohortsEvents.REFERRALEARN) {
      await deleteAll(RefferralClaim, chainId, hash);
   } else {
      return null;
   }
}
