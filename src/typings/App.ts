import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import {
  FastifyInstance,
  FastifyLoggerInstance,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault
} from 'fastify'
import { RouteGenericInterface } from 'fastify/types/route'
import { Knex } from 'knex'

import { PostService } from '@plugins/api/posts/service'

export type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyLoggerInstance,
  TypeBoxTypeProvider
>

export type FastifyRequestTypebox<TSchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  TSchema,
  TypeBoxTypeProvider
>

export type AppWithPlugins = FastifyInstance & {
  dbKnex?: Knex
  'service:post'?: PostService
}
