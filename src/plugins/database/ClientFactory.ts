import knex, { Knex } from 'knex'

import { Configurations } from '@typings/Configurations'

export class ClientFactory {
  static getClientForKnex(config: Configurations['database']): Knex {
    const {
      user,
      password,
      host,
      port,
      name,
      debug,
      connectionTimeout
    } = config
    const connectionString = `pgsql://${user}:${password}@${host}:${port}/${name}`

    const client = knex({
      debug,
      client: 'pg',
      connection: connectionString,
      acquireConnectionTimeout: connectionTimeout
    })

    return client
  }
}
