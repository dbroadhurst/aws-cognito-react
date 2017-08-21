FROM node:8-alpine

WORKDIR /usr/local/app

COPY src ./src
COPY public ./public
COPY package.json .
COPY .eslintrc .
COPY start .

RUN npm install
RUN npm run build
