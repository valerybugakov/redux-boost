import { createSelector } from 'reselect'

export const getEntityName = (_, { entity } = {}) => entity

export const getAllEntities = state => state.data

export const getEntitiesObject = createSelector(
  [getAllEntities, getEntityName],
  (entities, name) => entities[name] || {}
)

export const getEntities = createSelector([getEntitiesObject], entities =>
  Object.values(entities)
)
