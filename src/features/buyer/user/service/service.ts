import { api } from '@/core/api'

import type { TUserApiResponse } from './interface'

export const userService = {
  async getProfile() {
    return new Promise<TUserApiResponse>((resolve, reject) => {
      api.get('/user/profile/', {
        onSuccess: resolve,
        onError: reject,
      })
    })
  },
}
