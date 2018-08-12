import { storeLink } from '../store'
import { requestActions } from './actions'

export const fetchStart = (payload, meta = {}) =>
  new Promise((resolve, reject) =>
    storeLink.store.dispatch(
      requestActions.fetchStart(payload, {
        resolve: resp => {
          resolve(resp)
          if (meta.resolve) meta.resolve(resp)
        },

        reject: error => {
          reject(error)
          if (meta.reject) meta.reject(error)
        },
      })
    )
  )
