//import { appBoot } from "../../db/createConnection";
import { ETH_CHAIN } from "../../constants";
import { ClaimEvent } from "../../types/events";
import { readAllCohortsEvents } from "../ethereum.events";
import fs from "fs";
import { logger } from "../../log";
import { CohortsEvents } from "../events";

//appBoot();

async function allClaimEvents() {
   const events = await readAllCohortsEvents({
      chainId: ETH_CHAIN,
      eventName: CohortsEvents.CLAIM,
      eventParams: [null, null, null, null, null],
   });

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

   fs.writeFileSync(
      "./.tmp/events/ethereum-claim.json",
      JSON.stringify(claimEvents)
   );

   logger.info(`total claims in ethereum cohorts ${claimEvents.length}`);
}

allClaimEvents();
