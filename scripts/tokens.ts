import { appBoot } from "../db/createConnection";
import { getTokensFromDatabase } from "../helpers/db-helpers";
import { multicall, yamlParser } from "../helpers/scripters";
import { logger } from "../log";
import { getCohorts } from "../providers/provider";
import { CohortOptions } from "../types/Cohorts";
import { Promise } from "bluebird";
import { defaultTokenActions } from "../actions/TokenActions";

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

    const tokens = await Promise.map(
      multiTokensPromise,
      (values) => values
    );

    var TokenPromise = [];
    for (var q = 0; q < tokens.length; q++) {
      const instance = contract(cohorts[q].address);
      for (var r = 0; r < tokens[q].length; r++) {
        TokenPromise.push({
          tokenMetaData: multicall(defaultTokenActions, [
            instance,
            tokens[q][r],
            opts.chainId,
          ]),
          cohortId: cohorts[q].address,
          tokenId: tokens[q][r],
          tokens: tokens[q],
        });
      }
    }

    const tokensMetaData = await Promise.map(
      TokenPromise,
      async (values) => {
        const tokens = await Promise.map(
          values.tokenMetaData,
          (items) => {
            return {
              ...items,
              cohortId: values.cohortId,
              tokenId: values.tokenId,
              tokens: values.tokens,
            };
          }
        );
        return tokens;
      }
    );

    // get the token sequence

    var tokensInformation = [];
    for (var v = 0; v < tokensMetaData.length; v++) {
      for (var k = 0; k < tokensMetaData[v].length; k++) {
        tokensInformation.push({
          ...tokensMetaData[v][k],
        });
      }
    }

    var tokenSequencePromise = [];

    for (var j = 0; j < tokensInformation.length; j++) {
      const items = tokensInformation[j];
      const instance = contract(items.cohortId);
      tokenSequencePromise.push(
        multicall(
          ["getTokenSequenceList"],
          [
            instance,
            items.token,
            items.tokenId,
            items.tokens.length,
          ]
        )
      );
    }

    /* var tokenSequence = await Promise.map(tokenSequencePromise,(values) => {
      return values;
    });

    // loop again
    var 
    for(var r=0; r < tokensInformation.length; r++){
      
    } */

  } catch (err) {
    logger.error(`Token Indexing Failed Reason: ${err.message}`);
  }
}

appBoot().then(() => {
  setTimeout(async () => {
    await allTokens({
      chainId: 1,
    });
  }, 10000);
});
