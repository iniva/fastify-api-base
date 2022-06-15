import { Type } from '@sinclair/typebox'

import { FastifyRequestTypebox } from '@typings/App'
import { PostDto } from '../dto'
import { PostService } from '../service'

const QuerystringSchema = Type.Object({
  limit: Type.Optional(
    Type.String({ minLength: 1, maxLength: 100 })
  ),
  offset: Type.Optional(
    Type.String({ minLength: 1 })
  )
}, { additionalProperties: false })

export const ListPostSchema = {
  querystring: QuerystringSchema
}

export const handler = (service: PostService) => async (req: FastifyRequestTypebox<typeof ListPostSchema>): Promise<PostDto[]> => {
  const posts = await service.find(req.query)

  return posts
}
