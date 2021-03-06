import { logger } from "../log/index";
import { CohortOptions, Cohorts } from "../types/Cohorts";
import { multicall, yamlParser } from "../helpers/scripters";
import { getCohorts } from "../providers/provider";
import { cohortActions } from "../actions/CohortActions";
import { Promise as BluePromise } from "bluebird";
import { actionsProperties } from "../actions";
import { getTag } from "../helpers";
import { BSC_CHAIN, DAYS, ETH_CHAIN, HOURS, POLYGON_CHAIN } from "../constants/index";
import { getConnection } from "typeorm";
import { Cohort } from "../db/entity/Cohort";
import { updateChainId } from "../db/hooks/update";
import { appBoot } from "../db/createConnection";
import _ from "lodash";

export async function allCohortInsertation(opts: CohortOptions) {
   try {
      if (opts.chainId === undefined) {
         throw new Error("please provide chainId");
      }

      var cohorts: any[];
      var proxies: any;
      if (!_.isEmpty(opts.cohorts)) {
         cohorts = opts.cohorts;
         proxies = opts?.proxies;
      } else {
         const manifest = yamlParser(opts.chainId);
         cohorts = manifest.cohorts;
         proxies = manifest.proxies;
      }

      logger.info(`manifest loaded. cohorts found ${cohorts.length}`);

      var n = 0;

      var contract = getCohorts(opts.chainId);

      if (!contract) throw new Error(`Fatal Error Contract Not found for the related ChainId`);

      var multiPromise = [];

      while (n < cohorts.length) {
         const items = cohorts[n];
         const address = items.address;
         const instance = contract(address);
         multiPromise.push(multicall(cohortActions, [instance, opts.chainId]));
         n++;
      }

      const results = await BluePromise.map(multiPromise, (values) => values);

      logger.info(`Basic Actions Performed`);

      var mapBasicDetails = [];

      for (var e = 0; e < results.length; e++) {
         const cohorts = results[e];
         var cohortDetails: any = {};
         for (var k = 0; k < cohorts.length; k++) {
            var properties = actionsProperties(cohortActions[k]);
            if (!properties) throw Error(`No Action Proptery Found Illegal term`);
            cohortDetails[properties] = cohorts[k];
         }
         mapBasicDetails.push(cohortDetails);
      }

      // again for loop values
      var multiverse = [];

      for (var e = 0; e < cohorts.length; e++) {
         const items = cohorts[e];
         const address = items.address;
         const instance = contract(address);
         const tokensCount = mapBasicDetails[e].tokensCount;
         multiverse.push(
            multicall(["getIntervalDays", "getTokens"], [instance, tokensCount, opts.chainId])
         );
      }

      const multiResponse = await BluePromise.map(multiverse, (values) => {
         return values;
      });

      // again loop this
      var mapIntervalDaysAndTokens: any[] = [];
      for (var e = 0; e < multiResponse.length; e++) {
         const cohorts = multiResponse[e];
         var cohortDetails: any = {};
         for (var k = 0; k < cohorts.length; k++) {
            var properties = actionsProperties(["getIntervalDays", "getTokens"][k]);
            if (!properties) throw Error(`No Action Proptery Found Illegal term`);
            cohortDetails[properties] = cohorts[k];
         }
         mapIntervalDaysAndTokens.push(cohortDetails);
      }

      var COHORTS: Cohorts[] = mapBasicDetails.map((items, i) => {
         const proxy = proxies[i];
         return {
            cohortAddress: String(cohorts[i].address),
            ...items,
            ...mapIntervalDaysAndTokens[i],
            cohortVersion: cohorts[i].version,
            rewardStrategy: items.rewardStrategy,
            DAYS,
            HOURS,
            chainId: opts.chainId,
            tag: getTag(items.tokensCount),
            proxies: proxy ? proxy : [],
         };
      });

      //console.log(COHORTS);
      //logger.info(COHORTS);
      // sync this values to the db

      await getConnection("unifarm")
         .createQueryBuilder()
         .insert()
         .into(Cohort)
         .values(COHORTS)
         .execute();

      logger.info(`Database Sync Successfully for the ${opts.chainId}`);

      // close the connection
      // await getConnection("unifarm").close();
   } catch (err) {
      console.log(err);
      return;
   }
}

async function updaterOfChainId() {
   try {
      await updateChainId(81, 137);
      logger.info(`chainId updated successfully to 137.`);
   } catch (err) {
      logger.error(`something wrong went ${err.message}`);
   }
}

/* appBoot().then(() => {
   setTimeout(async () => {
      allCohortInsertation({
         chainId: Number(process.env.CHAIN_ID),
      });
   }, 4000);
}); */
