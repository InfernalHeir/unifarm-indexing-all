import { JsonRpcProvider, WebSocketProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import {
   bscRPCUrl,
   ethereumRPCUrl,
   polygonRPCUrl,
   wsBscRPCUrl,
   wsEthRPCUrl,
   wsPolygonRPCUrl,
} from "./rpc";
import BscCohortABI from "../constants/bsc/ABI.json";
import PolygonCohortABI from "../constants/polygon/ABI.json";
import { ethSwitch } from "./switch";

import { V1PROXY } from "../constants";

// proxies ABI
import V1PROXYABI from "../constants/ethereum/Proxy/V1/V1PROXY.json";
import ETHPROXYABI from "../constants/ethereum/Proxy/Cohort.json";
import BSCPROXYABI from "../constants/bsc/Proxy/Cohort.json";
import POLYGONPROXYABI from "../constants/polygon/Proxy/Cohort.json";

export const ethProvider = new JsonRpcProvider(ethereumRPCUrl);

export const bscProvider = new JsonRpcProvider(bscRPCUrl);

export const polygonProvider = new JsonRpcProvider(polygonRPCUrl);

export const wsEthProvider = new WebSocketProvider(wsEthRPCUrl, "mainnet");

export const wsBscProvider = new WebSocketProvider(
   String(wsBscRPCUrl),
   "mainnet"
);

export const wsPolygonProvider = new WebSocketProvider(
   String(wsPolygonRPCUrl),
   "mainnet"
);

export const ethereumCohorts = (cohortAddress: string) => {
   return ethSwitch(cohortAddress, ethProvider);
};

export const bscCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, BscCohortABI, bscProvider);
};

export const polygonCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, PolygonCohortABI, polygonProvider);
};

export const wsEthereumCohorts = (cohortAddress: string) => {
   return ethSwitch(cohortAddress, wsEthProvider);
};

export const wsBscCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, BscCohortABI, wsBscProvider);
};

export const wsPolygonCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, PolygonCohortABI, wsPolygonProvider);
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
      default:
         return null;
   }
};

export const getWsCohorts = (chainId: number) => {
   switch (chainId) {
      case 1:
         return wsEthereumCohorts;
      case 56:
         return wsBscCohorts;
      case 137:
         return wsPolygonCohorts;
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
      default:
         return null;
   }
};
