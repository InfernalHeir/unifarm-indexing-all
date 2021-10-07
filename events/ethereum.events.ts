import { yamlParser } from "../helpers/scripters";
import { getCohorts, getProxiesCohorts } from "../providers/provider";
import { queryEvents } from "./events-helpers";
import { Promise } from "bluebird";
import { logger } from "../log";
import { Event } from "ethers";
import { CohortsEvents } from "./events";
import { chainNameById, ETH_CHAIN } from "../constants";
// GLOBAL

type Mixin = any[];

interface EventsFetcherOptions {
   chainId: number;
   eventName: string;
   eventParams: Mixin;
   cohorts?: string[] | undefined;
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
      if (
         opts.chainId === ETH_CHAIN &&
         opts.eventName === CohortsEvents.REFERRALEARN
      ) {
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

export async function readAllProxiesState(opts: EventsFetcherOptions) {
   try {
      var proxies = [];
      const manifest = yamlParser(opts.chainId);
      const proxiesResult = manifest.proxies;

      for (var r = 0; r < proxiesResult.length; r++) {
         for (var e = 0; e < proxiesResult[r].length; e++) {
            proxies.push(proxiesResult[r][e]);
         }
      }

      if (
         opts.chainId === ETH_CHAIN &&
         opts.eventName === CohortsEvents.REFERRALEARN
      ) {
         proxies = proxies.slice(1, proxies.length);
      }

      const proxyCohort = getProxiesCohorts(opts.chainId);
      if (!proxyCohort) return undefined;

      var eventPromise = [];

      if (opts.cohorts !== undefined) {
         proxies = opts.cohorts;
      }

      for (var e = 0; e < proxies.length; e++) {
         //console.log(proxies[e]);
         const instance = proxyCohort(proxies[e]);
         eventPromise.push(
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

      var events = await Promise.map(eventPromise, (values) => {
         return values;
      });

      var allEvents = [];

      for (var l = 0; l < events.length; l++) {
         for (var j = 0; j < events[l].length; j++) {
            allEvents.push(events[l][j]);
         }
      }

      logger.info(
         `readAllProxiesState: ${opts.eventName} event fetch successfully`
      );

      return allEvents;
   } catch (err) {
      logger.error(
         `readAllProxiesState: Error event sync failed please try again reason ${err.message}`
      );
      throw new Error(
         `failed to fetch the events for the ${
            chainNameById[opts.chainId]
         } chain.`
      );
   }
}
