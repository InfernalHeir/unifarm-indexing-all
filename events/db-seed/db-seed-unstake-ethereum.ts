import { appBoot } from "../../db/createConnection";
import { BSC_CHAIN, ETH_CHAIN, V1, V1PROXY, V2, V3, V4 } from "../../constants";
import { UnStakeEvent } from "../../types/events";
import { readAllCohortsEvents, readAllProxiesState } from "../ethereum.events";
import fs from "fs";
import { logger } from "../../log";
import { CohortsEvents } from "../events";
import { insertUnstakeEvent } from "../../db/hooks/insertation";
import { ethProvider } from "../../providers/provider";
import { AllEventsSync } from "../../types/type";

export async function allUnStakeEvents(fetchOptions: AllEventsSync) {
   const latestBlockNumber = await ethProvider.getBlockNumber();

   var events: any;

   if (fetchOptions.isProxy) {
      events = await readAllProxiesState({
         chainId: ETH_CHAIN,
         eventName: CohortsEvents.UNSTAKE,
         eventParams: [null, null, null, null, null],
         //cohorts: ["0xD6Ce88C332a8168724b69A3A03e23DDf6Ac40408"],
      });
   } else {
      events = await readAllCohortsEvents({
         chainId: ETH_CHAIN,
         eventName: CohortsEvents.UNSTAKE,
         eventParams: [null, null, null, null, null],
      });
   }

   if (!events) return null;

   const unStakeEvents: UnStakeEvent[] = events.map((items) => {
      if (items.args === undefined) return null;
      var stakeId: string | null = String(items.args[4]);

      if (
         (items.address.toLowerCase() === V1.toLowerCase() ||
            items.address.toLowerCase() === V2.toLowerCase() ||
            items.address.toLowerCase() === V3.toLowerCase() ||
            items.address.toLowerCase() === V4.toLowerCase()) &&
         !fetchOptions.isProxy
      ) {
         stakeId = null;
      }

      if (String(items.address).toLowerCase() === V1PROXY.toLowerCase()) {
         return {
            userAddress: items.args[0],
            cohortId: items.address,
            unStakedTokenAddress: String(items.args[1]),
            unStakedAmount: String(items.args[3]),
            stakeId: String(items.args[2]),
            time: String(items.args[4]),
            hash: items.transactionHash,
            block: String(items.blockNumber),
            chainId: ETH_CHAIN,
         };
      }
      return {
         userAddress: items.args[0],
         cohortId: items.address,
         unStakedTokenAddress: String(items.args[1]),
         unStakedAmount: String(items.args[2]),
         stakeId,
         time: String(items.args[3]),
         hash: items.transactionHash,
         block: String(items.blockNumber),
         chainId: ETH_CHAIN,
      };
   });

   if (fetchOptions.isProxy) {
      fs.writeFileSync(
         "./.tmp/events/proxy/ethereum-unstakes.json",
         JSON.stringify(unStakeEvents)
      );
   } else {
      fs.writeFileSync(
         "./.tmp/events/ethereum-unstakes.json",
         JSON.stringify(unStakeEvents)
      );
   }

   await insertUnstakeEvent(unStakeEvents);

   logger.info(
      `insertation has been done for Unstake Entity. Unstake entity last block fetch is ${latestBlockNumber}`
   );
}

/* appBoot().then(() => {
   setTimeout(async () => {
      await allUnStakeEvents({
         // if PROXY Fetching events please enable it
         isProxy: process.env.PROXY === "yes" ? true : false,
      });
   }, 5000);
}); */
