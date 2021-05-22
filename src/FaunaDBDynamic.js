import * as pulumi from '@pulumi/pulumi';
import faunadb, { query as q } from 'faunadb';

export default class FaunaDBDynamic extends pulumi.dynamic.Resource {
  constructor(name, props = {}, ops) {
    super({
      async create(inputs) {
        const client = new faunadb.Client({
          secret: inputs.adminSecret,
        });

        await client.query(
          q.CreateDatabase({ name: inputs.name }),
        );

        const key = await client.query(
          q.CreateKey({
            database: q.Database(inputs.name),
            role: 'server',
          }),
        );

        return {
          id: inputs.name,
          outs: {
            adminSecret: inputs.adminSecret,
            secret: key.secret,
          },
        };
      },
      async delete(id, inputs) {
        const client = new faunadb.Client({
          secret: inputs.adminSecret,
        });

        await client.query(
          q.Delete(q.Database(id)),
        );
      },
      async update(id, olds, news) {
        const client = new faunadb.Client({
          secret: news.adminSecret,
        });

        await client.query(
          q.Update(q.Database(id), { name: news.name }),
        );

        return {
          outs: {
            ...olds,
            ...news,
          },
        };
      },
    }, name, { secret: undefined, adminSecret: undefined, ...props }, ops);
  }
}
