const baseURL = 'http://localhost:5000/api'

export interface IResponse {
  apartments: IResponseApartment[]
  priceSqmMean?: number
  livingAreaSqmMean?: number
}
export interface IResponseApartment {
  id: number
  longitude: number
  latitude: number
  price_sqm: number
  living_area_sqm: number
}

export async function fetchApartments() {
  const url = `${baseURL}/apartment/`
  const res = await fetch(url)
  const apartmentResponse: IResponse = await res.json()

  const apartments = apartmentResponse.apartments.map(apartment => ({
    id: apartment.id,
    longitude: apartment.longitude,
    latitude: apartment.latitude,
    priceSqm: apartment.price_sqm,
    livingSqm: apartment.living_area_sqm,
  }))
  return apartments
}

export async function fetchApartmentsLocation(latitude: number, longitude: number) {
  const url = `${baseURL}/location/${latitude}/${longitude}/0.1`
  const res = await fetch(url)
  const apartmentResponse: IResponse = await res.json()
  const apartments = apartmentResponse.apartments.map(apartment => ({
    id: apartment.id,
    longitude: apartment.longitude,
    latitude: apartment.latitude,
    priceSqm: apartment.price_sqm,
    livingSqm: apartment.living_area_sqm,
  }))
  const priceSqmMean = apartmentResponse.priceSqmMean
  const livingAreaSqmMean = apartmentResponse.livingAreaSqmMean
  return { apartments, priceSqmMean, livingAreaSqmMean }
}
