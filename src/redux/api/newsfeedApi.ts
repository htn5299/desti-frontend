import { apiSlice } from './apiSlice'
import { ReviewFeedResponse } from '../../utils/types'

const newsfeedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsNewsfeed: builder.query<ReviewFeedResponse[], number>({
      query: (page) => {
        return {
          url: `newsfeed?page=${page}`
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
export const { useGetReviewsNewsfeedQuery } = newsfeedApi
