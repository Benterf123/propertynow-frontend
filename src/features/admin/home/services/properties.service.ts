import { api } from '@/core/api'

import type { IPropertyAddApiResponse, TPropertyAddPayload } from './interface'

export const propertiesService = {
  addProperty(payload: TPropertyAddPayload) {
    const formData = new FormData()
    for (const [field, value] of Object.entries(payload)) {
      if (Array.isArray(value)) {
        for (const v of value) formData.append(field, v)
        continue
      }

      formData.set(field, value)
    }

    return new Promise<IPropertyAddApiResponse>((resolve, reject) => {
      api.post('/admin/properties/add', formData, {
        onSuccess: resolve,
        onError: reject,
				isFormData: true,
      })
    })
  },
}
