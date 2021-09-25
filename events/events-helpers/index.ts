import { Contract, EventFilter, Event } from "ethers";
import {
   API_KEY,
   chainNameById,
   ETH_CHAIN,
   MORALIS_API,
   V1,
   V2,
   V3,
   V4,
} from "../../constants";
import { CohortsEvents } from "../events";
import fetch from "node-fetch";

interface MoralisResponse {
   total: number;
   page: number;
   page_size: number;
   result: any;
}

export const filterEvents = (
   instance: Contract,
   eventName: string,
   eventParams: any[]
): EventFilter => {
   return instance.filters[eventName](...eventParams);
};

export const queryEvents = async (
   instance: Contract,
   eventName: string,
   eventParams: any[],
   chainId: number,
   toBlock?: number,
   fromBlock?: number
): Promise<Event[]> => {
   try {
      var params = eventParams;
      if (
         eventName === CohortsEvents.STAKE &&
         chainId === ETH_CHAIN &&
         (instance.address.toLowerCase() === V1.toLowerCase() ||
            instance.address.toLowerCase() === V2.toLowerCase() ||
            instance.address.toLowerCase() === V3.toLowerCase())
      ) {
         // trim the length
         params = eventParams.slice(0, 3);
      }

      if (
         eventName === CohortsEvents.UNSTAKE &&
         chainId === ETH_CHAIN &&
         (instance.address.toLowerCase() === V1.toLowerCase() ||
            instance.address.toLowerCase() === V2.toLowerCase() ||
            instance.address.toLowerCase() === V3.toLowerCase() ||
            instance.address.toLowerCase() === V4.toLowerCase())
      ) {
         // trim the length
         params = eventParams.slice(0, 3);
      }

      const filter: EventFilter = filterEvents(instance, eventName, params);
      const results = await instance.queryFilter(filter, fromBlock, toBlock);
      return results;
   } catch (err) {
      throw new Error(
         `query failed for the cohort address ${instance.address} reason ${err.message}`
      );
   }
};

export const getPastEventByMoralis = async (
   chainId: number,
   cohortId: string,
   topic: string,
   ABI: string,
   offset: number
): Promise<MoralisResponse> => {
   if (!chainId) throw Error(`Moralis: App fetch failed please pass chainId`);
   const results = await fetch(
      `${MORALIS_API}/api/v2/${cohortId}/events?chain=${chainNameById[chainId]}&from_block=0&topic=${topic}&offset=${offset}`,
      {
         method: "post",
         body: ABI,
         headers: {
            accept: "application/json",
            "X-API-Key": API_KEY,
            "Content-Type": "application/json",
         },
      }
   );
   const jsonFormat: MoralisResponse | any = await results.json();
   return jsonFormat;
};
