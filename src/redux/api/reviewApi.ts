import { apiSlice } from './apiSlice'
import {
  AddReview,
  AddReviewResponse,
  ReviewByUserAndPlace,
  ReviewFeedRespone,
  ReviewsByPlace
} from '../../utils/types'

const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<ReviewFeedRespone[], number>({
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
    }),
    getReviewsByPlaceId: builder.query<ReviewsByPlace[], string>({
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
    createReview: builder.mutation<AddReviewResponse, AddReview>({
      query: (addReview) => {
        const { review, rating } = addReview
        return {
          url: `reviews/places/${addReview.placeId}`,
          method: 'POST',
          body: { review, rating }
        }
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