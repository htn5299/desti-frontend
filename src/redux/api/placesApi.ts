import { Place, ReviewByUserAndPlace } from '../../utils/types'
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
    }),
    getReviewsByPlaceId: builder.query<ReviewByUserAndPlace[], string>({
      query: (placeId) => {
        return {
          url: `places/${placeId}/reviews`,
          method: 'GET'
        }
      }
    })
  })
})
export const { useGetReviewsByPlaceIdQuery, useGetPlaceQuery, useSearchPlacesQuery } = placesApi
