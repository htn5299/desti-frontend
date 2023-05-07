import { UserCredentialsParams } from 'utils/types'
import { apiSlice } from '../api/apiSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query(body: UserCredentialsParams) {
        return {
          url: '/auth/signin',
          method: 'POST',
          body
        }
      }
    })
  })
})

export const { useLoginMutation } = authApiSlice
