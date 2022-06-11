export type Configurations = {
  debug: {
    routes: boolean
    plugins: boolean
  }

  app: {
    ignoreTrailingSlash: boolean
    ignoreDuplicateSlashes: boolean
  }

  server: {
    host: string
    port: number
  }

  userAgent: string

  logger: {
    level: string
    prettyPrint: boolean
    base: {
      hostname: string
    }
  }

  // database: {
  //   host: string
  //   port: number
  //   user: string
  //   password: string
  //   name: string
  //   connectionTimeout: number
  //   debug: boolean
  //   tables: {
  //     posts: string
  //   }
  //   migrationsTable: string
  // }
}
