import type { IApiResponse } from '@/core/api'

export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoginApiResponse extends IApiResponse {
  data: {
    status: string
    message: string
    data: {
      accessToken: string
      refreshToken: string
    }
  }
}

export interface ISignupPayload {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface ISignupApiResponse extends IApiResponse {}
