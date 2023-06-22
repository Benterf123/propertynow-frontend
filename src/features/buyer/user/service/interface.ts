import type { IApiResponse }from '@/core/api'

import type { IUserJson } from '../models/user.interface'

export type TUserApiResponse = IApiResponse<IUserJson>

export type TUserUpdatePayload = Partial<IUserJson>
export type TUserUpdateApiResponse = TUserApiResponse
