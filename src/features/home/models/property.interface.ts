export interface IPropertyJson {
	id: number;
	title: string;
	description: string;
	price: string;
	image_url: string;
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
	image: string;
	location: {
		city: string;
		neighbourhood: string;
	}
}
