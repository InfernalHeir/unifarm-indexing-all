//import { appBoot } from "../../db/createConnection";
import { V1, V2, V3, V4 } from "../../constants";
import { UnStakeEvent } from "../../types/events";
import { readAllCohortsEvents } from "../ethereum.events";
import fs from "fs";
import { logger } from "../../log";

//appBoot();

const APP_CHAIN = 1;
const EVENT_NAME = "UnStake";

async function allUnStakeEvents() {
  const events = await readAllCohortsEvents({
    chainId: APP_CHAIN,
    eventName: EVENT_NAME,
    eventParams: [null, null, null, null, null],
  });

  var allEvents = [];

  for (var c = 0; c < events.length; c++) {
    allEvents.push(...events[c]);
  }

  const unStakeEvents: UnStakeEvent[] = allEvents.map(
    (items) => {
      var stakeId = String(items.args[4]);

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
        chainId: APP_CHAIN,
      };
    }
  );

  fs.writeFileSync(
    "./.tmp/events/ethereum-unstakes.json",
    JSON.stringify(unStakeEvents)
  );

  logger.info(
    `total unstakes in ethereum cohorts ${unStakeEvents.length}`
  );
}

allUnStakeEvents();
