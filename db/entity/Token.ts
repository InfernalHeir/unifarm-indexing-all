import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Token {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("string")
    tokenId: string;

    @Column("number")
    decimals: number;

    @Column("string")
    userMinStake: string;

    @Column("string")
    userMaxStake: string;

    @Column("string")
    totalStakeLimit: string;

    @Column("string")
    lockableDays: string;

    @Column("boolean")
    optionableStatus: boolean;

    @Column("array")
    tokenSequenceList: string[];

    @Column("array")
    tokenDailyDistribution: string[];

    @Column("string")
    cohortId: string;

    @Column("string")
    rewardCap: string;

    @Column("number")
    chainId: number;
}