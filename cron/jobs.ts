import { CronJob } from "cron";
import { BSC_CHAIN } from "../constants";
import { appBoot } from "../db/createConnection";
import { logger } from "../log";
import { jobList } from "./jobList";
import { processor } from "./process";

var jobs = {};

function execution() {
   for (var c = 0; c < jobList.length; c++) {
      const items = jobList[c];
      jobs[`${items.chainId}_${items.eventName}_${items.cohortId}`] = new CronJob(
         "* * * * *",
         async () => {
            await processor(items.chainId, items.eventName, items.cohortId, items.ABI, items.topic);
         },
         null,
         true,
         "Asia/Kolkata"
      );
   }
}

export function startAllJobs() {
   // first execute the object
   execution();

   logger.info(`All Jobs will be booted on 10 seconds.`);

   // take a data base connection
   appBoot().then(() => {
      setTimeout(() => {
         for (var c = 0; c < jobList.length; c++) {
            const items = jobList[c];
            jobs[`${items.chainId}_${items.eventName}_${items.cohortId}`].start();
         }
      }, 10000);
   });
}

export function stopAllTheJobsAfterTenMinuates() {
   setTimeout(() => {
      for (var c = 0; c < jobList.length; c++) {
         const items = jobList[c];
         jobs[`${items.chainId}_${items.eventName}_${items.cohortId}`].stop();
      }
      logger.info(`Jobs Stopped Successfully all data syned from moralis.`);
   }, 710000);
}

//startAllJobs();
//stopAllTheJobsAfterTenMinuates();

export default jobs;
