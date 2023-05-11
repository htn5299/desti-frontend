import { Place } from '../../utils/types'
import { apiSlice } from './apiSlice'
const placesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlaces: builder.query<Place[], void>({
      query: () => {
        return 'places'
      }
    }),
    getPlace: builder.query<Place, string>({
      query: (placeId) => {
        return {
          url: `places/${placeId}`
        }
      }
    })
  })
})
export const { useGetPlacesQuery, useGetPlaceQuery } = placesApi
