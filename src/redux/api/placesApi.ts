import { Place } from '../../utils/types'
import { apiSlice } from './apiSlice'
const placesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getPlaces: builder.query<Place[], number>({
    //   query: (page) => {
    //     return `places?page=${page}`
    //   }
    // }),
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
