import { client } from "../../cron/cronHelpers";
import { updateProxyAddress } from "../../db/hooks/update";
import { allCohortInsertation } from "../cohort";
import { allTokens } from "../tokens";
import _ from "lodash";
import { appBoot } from "../../db/createConnection";
import { BSC_CHAIN } from "../../constants";
import { logger } from "../../log";

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
   const isMessageSend = client.publish(
      "FUTURE_COHORT_SYNC",
      JSON.stringify({
         chainId,
         cohorts,
      })
   );
   if (isMessageSend) {
      logger.info(`Message has been send to the related worker please wait for activation`);
   }
};

export const updateProxy = async (chainId: number, cohortId: string, proxies: string[]) => {
   await updateProxyAddress(chainId, cohortId, proxies);
};

appBoot().then(() => {
   setTimeout(() => {
      /* syncFutureCohorts(
         BSC_CHAIN,
         [{ address: "0x3636288B7D9875eE32DEF575F98Dd5b1fdCAf92f", version: "V25" }],
         [[]]
      ); */
      /* syncFutureTokens(BSC_CHAIN, [
         { address: "0x3636288B7D9875eE32DEF575F98Dd5b1fdCAf92f", version: "V25" },
      ]); */
      publishFutureCohorts(BSC_CHAIN, ["0x3636288B7D9875eE32DEF575F98Dd5b1fdCAf92f"]);
   }, 4400);
});
