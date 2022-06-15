import { Type } from '@sinclair/typebox'
import { v4 as uuid } from 'uuid'

import { FastifyRequestTypebox } from '@typings/App'
import { PostDto } from '../dto'
import { PostService } from '../service'

const BodySchema = Type.Object({
  title: Type.String({ minLength: 2}),
  content: Type.String({ minLength: 2}),
  author: Type.String({ minLength: 2}),
}, { additionalProperties: false })

const ResponseSchema = Type.Object({
  200: Type.Object({
    id: Type.String()
  })
})

export const CreatePostSchema = {
  body: BodySchema,
  respose: ResponseSchema
}

export const handler = (service: PostService) => async (req: FastifyRequestTypebox<typeof CreatePostSchema>): Promise<any> => {
  const { title, content, author } = req.body
  const postId = uuid()

  const dto = new PostDto(
    postId,
    title,
    content,
    author,
    new Date(),
    false
  )

  await service.save(dto)

  return { id: postId }
}
