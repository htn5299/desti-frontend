import { AuthState, UserCreateBody, UserCredentialsParams } from 'utils/types'
import { apiSlice } from './apiSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Omit<AuthState, 'email'>, UserCredentialsParams>({
      query: (body: UserCredentialsParams) => {
        return {
          url: 'auth/signin',
          method: 'POST',
          body: body
        }
      }
    }),
    logout: builder.mutation<Omit<AuthState, 'email'>, Omit<AuthState, 'email' | 'accessToken'>>({
      query: (body: Omit<AuthState, 'email' | 'accessToken'>) => {
        return {
          url: 'auth/signout',
          method: 'POST',
          body
        }
      }
    }),
    refreshToken: builder.mutation<Omit<AuthState, 'email' | 'refreshToken'>, Omit<AuthState, 'email' | 'accessToken'>>(
      {
        query: (body: Omit<AuthState, 'email' | 'accessToken'>) => {
          return {
            url: 'auth/refreshToken',
            method: 'POST',
            body
          }
        }
      }
    ),
    register: builder.mutation<any, UserCreateBody>({
      query(body: UserCreateBody) {
        return {
          url: '/auth/register',
          method: 'POST',
          body
        }
      }
    })
  })
})

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation, useLogoutMutation } = authApi
