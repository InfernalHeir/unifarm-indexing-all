#!/bin/bash

echo "Creating Password for redis"

export REDIS_PASSWORD=TdePagKTvyhAcnYR

echo "Creating the Graph ql server image"

docker image build -t graph -f ./graphql/Dockerfile .

echo "Creating the Unifarm Event Listeners image"

docker image build -t events-listener -f ./events/Dockerfile .

echo "Creating Overlay Network for unifarm services"

docker network create -d overlay unifarm

echo "Creating Volumes for our services"

docker volume create postgres-data
docker volume create graph
docker volume create eth_events
docker volume create bsc_events
docker volume create polygon_events
docker volume create redis-data
