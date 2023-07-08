import { CreateLikeDto, LikeQuery, LikeType } from 'utils/types'
import { apiSlice } from './apiSlice'

export const likesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLike: builder.mutation<any, CreateLikeDto>({
      query: (body) => {
        return {
          url: 'likes',
          method: 'POST',
          body: body
        }
      }
    }),
    getLikeById: builder.query<LikeType, number>({
      query: (likeId) => {
        return {
          url: `likes/${likeId}`,
          method: 'GET'
        }
      }
    }),
    getLikeQuery: builder.query<LikeType[], Partial<LikeQuery>>({
      query: (likeQuery) => {
        const { user, review } = likeQuery
        let query = 'likes/q?'
        if (user && review) {
          query = query.concat('', `review=${review}&user=${user}`)
        } else if (user) {
          query = query.concat('', `user=${user}`)
        } else if (review) {
          query = query.concat('', `review=${review}`)
        }
        return {
          url: query,
          method: 'GET'
        }
      }
    })
  })
})
export const { useCreateLikeMutation, useLazyGetLikeQueryQuery, useGetLikeByIdQuery, useGetLikeQueryQuery } = likesApi
