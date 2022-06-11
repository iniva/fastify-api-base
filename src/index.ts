import fastify from 'fastify'

import config from './config'
import api from './plugins/api'

const server = fastify(config.app)

// Plugins
// - API
api(server)

server.ready(() => {
  if (config.debug.routes) {
    console.log(server.printRoutes({ commonPrefix: false }))
  }

  if (config.debug.plugins) {
    console.log(server.printPlugins())
  }
})

server.listen(config.server, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server listening at ${address}`)
})
