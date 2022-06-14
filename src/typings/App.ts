import { PostService } from '@plugins/api/posts/service'
import { FastifyInstance } from 'fastify'
import { Knex } from 'knex'

export type AppWithPlugins = FastifyInstance & {
  dbKnex?: Knex
  'service:post'?: PostService
}
