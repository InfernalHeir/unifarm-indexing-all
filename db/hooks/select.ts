import { getRepository } from "typeorm";
import { Cohort } from "../../db/entity/Cohort";

export async function getTokensFromDatabase(cohort: string, chainId: number) {
   try {
      const tokens = await getRepository(Cohort, "unifarm")
         .createQueryBuilder("cohort")
         .select("tokens")
         .where("cohort.cohortAddress = :cohortAddress", {
            cohortAddress: cohort,
         })
         .andWhere("cohort.chainId = :chainId", {
            chainId: String(chainId),
         })
         .execute();
      return tokens[0].tokens;
   } catch (err) {
      Promise.reject(err.message);
      return undefined;
   }
}
