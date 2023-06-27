import { api } from '@/core/api'
import type { TUsersApiResponse, TUserUpdatePayload, IUsersParams, TUserUpdateApiResponse } from './interface'

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
	
	updateUser(id: string, payload: TUserUpdatePayload) {
		return new Promise<TUserUpdateApiResponse>((resolve, reject) => {
			api.post(`/admin/users/${id}/update`, payload, {
				onSuccess: resolve,
				onError: reject,
			})
		})
	}
}
