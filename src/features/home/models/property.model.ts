import { IProperty, IPropertyJson } from './property.interface'

export default class Property implements IProperty {
  public id: number
  public title: string
  public description: string
  public price: string
  public location: { city: string; neighbourhood: string }

  constructor(data: IProperty) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.price = data.price
    this.location = data.location
  }

  static fromJson(json: IPropertyJson): Property {
    return new Property({
      id: json.id,
      title: json.title,
      description: json.description,
      price: json.price,
      location: json.location
    })
  }
}
