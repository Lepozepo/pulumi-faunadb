# Pulumi FaunaDB
## A simple FaunaDB Construct for javascript pulumi

### Usage
Go to the fauna db console and create a new master database. This is going to hold all of the databases for each of your stacks.

Create an access token and store that secret in pulumi via: `pulumi config set <project>:faunaSecret <token> --secret`

```
const FaunaDB = require('pulumi-faunadb').default; // Or import FaunaDB from 'pulumi-faunadb';

const faunadb = new FaunaDB('db', {
  name: 'animals',
  idxCmd: (secret) => `npm i && FAUNADB_SECRET='${secret}' npm run idx:run`,
  migrationCmd: (secret) => `npm i && FAUNADB_SECRET='${secret}' npm run migrate:run`,
});
```
