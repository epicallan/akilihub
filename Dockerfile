FROM node:latest

RUN mkdir /src

RUN npm install forever -g

WORKDIR /src
ADD . /src
RUN npm install --production

EXPOSE 5000

CMD NODE_ENV=production forever start build/server.js
