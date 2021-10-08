import { appBoot } from "../../db/createConnection";
import { ETH_CHAIN } from "../../constants";
import { ClaimEvent } from "../../types/events";
import { readAllCohortsEvents, readAllProxiesState } from "../ethereum.events";
import fs from "fs";
import { logger } from "../../log";
import { CohortsEvents } from "../events";
import { insertClaimEvent } from "../../db/hooks/insertation";
import { ethProvider } from "../../providers/provider";
import { AllEventsSync } from "../../types/type";
import _ from "lodash";

//appBoot();

export async function allClaimEvents(fetchOptions: AllEventsSync) {
   const latestBlockNumber = await ethProvider.getBlockNumber();

   var events;
   if (fetchOptions.isProxy) {
      events = await readAllProxiesState({
         chainId: ETH_CHAIN,
         eventName: CohortsEvents.CLAIM,
         eventParams: [null, null, null, null, null],
         //cohorts: ["0xD6Ce88C332a8168724b69A3A03e23DDf6Ac40408"],
      });
   } else {
      events = await readAllCohortsEvents({
         chainId: ETH_CHAIN,
         eventName: CohortsEvents.CLAIM,
         eventParams: [null, null, null, null, null],
      });
   }

   if (!events) return null;

   const claimEvents: ClaimEvent[] = events.map((items) => {
      if (items.args !== undefined) {
         return {
            userAddress: items.args[0],
            cohortId: items.address,
            stakedTokenAddress: items.args[1],
            rewardTokenAddress: String(items.args[2]),
            claimedRewards: String(items.args[3]),
            time: String(items.args[4]),
            hash: items.transactionHash,
            block: String(items.blockNumber),
            chainId: ETH_CHAIN,
         };
      }
   });

   /* if (fetchOptions.isProxy) {
      fs.writeFileSync("./.tmp/events/proxy/ethereum-claim.json", JSON.stringify(claimEvents));
   } else {
      fs.writeFileSync("./.tmp/events/ethereum-claim.json", JSON.stringify(claimEvents));
   } */

   if (fetchOptions.isProxy) {
      const chunks = _.chunk(claimEvents, 4000);
      for (var c = 0; c < chunks.length; c++) {
         const values = chunks[c];
         insertClaimEvent(values);
      }
      logger.info(
         `total claims in ethereum cohorts ${claimEvents.length}. last block fetch for Claim Entity ${latestBlockNumber}`
      );
      return;
   }

   await insertClaimEvent(claimEvents);

   //console.log(claimEvents);

   logger.info(
      `total claims in ethereum cohorts ${claimEvents.length}. last block fetch for Claim Entity ${latestBlockNumber}`
   );
}

/* appBoot().then(() => {
   setTimeout(() => {
      allClaimEvents({
         // if PROXY Fetching events please enable it
         isProxy: process.env.PROXY === "yes" ? true : false,
      });
   }, 5000);
}); */
