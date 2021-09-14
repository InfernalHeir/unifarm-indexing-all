import "reflect-metadata";
import { logger } from "../log/index";
import { Connection, getConnectionManager } from "typeorm";
import { clientOps } from "./connectionConfig";

export async function bootstarp(): Promise<
  Connection | undefined
> {
  try {
    const client = await getConnectionManager().create(clientOps);
    await client.connect();
    logger.info(`connection established to ${client.name}`);
    return client;
  } catch (err) {
    logger.error(err.message);
    return;
  }
}
