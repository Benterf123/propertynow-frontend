import { defineStore } from 'pinia'

import { IApiRequestStatus } from '@/core/api'
import { getErrorMessage } from '@/core/api/utils'

import { authService, type ILoginPayload, type ISignupPayload } from './services'
import { isTokenForAdmin, saveAuthToken } from '@/common/functional'

interface IState {
  loginApiStatus: IApiRequestStatus
  loginApiMsg: string

  signupApiStatus: IApiRequestStatus
  signupApiMsg: string
}

const state = (): IState => ({
  loginApiStatus: IApiRequestStatus.Default,
  loginApiMsg: '',

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
        const isAdmin = isTokenForAdmin(accessToken)

        saveAuthToken(accessToken)
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

        const response = await authService.signup(payload)

        this.signupApiStatus = IApiRequestStatus.Success
      } catch (e) {
        this.signupApiStatus = IApiRequestStatus.Error

        const message = getErrorMessage(e, 'An error occured while signing up')
        this.signupApiMsg = message
      }
    }
  }
})
