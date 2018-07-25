import { createActions } from 'redux-yo'

export const dataActions = createActions(
  ['setEntities', 'deleteEntities'],
  'data'
)
