import os from 'os'
import { version } from '../../package.json'

import { Configurations } from 'typings/Configurations'

const API_VERSION = version
const APP_NAME = process.env.APP_NAME || 'Fastify API'

const config: Configurations = {
  debug: {
    plugins: false,
    routes: true
  },
  app: {
    ignoreDuplicateSlashes: true,
    ignoreTrailingSlash: true
  },
  server: {
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: Number(process.env.SERVER_PORT) || 8091
  },
  userAgent: `${APP_NAME}/${API_VERSION}`,
  logger: {
    level: process.env.LOG_LEVEL || 'debug',
    prettyPrint: false,
    base: {
      hostname: os.hostname()
    }
  }
}

export default config
