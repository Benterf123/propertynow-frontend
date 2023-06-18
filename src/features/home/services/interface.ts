import type { IApiResponse } from '@/core/api'

import type { IPropertyJson } from '../models/property.interface';


export interface IPropertiesParams {
	page?: number;
	limit?: number;
	price?: string;
	city?: string;
	neighborhood?: string;
}
export interface IPropertiesApiResponse extends IApiResponse<IPropertyJson[]> {}
