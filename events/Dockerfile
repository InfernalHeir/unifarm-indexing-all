FROM node:latest as builder

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /events

RUN yarn -v

COPY ./package.json /events/package.json

ADD ./ /events/

RUN yarn install
RUN yarn run listener-server:build
RUN yarn global add pm2

VOLUME ["/events"]

ENTRYPOINT [ "yarn" ]

CMD ["run","listener-server:start"]
