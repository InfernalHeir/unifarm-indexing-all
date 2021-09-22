import { logger } from "../log";
import { bscEventsSync } from "./jobs";

async function startCronServer() {
   try {
      await bscEventsSync.start();
      logger.info(`Cron Server Started Successfully`);
   } catch (err) {
      logger.error(`Cron Server started failed...`);
   }
}

startCronServer();
