FROM node:latest

RUN mkdir /src

RUN npm install nodemon -g

WORKDIR /src
ADD . /src
RUN npm install --production

EXPOSE 3000

CMD npm run start-server
