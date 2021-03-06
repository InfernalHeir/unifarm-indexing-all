import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Unstake {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  userAddress: string;

  @Column("varchar")
  cohortId: string;

  @Column("varchar")
  unStakedTokenAddress: string;

  @Column("varchar")
  unStakedAmount: string;

  @Column("varchar", { nullable: true })
  stakeId: string | null;

  @Column("varchar")
  time: string;

  @Column("varchar")
  hash: string;

  @Column("varchar")
  block: string;

  @Column("numeric")
  chainId: number;
}
