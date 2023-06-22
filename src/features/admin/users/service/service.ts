import { api } from '@/core/api'
import type { TUsersApiResponse, IUsersParams } from './interface'

export const adminUserService = {
  getUsers(params: IUsersParams) {
    return new Promise<TUsersApiResponse>((resolve, reject) => {
      api.get('/admin/users/', {
        params,
        onSuccess: resolve,
        onError: reject,
      })
    })
  },
}
