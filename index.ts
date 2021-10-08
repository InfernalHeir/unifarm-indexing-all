import { flushAll } from "./cron/flushAll";
import { startAllJobs, stopAllTheJobsAfterTenMinuates } from "./cron/jobs";
import { appBoot } from "./db/createConnection";
import { allClaimEvents } from "./events/db-seed/db-seed-claim-ethereum";
import { allRefferalEvents } from "./events/db-seed/db-seed-refferal-claim-ethereum";
import { insertAllStakeEvents } from "./events/db-seed/db-seed-stake-ethereum";
import { allUnStakeEvents } from "./events/db-seed/db-seed-unstake-ethereum";
import { logger } from "./log";

async function main() {
   // stake seed for eth
   await insertAllStakeEvents();

   // unstake event seed for eth
   await allUnStakeEvents({
      isProxy: false,
   });

   // claim event seed for eth
   await allClaimEvents({
      isProxy: false,
   });

   // refferral claim event seed for eth
   await allRefferalEvents({
      isProxy: false,
   });

   // __PROXIES__ \\
   // proxies unstake event seed for eth
   await allUnStakeEvents({
      isProxy: true,
   });

   // proxies claim event seed for eth
   await allClaimEvents({
      isProxy: true,
   });

   // proxies refferral claim event seed for eth
   await allRefferalEvents({
      isProxy: true,
   });

   // __RUN_CRON_INTEGRATION_MORALIS__ \\

   flushAll();

   startAllJobs();

   stopAllTheJobsAfterTenMinuates();
}

appBoot().then(() => {
   logger.info(`All Scripts will be run after 10 seconds`);
   setTimeout(async () => {
      await main();
   }, 10000);
});
