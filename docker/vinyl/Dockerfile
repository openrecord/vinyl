FROM node:10-slim

# Create app dir.
RUN mkdir /app
WORKDIR /app

# Install http-server so we can serve locally after building via webpack.
RUN npm install http-server

# Install node libs.
COPY package.json .npmrc ./
RUN npm i --loglevel warn --no-progress

# Copy sources.
COPY ./config config
COPY ./bin bin
COPY ./test test
COPY ./public public
COPY ./src src
COPY webpack.config.js .importjs.js postcss.config.js tsconfig.json .babelrc ./

# Build web image.
RUN npm run build

# The fallback for http-server missed routes: https://github.com/indexzero/http-server
RUN cp dist/index.html dist/404.html

EXPOSE 8080

# Start the server
CMD npx http-server dist