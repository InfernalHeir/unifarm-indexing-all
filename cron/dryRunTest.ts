import { BSC_CHAIN } from "../constants";
import { STAKE_ABI } from "../events/bsc/ABI";
import { STAKE_TOPIC } from "../events/bsc/topics";
import { getPastEventByMoralis } from "../events/events-helpers";

const MoralisAPIDryRun = async () => {
   const pastEvents = await getPastEventByMoralis(
      BSC_CHAIN,
      "0x1DaAc9596647c7D4f0046C10B35F53D85F2DC2cA",
      STAKE_TOPIC,
      JSON.stringify(STAKE_ABI),
      0
   );
   console.log(pastEvents);
};

MoralisAPIDryRun();
