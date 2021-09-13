import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { bscRPCUrl, ethereumRPCUrl, polygonRPCUrl } from "./rpc";
import EthereumCohortABI from "../constants/ethereum/ABI.json";
import BscCohortABI from "../constants/bsc/ABI.json";
import PolygonCohortABI from "../constants/polygon/ABI.json";

export const ethProvider = new JsonRpcProvider(ethereumRPCUrl);

export const bscProvider = new JsonRpcProvider(bscRPCUrl);

export const polygonProvider = new JsonRpcProvider(
  polygonRPCUrl
);

export const ethereumCohorts = (cohortAddress: string) => {
  return new Contract(
    cohortAddress,
    EthereumCohortABI,
    ethProvider
  );
};

export const bscCohorts = (cohortAddress: string) => {
  return new Contract(cohortAddress, BscCohortABI, bscProvider);
};

export const polygonCohorts = (cohortAddress: string) => {
  return new Contract(
    cohortAddress,
    PolygonCohortABI,
    polygonProvider
  );
};

export const getCohorts = (chainId: number) => {
  switch (chainId) {
    case 1:
      return ethereumCohorts;
    case 56:
      return bscCohorts;
    case 81:
      return polygonCohorts;
    default:
      return null;
  }
};
