import { client } from "./cronHelpers";
import { logger } from "../log";

export function flushAll() {
   client.flushdb(function (err, succeeded) {
      logger.info(succeeded); // will be true if successfull
   });
}

//flushAll();
