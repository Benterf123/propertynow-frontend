export interface IUserJson {
	_id: string;
	first_name: string
	last_name: string
	email: string
	account_type: string
}

export interface IUser {
	id: string;
	firstName: string
	lastName: string
	email: string
	isAdmin: boolean
}
