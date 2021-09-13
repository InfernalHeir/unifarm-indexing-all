import { logger } from "ethers";
import { createConnection,Connection } from "typeorm";
import { clientOps } from "./connectionConfig";

export async function bootstarp() : Promise<Connection | undefined> {
  try {
    const client = await createConnection(clientOps);
    await client.connect();
    logger.info(`connection established to ${client.name}`);
    return client;
  } catch (err) {
    logger.makeError(err.message);
    return;
  }
}
