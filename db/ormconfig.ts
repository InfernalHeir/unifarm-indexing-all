import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import { Claim } from "./entity/Claim";
import { Cohort } from "./entity/Cohort";
import { RefferralClaim } from "./entity/RefferalClaim";
import { Stake } from "./entity/Stake";
import { Token } from "./entity/Token";
import { Unstake } from "./entity/Unstake";
import fs from "fs";

// config
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// client options
type ClientOptions = ConnectionOptions;

const clientOps: ClientOptions = {
   type: "postgres",
   host: String(process.env.DB_HOSTNAME),
   port: Number(process.env.PORT),
   username: String(process.env.DB_USERNAME),
   password: String(process.env.DB_PASSWORD),
   database: String(process.env.DB_NAME),
   synchronize: false,
   logging: false,
   entities: [Cohort, Token, Stake, Unstake, Claim, RefferralClaim],
   migrations: [`${process.env.PWD}/db/migrations/*.ts`],
   cli: {
      entitiesDir: `./db/entities`,
      migrationsDir: `./db/migrations`,
   },
   logNotifications: true,
   /* ssl: {
      ca:
         process.env.NODE_ENV === "dev"
            ? fs.readFileSync(`${__dirname}/ca-certificate.crt`).toString()
            : fs.readFileSync(`${process.env.PWD}/ca-certificate.crt`).toString(),
   }, */
   name: "unifarm",
};

export default clientOps;
