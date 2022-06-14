import { Type } from '@sinclair/typebox'
import { FastifyRequest, FastifySchema } from 'fastify'

import { PostDto } from '../dto'
import { PostService } from '../service'

export const handler = (service: PostService) => async (req: FastifyRequest): Promise<PostDto[]> => {
  const posts = await service.find()

  return posts
}

const QuerystringSchema = Type.Object({
  limit: Type.Optional(
    Type.String({ minLength: 1, maxLength: 100 })
  ),
  offset: Type.Optional(
    Type.String({ minLength: 1 })
  )
})

export const schema: FastifySchema = {
  querystring: QuerystringSchema
}
