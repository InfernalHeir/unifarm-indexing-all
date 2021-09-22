import { JsonRpcProvider, WebSocketProvider } from "@ethersproject/providers";
import { Contract } from "ethers";
import { V1, V2, V3, V4 } from "../constants";
import UNIFARMV1 from "../constants/ethereum/UNIFARMV1.json";
import UNIFARMV2 from "../constants/ethereum/UNIFARMV2.json";
import UNIFARMV3ABI from "../constants/ethereum/UNIFARMV3.json";
import UNIFARMV4ABI from "../constants/ethereum/UNIFARMV4.json";
import EthereumCohortABI from "../constants/ethereum/ABI.json";

export const ethSwitch = (
   address: string,
   provider: JsonRpcProvider | WebSocketProvider
) => {
   if (address.toLowerCase() === V1.toLowerCase()) {
      return new Contract(address, UNIFARMV1, provider);
   } else if (address.toLowerCase() === V2.toLowerCase()) {
      return new Contract(address, UNIFARMV2, provider);
   } else if (address.toLowerCase() === V3.toLowerCase()) {
      return new Contract(address, UNIFARMV3ABI, provider);
   } else if (address.toLowerCase() === V4.toLowerCase()) {
      return new Contract(address, UNIFARMV4ABI, provider);
   }
   return new Contract(address, EthereumCohortABI, provider);
};
