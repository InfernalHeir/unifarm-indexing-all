# Unifarm Contracts Indexing (Graph)

## Prerequisites

- node version 14.17.0 or above.
- docker compose.
- yarn.

## yarn install

> npm install -g yarn

## deps installation

> yarn install

## NODE Enviroments

- dev
- prod

## create a .env.dev file on the root of a app

```
# DB_HOSTNAME- db hostname or ip address.
DB_HOSTNAME="127.0.0.1"
# PORT - DB service port.
PORT="5432"
# DB_USERNAME- db username to connection via client.
DB_USERNAME="unifarm"
# DB_PASSWORD - db authentication
DB_PASSWORD=<DB_PASSWORD>
# DB_NAME - database name.
DB_NAME="unifarm_indexing"

# Provider Related Details

ETHEREUM_RPC=<YOUR_ETHEREUM_RPC>

BSC_RPC=<YOUR_BSC_MAINNET_RPC>

POLYGON_RPC=<YOUR_POLYGON_RPC>


```

## Docker Database Compose

> cd ./db && docker compose up -d

## Sync All Cohorts in One Command

> npx ts-node ./scripts/cohort.ts
