import redis from "redis";
import { config } from "dotenv";
import { promisify } from "util";
import { chainNameById } from "../constants";
import { chain } from "lodash";

config({ path: ".env.testnet" });

export const client = redis.createClient({
   host: process.env.REDIS_HOSTNAME,
   password: process.env.REDIS_PASSWORD,
   port: 6379,
});

export const getAsync = promisify(client.get).bind(client);

export const setOffset = async (
   cohortId: string,
   eventName: string,
   chainId: number,
   newOffset: string
): Promise<boolean> => {
   const chainName = chainNameById[chainId];

   const update: boolean = await client.set(
      `Offset_${cohortId}_${eventName}_${chainName}`,
      newOffset
   );

   return update;
};

export const getOffset = async (
   cohortId: string,
   eventName: string,
   chainId: number
): Promise<number> => {
   const offset = await getAsync(`Offset_${cohortId}_${eventName}_${chainNameById[chainId]}`);
   return Number(offset);
};
