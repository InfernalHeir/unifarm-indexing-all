import { Contract, EventFilter, Event } from "ethers";
import { V1, V2, V3, V4 } from "../../constants";

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
  var params = eventParams;
  if (
    eventName === "Stake" &&
    chainId === 1 &&
    (instance.address.toLowerCase() === V1.toLowerCase() ||
      instance.address.toLowerCase() === V2.toLowerCase() ||
      instance.address.toLowerCase() === V3.toLowerCase())
  ) {
    // trim the length
    params = eventParams.slice(0, 3);
  }

  if (
    eventName === "UnStake" &&
    chainId === 1 &&
    (instance.address.toLowerCase() === V1.toLowerCase() ||
      instance.address.toLowerCase() === V2.toLowerCase() ||
      instance.address.toLowerCase() === V3.toLowerCase() ||
      instance.address.toLowerCase() === V4.toLowerCase())
  ) {
    // trim the length
    params = eventParams.slice(0, 3);
  }

  const filter: EventFilter = filterEvents(
    instance,
    eventName,
    params
  );
  const results = await instance.queryFilter(
    filter,
    toBlock,
    fromBlock
  );
  return results;
};
