export interface Cohorts {
   cohortAddress: string;
   stakeDuration: string;
   poolStartTime: string;
   tokensCount: number;
   intervalDays: string[];
   tokens: string[];
   refferalPercentage: string;
   optionalBenefits: string;
   cohortVersion: string;
   rewardStrategy: string;
   DAYS: number;
   HOURS: number;
   gaslessAvailablity: boolean;
   chainId: number;
   tag: string;
}

interface CohortType {
   address: string;
   version: string;
}

export interface CohortOptions {
   chainId: number;
   cohorts?: CohortType[];
   proxies?: string[][];
}

export type CohortInsertation = string[];
