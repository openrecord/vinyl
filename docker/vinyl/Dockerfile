FROM node:8-slim

# Create our core app & src folders
RUN mkdir /app
WORKDIR /app

RUN npm install http-server

# Copy over package.json so we can later run npm install
COPY package.json .

# Install ALL dependencies
RUN npm i --loglevel warn --no-progress

# Copy over all of our code - note for local dev we'll mount over this from docker-compose
# DO THIS AFTER npm install so we get benefits of caching for npm install which takes a while
COPY ./config config
COPY ./src src
COPY favicon.ico webpack.config.js .babelrc .importjs.js postcss.config.js ./

RUN npm run build

# The fallback for http-server missed routes: https://github.com/indexzero/http-server
RUN cp dist/index.html dist/404.html

EXPOSE 8080

# Start the server
CMD npx http-server dist