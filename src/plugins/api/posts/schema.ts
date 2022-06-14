import { AppWithPlugins } from '@typings/App'
import S from 'fluent-json-schema'

const listQuerySchema = S.object()
  .prop('limit', S.number().minimum(1).maximum(100))
  .prop('offset', S.number().minimum(1))

const init = (app: AppWithPlugins): void => {

}
