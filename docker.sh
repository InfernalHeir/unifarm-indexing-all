#!/bin/bash

echo "Creating Password for redis"

export REDIS_PASSWORD=TdePagKTvyhAcnYR

echo "Creating the Graph ql server image"

docker image build --no-cache -t graph:2.0.2 -f ./graphql/Dockerfile .

echo "Creating the Unifarm Event Listeners image"

docker image build --no-cache -t events-listener:4.4.4 -f ./events/Dockerfile .
