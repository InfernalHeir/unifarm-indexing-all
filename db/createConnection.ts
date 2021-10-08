import "reflect-metadata";
import { logger } from "../log/index";
import { Connection, getConnectionManager } from "typeorm";
import { clientOps } from "./connectionConfig";

export async function bootstarp(): Promise<Connection | undefined> {
   try {
      const client = await getConnectionManager().create(clientOps);
      await client.connect();
      logger.info(`connection established to ${client.name}`);
      return client;
   } catch (err: unknown) {
      logger.error(err);
      return undefined;
   }
}

// please push the NODE_ENV = dev | Prod
export async function appBoot() {
   if (!getConnectionManager().has("unifarm")) {
      bootstarp()
         .then(() => {
            return Promise.resolve();
         })
         .catch((err) => {
            logger.error(
               `something wrong went with the database connection.`,
               "NETWORK_ERROR",
               err.message
            );
            return Promise.reject(`${err.message}`);
         });
   }
}
