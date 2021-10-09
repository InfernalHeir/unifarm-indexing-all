FROM node:latest as builder

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /graph

RUN yarn -v 

ADD ./package.json /graph/package.json
ADD ./graphql /graph/graphql
ADD ./db /graph/db
ADD ./log /graph/log

RUN yarn install
RUN yarn run graph:build
RUN yarn global add pm2
RUN mkdir /graph/storage
RUN mkdir /graph/storage/logs

VOLUME ["/graph"]

ENTRYPOINT [ "yarn" ]
CMD ["run","graph:start"]

EXPOSE 8080
