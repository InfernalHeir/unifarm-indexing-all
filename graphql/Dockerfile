FROM node:latest

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /graph

ADD ./package.json /graph/package.json
ADD ./graphql /graph/graphql
ADD ./db /graph/db
ADD ./log /graph/log

RUN npm install
RUN npm run graph:build
RUN npm install -g pm2
RUN mkdir /graph/storage
RUN mkdir /graph/storage/logs

VOLUME ["/graph"]

ENTRYPOINT [ "npm" ]
CMD ["run","graph:start"]

EXPOSE 8080
