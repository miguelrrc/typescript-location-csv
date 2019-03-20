export interface IApartment {
  id: number
  latitude: number
  longitude: number
  priceSqm: number
  livingSqm: number
}

export interface ApartmentMedian {
  apartments: IApartment[]
  priceSqmMean: number
  livingAreaSqmMean: number
}
