import { AppWithPlugins } from '@typings/App'
import { handler as listHandler, ListPostSchema } from './handlers/list'
import { handler as detailsHandler, DetailsPostSchema } from './handlers/details'
import { handler as createHandler, CreatePostSchema } from './handlers/create'
import { handler as updateHandler, UpdatePostSchema } from './handlers/update'
import { handler as removeHandler, RemovePostSchema } from './handlers/remove'
import servicePlugin, { PostService } from './service'

const posts = async (app: AppWithPlugins): Promise<void> => {
  await app.register(servicePlugin)

  const postService = app['service:post'] as PostService

  app.get('/', { schema: ListPostSchema }, listHandler(postService))
  app.get('/:id', { schema: DetailsPostSchema }, detailsHandler(postService))
  app.post('/', { schema: CreatePostSchema }, createHandler(postService))
  app.delete('/:id', { schema: RemovePostSchema }, removeHandler(postService))
  app.put('/:id', { schema: UpdatePostSchema }, updateHandler(postService))
}

export default posts
