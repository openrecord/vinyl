# Turntable

### Local Prisma

After cloning this repo, ensure that you have [docker-compose](https://docs.docker.com/compose/install/) installed.

Then create a local `.dev.env` file with the contents

```sh
ENDPOINT=http://localhost:4466
```

and run

```sh
npm start
```

The playground will then be available at http://localhost:4466

### Local Server

```sh
npm run codegen && npm run compile
node built/server/index.ts
```

The server will be running on `http://localhost:4000`

### Update Local Schema

After making changes to `datamodel.graphql`, run

```sh
npm run deploy:dev
```

### Deploy to Prod

After making changes to `datamodel.graphql`, run

```sh
npm run deploy:prod
```

### Client Generation

```sh
npm run codegen
```

And TypeScript bindings for the current schema will be generated in `./generated/prisma.ts`.

See `./scripts/` for examples of how to use the bindings to programmatically interact with the database.
