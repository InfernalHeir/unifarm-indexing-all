import { rewardCaps } from "../constants/rewards";
import fs from "fs";
import { logger } from "../log";

export function createRewardCap() {
   const content = Object.keys(rewardCaps).map((chainId) => {
      const cohorts = rewardCaps[Number(chainId)];
      return Object.keys(cohorts).map((cohort) => {
         return Object.keys(cohorts[cohort]).map((tokenAddress) => {
            return {
               chainId,
               rewardCap: cohorts[cohort][tokenAddress],
               cohort,
               tokenAddress,
            };
         });
      });
   });

   // craete an array
   var cohortRewards = [];
   for (var r = 0; r < content.length; r++) {
      for (var f = 0; f < content[r].length; f++) {
         for (var z = 0; z < content[r][f].length; z++) {
            cohortRewards.push({
               chainId: content[r][f][z].chainId,
               tokenAddress: content[r][f][z].tokenAddress,
               rewardCap: content[r][f][z].rewardCap,
               cohortAddress: content[r][f][z].cohort,
            });
         }
      }
   }

   fs.writeFileSync(
      "./constants/miscellaneous/rewards.json",
      JSON.stringify(cohortRewards)
   );
   logger.info(`RewardCap Json file created`);
}

//main();
