import { FastifyInstance, HookHandlerDoneFunction } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { Configurations } from '@typings/Configurations'
import { AppWithPlugins } from '@typings/App'
import { ClientFactory } from './ClientFactory'

const plugin = (app: FastifyInstance, options: Configurations['database'], next: HookHandlerDoneFunction) => {
  if (!app.hasDecorator('dbKnex')) {
    const client = ClientFactory.getClientForKnex(options)

    app.decorate('dbKnex', client)

    app.addHook('onClose', (app: AppWithPlugins, next: HookHandlerDoneFunction) => {
      if (app.dbKnex === client) {
        app.dbKnex.destroy((next))
      }
    })

    next()
  }
}

export default fastifyPlugin(plugin, {
  name: 'database-knex'
})
