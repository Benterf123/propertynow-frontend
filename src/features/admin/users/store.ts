import { defineStore } from 'pinia'

import { IApiRequestStatus } from '@/core/api'
import { getErrorMessage } from '@/core/api/utils'
import { UserModel } from '@/features/common/models'

import { adminUserService, type IUsersParams } from './service'

interface IState {
  usersApiStatus: IApiRequestStatus
  usersApiMsg: string
  users: UserModel[] | null
}

const state = (): IState => ({
  usersApiStatus: IApiRequestStatus.Default,
  usersApiMsg: '',
  users: null,
})

export const useAdminUsersStore = defineStore('admin-users', {
	state,
	actions: {
		async getUsers(params: IUsersParams) {
			try {
				this.usersApiStatus = IApiRequestStatus.Loading
				this.usersApiMsg = ''

				const response = await adminUserService.getUsers(params)
				const data = response.data
				this.users = data.map((d) => UserModel.fromJson(d))

				this.usersApiStatus = IApiRequestStatus.Success
			} catch(e) {
				this.usersApiStatus = IApiRequestStatus.Error

				const message = getErrorMessage(e)
				this.usersApiMsg = message
			}
		}
	}
})
