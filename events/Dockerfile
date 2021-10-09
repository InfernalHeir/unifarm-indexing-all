FROM node:14-alpine

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /events

COPY ./package.json /events/package.json

ADD ./ /events/

RUN npm install
RUN npm run listener-server:build
RUN npm global add pm2

VOLUME ["/events"]

ENTRYPOINT [ "npm" ]

CMD ["run","listener-server:start"]
