FROM node:10.16.3-slim

WORKDIR /usr/app

#COPY package*.json ./

#RUN yarn install

COPY . .

ENV NODE_ENV=test

EXPOSE 3001
#CMD [ "yarn", "serve" ]