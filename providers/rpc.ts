import { config } from "dotenv";

config({ path: `./.env.${process.env.NODE_ENV}` });

export const ethereumRPCUrl = process.env.ETHEREUM_RPC;

export const bscRPCUrl = process.env.BSC_RPC;

export const polygonRPCUrl = process.env.POLYGON_RPC;

export const wsEthRPCUrl = process.env.WS_ETHEREUM_RPC;

export const wsBscRPCUrl = process.env.WS_BSC_RPC;

export const wsPolygonRPCUrl = process.env.WS_POLYGON_RPC;
