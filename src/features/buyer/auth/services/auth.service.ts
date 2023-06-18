import { api } from '@/core/api'

import type {
  ISignupApiResponse,
  ILoginApiResponse,
  ILoginPayload,
  ISignupPayload
} from './interface'

export const authService = {
  login(payload: ILoginPayload) {
    return new Promise<ILoginApiResponse>((resolve, reject) => {
      api.post('auth/login/', payload, {
        onSuccess: resolve,
        onError: reject
      })
    })
  },

  signup(payload: ISignupPayload) {
    return new Promise<ISignupApiResponse>((resolve, reject) => {
      api.post('auth/signup/', payload, {
        onSuccess: resolve,
        onError: reject
      })
    })
  }
}
