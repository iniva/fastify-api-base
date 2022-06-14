import os from 'os'
import { version } from '../../package.json'

import { Configurations } from '@typings/Configurations'

const API_VERSION = version
const APP_NAME = process.env.APP_NAME || 'Fastify API'

const config: Configurations = {
  debug: {
    plugins: false,
    routes: true
  },
  app: {
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true,
    disableRequestLogging: true,
    exposeHeadRoutes: false,
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      prettyPrint: false,
      base: {
        hostname: os.hostname()
      }
    },
    ajv: {
      customOptions: {
        strict: 'log',
        keywords: ['kind', 'modifier']
      }
    }
  },
  server: {
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: Number(process.env.SERVER_PORT) || 8091
  },
  userAgent: `${APP_NAME}/${API_VERSION}`,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USERNAME || 'dev',
    password: process.env.DB_PASSWORD || 'dev',
    name: process.env.DB_NAME || 'prod-db-name',
    debug: false,
    connectionTimeout: 60000,
    tables: {
      posts: 'posts'
    },
    migrationsTable: process.env.DB_MIGRATIONS_TABLE || 'knex_migrations'
  }
}

export default config
