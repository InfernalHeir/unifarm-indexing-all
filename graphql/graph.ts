import { ApolloServer } from "apollo-server-express";
import express from "express";
import { logger } from "../log";
import { resolvers } from "./resolvers";
import fs from "fs";
import { typeDefs } from "./typeDefs";
import { DocumentNode } from "graphql";
import { appBoot } from "../db/createConnection";

async function startApolloServer(typeDefs: DocumentNode, resolvers: any) {
   const app = express();

   // take connection from database
   await appBoot();

   const server = new ApolloServer({
      typeDefs,
      resolvers,
   });

   await server.start();

   server.applyMiddleware({ app, cors: true });

   app.listen(4000, () => {
      logger.info(
         `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
   });
}

startApolloServer(typeDefs, resolvers);
