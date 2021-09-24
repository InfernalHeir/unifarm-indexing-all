import { appBoot } from "../../db/createConnection";
import { ETH_CHAIN } from "../../constants";
import { ClaimEvent, RefferalClaimEvent } from "../../types/events";
import { readAllCohortsEvents } from "../ethereum.events";
import fs from "fs";
import { logger } from "../../log";
import { CohortsEvents } from "../events";
import { insertRefferalEvent } from "../../db/hooks/insertation";
import { ethProvider } from "../../providers/provider";

//appBoot();

async function allRefferalEvents() {
   const latestBlockNumber = await ethProvider.getBlockNumber();

   const events = await readAllCohortsEvents({
      chainId: ETH_CHAIN,
      eventName: CohortsEvents.REFERRALEARN,
      eventParams: [null, null, null, null, null],
   });

   if (!events) return null;

   const refferralClaim: RefferalClaimEvent[] = events.map((items) => {
      if (items.args !== undefined) {
         return {
            userAddress: items.args[0],
            cohortId: items.address,
            refreeAddress: items.args[1],
            rewardTokenAddress: String(items.args[2]),
            rewardAmount: String(items.args[3]),
            time: String(items.args[4]),
            hash: items.transactionHash,
            block: String(items.blockNumber),
            chainId: ETH_CHAIN,
         };
      }
   });

   /* fs.writeFileSync(
      "./.tmp/events/ethereum-refferral-claim.json",
      JSON.stringify(refferralClaim)
   ); */

   await insertRefferalEvent(refferralClaim);

   logger.info(
      `total refferral claim in ethereum cohorts ${refferralClaim.length}. last block fetch Refferal Claim Entity ${latestBlockNumber}`
   );
}

appBoot().then(() => {
   setTimeout(() => {
      allRefferalEvents();
   }, 5000);
});
