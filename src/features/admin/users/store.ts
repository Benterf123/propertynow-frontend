import { defineStore } from 'pinia'

import { IApiRequestStatus } from '@/core/api'
import { getErrorMessage } from '@/core/api/utils'
import { UserModel } from '@/features/common/models'

import { adminUserService, type IUsersParams } from './service'
import type { TUserUpdatePayload } from '@/features/buyer/user/service'

interface IState {
  usersApiStatus: IApiRequestStatus
  usersApiMsg: string
  users: UserModel[] | null

  userUpdateApiStatus: IApiRequestStatus
  userUpdateApiMsg: string
}

const state = (): IState => ({
  usersApiStatus: IApiRequestStatus.Default,
  usersApiMsg: '',
  users: null,

  userUpdateApiStatus: IApiRequestStatus.Default,
  userUpdateApiMsg: '',
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
      } catch (e) {
        this.usersApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.usersApiMsg = message
      }
    },

    async updateUser(id: string, payload: TUserUpdatePayload) {
      try {
        this.userUpdateApiStatus = IApiRequestStatus.Loading
        this.userUpdateApiMsg = ''

        const response = await adminUserService.updateUser(id, payload)
        const data = response.data
        const userIdx = this.users?.findIndex((u) => u.id === id) ?? -1
        if (userIdx > -1) {
          const user = UserModel.fromJson(data)
          this.users![userIdx] = user
        }

        this.userUpdateApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.userUpdateApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.userUpdateApiMsg = message
      }
    },
  },
})
