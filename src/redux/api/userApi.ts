import { UserProfile } from '../../utils/types'
import { apiSlice } from './apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserProfile, void>({
      query: () => {
        return {
          url: 'users/me',
          method: 'GET'
        }
      },
      providesTags: (result) => [{ type: 'UserProfile', id: 'LIST' }]
    }),
    getUserById: builder.query<UserProfile, string>({
      query: (id) => {
        return {
          url: `users/${id}`,
          method: 'GET'
        }
      }
    }),
    updateProfile: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: 'users/me',
          method: 'PATCH',
          body: body
        }
      },
      invalidatesTags: [{ type: 'UserProfile', id: 'LIST' }]
    })
  })
})
export const { useGetMeQuery, useUpdateProfileMutation, useGetUserByIdQuery } = userApi
