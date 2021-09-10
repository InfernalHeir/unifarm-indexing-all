import dotenv from "dotenv";

// config
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  type: "postgres",
  host: process.env.DB_HOSTNAME,
  port: process.env.PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ["db/entity/**/*.ts"],
  migrations: ["db/migration/**/*.ts"],
  subscribers: ["db/subscriber/**/*.ts"],
};
