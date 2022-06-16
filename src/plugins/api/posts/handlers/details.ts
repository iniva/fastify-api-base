import { FastifyReply } from 'fastify'
import { Type } from '@sinclair/typebox'

import { FastifyRequestTypebox } from '@typings/App'
import { PostDto } from '../dto'
import { PostNotFoundException } from '../exception'
import { PostService } from '../service'

const ParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' })
})

export const DetailsPostSchema = {
  params: ParamsSchema
}

export const handler = (service: PostService) => async (req: FastifyRequestTypebox<typeof DetailsPostSchema>, reply: FastifyReply): Promise<PostDto> => {
  try {
    const post = await service.findById(req.params.id)

    return {
      ...post
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
