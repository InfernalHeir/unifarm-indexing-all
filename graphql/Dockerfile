FROM node:latest

LABEL MAINTAINER Bhupendra Bisht "<bhupendra.bisht@oropocket.com>"
LABEL ORGANIZATION="<Unifarm>"

RUN node -v \
    npm -v \
    npm install -g yarn \
    yarn -v \
    yarn global add pm2

WORKDIR /graph-server

COPY ./package.json /graph-server/package.json

ADD ./ /graph-server/graph
ADD ../db /graph-server/
ADD ../log /graph-server/

RUN yarn install \   
    chmod 755 /graph-server

VOLUME ["/graph-server"]

ENTRYPOINT [ "yarn" ]
CMD ["start"]

EXPOSE 80
EXPOSE 443 