import { activateListener } from "../events-helpers/pubsub";
import { listeners } from "./listeners-config/listenster.config";
import { getWsProviders } from "../../providers/provider";
import { appBoot } from "../../db/createConnection";
import redis from "redis";
import { config } from "dotenv";
import { logger } from "../../log";

config({ path: `.env.${process.env.NODE_ENV}` });

export const client = redis.createClient({
   host: process.env.REDIS_HOSTNAME,
   password: process.env.REDIS_PASSWORD,
   port: 6379,
});

interface RedisCohortsPubSubListener {
   chainId: number;
   cohorts: string[];
}

interface InitListenersOptions {
   chainId: number;
}

export async function start(eventOpts: InitListenersOptions) {
   if (eventOpts.chainId === undefined) {
      throw new Error(
         `Invaild ChainId please pass the chain id to subscibe corressponding event logs`
      );
   }
   // create web3 instance
   const web3 = getWsProviders(eventOpts.chainId);
   // grab the cohorts which have to listen
   const cohorts = listeners[eventOpts.chainId];
   // activate the listener
   activateListener(web3, cohorts);

   client.subscribe(`FUTURE_COHORT_SYNC_${Number(process.env.CHAIN_ID)}`);

   client.on("message", (channel, message) => {
      const config = JSON.parse(message) as RedisCohortsPubSubListener;
      console.log("config", config);
      if (!config) return null;
      const chainId = Number(config.chainId);
      const web3Object = getWsProviders(chainId);
      const futureCohorts = config.cohorts;
      activateListener(web3Object, futureCohorts);
      logger.info("redis reached finally");
   });
}

appBoot().then(() => {
   setTimeout(() => {
      start({
         chainId: process.env.CHAIN_ID ? Number(process.env.CHAIN_ID) : undefined,
      });
   }, 5000);
});
