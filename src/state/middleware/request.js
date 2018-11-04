import { requestActions } from '../requests/actions'
import { noop, identity } from '../utils'

function applyMethodToExecutor(executor, payload, method) {
  return executor.get ? executor[method.toLowerCase()] : executor
}

const defaultConfig = {
  method: 'get',
  serialize: identity,
  executor: global.fetch,
  prepareExecutor: applyMethodToExecutor,
  onError: identity,
  onSuccess: identity,
  saveRequestResult: true,
  logError: true,
}

/*
 * config: {
 *   name,
 *   payload,
 *   method: 'get'
 *   serialize: identity,
 *   executor: global.fetch,
 *   prepareExecutor: fn,
 *   onSuccess: noop,
 *   onError: noop,
 * }
 */
export const createRequestMiddleware = customConfig => ({ dispatch }) => {
  // Apply default values to the custom config
  const config = Object.assign(defaultConfig, customConfig)

  return next => async action => {
    // Skip all actions but process `fetchStart`
    if (action.type !== requestActions.fetchStart.type) {
      return next(action)
    }

    next(action)

    const {
      payload: {
        name,
        payload,
        method = config.method,
        serialize = config.serialize,
        executor = config.executor,
        prepareExecutor = config.prepareExecutor,
        saveRequestResult = config.saveRequestResult,
        onError = config.onError,
        onSuccess = config.onSuccess,
      } = {},
      meta: { resolve = noop, reject = noop } = {},
    } = action

    const args = Array.isArray(payload) ? payload : [payload]
    const fetch = prepareExecutor(executor, action.payload, method)

    try {
      const response = await fetch(...args)
      const data = response.data || response
      const serialized = serialize(data)

      resolve(serialized)

      dispatch(
        requestActions.fetchSuccess({
          name,
          result: serialized,
          saveRequestResult,
        })
      )

      onSuccess({ name, result: serialized })

      return serialized
    } catch (error) {
      reject(error)

      const { message, stack } = error

      dispatch(requestActions.fetchFail({ name, error: message, stack }))

      onError({ name, error })

      if (config.logError) {
        // eslint-disable-next-line no-console
        console.error(error)
      }

      return error
    }
  }
}
