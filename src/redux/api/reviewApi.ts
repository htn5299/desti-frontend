import { apiSlice } from './apiSlice'
import { AddReview, ReviewByUserAndPlace } from '../../utils/types'

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<ReviewByUserAndPlace, AddReview>({
      query: (addReview) => {
        const { review, rating } = addReview
        return {
          url: `reviews/places/${addReview.placeId}`,
          method: 'POST',
          body: { review, rating }
        }
      }
    }),
    getReviewsByPlaceId: builder.query<ReviewByUserAndPlace[], string>({
      query: (placeId) => {
        return {
          url: `reviews/places/${placeId}`,
          method: 'GET'
        }
      }
      // providesTags: (result) => [{ type: 'Reviews', id: 'LIST' }]
    }),
    getReviewsByUserId: builder.query<ReviewByUserAndPlace[], string>({
      query: (userId) => {
        return {
          url: `reviews/users/${userId}`,
          method: 'GET'
        }
      }
    }),
    getMyReview: builder.query<ReviewByUserAndPlace, { placeId: string | number }>({
      query: ({ placeId }) => {
        return {
          url: `reviews/places/${placeId}/me`,
          method: 'GET'
        }
      },
      providesTags: (result) => [{ type: 'Reviews', id: 'LIST' }]
    }),
    updateMyReview: builder.mutation<ReviewByUserAndPlace, AddReview>({
      query: (addReview) => {
        const { review, rating } = addReview
        return {
          url: `reviews/places/${addReview.placeId}/me`,
          method: 'PATCH',
          body: { review, rating }
        }
      }
    }),
    deleteMyReview: builder.mutation<{}, string>({
      query: (placeId) => {
        return {
          url: `reviews/places/${placeId}/me`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, data) => {
        return error ? [] : [{ type: 'Reviews', id: 'LIST' }]
      }
    })
  })
})
export const {
  useCreateReviewMutation,
  useGetReviewsByPlaceIdQuery,
  useGetReviewsByUserIdQuery,
  useUpdateMyReviewMutation,
  useGetMyReviewQuery,
  useDeleteMyReviewMutation
} = reviewApi
