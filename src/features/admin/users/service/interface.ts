import type { IApiResponse } from '@/core/api'
import type { IUserJson } from '@/features/common/interface';

export interface IUsersParams {
	page: number;
	limit: number;
}

export type TUsersApiResponse = IApiResponse<IUserJson[]>

export type TUserUpdatePayload = Partial<Exclude<IUserJson, '_id'>>
export type TUserUpdateApiResponse = IApiResponse<IUserJson>
