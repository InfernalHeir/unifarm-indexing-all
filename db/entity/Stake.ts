import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Stake {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column("varchar")
   userAddress: string;

   @Column("varchar")
   tokenId: string;

   @Column("varchar")
   cohortId: string;

   @Column("varchar", { nullable: true })
   stakeId: string;

   @Column("varchar", { nullable: true })
   referrerAddress: string;

   @Column("varchar")
   stakedAmount: string;

   @Column("varchar")
   time: string;

   @Column("varchar")
   hash: string;

   @Column("varchar")
   block: string;

   @Column("numeric")
   chainId: number;
}
