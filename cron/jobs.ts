import { CronJob } from "cron";
import { BSC_CHAIN } from "../constants";
import { logger } from "../log";
import { cronJobForStake } from "./process";

export const bscEventsSync = new CronJob(
   "*/25 * * * * *",
   async () => {
      try {
         await cronJobForStake(BSC_CHAIN);
         logger.info(`BSC_EVENTS SYNC JOB Completed`);
      } catch (err) {
         logger.error(`BSC_EVENTS sync failed - ${err.message}`);
      }
   },
   null,
   true,
   "Asia/Kolkata"
);
