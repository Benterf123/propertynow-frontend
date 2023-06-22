import { IApiRequestStatus } from '@/core/api'

import UserModel from './models/user.model'
import { defineStore } from 'pinia'
import { userService, type TUserUpdatePayload } from './service'
import { getErrorMessage } from '@/core/api/utils'

interface IState {
  userApiStatus: IApiRequestStatus
  userApiMsg: string
  user: UserModel | null

  userUpdateApiStatus: IApiRequestStatus
  userUpdateApiMsg: string
}

const state = (): IState => ({
  userApiStatus: IApiRequestStatus.Default,
  userApiMsg: '',
  user: null,

  userUpdateApiStatus: IApiRequestStatus.Default,
  userUpdateApiMsg: '',
})

export const useUserStore = defineStore('user', {
  state,
  actions: {
    async getProfile() {
      try {
        this.userApiStatus = IApiRequestStatus.Loading
        this.userApiMsg = ''

        // this.user = UserModel.fromJson({
        //   first_name: 'Test',
        //   last_name: 'Testy',
        //   email: 'test@ac.ac',
        //   account_type: 'admin',
        // })
        const response = await userService.getProfile()
        const data = response.data
        this.user = UserModel.fromJson(data)

        this.userApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.userApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.userApiMsg = message
      }
    },
    async updateProfile(payload: TUserUpdatePayload) {
      try {
        this.userUpdateApiStatus = IApiRequestStatus.Loading
        this.userUpdateApiMsg = ''

        const response = await userService.updateProfile(payload)
        const data = response.data
        this.user = UserModel.fromJson(data)

        this.userUpdateApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.userUpdateApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e)
        this.userUpdateApiMsg = message
      }
    },


		// Reset
		reset() {
			this.userApiStatus = IApiRequestStatus.Default
			this.userApiMsg = ''
			this.user = null
		}
  },
})
