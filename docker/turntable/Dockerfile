FROM node:10-slim

RUN mkdir /app
WORKDIR /app

COPY package.json .npmrc ./
RUN npm i --loglevel warn --no-progress

COPY ./turntable turntable
COPY netlify.toml .

CMD npm run deploy:test && npm run codegen && npm run start:api