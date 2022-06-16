import { FastifyServerOptions } from 'fastify'

type Logger = {
  level: string
  prettyPrint: boolean
  base: {
    hostname: string
  }
}

export type Configurations = {
  debug: {
    routes: boolean
    plugins: boolean
  }

  app: {
    ignoreTrailingSlash: boolean
    ignoreDuplicateSlashes: boolean
    disableRequestLogging: boolean
    exposeHeadRoutes: boolean
    logger: Logger,
    ajv?: FastifyServerOptions['ajv']
  }

  server: {
    host: string
    port: number
  }

  userAgent: string

  database: {
    host: string
    port: number
    user: string
    password: string
    name: string
    connectionTimeout: number
    debug: boolean
    tables: {
      posts: string
    }
    migrationsTable: string
  }
}
