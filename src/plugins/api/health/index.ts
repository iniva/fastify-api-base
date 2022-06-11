import { FastifyInstance } from 'fastify'

const health = async (server: FastifyInstance): Promise<void> => {
  server.get('/', async () => {
    return {
      data: {
        message: 'All good here, thanks for asking!'
      }
    }
  })
}

export default health
