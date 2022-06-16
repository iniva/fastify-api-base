import { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import health from './health'
import posts from './posts'

const plugin = (app: FastifyInstance, _options: FastifyPluginOptions, next: HookHandlerDoneFunction) => {
  app.register(health, { prefix: 'health' })
  app.register(posts, { prefix: 'posts' })

  next()
}

export default fastifyPlugin(plugin, {
  name: 'rest-api-endpoints'
})
