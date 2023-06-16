import axios, { AxiosError, type AxiosResponse } from 'axios'
import type { AxiosRequestConfig } from 'axios'

import { TokenCategory } from '@/common/constants'
import { retrieveAuthToken } from '@/common/functional'

type TRequestInterceptorResponse = AxiosRequestConfig | Promise<AxiosRequestConfig>

export function authInterceptor(config: AxiosRequestConfig): TRequestInterceptorResponse {
  const accessToken = retrieveAuthToken(TokenCategory.Access)
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
}

function logObject(title: string, obj?: Record<string, any>): void {
  if (obj === undefined) return console.log(`${title}: undefined`)

  console.groupCollapsed(title)
  for (const [key, param] of Object.entries(obj)) {
    console.log(`${key}: `, param)
  }

  console.groupEnd()
}

const isDevMode = import.meta.env.MODE === 'development'
export function requestLoggerInterceptor(config: AxiosRequestConfig): TRequestInterceptorResponse {
  if (isDevMode) {
    console.groupCollapsed(`Request  (${config.method?.toUpperCase()}):`, config.url)

    console.log('Uri: ', axios.getUri(config))
    logObject('Params', config.params)
    logObject('Data', config.data)

    console.groupEnd()
  }

  return config
}

export const responseLoggerInterceptor = {
  success(response: AxiosResponse): AxiosResponse {
    if (!isDevMode) return response

    console.groupCollapsed(`Response (${response.status}):`, response.config.url)
    console.log('Data: ', response.data)
    console.groupEnd()

    return response
  },
  error(err: AxiosError): any {
    if (!isDevMode) return Promise.reject(err)

    console.groupCollapsed(`Response (${err.response?.status}):`, err.config?.url)
    console.error('Data:', err.response?.data)
    console.groupEnd()

    return Promise.reject(err)
  }
}
