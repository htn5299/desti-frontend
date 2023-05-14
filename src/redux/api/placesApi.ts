import { AddReview, Place, ReviewResponse } from '../../utils/types'
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
    }),
    getReviews: builder.query<ReviewResponse[], string>({
      query: (placeId) => {
        return {
          url: `places/${placeId}/reviews`
        }
      }
    }),
    createReview: builder.mutation<ReviewResponse, AddReview>({
      query: ({ placeId, ...content }) => {
        return {
          url: `places/${placeId}/reviews`,
          method: 'POST',
          body: content
        }
      }
    })
  })
})
export const { useGetPlacesQuery, useGetPlaceQuery, useGetReviewsQuery, useCreateReviewMutation } = placesApi
