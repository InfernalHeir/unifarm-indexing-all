import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";

// config
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// client options
type ClientOptions = ConnectionOptions;

export const clientOps: ClientOptions = {
  type: "postgres",
  host: String(process.env.DB_HOSTNAME),
  port: Number(process.env.PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
};
