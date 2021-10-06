#!/bin/bash

echo "Creating the Graph ql server image"

docker image build -t graph -f ./graphql/Dockerfile .

echo "Creating the Unifarm Event Listeners image"

docker image build -t events-listener -f ./events/Dockerfile .


