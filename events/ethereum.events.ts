import { yamlParser } from "../helpers/scripters";
import { getCohorts } from "../providers/provider";
import { queryEvents } from "./events-helpers";
import { Promise } from "bluebird";
import { logger } from "../log";
import { Event } from "ethers";
import { CohortsEvents } from "./events";
// GLOBAL

type Mixin = any[];

interface EventsFetcherOptions {
   chainId: number;
   eventName: string;
   eventParams: Mixin;
   cohort?: string | null;
   toBlock?: number;
   fromBlock?: number;
}

export async function readAllCohortsEvents(opts: EventsFetcherOptions) {
   try {
      const yaml = yamlParser(opts.chainId);
      var multiCohortsEvents = [];
      const contract = getCohorts(opts.chainId);
      if (!contract) return null;
      var cohorts = yaml.cohorts;

      // refferal event not exist in V1 thats why
      if (opts.chainId === 1 && opts.eventName === CohortsEvents.REFERRALEARN) {
         cohorts = cohorts.slice(3, cohorts.length);
      }

      for (var v = 0; v < cohorts.length; v++) {
         const instance = contract(cohorts[v].address);
         multiCohortsEvents.push(
            queryEvents(
               instance,
               opts.eventName,
               opts.eventParams,
               opts.chainId,
               opts.toBlock,
               opts.fromBlock
            )
         );
      }
      const events = await Promise.map(multiCohortsEvents, (values) => values);

      var allEvents = [];

      for (var l = 0; l < events.length; l++) {
         for (var j = 0; j < events[l].length; j++) {
            allEvents.push(events[l][j]);
         }
      }

      logger.info(`${opts.eventName} event fetch successfully`);
      return allEvents;
   } catch (err) {
      logger.error(`${opts.eventName} event sync failed... ${err.message}`);
      return undefined;
   }
}

// single contract fetch
export async function readSpecficCohortAllEvents(
   opts: EventsFetcherOptions
): Promise<Event[] | undefined> {
   try {
      const contract = getCohorts(opts.chainId);
      if (!contract) return undefined;
      const instance = contract(String(opts.cohort));
      if (!instance) return undefined;
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
