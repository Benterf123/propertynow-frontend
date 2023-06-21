import { api } from '@/core/api'
import type { ILocationAddPayload, ILocationAddApiResponse } from './interface'

export const adminLocationService = {
  addLocation(payload: ILocationAddPayload) {
    return new Promise<ILocationAddApiResponse>((resolve, reject) => {
      api.post('admin/locations/add/', payload, {
        onSuccess: resolve,
        onError: reject,
      })
    })
  },
}
