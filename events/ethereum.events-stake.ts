import { yamlParser } from "../helpers/scripters";
import { getCohorts } from "../providers/provider";
import { queryEvents } from "./events-helpers";
import { Promise } from "bluebird";
import { logger } from "../log";
import { Event } from "ethers";
// GLOBAL
const EVENT_NAME: string = "Stake";

interface EventsFetcherOptions {
  chainId: number;
  cohort?: string;
}

async function main(opts: EventsFetcherOptions) {
  try {
    const yaml = yamlParser(opts.chainId);
    var multiCohortsEvents = [];
    const contract = getCohorts(opts.chainId);
    for (var v = 0; v < yaml.cohorts.length; v++) {
      const instance = contract(yaml.cohorts[v].address);
      multiCohortsEvents.push(
        queryEvents(
          instance,
          EVENT_NAME,
          [null, null, null, null, null, null],
          opts.chainId
        )
      );
    }

    const events = await Promise.map(
      multiCohortsEvents,
      (values) => values
    );

    logger.info(`${EVENT_NAME} fetch successfully`);
    console.log(events);
  } catch (err) {
    logger.error(`${EVENT_NAME} event sync failed...`);
  }
}

// single contract fetch
export async function readSpecficCohortStakeEvent(
  opts: EventsFetcherOptions
): Promise<Event[]> | undefined {
  try {
    const contract = getCohorts(opts.chainId);
    const instance = contract(opts.cohort);
    if (!instance) return null;
    const events = await queryEvents(
      instance,
      EVENT_NAME,
      [null, null, null, null, null, null],
      opts.chainId
    );
    logger.info(`Cohort ${EVENT_NAME} event fetched`);
    return events;
  } catch (err) {
    logger.error(`err found ${err.message}`);
    return undefined;
  }
}

main({
  chainId: 1,
});
