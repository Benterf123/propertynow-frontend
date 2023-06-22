import type { IApiResponse } from '@/core/api'

import type { IUserJson } from "../models/user.interface";

export interface IUsersParams {
	page: number;
	limit: number;
}

export type TUsersApiResponse = IApiResponse<IUserJson[]>
