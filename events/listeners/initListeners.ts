import { activateListener } from "../events-helpers/pubsub";
import { listeners } from "./listeners-config/listenster.config";
import { getWsProviders } from "../../providers/provider";

interface InitListenersOptions {
   chainId: number;
}

export async function start(eventOpts: InitListenersOptions) {
   if (eventOpts.chainId === undefined) {
      throw new Error(
         `Invaild ChainId please pass the chain id to subscibe corressponding event logs`
      );
   }
   // create web3 instance
   const web3 = getWsProviders(eventOpts.chainId);
   // grab the cohorts which have to listen
   const cohorts = listeners[eventOpts.chainId];
   // activate the listener
   activateListener(web3, cohorts);
}

start({
   chainId: process.env.CHAIN_ID ? Number(process.env.CHAIN_ID) : undefined,
});
