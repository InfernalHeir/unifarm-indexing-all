import { logger } from "../../log";
import Web3 from "web3";
import { Interface, LogDescription } from "@ethersproject/abi";
import ETH_ABI from "../../constants/ethereum/ABI.json";
import { importEvents, removedEvents } from "./importEvents";
import { chainNameById } from "../../constants";

function eventParse(data: string, topics: string[]) {
   const iface = new Interface(ETH_ABI);
   const logs: LogDescription = iface.parseLog({ topics, data });
   return logs;
}

export var syncingStatus = (provider: Web3) => {
   provider.eth
      .subscribe("syncing", function (error, sync) {
         if (!error) console.log(sync);
      })
      .on("data", function (sync) {
         // show some syncing stats
         logger.info(`Sync Information onData - ${sync}`);
      })
      .on("changed", function (isSyncing) {
         if (isSyncing) {
            // stop app operation
         } else {
            // regain app operation
         }
      });
};

export function activateListener(provider: Web3, addresses: string[]) {
   provider.eth
      .subscribe("logs", {
         address: addresses,
      })
      .on("connected", (subscriptionId) => {
         logger.info(
            `ActivateListener:: listners activated successfully subscription id is ${subscriptionId} for chainId ${
               chainNameById[Number(process.env.CHAIN_ID)]
            }`
         );
      })
      .on("data", async (event) => {
         const logs = eventParse(event.data, event.topics);

         importEvents({
            transactionHash: event.transactionHash,
            blockNumber: event.blockNumber,
            address: event.address,
            eventlogs: logs,
         })
            .then(() => {
               logger.info(
                  `Db sync succesfully for ${event.address} for ${
                     chainNameById[Number(process.env.CHAIN_ID)]
                  } chain. event name is ${logs.name} and last fetched block is ${
                     event.blockNumber
                  }.`
               );
            })
            .catch((err) => {
               logger.error(`DB: Sync failed reason ${err.message}`);
               return;
            });
      })
      .on("changed", async (event: any) => {
         logger.info(`Event Has been failed or removed from the blockchain`);
         logger.info(`Event Blob ${event}`);
         if (event.removed) {
            const logs = eventParse(event.data, event.topics);
            await removedEvents(Number(process.env.CHAIN_ID), event.transactionHash, logs);
         }
      })
      .on("error", (err) => {
         logger.error(`ActivateListener:: ${err.message}`);
         throw new Error(`Sync Error: Application Terminated Trying Again.`);
      });
}
