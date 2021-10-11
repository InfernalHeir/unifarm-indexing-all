FROM node:latest as builder

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /graphql-server

ADD ./package.json /graphql-server/package.json
ADD ./graphql /graphql-server/graphql
ADD ./db /graphql-server/db
ADD ./log /graphql-server/log

RUN npm install
RUN npm run graph:build

FROM node:14-alpine

WORKDIR /graph

RUN mkdir /graph/storage
RUN mkdir /graph/storage/logs

COPY --from=builder /graphql-server/graphql/build ./build
COPY --from=builder /graphql-server/package.json ./package.json
COPY --from=builder /graphql-server/node_modules ./node_modules
COPY --from=builder /graphql-server/db/ca-certificate.crt ./ca-certificate.crt

VOLUME ["/graph"]

ENTRYPOINT [ "npm" ]
CMD ["run","graph:start"]

EXPOSE 8080
