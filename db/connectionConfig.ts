import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";

// config
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

var entities = "./db/entity/*.ts";

if (process.env.NODE_ENV === "prod") {
   entities = "./build/db/entity/*.js";
}

// client options
type ClientOptions = ConnectionOptions;

export const clientOps: ClientOptions = {
   type: "postgres",
   host: String(process.env.DB_HOSTNAME),
   port: Number(process.env.PORT),
   username: String(process.env.DB_USERNAME),
   password: String(process.env.DB_PASSWORD),
   database: String(process.env.DB_NAME),
   synchronize: true,
   logging: false,
   entities: [entities],
   logNotifications: true,
   name: "unifarm",
};
