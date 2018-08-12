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
  data: undefined,
  error: undefined,
}

export const requestsReducer = createReducer(
  {
    [requestActions.fetchStart]: (state, { name }) =>
      merge(state, {
        [name]: {
          ...defaultRequestState,
          loading: true,
        },
      }),

    [requestActions.fetchSuccess]: (state, payload) => {
      const { name, data, result } = payload

      if (name) {
        return update(state, {
          $merge: {
            [name]: {
              ...defaultRequestState,
              success: true,
              result,
              data,
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
        error,
      },
      errors: [error, ...state.errors.slice(0, 4)],
    }),

    [requestActions.resetRequest]: (state, name) =>
      merge(state, {
        [name]: {
          error: undefined,
          data: undefined,
          success: undefined,
          loading: false,
        },
      }),

    [requestActions.resetRequests]: (state, names) =>
      merge(
        state,
        names.reduce((acc, name) => {
          acc[name] = {
            error: undefined,
            data: undefined,
            success: undefined,
            loading: false,
          }

          return acc
        }, {})
      ),
  },
  initialState
)
