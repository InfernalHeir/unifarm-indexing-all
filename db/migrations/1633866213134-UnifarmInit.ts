import {MigrationInterface, QueryRunner} from "typeorm";

export class UnifarmInit1633866213134 implements MigrationInterface {
    name = 'UnifarmInit1633866213134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "claim" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAddress" character varying NOT NULL, "cohortId" character varying NOT NULL, "stakedTokenAddress" character varying NOT NULL, "rewardTokenAddress" character varying NOT NULL, "claimedRewards" character varying NOT NULL, "time" character varying NOT NULL, "hash" character varying NOT NULL, "block" character varying NOT NULL, "chainId" numeric NOT NULL, CONSTRAINT "PK_466b305cc2e591047fa1ce58f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cohort" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cohortAddress" character varying NOT NULL, "stakeDuration" character varying NOT NULL, "poolStartTime" character varying NOT NULL, "tokensCount" numeric NOT NULL, "intervalDays" character varying array NOT NULL, "tokens" character varying array NOT NULL, "refferalPercentage" character varying, "optionalBenefits" character varying, "cohortVersion" character varying NOT NULL, "rewardStrategy" character varying NOT NULL, "DAYS" numeric NOT NULL, "HOURS" numeric NOT NULL, "gaslessAvailablity" boolean NOT NULL, "chainId" numeric NOT NULL, "tag" character varying NOT NULL, "proxies" character varying array, CONSTRAINT "PK_4fb3cca38dc4b461110344e5f9b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refferral_claim" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAddress" character varying NOT NULL, "cohortId" character varying NOT NULL, "refreeAddress" character varying NOT NULL, "rewardTokenAddress" character varying NOT NULL, "rewardAmount" character varying NOT NULL, "time" character varying NOT NULL, "hash" character varying NOT NULL, "block" character varying NOT NULL, "chainId" numeric NOT NULL, CONSTRAINT "PK_fff18f0e9244bb964709297a921" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stake" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAddress" character varying NOT NULL, "tokenId" character varying NOT NULL, "cohortId" character varying NOT NULL, "stakeId" character varying, "referrerAddress" character varying, "stakedAmount" character varying NOT NULL, "time" character varying NOT NULL, "hash" character varying NOT NULL, "block" character varying NOT NULL, "chainId" numeric NOT NULL, CONSTRAINT "PK_8cfd82a65916af9d517d25a894e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tokenId" character varying NOT NULL, "decimals" character varying NOT NULL, "userMinStake" character varying NOT NULL, "userMaxStake" character varying NOT NULL, "totalStakeLimit" character varying NOT NULL, "lockableDays" character varying NOT NULL, "optionableStatus" boolean NOT NULL, "tokenSequenceList" character varying array, "tokenDailyDistribution" character varying array, "cohortId" character varying NOT NULL, "rewardCap" character varying, "chainId" numeric NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unstake" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAddress" character varying NOT NULL, "cohortId" character varying NOT NULL, "unStakedTokenAddress" character varying NOT NULL, "unStakedAmount" character varying NOT NULL, "stakeId" character varying, "time" character varying NOT NULL, "hash" character varying NOT NULL, "block" character varying NOT NULL, "chainId" numeric NOT NULL, CONSTRAINT "PK_32873b5360007a866a2bd212e76" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "unstake"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "stake"`);
        await queryRunner.query(`DROP TABLE "refferral_claim"`);
        await queryRunner.query(`DROP TABLE "cohort"`);
        await queryRunner.query(`DROP TABLE "claim"`);
    }

}
