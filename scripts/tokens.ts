import { appBoot } from "../db/createConnection";
import { getTokensFromDatabase } from "../helpers/db-helpers";
import { yamlParser } from "../helpers/scripters";
import { logger } from "../log";
import { getCohorts } from "../providers/provider";
import { CohortOptions } from "../types/Cohorts";
import { Promise as BluePromise } from "bluebird";


async function allTokens(opts: CohortOptions) {
  // totally automatic
  try {
    const manifest = yamlParser(opts.chainId);

    const cohorts = manifest.cohorts;

    logger.info(
      `manifest loaded. cohorts found ${cohorts.length}`
    );

    var n = 0;

    var contract = getCohorts(opts.chainId);

    if (!contract)
      throw new Error(
        `Fatal Error Contract Not found for the related ChainId`
      );

    var multiTokensPromise = [];

    while (n < cohorts.length) {
      multiTokensPromise.push(
        getTokensFromDatabase(cohorts[n].address, opts.chainId)
      );
      n++;
    }

    const tokens = await BluePromise.map(
      multiTokensPromise,
      (values) => values
    );

    console.log(tokens);
  } catch (err) {
    logger.error(`Token Indexing Failed Reason: ${err.message}`);
  }
}

appBoot().then(() => {
  setTimeout(async () => {
    await allTokens({
      chainId: 1,
    });
  },10000);
  
});


