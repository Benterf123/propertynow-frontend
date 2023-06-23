export interface IPropertyJson {
	_id: string;
	title: string;
	description: string;
	price: string;
	image_url: string[];
	location: {
		city: string;
		neighborhood: string;
	}
}

export interface IProperty {
	id: string;
	title: string;
	description: string;
	price: string;
	images: string[];
	location: {
		city: string;
		neighborhood: string;
	}
}
