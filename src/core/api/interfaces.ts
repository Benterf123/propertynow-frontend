import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export enum IApiRequestStatus {
  Default = 'default',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export interface IApiRequestConfig extends AxiosRequestConfig {
  onSuccess?: (data: AxiosResponse) => void
  onError?: (err: unknown) => void
  isFormData?: boolean
}

export interface IApiRequestParams {
  pageSize?: number
  page?: number
  [propName: string]: any
}

export interface IApiResponse<T = unknown> extends AxiosResponse {
  data: T
}
