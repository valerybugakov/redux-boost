import { createStore, applyMiddleware, compose } from 'redux'
import { isDev } from '../utils/env'

let sagaMiddleware

function enhanceWith(middlewareArray = [], options) {
  const { devtoolExtension, reduxLogger } = options

  let composeEnhancers = compose
  const middlewares = middlewareArray

  if (isDev) {
    // eslint-disable-next-line no-underscore-dangle
    const devtoolsCompose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

    if (devtoolExtension && devtoolsCompose) {
      composeEnhancers = devtoolsCompose
    }

    if (
      reduxLogger === true ||
      (reduxLogger === 'fallback' && !devtoolsCompose)
    ) {
      const { createLogger } = require('redux-logger')

      middlewares.push(createLogger({ collapsed: true }))
    }
  }

  const enhancers = [applyMiddleware(...middlewares)]

  return composeEnhancers(...enhancers)(createStore)
}

const collectMiddlewares = flags =>
  Object.keys(flags).filter(key => flags[key]).map(key => {
    switch (key) {
      case 'saga': {
        const createSagaMiddleware = require('redux-saga').default

        sagaMiddleware =
          typeof createSagaMiddleware === 'function'
          ? createSagaMiddleware()
          : createSagaMiddleware.default()

        return sagaMiddleware
      }
      case 'eventFilter':
        return require('event-filter-redux-middleware').default
      case 'thunk':
        return require('redux-thunk').default
      default:
        throw new Error(`Invalid middlware name: ${key}`)
    }
  })

export default function configureStore(options) {
  const {
    initialState = {},
    middlewares,
    getReducer,
  } = options

  const enhancements = Array.isArray(middlewares)
    ? middlewares
    : collectMiddlewares(middlewares)

  const createStoreWithMiddleware = enhanceWith(enhancements, options)

  const store = createStoreWithMiddleware(getReducer(), initialState)

  if (middlewares.saga) {
    store.runSaga = sagaMiddleware.run
  }

  return store
}
