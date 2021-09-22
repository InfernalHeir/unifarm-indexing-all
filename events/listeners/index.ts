import { logger } from "../../log";
import { wsEthProvider } from "../../providers/provider";
import { EXPECTED_PONG_BACK, KEEP_ALIVE_CHECK_INTERVAL } from "../events";

export const startConnection = () => {
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
      wsEthProvider.on("block", (blockNumber) => {
         logger.info(`latest block ${blockNumber}`);
      });
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
