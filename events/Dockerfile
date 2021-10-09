FROM node:latest as builder

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /unifarm-events

COPY ./package.json /unifarm-events/package.json

ADD ./ /unifarm-events/

RUN npm install
RUN npm run listener-server:build

FROM node:14-alpine

WORKDIR /events

COPY --from=builder /unifarm-events/build ./build
COPY --from=builder /unifarm-events/package.json ./package.json
COPY --from=builder /unifarm-events/node_modules ./node_modules 

VOLUME ["/events"]

ENTRYPOINT [ "npm" ]

CMD ["run","listener-server:start"]
