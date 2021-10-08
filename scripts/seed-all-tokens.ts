import { BSC_CHAIN, ETH_CHAIN, POLYGON_CHAIN } from "../constants";
import { appBoot } from "../db/createConnection";
import { allTokens } from "./tokens";

async function seedAllTokens() {
   // tokens seed for eth
   await allTokens({ chainId: ETH_CHAIN });

   // tokens seed for bsc
   await allTokens({ chainId: BSC_CHAIN });

   // tokens seed for polygon
   await allTokens({ chainId: POLYGON_CHAIN });
}

appBoot().then(() => {
   setTimeout(() => {
      seedAllTokens();
   }, 10000);
});
