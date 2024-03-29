import { apiSlice } from './apiSlice'
import { RequestFriendRes, StatusCode, User } from '../../utils/types'

const friendsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    requestFriend: build.mutation<RequestFriendRes, number>({
      query: (userId) => {
        return {
          url: `friends/${userId}`,
          method: 'POST'
        }
      }
    }),
    responseFriend: build.mutation<RequestFriendRes, { friendId: number; status: StatusCode }>({
      query: (content) => {
        return {
          url: `friends/${content.friendId}`,
          body: { status: content.status },
          method: 'PATCH'
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Friends', id: arg.friendId }]
    }),
    deleteFriend: build.mutation<any, number>({
      query: (userId) => {
        return {
          url: `friends/${userId}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Friends', id: arg }]
    }),
    listFriend: build.query<User[], number>({
      query: (userId) => {
        return {
          url: `friends/users/${userId}`,
          method: 'GET'
        }
      }
    }),
    getFriendById: build.query<User, number>({
      query: (userId) => {
        return {
          url: `friends/${userId}`,
          method: 'GET'
        }
      }
    }),
    checkFriend: build.query<RequestFriendRes, number>({
      query: (friendId) => {
        return {
          url: `friends/check/${friendId}`,
          method: 'GET'
        }
      },
      providesTags: (result, error, arg) => [{ type: 'Friends', id: arg }]
    })
  })
})
export const {
  useListFriendQuery,
  useLazyGetFriendByIdQuery,
  useDeleteFriendMutation,
  useResponseFriendMutation,
  useRequestFriendMutation,
  useCheckFriendQuery,
  useLazyCheckFriendQuery
} = friendsApi
