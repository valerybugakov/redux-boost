import { createReducer, merge } from 'redux-boost'
import { searchFormActions } from './actions'

const initialState = {
  userName: '',
}

export const searchFormReducer = createReducer(
  {
    [searchFormActions.setUsername]: (state, userName) =>
      merge(state, { userName }),
  },
  initialState
)
