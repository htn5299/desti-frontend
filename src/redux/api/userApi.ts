import { UserProfile } from '../../utils/types'
import { apiSlice } from './apiSlice'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserProfile, void>({
      query: () => {
        return 'users/me'
      }
    })
  })
})
export const { useGetMeQuery } = userApi
