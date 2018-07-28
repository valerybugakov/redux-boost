import { requestActions } from '../requests/actions'
import { noop, identity } from '../utils'

/*
 * config: {
 *   method: 'get'
 *   serialize: identity,
 *   executor: global.fetch,
 *   onSuccess: noop,
 *   onError: noop,
 * }
 */
export const createRequestMiddleware = config => ({ dispatch }) =>
  next => async action => {
    if (!action.type === requestActions.fetchStart.type) {
      return next(action)
    }

    const {
      payload: {
        name,
        payload,
        method = config.method || 'get',
        serialize = config.serialize || identity,
        executor = config.executor || global.fetch,
        prepareExecutor = config.prepareExecutor || function applyMethod() {
          return executor.get ? executor[method.toLowerCase()] : executor
        },
      } = {},
      meta: { resolve = noop, reject = noop } = {},
    } = action

    const args = Array.isArray(payload) ? payload : [payload]
    const fetch = prepareExecutor(executor, action.payload)

    try {
      const response = await fetch(...args)
      const data = response.data || response
      const serialized = serialize(data)

      resolve(serialized)

      dispatch(requestActions.fetchSuccess({ name, data: serialized }))

      if (config.onSuccess) {
        config.onSuccess({ name, data: serialized })
      }

      return serialized
    } catch (error) {
      reject(error)

      dispatch(requestActions.fetchFail({ name, error }))

      if (config.onError) {
        config.onError({ name, error })
      }

      // eslint-disable-next-line no-console
      console.error(error)

      return error
    }
  }
