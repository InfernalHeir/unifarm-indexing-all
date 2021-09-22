import { ApolloServer } from "apollo-server-express";
import express from "express";
import { logger } from "../log";
import { resolvers } from "./resolvers";
import fs from "fs";

async function startApolloServer(typeDefs: string, resolvers: any) {
   const app = express();

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

startApolloServer(fs.readFileSync("./schema.graphql").toString(), resolvers);
