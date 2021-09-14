import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Cohort {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "varchar"})
    cohortAddress: string;

    @Column({type: "varchar"})
    stakeDuration: string;

    @Column({type:"varchar"})
    poolStartTime: string;

    @Column({type: "numeric"})
    tokensCount: number;

    @Column({type: "varchar",array:true})
    intervalDays: string[];

    @Column({type: "varchar",array:true})
    tokens: string[];

    @Column({type: "varchar",nullable: true})
    refferalPercentage: string;

    @Column("varchar",{nullable: true})
    optionalBenefits: string;

    @Column("varchar")
    cohortVersion: string;

    @Column("varchar")
    rewardStrategy: string;

    @Column("numeric")
    DAYS: number;

    @Column("numeric")
    HOURS: number;

    @Column("boolean")
    gaslessAvailablity: boolean;

    @Column("numeric")
    chainId: number;

    @Column("varchar")
    tag: string;

    @Column("varchar",{nullable: true,array:true})
    proxies: string[]

}