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
    loginWithGoogle: builder.query<any, undefined>({
      query: () => {
        return {
          url: 'auth/google/login',
          method: 'GET'
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
    }),
    validateCode: builder.query<any, string>({
      query(code) {
        return {
          url: `/auth/validateCode/${code}`,
          method: 'GET'
        }
      }
    }),
    forgetPassword: builder.mutation<any, Pick<UserCredentialsParams, 'email'>>({
      query(body) {
        return {
          url: `auth/forget`,
          method: 'POST',
          body: body
        }
      }
    }),
    resetPassword: builder.mutation<any, Pick<UserCredentialsParams, 'password'> & { id: string }>({
      query(body) {
        const { id, password } = body
        return {
          url: `auth/reset/${id}`,
          method: 'PATCH',
          body: { password }
        }
      }
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useLoginWithGoogleQuery,
  useValidateCodeQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation
} = authApi
