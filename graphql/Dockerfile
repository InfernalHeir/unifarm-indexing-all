FROM node:latest as builder

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /graph-server

RUN node -v \
    npm -v \
    npm install -g pm2 \
    mkdir /graph-server/storage

ADD ./package.json /graph-server/package.json
ADD ./graphql /graph-server/graphql
ADD ./db /graph-server/db
ADD ./log /graph-server/log

RUN npm install 
RUN npm run graph:build

FROM node:14-alpine

WORKDIR /graph

COPY --from=builder /graph-server/graphql/build ./

VOLUME ["/graph"]

ENTRYPOINT [ "npm" ]
CMD ["graph:start"]

EXPOSE 8080
EXPOSE 8443