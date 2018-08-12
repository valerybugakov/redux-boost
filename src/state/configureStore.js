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

export default function configureStore(options) {
  const { initialState = {}, middlewares, getReducer } = options

  const createStoreWithMiddleware = enhanceWith(middlewares, options)

  const store = createStoreWithMiddleware(getReducer(), initialState)

  if (middlewares.saga) {
    store.runSaga = sagaMiddleware.run
  }

  return store
}
