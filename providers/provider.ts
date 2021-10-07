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
import Web3 from "web3";

import { V1PROXY } from "../constants";

// proxies ABI
import V1PROXYABI from "../constants/ethereum/Proxy/V1/V1PROXY.json";
import ETHPROXYABI from "../constants/ethereum/Proxy/Cohort.json";
import BSCPROXYABI from "../constants/bsc/Proxy/Cohort.json";
import POLYGONPROXYABI from "../constants/polygon/Proxy/Cohort.json";

export const ethProvider = new JsonRpcProvider(ethereumRPCUrl);

export const bscProvider = new JsonRpcProvider(bscRPCUrl);

export const polygonProvider = new JsonRpcProvider(polygonRPCUrl);

export const wsEthProvider = new Web3(wsEthRPCUrl);

export const wsBscProvider = new Web3(wsBscRPCUrl);

export const wsPolygonProvider = new Web3(wsPolygonRPCUrl);

export const ethereumCohorts = (cohortAddress: string) => {
   return ethSwitch(cohortAddress, ethProvider);
};

export const bscCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, BscCohortABI, bscProvider);
};

export const polygonCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, PolygonCohortABI, polygonProvider);
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
      case 4:
         return ethereumCohorts;
      case 97:
         return bscCohorts;
      case 80001:
         return polygonCohorts;
      default:
         return null;
   }
};

export const getProxiesCohorts = (chainId: number) => {
   switch (chainId) {
      case 4:
         return ethCohortsProxy;
      case 97:
         return bscCohortsProxy;
      case 80001:
         return polygonCohortsProxy;
      default:
         return null;
   }
};

export const getProviders = (chainId: number) => {
   switch (chainId) {
      case 4:
         return ethProvider;
      case 97:
         return bscProvider;
      case 80001:
         return polygonProvider;
      default:
         return null;
   }
};

export const getWsProviders = (chainId: number) => {
   switch (chainId) {
      case 4:
         return wsEthProvider;
      case 97:
         return wsBscProvider;
      case 80001:
         return wsPolygonProvider;
      default:
         return null;
   }
};
