import { BSC_CHAIN, ETH_CHAIN, POLYGON_CHAIN } from "../constants";
import { appBoot } from "../db/createConnection";
import { allCohortInsertation } from "./cohort";
import { createRewardCap } from "./create-reward-cap";

async function seedAllCohorts() {
   // create the reward cap
   createRewardCap();
   // cohort seed for eth

   await allCohortInsertation({ chainId: ETH_CHAIN });

   // cohort seed for bsc
   await allCohortInsertation({ chainId: BSC_CHAIN });

   // cohort seed for polygon
   await allCohortInsertation({ chainId: POLYGON_CHAIN });
}

appBoot().then(() => {
   setTimeout(() => {
      seedAllCohorts();
   }, 10000);
});
