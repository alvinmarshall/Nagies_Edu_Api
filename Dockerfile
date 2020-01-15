FROM node:10.16.3-slim

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "dev" ]