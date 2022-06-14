import { AppWithPlugins } from '@typings/App'

const health = async (app: AppWithPlugins): Promise<void> => {
  app.get('/', async () => {
    return {
      message: 'All good here, thanks for asking!'
    }
  })
}

export default health
