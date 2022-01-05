import { JsonRpcProvider, WebSocketProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import {
   avaxRPCUrl,
   bscRPCUrl,
   ethereumRPCUrl,
   polygonRPCUrl,
   wsAvaxRPCUrl,
   wsBscRPCUrl,
   wsEthRPCUrl,
   wsPolygonRPCUrl,
} from "./rpc";
import BscCohortABI from "../constants/bsc/ABI.json";
import PolygonCohortABI from "../constants/polygon/ABI.json";
import AvaxCohortABI from "../constants/avax/ABI.json";
import { ethSwitch } from "./switch";
import Web3 from "web3";

import { V1PROXY } from "../constants";

// proxies ABI
import V1PROXYABI from "../constants/ethereum/Proxy/V1/V1PROXY.json";
import ETHPROXYABI from "../constants/ethereum/Proxy/Cohort.json";
import BSCPROXYABI from "../constants/bsc/Proxy/Cohort.json";
import POLYGONPROXYABI from "../constants/polygon/Proxy/Cohort.json";

var options = {
   timeout: 30000, // ms

   // Useful if requests result are large
   clientConfig: {
      maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
      maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
   },

   // Enable auto reconnection
   reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false,
   },
};

export const ethProvider = new JsonRpcProvider(ethereumRPCUrl);

export const bscProvider = new JsonRpcProvider(bscRPCUrl);

export const polygonProvider = new JsonRpcProvider(polygonRPCUrl);

export const avaxProvider = new JsonRpcProvider(avaxRPCUrl);

export const wsEthProvider = new Web3(new Web3.providers.WebsocketProvider(wsEthRPCUrl, options));

export const wsBscProvider = new Web3(new Web3.providers.WebsocketProvider(wsBscRPCUrl, options));

export const wsPolygonProvider = new Web3(
   new Web3.providers.WebsocketProvider(wsPolygonRPCUrl, options)
);

export const wsAvaxProvider = new Web3(new Web3.providers.WebsocketProvider(wsAvaxRPCUrl, options));

export const ethereumCohorts = (cohortAddress: string) => {
   return ethSwitch(cohortAddress, ethProvider);
};

export const bscCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, BscCohortABI, bscProvider);
};

export const polygonCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, PolygonCohortABI, polygonProvider);
};

export const avaxCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, AvaxCohortABI, avaxProvider);
};

// Proxy Instances
export const ethCohortsProxy = (cohortProxyAddress: string) => {
   if (cohortProxyAddress.toLowerCase() === V1PROXY.toLowerCase()) {
      return new Contract(cohortProxyAddress, V1PROXYABI, ethProvider);
   }
   return new Contract(cohortProxyAddress, ETHPROXYABI, ethProvider);
};

export const bscCohortsProxy = (cohortProxyAddress: string) => {
   return new Contract(cohortProxyAddress, BSCPROXYABI, bscProvider);
};

export const polygonCohortsProxy = (cohortAddress: string) => {
   return new Contract(cohortAddress, POLYGONPROXYABI, polygonProvider);
};

export const getCohorts = (chainId: number) => {
   switch (chainId) {
      case 1:
         return ethereumCohorts;
      case 56:
         return bscCohorts;
      case 137:
         return polygonCohorts;
      case 43114:
         return avaxCohorts;
      default:
         return null;
   }
};

export const getProxiesCohorts = (chainId: number) => {
   switch (chainId) {
      case 1:
         return ethCohortsProxy;
      case 56:
         return bscCohortsProxy;
      case 137:
         return polygonCohortsProxy;
      default:
         return null;
   }
};

export const getProviders = (chainId: number) => {
   switch (chainId) {
      case 1:
         return ethProvider;
      case 56:
         return bscProvider;
      case 137:
         return polygonProvider;
      case 43114:
         return avaxProvider;
      default:
         return null;
   }
};

export const getWsProviders = (chainId: number) => {
   switch (chainId) {
      case 1:
         return wsEthProvider;
      case 56:
         return wsBscProvider;
      case 137:
         return wsPolygonProvider;
      case 43114:
         return wsAvaxProvider;
      default:
         return null;
   }
};
