//import { appBoot } from "../../db/createConnection";
import { V1, V2, V3 } from "../../constants";
import { StakeEvent } from "../../types/events";
import { readAllCohortsEvents } from "../ethereum.events";
import fs from "fs";
import { logger } from "../../log";

//appBoot();

const APP_CHAIN = 1;
const EVENT_NAME = "Stake";

async function insertAllStakeEvents() {
  const events = await readAllCohortsEvents({
    chainId: APP_CHAIN,
    eventName: EVENT_NAME,
    eventParams: [null, null, null, null, null, null],
  });

  var allEvents = [];

  for (var c = 0; c < events.length; c++) {
    allEvents.push(...events[c]);
  }

  const stakeEvents: StakeEvent[] = allEvents.map((items) => {
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
        chainId: APP_CHAIN,
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
      chainId: APP_CHAIN,
    };
  });

  fs.writeFileSync(
    "./.tmp/events/ethereum-stakes.json",
    JSON.stringify(stakeEvents)
  );

  logger.info(
    `total stakes in ethereum cohorts ${stakeEvents.length}`
  );
}

insertAllStakeEvents();
