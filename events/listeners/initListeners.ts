import { activateListener, syncingStatus } from "../events-helpers/pubsub";
import { listeners } from "./listeners-config/listenster.config";
import { getWsProviders } from "../../providers/provider";
import { appBoot } from "../../db/createConnection";
import { logger } from "../../log";
import { concat, isEmpty, uniq } from "lodash";
import { promisify } from "util";
import { client, setter } from "./listeners-config/clients";
import _ from "lodash";

interface RedisCohortsPubSubListener {
   chainId: number;
   cohorts: string[];
}

interface InitListenersOptions {
   chainId: number;
}

export const getAsync = promisify(setter.get).bind(setter);

export const storeFutureCohorts = async (
   chainId: number,
   newCohorts: string[]
): Promise<boolean> => {
   const update: boolean = await setter.set(`FUTURE_COHORT_${chainId}`, JSON.stringify(newCohorts));
   return update;
};

export const getNewCohorts = async (chainId: number): Promise<string[]> => {
   const newCohorts = await getAsync(`FUTURE_COHORT_${chainId}`);
   const parsed = JSON.parse(newCohorts);
   if (!parsed || isEmpty(parsed)) {
      return [];
   }
   return parsed as string[];
};

export const cohortRedisPubSubActivator = async () => {
   client.subscribe(`FUTURE_COHORT_SYNC_${Number(process.env.CHAIN_ID)}`);

   client.on("message", async (channel, message) => {
      logger.info(`CHANNEL_NAME - ${channel}`);

      const config = JSON.parse(message) as RedisCohortsPubSubListener;

      if (!config) return null;
      const chainId = Number(config.chainId);
      const web3Object = getWsProviders(chainId);

      const oldCohorts = await getNewCohorts(Number(process.env.CHAIN_ID));

      const futureCohorts = config.cohorts.map((address) => {
         return address.toLowerCase();
      });

      var concated: string[];

      if (isEmpty(oldCohorts)) {
         concated = futureCohorts;
      } else {
         concated = concat(futureCohorts, oldCohorts) as string[];
      }

      const uniqueNewListeners = uniq(concated) as string[];

      if (!isEmpty(uniqueNewListeners)) {
         activateListener(web3Object, futureCohorts);
      }

      logger.info("redis finally reached and activated new Cohorts on the system");
      logger.info(`saving the new cohorts into the redis disk`);

      if (!isEmpty(uniqueNewListeners)) {
         const isStored = storeFutureCohorts(config.chainId, uniqueNewListeners);
         if (isStored) {
            logger.info(`New Listeners Persisted into the redis platform`);
            // if all thing store please sublish a message as well
            setter.publish(
               `FUTURE_MESSAGE_${config.chainId}`,
               `This message comes from the docker container its successfully stored on the platform for future iteration. BLOCK_CHAIN CHAINID ${process.env.CHAIN_ID}`
            );
         } else {
            logger.info(`Failed to store`);
            setter.publish(
               `FUTURE_MESSAGE_${config.chainId}`,
               `Something wrong went with BLOCK_CHAIN CHAINID ${process.env.CHAIN_ID}`
            );
         }
      }
   });
};

export async function start(eventOpts: InitListenersOptions) {
   if (eventOpts.chainId === undefined) {
      throw new Error(
         `Invaild ChainId please pass the chain id to subscibe corressponding event logs`
      );
   }

   const previousCohorts = await getNewCohorts(eventOpts.chainId);
   // create web3 instance
   const web3 = getWsProviders(eventOpts.chainId);

   // syncing status
   //syncingStatus(web3);
   // grab the cohorts which have to listen
   const cohorts = listeners[eventOpts.chainId];

   const mergedAll = concat(_.isEmpty(cohorts) ? [] : cohorts, previousCohorts);
   // activate the listener
   activateListener(web3, mergedAll);

   // listener for future cohorts
   cohortRedisPubSubActivator();
}

appBoot().then(() => {
   setTimeout(() => {
      start({
         chainId: process.env.CHAIN_ID ? Number(process.env.CHAIN_ID) : undefined,
      });
   }, 5000);
});
