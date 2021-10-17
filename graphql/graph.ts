import { ApolloServer } from "apollo-server-express";
import express from "express";
import { logger } from "../log";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { DocumentNode } from "graphql";
import { appBoot } from "../db/createConnection";
import { config } from "dotenv";
import { ApolloServerPluginCacheControl } from "apollo-server-core";

config({ path: `.env.${process.env.NODE_ENV}` });

async function startApolloServer(typeDefs: DocumentNode, resolvers: any) {
   const app = express();

   // take connection from database
   await appBoot();

   const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
         ApolloServerPluginCacheControl({
            // Cache everything for 1 second by default.
            defaultMaxAge: 1000,
            // Don't send the `cache-control` response header.
            calculateHttpHeaders: false,
         }),
      ],
   });

   await server.start();

   server.applyMiddleware({ app, cors: true });

   app.listen(process.env.GRAPH_PORT, () => {
      logger.info(
         `🚀 Server ready at http://localhost:${process.env.GRAPH_PORT}/${server.graphqlPath}`
      );
   });
}

startApolloServer(typeDefs, resolvers);
