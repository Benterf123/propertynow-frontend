import { defineStore } from 'pinia'

import { IApiRequestStatus } from '@/core/api'
import { getErrorMessage } from '@/core/api/utils'
import { isAuthTokenValid, removeAuthToken, saveAuthToken } from '@/common/functional'
import { TokenCategory } from '@/common/constants'

import { authService, type ILoginPayload, type ISignupPayload } from './services'
import { useUserStore } from '../user/store'

interface IState {
  loginApiStatus: IApiRequestStatus
  loginApiMsg: string
	isUserAuthed: boolean

  signupApiStatus: IApiRequestStatus
  signupApiMsg: string
}

const state = (): IState => ({
  loginApiStatus: IApiRequestStatus.Default,
  loginApiMsg: '',
	isUserAuthed: isAuthTokenValid(),

  signupApiStatus: IApiRequestStatus.Default,
  signupApiMsg: ''
})

export const useAuthStore = defineStore('auth-store', {
  state,
  actions: {
    async login(payload: ILoginPayload) {
      try {
        this.loginApiMsg = ''
        this.loginApiStatus = IApiRequestStatus.Loading

        const response = await authService.login(payload)
        const accessToken = response.data.access_token

        saveAuthToken(accessToken)
				this.isUserAuthed = true;
        this.loginApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.loginApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e, 'An error occured while logging in.')
        this.loginApiMsg = message
      }
    },

    async signup(payload: ISignupPayload) {
      try {
        this.signupApiMsg = ''
        this.signupApiStatus = IApiRequestStatus.Loading

        await authService.signup(payload)

        this.signupApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.signupApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e, 'An error occured while signing up')
        this.signupApiMsg = message
      }
    },

		logout() {
			this.loginApiStatus = IApiRequestStatus.Default;
			this.loginApiMsg = '';
			this.signupApiStatus = IApiRequestStatus.Default;
			this.signupApiMsg = '';

			const userStore = useUserStore()
			userStore.reset()

			removeAuthToken(TokenCategory.Access)
			this.isUserAuthed = false
		}
  }
})
