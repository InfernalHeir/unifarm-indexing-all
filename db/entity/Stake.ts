import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Stake {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("string")
    userAddress: string;

    @Column("string")
    tokenId: string;

    @Column("string")
    cohortId: string;

    @Column("number")
    stakeId: number;

    @Column("string")
    referrerAddress: string;

    @Column("string")
    stakedAmount: string;

    @Column("string")
    time: string;

    @Column("string")
    hash: string;

    @Column("string")
    block: string;

    @Column("number")
    chainId: number;

}