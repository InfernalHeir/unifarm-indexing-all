import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Unstake {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("string")
    userAddress: string;

    @Column("string")
    cohortId: string;

    @Column("string")
    unStakedTokenAddress: string;

    @Column("string")
    unStakedAmount: string;

    @Column("number",{nullable: true})
    stakeId: number;

    @Column("string")
    time: string;

    @Column("string")
    hash: string;

    @Column("string")
    block: string;

    @Column("number")
    chainId: number;

}