import { client } from "../../cron/cronHelpers";
import { updateProxyAddress } from "../../db/hooks/update";
import { allCohortInsertation } from "../cohort";
import { allTokens } from "../tokens";
import _ from "lodash";
import { appBoot } from "../../db/createConnection";
import { BSC_CHAIN, ETH_CHAIN, POLYGON_CHAIN } from "../../constants";
import { logger } from "../../log";
import redis from "redis";

export const subscriber = redis.createClient({
   host: process.env.REDIS_HOSTNAME,
   password: process.env.REDIS_PASSWORD,
   port: 6379,
});

interface CohortType {
   address: string;
   version: string;
}

export const syncFutureCohorts = async (
   chainId: number,
   cohorts: CohortType[],
   proxies?: string[][]
) => {
   await allCohortInsertation({
      chainId,
      cohorts,
      proxies,
   });
};

export const syncFutureTokens = async (chainId: number, cohorts: CohortType[]) => {
   await allTokens({
      chainId,
      cohorts,
   });
};

export const publishFutureCohorts = (chainId: number, cohorts: string[]) => {
   if (!chainId || _.isEmpty(cohorts)) return null;
   subscriber.subscribe(`FUTURE_MESSAGE_${chainId}`);

   const isMessageSend = client.publish(
      `FUTURE_COHORT_SYNC_${chainId}`,
      JSON.stringify({
         chainId,
         cohorts,
      })
   );

   if (isMessageSend) {
      logger.info(`Message has been send to the related worker please wait for activation`);
   }

   subscriber.on("message", (channel, message) => {
      console.log(`RECEIVED: ${message}`);
   });
};

export const updateProxy = async (chainId: number, cohortId: string, proxies: string[]) => {
   await updateProxyAddress(chainId, cohortId, proxies);
};

appBoot().then(() => {
   setTimeout(() => {
      /* syncFutureCohorts(
         ETH_CHAIN,
         [{ address: "0xE02460E3B84B1F51B70474FD08D09FcE35e77047", version: "V28" }],
         [[]]
      ); */
      /* syncFutureTokens(ETH_CHAIN, [
         { address: "0xE02460E3B84B1F51B70474FD08D09FcE35e77047", version: "V28" },
      ]); */
      publishFutureCohorts(BSC_CHAIN, ["0x596B8cADCB830B09dbE0136A66DE1CCE5eb5117e"]);
   }, 4400);
});
