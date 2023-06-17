import type { IApiResponse } from '@/core/api'

import Property from "../models/property.model";


export interface IPropertiesParams {
	page?: number;
	limit?: number;
	price?: string;
	city?: string;
	neighborhood?: string;
}
export interface IPropertiesApiResponse extends IApiResponse<Property[]> {}
