import type { IApiResponse } from '@/core/api'
import type { IPropertyJson } from '@/features/home/models/property.interface'

export type TPropertyAddPayload = Omit<IPropertyJson, '_id' | 'image_url' | 'location'> & { city: string, neighborhood: string, images: File[] }
export interface IPropertyAddApiResponse extends IApiResponse<IPropertyJson> {}

export type TPropertyDeleteApiResponse = IApiResponse
