import { combineReducers } from 'redux'
import {
  boostStore,
  createStore,
  dataReducer,
  requestsReducer,
} from 'redux-boost'

const myReducer = combineReducers({
  data: dataReducer,
  requests: requestsReducer,
})

const { store, persistor } = createStore({
  initialState: {},
  reducer: myReducer,

  reduxLogger: 'fallback',
  devtoolExtension: true,

  // --- Redux persist config
  reduxPersist: {
    key: 'root',
    whitelist: ['auth'],
    // storage,
  },

  // --- Middlewares config
  middlewares: {
    saga: true,
    thunk: true,
    eventFilter: true,
  },

  // middlewares: [
  //   ...customMiddlewaresArray,
  // ],
})


// If store is not created by redux-boost
// `boostStore` call is required to enable binded `fetchStart` action
boostStore(store)

export default store
