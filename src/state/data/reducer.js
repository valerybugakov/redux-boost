import { createReducer } from 'redux-yo'
import { update } from '../utils'
import { requestActions } from '../requests/actions'

import { dataActions } from './actions'

const initialState = {}

const entitiesUpdate = (state, entities) =>
  Object.entries(entities).reduce((acc, [key, value]) => {
    const operation = state[key] ? '$merge' : '$set'

    acc[key] = { [operation]: value }

    return acc
  }, {})

export const dataReducer = createReducer(
  {
    [requestActions.fetchSuccess]: (state, { entities }) => {
      if (entities) {
        return update(state, entitiesUpdate(state, entities))
      }

      return state
    },

    [dataActions.setEntities]: (state, entities) =>
      update(state, {
        entities: entitiesUpdate(state, entities),
      }),

    [dataActions.deleteEntities]: (state, entities) => {
      const updates = Object.entries(entities).reduce((acc, [key, ids]) => {
        acc[key] = { $unset: ids }

        return acc
      }, {})

      return update(state, updates)
    },
  },
  initialState
)
