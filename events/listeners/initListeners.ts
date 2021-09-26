import { logger } from "../../log";
import Web3 from "web3";
import {
   bscRPCUrl,
   bscTestNetRpcUrl,
   rinkebyRPCUrl,
   wsBscRPCUrl,
   wsEthRPCUrl,
} from "../../providers/rpc";
import { activateListener } from "../events-helpers/pubsub";

interface InitListenersOptions {
   chainId: number;
}

async function start(eventOpts: InitListenersOptions) {
   if (eventOpts.chainId === undefined) {
      throw new Error(
         `Invaild ChainId please pass the chain id to subscibe corressponding event logs`
      );
   }

   const web3 = new Web3(bscTestNetRpcUrl);

   activateListener(web3, [
      "0x2ab62e1dc5c7df8bb01bf3cf73fa0a83384065ba",
      "0x03d6D1992c8a4C90364fc60cecD67B0B5De8D9d3",
   ]);
}

start({
   chainId: Number(process.env.CHAIN_ID),
});
