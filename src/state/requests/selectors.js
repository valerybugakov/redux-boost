import get from 'lodash.get'
import { createSelector } from 'reselect'

export const getOperationName = (_, { operation } = {}) => operation

export const getRequests = state => state.requests

export const getRequest = createSelector(
  getRequests,
  getOperationName,
  (requests, operation) => requests[operation]
)

export const getResult = createSelector(
  [getRequests, getOperationName],
  (requests, operation) => get(requests, `${operation}.result`)
)

export const getError = createSelector(
  [getRequests, getOperationName],
  (requests, operation) => get(requests, `${operation}.error`)
)

export const getIsLoading = createSelector(
  [getRequests, getOperationName],
  (requests, operation) => get(requests, `${operation}.loading`)
)

export const getIsSuccess = createSelector(
  [getRequests, getOperationName],
  (requests, operation) => get(requests, `${operation}.success`)
)
