import fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastifyHelmet from '@fastify/helmet'

import config from './config'
import databasePlugin from '@plugins/database'
import apiPlugin from '@plugins/api'

const app = fastify(config.app).withTypeProvider<TypeBoxTypeProvider>()

// Fastify Ecosystem Plugins
// - Security
app.register(fastifyHelmet, { global: true })
// Our Plugins
// - Database
app.register(databasePlugin, config.database)
// - API
app.register(apiPlugin)

app.ready(() => {
  if (config.debug.routes) {
    console.log(app.printRoutes({ commonPrefix: false }))
  }

  if (config.debug.plugins) {
    console.log(app.printPlugins())
  }
})

app.listen(config.server, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
