import { createReducer } from 'redux-yo'

import { update, merge } from '../utils'
import { requestActions } from './actions'

const initialState = {
  errors: [],
}

export const defaultRequestState = {
  loading: false,
  success: false,
  result: undefined,
  error: undefined,
}

export const requestsReducer = createReducer(
  {
    [requestActions.fetchStart]: (state, { name }) =>
      merge(state, {
        [name]: {
          ...defaultRequestState,
          ...state[name],
          loading: true,
        },
      }),

    [requestActions.fetchSuccess]: (state, payload) => {
      const { name, result, saveRequestResult } = payload

      if (name) {
        return update(state, {
          $merge: {
            [name]: {
              ...defaultRequestState,
              ...(saveRequestResult && {
                result,
              }),
              success: true,
            },
          },
        })
      }

      return state
    },

    [requestActions.fetchFail]: (state, { name, error }) => ({
      ...state,
      [name]: {
        ...defaultRequestState,
        data: state[name].data,
        error,
      },
      errors: [error, ...state.errors.slice(0, 4)],
    }),

    [requestActions.resetRequest]: (state, name) =>
      merge(state, {
        [name]: defaultRequestState,
      }),

    [requestActions.resetRequests]: (state, names) =>
      merge(
        state,
        names.reduce((acc, name) => {
          acc[name] = defaultRequestState

          return acc
        }, {})
      ),
  },
  initialState
)
