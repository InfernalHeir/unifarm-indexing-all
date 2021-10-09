FROM node:latest as builder

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /unifarm-events

RUN node -v \
    npm -v \
    npm install -g pm2 \
    mkdir /unifarm-events/storage

COPY ./package.json /unifarm-events/package.json

ADD ./ /unifarm-events/

RUN npm install
RUN npm run listener-server:build

FROM node:14-alpine

WORKDIR /events 

COPY --from=builder /unifarm-events/events/build ./

VOLUME ["/events"]

ENTRYPOINT [ "npm" ]
CMD ["listener-server:start"]