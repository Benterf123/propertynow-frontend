import { ILocation, ILocationJson } from './location.interface'

export default class LocationModel implements ILocation {
  public city: string
  public neighborhoods: string[]
  constructor(data: ILocation) {
    this.city = data.city
    this.neighborhoods = data.neighborhoods
  }

  static fromJson(json: ILocationJson): LocationModel {
    return new LocationModel({
      city: json.city,
      neighborhoods: json.neighborhoods,
    })
  }
}
