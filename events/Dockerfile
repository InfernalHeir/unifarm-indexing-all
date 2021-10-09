FROM node:latest

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /events

COPY ./package.json /events/package.json

ADD ./ /events/

RUN npm install
RUN npm run listener-server:build
RUN npm install -g pm2

VOLUME ["/events"]

ENTRYPOINT [ "npm" ]

CMD ["run","listener-server:start"]
