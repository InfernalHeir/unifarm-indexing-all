import ETH_COHORT_ABI from "../../../constants/ethereum/ABI.json";
import { CohortsEvents } from "../../events";

export const ethListenersConfig = [
   {
      name: "V16",
      address: "0x53fe82a7334c6f3683d5b39f49f0f7be19823a64",
      abi: ETH_COHORT_ABI,
      events: [CohortsEvents.STAKE],
   },
   {
      name: "V18",
      address: "0x6fd0bbf295965db381f1d5b353ff3e523c771dd6",
      abi: ETH_COHORT_ABI,
      events: [CohortsEvents.STAKE],
   },
   {
      name: "ORO-WETH",
      address: "0x1c14Eb2f2bf443557fC131b3f6F4e929C0081346",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.STAKE,
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "UNIFARM-USDC",
      address: "0x32D72D6CC98436EF983BE7f5288ab2Ca63480fE4",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.STAKE,
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V20",
      address: "0x2d168651d85fe8b16aebf42272a9b64f24ac3603",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.STAKE,
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V1REPROXY",
      address: "0x0862eD7f6B2bc350508B29542511249b7E11A0a0",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V2REPROXY",
      address: "0x652862b61C71C8D955cCBd973d2830C68e46CE78",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V3REPROXY",
      address: "0xd04dde065fe872adb6517b4bb0c11eaf49ce26a5",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V4PROXY",
      address: "0xd23499e0Dc02C35d47D5284c85Cf4917D2454d2F",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V6PROXY",
      address: "0x2c09B8eA4606247Bf5AEC77B063c894334C6d205",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V8PROXY",
      address: "0xAf414C28FB7a33f736E5E55e102eB7954e95868C",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V9PROXY",
      address: "0xe4Be53c29c852e474ffdBE5555dE64BF143B613E",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V11PROXY",
      address: "0x50572512c65DbC570634926309BF61fB19C2364c",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V12PROXY",
      address: "0xD6Ce88C332a8168724b69A3A03e23DDf6Ac40408",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V15PROXY",
      address: "0x920a203e0C9F55d747F6b7Ea76ff96715725335a",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V16PROXY",
      address: "0x0F525981710E9d627f880D1e04C1F432317c84FF",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
   {
      name: "V18PROXY",
      address: "0x4d1cEC3f30aD9b1a7f69e510016a5D790cFA6fC0",
      abi: ETH_COHORT_ABI,
      events: [
         CohortsEvents.UNSTAKE,
         CohortsEvents.CLAIM,
         CohortsEvents.REFERRALEARN,
      ],
   },
];
