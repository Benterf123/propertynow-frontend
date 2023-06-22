import { IApiRequestStatus } from '@/core/api'

import UserModel from './models/user.model'
import { defineStore } from 'pinia'
import { userService } from './service'
import { getErrorMessage } from '@/core/api/utils'

interface IState {
  userApiStatus: IApiRequestStatus
  userApiMsg: string
  user: UserModel | null
}

const state = (): IState => ({
  userApiStatus: IApiRequestStatus.Default,
  userApiMsg: '',
  user: null,
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

		reset() {
			this.userApiStatus = IApiRequestStatus.Default
			this.userApiMsg = ''
			this.user = null
		}
  },
})
