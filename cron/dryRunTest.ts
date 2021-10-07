import { BSC_CHAIN } from "../constants";
import { STAKE_ABI } from "../events/bsc/ABI";
import { STAKE_TOPIC } from "../events/bsc/topics";
import { getPastEventByMoralis } from "../events/events-helpers";

const MoralisAPIDryRun = async () => {
   const pastEvents = await getPastEventByMoralis(
      BSC_CHAIN,
      "0x207c678457617bc8c8ab06f9088efc1dcd45887c",
      STAKE_TOPIC,
      JSON.stringify(STAKE_ABI),
      0
   );
   console.log(pastEvents);
};

MoralisAPIDryRun();
