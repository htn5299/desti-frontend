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

    getMyReview: builder.query<ReviewByUserAndPlace, { placeId: string | number }>({
      query: ({ placeId }) => {
        return {
          url: `reviews?place=${placeId}`,
          method: 'GET'
        }
      }
    })
  })
})
export const { useCreateReviewMutation, useGetMyReviewQuery } = reviewApi
