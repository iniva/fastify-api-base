import { Type } from '@sinclair/typebox'

import { FastifyRequestTypebox } from '@typings/App'
import { PostDto } from '../dto'
import { PostService } from '../service'

const QuerystringSchema = Type.Object({
  limit: Type.Optional(
    Type.Number({ minimum: 1, maximum: 100 })
  ),
  offset: Type.Optional(
    Type.Number({ minimum: 1 })
  ),
  title: Type.Optional(
    Type.String({ minLength: 2 })
  ),
  author: Type.Optional(
    Type.String({ minLength: 2 })
  ),
  published: Type.Optional(
    Type.Boolean()
  )
}, { additionalProperties: false })

export const ListPostSchema = {
  querystring: QuerystringSchema
}

export const handler = (service: PostService) => async (req: FastifyRequestTypebox<typeof ListPostSchema>): Promise<PostDto[]> => {
  const posts = await service.find(req.query)

  return posts
}
