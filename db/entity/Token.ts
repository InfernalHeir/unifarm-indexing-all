import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  tokenId: string;

  @Column("varchar")
  decimals: string;

  @Column("varchar")
  userMinStake: string;

  @Column("varchar")
  userMaxStake: string;

  @Column("varchar")
  totalStakeLimit: string;

  @Column("varchar")
  lockableDays: string;

  @Column("boolean")
  optionableStatus: boolean;

  @Column("varchar", { array: true })
  tokenSequenceList: string[];

  @Column("varchar", { array: true })
  tokenDailyDistribution: string[];

  @Column("varchar")
  cohortId: string;

  @Column("varchar")
  rewardCap: string;

  @Column("numeric")
  chainId: number;
}
