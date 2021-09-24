import { appBoot } from "../../db/createConnection";
import { ETH_CHAIN, V1, V2, V3 } from "../../constants";
import { StakeEvent } from "../../types/events";
import { readAllCohortsEvents } from "../ethereum.events";
import fs from "fs";
import { logger } from "../../log";
import _ from "lodash";
import { CohortsEvents } from "../events";
import { insertStakeEvent } from "../../db/hooks/insertation";
import { ethProvider } from "../../providers/provider";

async function insertAllStakeEvents() {
   const latestBlockNumber = await ethProvider.getBlockNumber();

   const events = await readAllCohortsEvents({
      chainId: ETH_CHAIN,
      eventName: CohortsEvents.STAKE,
      eventParams: [null, null, null, null, null, null],
   });

   if (_.isEmpty(events) || !events) return null;

   const stakeEvents: StakeEvent[] | any[] = events.map((items) => {
      if (!items.args) return null;
      if (
         items.address.toLowerCase() === V1.toLowerCase() ||
         items.address.toLowerCase() === V2.toLowerCase() ||
         items.address.toLowerCase() === V3.toLowerCase()
      ) {
         return {
            userAddress: items.args[0],
            tokenId: items.args[1],
            cohortId: items.address,
            stakeId: null,
            referrerAddress: null,
            stakedAmount: String(items.args[2]),
            time: String(items.args[3]),
            hash: items.transactionHash,
            block: String(items.blockNumber),
            chainId: ETH_CHAIN,
         };
      }
      return {
         userAddress: items.args[0],
         tokenId: items.args[3],
         cohortId: items.address,
         stakeId: String(items.args[1]),
         referrerAddress: items.args[2],
         stakedAmount: String(items.args[4]),
         time: String(items.args[5]),
         hash: items.transactionHash,
         block: String(items.blockNumber),
         chainId: ETH_CHAIN,
      };
   });

   /* fs.writeFileSync(
      "./.tmp/events/ethereum-stakes.json",
      JSON.stringify(stakeEvents)
   ); */

   await insertStakeEvent(stakeEvents);

   logger.info(
      `ethereum cohorts staking data inserted successfully. total Stake Entity row is ${stakeEvents.length}. last sync block is ${latestBlockNumber}`
   );
}

appBoot().then(() => {
   setTimeout(async () => {
      await insertAllStakeEvents();
   }, 5000);
});
