import { createStore, createRequestMiddleware } from 'redux-boost'
import thunk from 'redux-thunk'

import reducer from './reducer'
import executor from './fetcher'

const { store } = createStore({
  reducer,
  middlewares: [
    thunk,
    createRequestMiddleware({
      executor,
    }),
  ],

  reduxPersist: {
    key: 'root',
    whitelist: ['data'],
  },

  reduxLogger: 'fallback',
  devtoolExtension: true,
})

export default store
