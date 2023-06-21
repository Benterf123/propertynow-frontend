import type { IApiResponse } from '@/core/api'
import type { ILocationJson } from '@/features/common/interface'

export interface ILocationsApiResponse extends IApiResponse<ILocationJson[]> {}

export interface ILocationAddPayload extends ILocationJson {}
export interface ILocationAddApiResponse extends IApiResponse {}
