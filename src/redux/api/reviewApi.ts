import { apiSlice } from './apiSlice'
import { AddReview, AddReviewResponse, ReviewByUserAndPlace, ReviewFeedResponse } from '../../utils/types'

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
          url: `reviews?place=${placeId}`,
          method: 'GET'
        }
      }
    }),
    getReviewsByUserPlaceId: builder.query<ReviewByUserAndPlace, { placeId: string | number; userId: string | number }>(
      {
        query: ({ placeId, userId }) => {
          return {
            url: `reviews?place=${placeId}&user=${userId}`,
            method: 'GET'
          }
        }
      }
    ),
    getReviews: builder.query<ReviewFeedResponse[], number>({
      query: (page) => {
        return {
          url: `reviews/feed?page=${page}`,
          method: 'GET'
        }
      },
      keepUnusedDataFor: 0,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      }
    })
  })
})
export const {
  useGetReviewsByPlaceIdQuery,
  useCreateReviewMutation,
  useGetReviewsByUserPlaceIdQuery,
  useGetReviewsQuery
} = reviewApi
