import { combineReducers } from 'redux'
import { dataReducer, requestsReducer } from 'redux-boost'

import { searchFormReducer } from './searchForm'

const rootReducer = combineReducers({
  data: dataReducer,
  requests: requestsReducer,

  searchForm: searchFormReducer,
})

export default rootReducer
