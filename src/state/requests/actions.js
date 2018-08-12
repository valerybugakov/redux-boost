import { createActions } from 'redux-yo'

export const requestActions = createActions(
  ['fetchStart', 'fetchSuccess', 'fetchFail', 'resetRequest', 'resetRequests'],
  'requests'
)
