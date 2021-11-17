import { getRepository } from "typeorm";
import { Cohort } from "../entity/Cohort";

export const updateChainId = async (fromChainId: number, newChainId: number) => {
   await getRepository(Cohort, "unifarm")
      .createQueryBuilder("cohort")
      .update(Cohort, { chainId: newChainId })
      .where("chainId = :chainId", {
         chainId: fromChainId,
      })
      .updateEntity(true)
      .execute();
};

export const updateProxyAddress = async (
   chainId: number,
   cohortAddress: string,
   proxyAddress: string[]
) => {
   await getRepository(Cohort, "unifarm")
      .createQueryBuilder("cohort")
      .update(Cohort, { proxies: proxyAddress })
      .where("chainId = :chainId", {
         chainId: chainId,
      })
      .andWhere("cohortAddress = :cohortAddress", {
         cohortAddress,
      })
      .updateEntity(true)
      .execute();
};
