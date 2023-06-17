import { api } from '@/core/api'

import type { IPropertiesApiResponse, IPropertiesParams } from './interface'

export const propertiesService = {
  retrieveAll(params: IPropertiesParams) {
    return new Promise<IPropertiesApiResponse>((resolve, reject) => {
      api.get('properties/', { params, onSuccess: resolve, onError: reject })
    })
  }
}
