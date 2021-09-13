import {config} from "dotenv";

config({path: `./.env.${process.env.NODE_ENV}`});

export const ethereumRPCUrl = process.env.ETHEREUM_RPC;

export const bscRPCUrl = process.env.BSC_RPC;

export const polygonRPCUrl = process.env.POLYGON_RPC;