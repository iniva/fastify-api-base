import { Type } from '@sinclair/typebox'
import { FastifySchema } from 'fastify'

import { PostService } from '../service'

export const handler = (service: PostService) => async (req: FastifySchema): Promise<void> => {
  console.log(req.body)
}

const BodySchema = Type.Object({
  title: Type.String({ minLength: 2}),
  content: Type.String({ minLength: 2}),
  author: Type.String({ minLength: 2}),
})

export const schema: FastifySchema = {
  body: BodySchema
}
