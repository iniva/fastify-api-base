import { FastifyReply } from 'fastify'
import { Type } from '@sinclair/typebox'

import { FastifyRequestTypebox } from '@typings/App'
import { PostNotFoundException } from '../exception'
import { PostService } from '../service'

const ParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' })
})

export const RemovePostSchema = {
  params: ParamsSchema
}

export const handler = (service: PostService) => async (req: FastifyRequestTypebox<typeof RemovePostSchema>, reply: FastifyReply): Promise<any> => {
  try {
    await service.findById(req.params.id)
    await service.remove(req.params.id)

    return reply
      .code(204)
      .send()
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
