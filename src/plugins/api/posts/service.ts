import fastifyPlugin from 'fastify-plugin'
import { FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify'
import { Knex } from 'knex'
import { isNil } from 'lodash'

import { AppWithPlugins } from '@typings/App'
import { PostDto } from './dto'
import { Pagination, PostFilters, PostsRepository } from './repository'
import { PostNotFoundException } from './exception'

type UnknownObject = Record<string, string>

export type PostService = ReturnType<typeof service>

const service = (database: Knex) => {
  const repository = new PostsRepository(database, 'posts')

  const findById = async (id: string): Promise<PostDto> => {
    const post = await repository.findById(id)

    if (post === null) {
      throw new PostNotFoundException()
    }

    return post
  }

  const find = async (query?: unknown): Promise<PostDto[]> => {
    const filters = getPostFilters(query)
    const pagination = getPagination(query)
    const results = await repository.find(filters, pagination)

    if (results === null) {
      return []
    }

    return results
  }

  const save = async (data: PostDto): Promise<void> => {
    return repository.save(data)
  }

  const remove = async (id: string): Promise<void> => {
    await repository.delete(id)
  }

  const getPostFilters = (query?: unknown): PostFilters | undefined => {
    if (isNil(query)) {
      return
    }

    const queryParams = <UnknownObject>query
    const filterValues: PostFilters = {}

    // for (const filter of Object.keys(queryParams)) {
    //   filterValues[filter] = queryParams[filter]
    // }

    return filterValues
  }

  const getPagination = (query?: unknown): Pagination | undefined => {
    if (isNil(query)) {
      return
    }

    const queryParams = <UnknownObject>query

    let limit = 0
    let offset = 0

    if (!isNil(queryParams.limit)) {
      limit = Number(queryParams.limit)
    }

    if (!isNil(queryParams.offset)) {
      offset = Number(queryParams.offset)
    }

    return {
      limit,
      offset
    }
  }

  return {
    find,
    findById,
    save,
    remove
  }
}

const plugin = (app: AppWithPlugins, _options: FastifyPluginOptions, next: HookHandlerDoneFunction) => {
  if (!app.dbKnex) {
    next(new Error('database has not been initialized'))

    return
  }

  app.decorate('service:post', service(app.dbKnex))

  next()
}

export default fastifyPlugin(plugin, {
  name: 'post-service'
})
