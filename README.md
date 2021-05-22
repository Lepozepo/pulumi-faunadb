# Pulumi FaunaDB
## A simple FaunaDB Construct for javascript pulumi

### Usage

```
const faunadb = new FaunaDB('db', {
  name: 'animals',
  idxCmd: (secret) => `npm i && FAUNADB_SECRET='${secret}' npm run idx:run`,
  migrationCmd: (secret) => `npm i && FAUNADB_SECRET='${secret}' npm run migrate:run`,
});
```
