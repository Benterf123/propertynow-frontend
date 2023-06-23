import type { IProperty, IPropertyJson } from './property.interface'

export default class Property implements IProperty {
  public id: string
  public title: string
  public description: string
  public price: string
  public images: string[]
  public location: { city: string; neighborhood: string }

  constructor(data: IProperty) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.price = data.price
    this.location = data.location
    this.images = data.images
  }

  static fromJson(json: IPropertyJson): Property {
    return new Property({
      id: json._id,
      title: json.title,
      description: json.description,
      price: json.price,
      location: json.location,
      images: json.image_url,
    })
  }

  get image(): string {
    return this.images[0]
  }
}
