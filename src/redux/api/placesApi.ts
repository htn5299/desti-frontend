import { Place } from '../../utils/types'
import { apiSlice } from './apiSlice'
const placesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlace: builder.query<Place, string>({
      query: (placeId) => {
        return {
          url: `places/${placeId}`,
          method: 'GET'
        }
      }
    }),
    searchPlaces: builder.query<Place[], string>({
      query: (query) => {
        return {
          url: `places/search?q=${query}`,
          method: 'GET'
        }
      }
    })
  })
})
export const { useGetPlaceQuery, useSearchPlacesQuery } = placesApi
