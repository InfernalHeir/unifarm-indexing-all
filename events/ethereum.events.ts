import { yamlParser } from "../helpers/scripters";
import { getCohorts } from "../providers/provider";
import { queryEvents } from "./events-helpers";
import { Promise } from "bluebird";
import { logger } from "../log";
import { Event } from "ethers";
// GLOBAL

type Mixin = any[];

interface EventsFetcherOptions {
  chainId: number;
  eventName: string;
  eventParams: Mixin;
  cohort?: string;
  toBlock?: number;
  fromBlock?: number;
}

export async function readAllCohortsEvents(
  opts: EventsFetcherOptions
) {
  try {
    const yaml = yamlParser(opts.chainId);
    var multiCohortsEvents = [];
    const contract = getCohorts(opts.chainId);
    for (var v = 0; v < yaml.cohorts.length; v++) {
      const instance = contract(yaml.cohorts[v].address);
      multiCohortsEvents.push(
        queryEvents(
          instance,
          opts.eventName,
          opts.eventParams,
          opts.chainId
        )
      );
    }
    const events = await Promise.map(
      multiCohortsEvents,
      (values) => values
    );

    logger.info(`${opts.eventName} event fetch successfully`);
    return events;
  } catch (err) {
    logger.error(`${opts.eventName} event sync failed...`);
    return undefined;
  }
}

// single contract fetch
export async function readSpecficCohortAllEvents(
  opts: EventsFetcherOptions
): Promise<Event[]> | undefined {
  try {
    const contract = getCohorts(opts.chainId);
    const instance = contract(opts.cohort);
    if (!instance) return null;
    const events = await queryEvents(
      instance,
      opts.eventName,
      opts.eventParams,
      opts.chainId
    );
    logger.info(`Cohort ${opts.eventName} event fetched`);
    return events;
  } catch (err) {
    logger.error(`err found ${err.message}`);
    return undefined;
  }
}
