import { FastifyInstance } from 'fastify'

import health from './health'

const api = async (server: FastifyInstance): Promise<void> => {
  server.register(health, { prefix: 'health' })
}

export default api
