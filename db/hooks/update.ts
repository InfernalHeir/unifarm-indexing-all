import { getRepository } from "typeorm";
import { Cohort } from "../entity/Cohort";

export const updateChainId = async (
  fromChainId: number,
  newChainId: number
) => {
  await getRepository(Cohort, "unifarm")
    .createQueryBuilder("cohort")
    .update(Cohort, { chainId: newChainId })
    .where("chainId = :chainId", {
      chainId: fromChainId,
    })
    .updateEntity(true)
    .execute();
};
