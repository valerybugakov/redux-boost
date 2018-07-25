import configureStore from './configureStore'

export const storeLink = { store: {} }

export function createStore(options) {
  const { reducer, reduxPersist } = options

  let persistor
  let getReducer = () => reducer

  if (reduxPersist) {
    const { persistReducer } = require('redux-persist')
    const defaultStorage = require('redux-persist/lib/storage')

    const { storage = defaultStorage } = reduxPersist

    getReducer = () => persistReducer({ ...reduxPersist, storage }, reducer)
  }

  const store = configureStore({ ...options, getReducer })

  if (reduxPersist) {
    const { persistStore } = require('redux-persist')

    persistor = persistStore(store)
  }

  storeLink.store = store

  return {
    store,
    persistor,
  }
}

export function boostStore(store) {
  storeLink.store = store
}
