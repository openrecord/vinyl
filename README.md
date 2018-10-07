# Openrecord Front-End

The web application for the openrecord platform.

## Local Development

#### Requirements

- [ ] Node.js >= 8.0.0
- [ ] Docker (and docker-compose)

```bash
npm install     # Install packages.
npm start       # Run the frontend using webpack-dev-server (with hot module replacement). Default address is http://localhost:8080
```

To develop locally against a working backend, use [docker-compose](https://docs.docker.com/compose/):

```bash
docker-compose up -d      # Starts an instance of the openrecord api and a mysql server.
```

## Configuration

Configuration is managed using [node-config](https://github.com/lorenwest/node-config). _All_ configuration options should go in the _config/_ directory.

Configs are inherited from _default.yml_ initially. When NODE*ENV is set, a file matching *[NODE_ENV].yml\_ will be loaded (i.e. staging and production).

To override any configuration, add a file called _local.yml_ (git-ignored) or map an environment variable to a configuration option in _custom-environment-variables.yml_.

Example configuration setup for `API_PORT=1234 NODE_ENV=staging npm start`: _default.yml_ -> _staging.yml_ -> _local.yml_ -> _local-staging.yml_ -> Environment Variables (_API_PORT_)

## End-to-End Tests with Puppeteer

Start postgres and prisma.
`docker-compose up -d prisma`
Deploy the turntable prisma schema.
`docker-compose up turntable-deploy`

#### Local Chrome

Start vinyl locally.
`npm start`
Run tests with jest.
`npm run test`

#### Remote Headless Chrome

Start headless chrome
`docker-compose up -d chrome-headless`
Run vinyl container
`docker-compose up -d vinyl`
Run tests in vinyl container
`docker-compose run vinyl npm run test`

## Tech

- [React 16](https://reactjs.org/)
- [Redux 4](https://redux.js.org/)
- [Webpack 4](https://webpack.js.org/)
- [Sass](https://sass-lang.com/)
- [Styled Components](https://github.com/styled-components/styled-components)
- [Docker](https://docs.docker.com/)
- [React Router + Redux](https://github.com/supasate/connected-react-router)
- [AWS Cloudfront](https://aws.amazon.com/cloudfront/)
