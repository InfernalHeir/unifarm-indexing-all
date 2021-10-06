FROM node:latest

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

WORKDIR /unifarm-events

RUN node -v \
    npm -v \
    npm install -g yarn \
    yarn -v \
    yarn global add pm2 \
    mkdir /unifarm-events/storage

COPY ./package.json /unifarm-events/package.json

ADD ../ /unifarm-events/

RUN yarn install \   
    chmod 755 /unifarm-events

VOLUME ["/unifarm-events"]

ENTRYPOINT [ "yarn" ]
CMD ["graph:build"]

EXPOSE 9385 