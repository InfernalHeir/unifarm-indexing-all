//import { appBoot } from "../../db/createConnection";
import { BSC_CHAIN, ETH_CHAIN, V1, V2, V3, V4 } from "../../constants";
import { UnStakeEvent } from "../../types/events";
import { readAllCohortsEvents } from "../ethereum.events";
import fs from "fs";
import { logger } from "../../log";
import { CohortsEvents } from "../events";

//appBoot();

async function allUnStakeEvents() {
   const events = await readAllCohortsEvents({
      chainId: ETH_CHAIN,
      eventName: CohortsEvents.UNSTAKE,
      eventParams: [null, null, null, null, null],
   });

   if (!events) return null;

   const unStakeEvents: UnStakeEvent[] | any[] = events.map((items) => {
      if (items.args === undefined) return null;
      var stakeId: string | null = String(items.args[4]);

      if (
         items.address.toLowerCase() === V1.toLowerCase() ||
         items.address.toLowerCase() === V2.toLowerCase() ||
         items.address.toLowerCase() === V3.toLowerCase() ||
         items.address.toLowerCase() === V4.toLowerCase()
      ) {
         stakeId = null;
      }

      return {
         userAddress: items.args[0],
         cohortId: items.address,
         unStakeTokenAddress: items.args[1],
         unStakedAmount: String(items.args[2]),
         stakeId,
         time: String(items.args[3]),
         hash: items.transactionHash,
         block: String(items.blockNumber),
         chainId: ETH_CHAIN,
      };
   });

   fs.writeFileSync(
      "./.tmp/events/ethereum-unstakes.json",
      JSON.stringify(unStakeEvents)
   );

   logger.info(`total unstakes in ethereum cohorts ${unStakeEvents.length}`);
}

allUnStakeEvents();
