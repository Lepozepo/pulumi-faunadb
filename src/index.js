import * as pulumi from '@pulumi/pulumi';
import cp from 'child_process';
import FaunaDBDynamic from './FaunaDBDynamic';

export default class FaunaDB extends pulumi.ComponentResource {
  constructor(name, props = {}, ops) {
    super('fauna:fauna:db', name, props, ops);

    const config = new pulumi.Config();
    const adminSecret = config.requireSecret('faunadb_secret');

    this.db = new FaunaDBDynamic(
      name,
      { name, adminSecret },
      { parent: this, additionalSecretOutputs: ['secret'] },
    );
    this.secret = this.db.secret;

    if (!pulumi.runtime.isDryRun()) {
      this.secret.apply((fdbSecret) => {
        if (props?.idxCmd) {
          cp.execSync(props.idxCmd(fdbSecret), { stdio: 'inherit' });
        }
        if (props?.migrationCmd) {
          cp.execSync(props.migrationCmd(fdbSecret), { stdio: 'inherit' });
        }
      });
    }

    this.registerOutputs({
      db: this.db,
    });
  }
}
