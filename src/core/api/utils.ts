import type { AxiosError } from 'axios'

import type { IApiResponse } from './interfaces'

type TParsedParams = Record<string, string | boolean | any[]>

export function parseParam(param?: Record<string, any>): string | null {
  if (param && Object.keys(param).length > 0) {
    const parsed = Object.entries(param)
      .map((param) => (param[1] == '' ? '' : `${param[0]}::${param[1]}`))
      .join('|')
    return parsed !== '' ? parsed : null
  }

  return null
}

export function parseParams(params: any) {
  const finalParams: TParsedParams = {}

  const filterParams = parseParam(params?.filterParams)
  if (filterParams) finalParams['filter'] = filterParams

  const searchParams = parseParam(params?.searchParams)
  if (searchParams) finalParams['search'] = searchParams

  const sortParams = parseParam(params?.sortParams)
  if (sortParams) finalParams['sort'] = sortParams

  delete params?.filters
  delete params?.searchParams
  delete params?.sortParams
  Object.assign(finalParams, params)

  return finalParams
}

export function getErrorMessage(err: any, message = 'An error occured. Please try again later.') {
  const errCode = (err as AxiosError).code
  if (errCode && ['ERR_NETWORK', 'ECONNABORTED'].includes(errCode))
    message =
      'Could not connect to our servers. Make sure you have an internet connection and try again.'

  const resp: IApiResponse<{ error?: string, message?: string }> = (err as any).response
  if (resp) message = resp.data.error ?? resp.data.message ?? message
	
  return message
}
