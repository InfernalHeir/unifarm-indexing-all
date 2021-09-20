import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { bscRPCUrl, ethereumRPCUrl, polygonRPCUrl } from "./rpc";
import EthereumCohortABI from "../constants/ethereum/ABI.json";
import BscCohortABI from "../constants/bsc/ABI.json";
import PolygonCohortABI from "../constants/polygon/ABI.json";

// SEPERATE ABI for TWO VERSIONs
import UNIFARMV1 from "../constants/ethereum/UNIFARMV1.json";
import UNIFARMV2 from "../constants/ethereum/UNIFARMV2.json";
import UNIFARMV3ABI from "../constants/ethereum/UNIFARMV3.json";
import UNIFARMV4ABI from "../constants/ethereum/UNIFARMV4.json";

import { V1, V2, V3, V4 } from "../constants";

export const ethProvider = new JsonRpcProvider(ethereumRPCUrl);

export const bscProvider = new JsonRpcProvider(bscRPCUrl);

export const polygonProvider = new JsonRpcProvider(
  polygonRPCUrl
);

export const ethereumCohorts = (cohortAddress: string) => {
  if (cohortAddress.toLowerCase() === V1.toLowerCase()) {
    return new Contract(cohortAddress, UNIFARMV1, ethProvider);
  } else if (cohortAddress.toLowerCase() === V2.toLowerCase()) {
    return new Contract(cohortAddress, UNIFARMV2, ethProvider);
  } else if (cohortAddress.toLowerCase() === V3.toLowerCase()) {
    return new Contract(
      cohortAddress,
      UNIFARMV3ABI,
      ethProvider
    );
  } else if (cohortAddress.toLowerCase() === V4.toLowerCase()) {
    return new Contract(
      cohortAddress,
      UNIFARMV4ABI,
      ethProvider
    );
  }

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
    case 137:
      return polygonCohorts;
    default:
      return null;
  }
};
