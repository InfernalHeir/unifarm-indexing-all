import { BSC_CHAIN, chainNameById, POLYGON_CHAIN } from "../constants";
import { logger } from "../log";
import { getProviders } from "../providers/provider";
import blocks from "./blocks/blocks.json";
import _ from "lodash";
import { readAllCohortsEvents } from "../events/ethereum.events";
import { CohortsEvents } from "../events/events";
import fs from "fs";

export async function cronJobForStake(chainId: number) {
   try {
      if (!chainId) return null;

      const fetchedBlock = (blocks as any)[chainId];
      const provider = getProviders(chainId);
      const currentBlock = await provider?.getBlockNumber();

      // destination blocknumber derivation
      const diffBlock = _.subtract(
         currentBlock as number,
         fetchedBlock as number
      );

      const toBlock = diffBlock > 4000 ? 4000 : diffBlock;

      // query the blockchain state
      const events = await readAllCohortsEvents({
         chainId,
         eventName: CohortsEvents.STAKE,
         eventParams: [null, null, null, null, null],
         cohort: null,
         fromBlock: fetchedBlock,
         toBlock,
      });

      // save the new fetch blocked
      const newFetchedBlock = _.add(fetchedBlock, toBlock);

      const indenticalChain = chainId === BSC_CHAIN ? POLYGON_CHAIN : BSC_CHAIN;

      var updatedJson;

      if (chainId === BSC_CHAIN) {
         updatedJson = {
            56: newFetchedBlock,
            137: (blocks as any)[indenticalChain],
         };
      } else {
         updatedJson = {
            56: (blocks as any)[indenticalChain],
            137: newFetchedBlock,
         };
      }

      fs.writeFileSync(
         `${__dirname}/blocks/blocks.json`,
         JSON.stringify(updatedJson)
      );

      logger.info(
         `${CohortsEvents.STAKE} indexed successfully new fetched block is ${newFetchedBlock}`
      );

      console.log(events);
   } catch (err) {
      logger.error(
         `there is something wrong went with ${chainNameById[chainId]} chain. it will trying again. reason ${err.message}`
      );
   }
}
