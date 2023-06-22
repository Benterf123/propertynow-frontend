import type { IUser, IUserJson } from './user.interface'

export default class UserModel implements IUser {
  public firstName: string
  public lastName: string
  public email: string
  public isAdmin: boolean

  constructor(data: IUser) {
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data.email
    this.isAdmin = data.isAdmin
  }

	static fromJson(json: IUserJson): UserModel {
		return new UserModel({
			firstName: json.first_name,
			lastName: json.last_name,
			email: json.email,
			isAdmin: json.account_type === 'admin'
		})
	}
}
