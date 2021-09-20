import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefferralClaim {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  userAddress: string;

  @Column("varchar")
  cohortId: string;

  @Column("varchar")
  refreeAddress: string;

  @Column("varchar")
  rewardTokenAddress: string;

  @Column("varchar")
  rewardAmount: string;

  @Column("varchar")
  time: string;

  @Column("varchar")
  hash: string;

  @Column("varchar")
  block: string;

  @Column("numeric")
  chainId: number;
}
