import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
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

export const ethProvider = new JsonRpcProvider(ethereumRPCUrl);

export const bscProvider = new JsonRpcProvider(bscRPCUrl);

export const polygonProvider = new JsonRpcProvider(polygonRPCUrl);

/* export const wsEthProvider = new ethers.providers.WebSocketProvider(
   String(wsEthRPCUrl)
);

export const wsBscProvider = new ethers.providers.WebSocketProvider(
   String(wsBscRPCUrl)
);

export const wsPolygonProvider = new ethers.providers.WebSocketProvider(
   String(wsPolygonRPCUrl)
); */

export const ethereumCohorts = (cohortAddress: string) => {
   return ethSwitch(cohortAddress, ethProvider);
};

export const bscCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, BscCohortABI, bscProvider);
};

export const polygonCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, PolygonCohortABI, polygonProvider);
};

/* export const wsEthereumCohorts = (cohortAddress: string) => {
   return ethSwitch(cohortAddress, wsEthProvider);
};

export const wsBscCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, BscCohortABI, wsBscProvider);
};

export const wsPolygonCohorts = (cohortAddress: string) => {
   return new Contract(cohortAddress, PolygonCohortABI, wsPolygonProvider);
}; */

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
