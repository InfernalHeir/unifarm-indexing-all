import { BSC_CHAIN, ETH_CHAIN, POLYGON_CHAIN } from "../../constants";
import { start } from "./initListeners";

function runAll() {
   start({ chainId: ETH_CHAIN });
   start({ chainId: BSC_CHAIN });
   start({ chainId: POLYGON_CHAIN });
}

runAll();
