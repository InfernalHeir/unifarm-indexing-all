import { getRepository } from "typeorm";
import {
   ClaimEvent,
   RefferalClaimEvent,
   StakeEvent,
   UnStakeEvent,
} from "../../types/events";
import { Claim } from "../entity/Claim";
import { RefferralClaim } from "../entity/RefferalClaim";
import { Stake } from "../entity/Stake";
import { Unstake } from "../entity/Unstake";

export const insertStakeEvent = async (data: StakeEvent[]) => {
   await getRepository(Stake, "unifarm")
      .createQueryBuilder("stake")
      .insert()
      .values(data)
      .execute();
};

export const insertUnstakeEvent = async (data: UnStakeEvent[]) => {
   await getRepository(Unstake, "unifarm")
      .createQueryBuilder("unstake")
      .insert()
      .values(data)
      .execute();
};

export const insertClaimEvent = async (data: ClaimEvent[]) => {
   await getRepository(Claim, "unifarm")
      .createQueryBuilder("claim")
      .insert()
      .values(data)
      .execute();
};

export const insertRefferalEvent = async (data: RefferalClaimEvent[]) => {
   await getRepository(RefferralClaim, "unifarm")
      .createQueryBuilder("refClaim")
      .insert()
      .values(data)
      .execute();
};
