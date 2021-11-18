import redis from "redis";

import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV}` });

export const client = redis.createClient({
   host: process.env.REDIS_HOSTNAME,
   password: process.env.REDIS_PASSWORD,
   port: 6379,
});

export const setter = redis.createClient({
   host: process.env.REDIS_HOSTNAME,
   password: process.env.REDIS_PASSWORD,
   port: 6379,
});
