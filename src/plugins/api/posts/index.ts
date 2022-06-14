import { AppWithPlugins } from '@typings/App'
import { handler as listHandler, schema as listSchema } from './handlers/list'
import { handler as createHandler, schema as createSchema } from './handlers/create'
import servicePlugin, { PostService } from './service'

const posts = async (app: AppWithPlugins): Promise<void> => {
  await app.register(servicePlugin)

  const postService = app['service:post'] as PostService

  app.get('/', { schema: listSchema }, listHandler(postService))
  app.post('/', { schema: createSchema }, createHandler(postService))
}

export default posts
