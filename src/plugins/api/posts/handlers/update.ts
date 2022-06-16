import { FastifyReply } from 'fastify'
import { Type } from '@sinclair/typebox'
import { merge } from 'lodash'

import { FastifyRequestTypebox } from '@typings/App'
import { PostDto } from '../dto'
import { PostService } from '../service'
import { PostNotFoundException } from '../exception'

const ParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' })
})

const BodySchema = Type.Object({
  title: Type.Optional(
    Type.String({ minLength: 2})
  ),
  content: Type.Optional(
    Type.String({ minLength: 2})
  ),
  author: Type.Optional(
    Type.String({ minLength: 2})
  ),
}, { additionalProperties: false })

const ResponseSchema = Type.Object({
  200: Type.Object({
    id: Type.String(),
    title: Type.String(),
    content: Type.String(),
    author: Type.String(),
    createdAt: Type.String(),
    published: Type.Boolean(),
    updatedAt: Type.String()
  })
})

export const UpdatePostSchema = {
  params: ParamsSchema,
  body: BodySchema,
  response: ResponseSchema,
}

export const handler = (service: PostService) => async (req: FastifyRequestTypebox<typeof UpdatePostSchema>, reply: FastifyReply): Promise<PostDto> => {
  try {
    const post = await service.findById(req.params.id)
    const data = <PostDto>req.body
    const updatedAt = new Date()

    const updatedDto = merge(post, data)

    updatedDto.updateAt = updatedAt

    await service.save(updatedDto)

    return {
      ...updatedDto
    }
  } catch (error) {
    if (error instanceof PostNotFoundException) {
      return reply
        .code(404)
        .send({
          message: 'Post not found'
        })
    }

    throw error
  }
}
