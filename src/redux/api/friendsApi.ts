import { apiSlice } from './apiSlice'
import { RequestFriendRes, User } from '../../utils/types'

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
    responseFriend: build.mutation<RequestFriendRes, number>({
      query: (userId) => {
        return {
          url: `friends/${userId}`,
          method: 'PATCH'
        }
      }
    }),
    deleteFriend: build.mutation<any, number>({
      query: (userId) => {
        return {
          url: `friends/${userId}`,
          method: 'DELETE'
        }
      }
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
    })
  })
})
export const {
  useListFriendQuery,
  useLazyGetFriendByIdQuery,
  useDeleteFriendMutation,
  useResponseFriendMutation,
  useRequestFriendMutation
} = friendsApi
