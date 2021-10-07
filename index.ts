import { BSC_CHAIN, ETH_CHAIN, POLYGON_CHAIN } from "./constants";
import { flushAll } from "./cron/flushAll";
import { startAllJobs, stopAllTheJobsAfterTenMinuates } from "./cron/jobs";
import { appBoot } from "./db/createConnection";
import { allClaimEvents } from "./events/db-seed/db-seed-claim-ethereum";
import { allRefferalEvents } from "./events/db-seed/db-seed-refferal-claim-ethereum";
import { insertAllStakeEvents } from "./events/db-seed/db-seed-stake-ethereum";
import { allUnStakeEvents } from "./events/db-seed/db-seed-unstake-ethereum";
import { logger } from "./log";
import { allCohortInsertation } from "./scripts/cohort";
import { createRewardCap } from "./scripts/create-reward-cap";
import { allTokens } from "./scripts/tokens";

function timeOut(callback: () => void, time: number) {
   return setTimeout(callback, time);
}

async function main() {
   // create the reward cap
   createRewardCap();
   // cohort seed for eth
   timeOut(async () => {
      await allCohortInsertation({ chainId: ETH_CHAIN });
   }, 1000);

   // cohort seed for bsc
   timeOut(async () => {
      await allCohortInsertation({ chainId: BSC_CHAIN });
   }, 3000);

   // cohort seed for polygon
   timeOut(async () => {
      await allCohortInsertation({ chainId: POLYGON_CHAIN });
   }, 5000);

   // token seed for ethereum
   timeOut(async () => {
      await allTokens({ chainId: ETH_CHAIN });
   }, 8000);

   // token seed for bsc
   timeOut(async () => {
      await allTokens({ chainId: BSC_CHAIN });
   }, 10000);

   // token seed for polygon
   timeOut(async () => {
      await allTokens({ chainId: POLYGON_CHAIN });
   }, 12000);

   // stake seed for eth
   timeOut(async () => {
      await insertAllStakeEvents();
   }, 15000);

   // unstake event seed for eth
   timeOut(async () => {
      await allUnStakeEvents({
         isProxy: false,
      });
   }, 18000);

   // claim event seed for eth
   timeOut(async () => {
      await allClaimEvents({
         isProxy: false,
      });
   }, 20000);

   // refferral claim event seed for eth
   timeOut(async () => {
      await allRefferalEvents({
         isProxy: false,
      });
   }, 27000);

   // __PROXIES__ \\
   // proxies unstake event seed for eth
   timeOut(async () => {
      await allUnStakeEvents({
         isProxy: true,
      });
   }, 30000);

   // proxies claim event seed for eth
   timeOut(async () => {
      await allClaimEvents({
         isProxy: true,
      });
   }, 33000);

   // proxies refferral claim event seed for eth
   timeOut(async () => {
      await allRefferalEvents({
         isProxy: true,
      });
   }, 40000);

   // __RUN_CRON_INTEGRATION_MORALIS__ \\
   timeOut(async () => {
      // flush
      flushAll();
      await startAllJobs();
   }, 100000);

   timeOut(async () => {
      await stopAllTheJobsAfterTenMinuates();
   }, 100000);
}

appBoot().then(() => {
   logger.info(`All Scripts will be run after 10 seconds`);
   setTimeout(async () => {
      await main();
   }, 10000);
});
