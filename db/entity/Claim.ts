import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Claim {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  userAddress: string;

  @Column("varchar")
  cohortId: string;

  @Column("varchar")
  stakedTokenAddress: string;

  @Column("varchar")
  rewardTokenAddress: string;

  @Column("varchar")
  claimedRewards: string;

  @Column("varchar")
  time: string;

  @Column("varchar")
  hash: string;

  @Column("varchar")
  block: string;

  @Column("numeric")
  chainId: number;
}
