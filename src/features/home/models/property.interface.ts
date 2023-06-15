export interface IPropertyJson {
	id: number;
	title: string;
	description: string;
	price: string;
	location: {
		city: string;
		neighbourhood: string;
	}
}

export interface IProperty {
	id: number;
	title: string;
	description: string;
	price: string;
	location: {
		city: string;
		neighbourhood: string;
	}
}
