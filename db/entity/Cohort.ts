import {Entity, PrimaryGeneratedColumn, Column, Generated} from "typeorm";

@Entity()
export class Cohort {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: "string"})
    cohortAddress: string;

    @Column({type: "integer"})
    stakeDuration: number;

    @Column({type:"string",length: 255})
    poolStartTime: string;

    @Column({type: "int64", length:64})
    tokensCount: number;

    @Column({type: "array"})
    intervalDays: number[];

    @Column({type: "array"})
    tokens: string[];

    @Column({type: "varchar",length:255})
    refferalPercentage: string;

    @Column("number",{nullable: true})
    optionalBenefits: number;

    @Column()
    @Generated("increment")
    cohortVersion: number;

    @Column("string")
    rewardStrategy: string;

    @Column("number")
    DAYS: number;

    @Column("number")
    HOURS: number;

    @Column("boolean")
    gaslessAvailablity: boolean;

}