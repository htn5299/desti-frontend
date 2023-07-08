import { apiSlice } from './apiSlice'
import {
  CommentResponse,
  CreateComment,
  CreateCommentResponse,
  DeleteCommentResponse,
  LikeQuery
} from '../../utils/types'

const commentApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<CreateCommentResponse, CreateComment>({
      query: (content) => {
        return {
          url: `comments`,
          method: 'POST',
          body: content
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Comments', id: arg.reviewId }]
    }),
    deleteComment: build.mutation<DeleteCommentResponse, number>({
      query: (commentId) => {
        return {
          url: `comments/${commentId}`,
          method: 'DELETE'
        }
      }
    }),
    getComments: build.query<CommentResponse[], number>({
      query: (commentId) => {
        return {
          url: `comments/${commentId}`,
          method: 'GET'
        }
      }
    }),
    getCommentsReviewOrUser: build.query<CommentResponse[], Partial<LikeQuery>>({
      query: (likeQuery) => {
        const { user, review } = likeQuery
        let query = 'comments/q?'
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
      },
      providesTags: (result, error, arg) => [{ type: 'Comments', id: arg.review }]
    })
  })
})
export const {
  useCreateCommentMutation,
  useGetCommentsQuery,
  useGetCommentsReviewOrUserQuery,
  useDeleteCommentMutation
} = commentApi
