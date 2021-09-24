import { logger } from "../../log";
import {
   getCohorts,
   getWsCohorts,
   wsEthProvider,
} from "../../providers/provider";
import { EXPECTED_PONG_BACK, KEEP_ALIVE_CHECK_INTERVAL } from "../events";
import { config } from "dotenv";
import { ethListenerConfig } from "./listeners-config/eth-listenster.config";
import { chainNameById } from "../../constants";
import { ListenerConfig } from "./listeners-config/typing";

config();

export const startConnection = () => {
   const CHAIN_ID = Number(process.env.CHAIN_ID);

   if (CHAIN_ID === undefined) {
      throw Error(
         `Chain Id is missing where to listen. please provide the chainId in NODE environment variables`
      );
   }

   let pingTimeout: NodeJS.Timeout;
   let keepAliveInterval: NodeJS.Timeout;

   wsEthProvider._websocket.on("open", () => {
      keepAliveInterval = setInterval(() => {
         logger.debug("Checking if the connection is alive, sending a ping");

         wsEthProvider._websocket.ping();
         // Use `WebSocket#terminate()`, which immediately destroys the connection,
         // instead of `WebSocket#close()`, which waits for the close timer.
         // Delay should be equal to the interval at which your server
         // sends out pings plus a conservative assumption of the latency.
         pingTimeout = setTimeout(() => {
            wsEthProvider._websocket.terminate();
         }, EXPECTED_PONG_BACK);
      }, KEEP_ALIVE_CHECK_INTERVAL);

      // TODO: handle contract listeners setup + indexing
      // activate the cohort listeners
      var listernsConfig: ListenerConfig;

      if (CHAIN_ID === 1) {
         listernsConfig = ethListenerConfig;
      }

      var cohorts = listernsConfig.proxies;

      var contract = getWsCohorts(CHAIN_ID);

      for (var d = 0; d < cohorts.length; d++) {
         const cohortAddress = cohorts[d];
         const instance = contract(cohortAddress);
         if (!instance || instance === undefined) {
            throw new Error(
               `Jobs Activation Failed instance is undefined. please try to change the configuration file for the specfic ${chainNameById[CHAIN_ID]} chain`
            );
         }
         instance.on("*", (eventName, event) => {
            console.log(eventName);
         });
      }

      logger.info(`Listers activated for all proxies cohorts`);
   });

   wsEthProvider._websocket.on("close", () => {
      logger.error("The websocket connection was closed");
      clearInterval(keepAliveInterval);
      clearTimeout(pingTimeout);
      startConnection();
   });

   wsEthProvider._websocket.on("pong", () => {
      logger.debug(
         "Received pong, so connection is alive, clearing the timeout"
      );
      clearInterval(pingTimeout);
   });

   wsEthProvider._websocket.on("error", () => {
      logger.error(`WSS:: Connection error we restart the server again`);
      startConnection();
   });
};

startConnection();
