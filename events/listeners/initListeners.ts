import Web3 from "web3";
import { Web3Provider } from "@ethersproject/providers";
import { ethereumRPCUrl } from "../../providers/rpc";
import { ethListenersConfig } from "./listeners-config/eth-listenster.config";
import { logger } from "../../log";

const EthereumEvents = require("ethereum-events");

const options = {
   pollInterval: 13000, // period between polls in milliseconds (default: 13000)
   confirmations: 12, // n° of confirmation blocks (default: 12)
   chunkSize: 10000, // n° of blocks to fetch at a time (default: 10000)
   concurrency: 10, // maximum n° of concurrent web3 requests (default: 10)
   backoff: 1000, // retry backoff in milliseconds (default: 1000)
};

async function startEthListeners() {
   const web3 = new Web3(ethereumRPCUrl);
   const ethereumEvents = new EthereumEvents(web3, ethListenersConfig, options);

   ethereumEvents.start();

   logger.info(`Event listener for ethereum chain has been activated.`);

   ethereumEvents.on("block.confirmed", (blockNumber, events, done) => {
      // Events contained in 'confirmed' blocks are considered final,
      // hence the callback is fired only once for each blockNumber.
      // Blocks are delivered in sequential order and one at a time so that none is skipped
      // and you know for sure that every block up to the latest one received was processed.
      // Call 'done()' after processing the events in order to receive the next block.
      // If an error occurs, calling 'done(err)' will retry to deliver the same block
      // without skipping it.
      console.log(events);
      console.log(blockNumber);
   });

   ethereumEvents.on("block.unconfirmed", (blockNumber, events, done) => {
      // Events contained in 'unconfirmed' blocks are NOT considered final
      // and may be subject to change, hence the callback may be fired multiple times
      // for the same blockNumber if the events contained inside that block change.
      // Blocks are received one at a time but, due to reorgs, the order is not guaranteed.
      // Call 'done()' after processing the events in order to receive the next block.
      // If an error occurs, calling 'done(err)' will retry to deliver the same block
      // without skipping it.
   });

   ethereumEvents.on("error", (err) => {
      // An error occured while fetching new blocks/events.
      // A retry will be attempted after backoff interval.
   });

   console.log(ethereumEvents.isRunning());
}

startEthListeners();
