import type { IApiResponse } from '@/core/api'

export interface ILoginPayload {
  email: string
  password: string
}

export interface ILoginApiResponse extends IApiResponse {
  data: { access_token: string }
}

export interface ISignupPayload {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface ISignupApiResponse extends IApiResponse {}
