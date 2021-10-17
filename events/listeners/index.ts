import { BSC_CHAIN, ETH_CHAIN, POLYGON_CHAIN } from "../../constants";
import { appBoot } from "../../db/createConnection";
import { start } from "./initListeners";

function runAll() {
   start({ chainId: POLYGON_CHAIN });
   //start({ chainId: BSC_CHAIN });
   //start({ chainId: POLYGON_CHAIN });
}

appBoot().then(() => {
   setTimeout(() => {
      runAll();
   }, 5000);
});
