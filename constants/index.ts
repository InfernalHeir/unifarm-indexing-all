import { Chain } from "../types/type";

export const DAYS = 86400;

export const HOURS = 3600;

// NORMAL Cohorts
export const V1: string = "0xd426037bCf28fc4eA3730525Ff8B3d2DE412257d";
export const V2: string = "0x207C678457617bC8c8Ab06F9088EFC1DCD45887c";
export const V3: string = "0x349d55f12fb166a926214ca0195a07a16fa4ccb1";
export const V4: string = "0xab6FfA6A5D5589378A21dbb30dF2940E0320d1Cd";

// locked cohorts
export const V18: string = "0x6fd0bbf295965db381f1d5b353ff3e523c771dd6";
export const OROWETH: string = "0x1c14Eb2f2bf443557fC131b3f6F4e929C0081346";
export const UFARMUSDC: string = "0x32D72D6CC98436EF983BE7f5288ab2Ca63480fE4";
// other proxies
export const V1REPROXY: string = "0x0862eD7f6B2bc350508B29542511249b7E11A0a0";

export const chainNameById: Chain = {
  1: "ethereum",
  56: "bsc",
  137: "polygon",
};
