import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { logOut, setReAccessToken } from '../features/authSlice'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import * as process from 'process'

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  const refreshToken = (api.getState() as RootState).auth.refreshToken
  if (result.error && result.error.status === 401) {
    // send refresh token to get new access token
    try {
      const refreshResult: any = await baseQuery(
        { url: 'auth/refresh-token', method: 'POST', body: { refreshToken } },
        api,
        extraOptions
      )
      if (refreshResult.data) {
        // store the new token
        api.dispatch(setReAccessToken({ accessToken: refreshResult.data.accessToken }))
        // retry the original query with new access token
        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(logOut())
      }
    } catch (error) {}
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['UserProfile', 'Reviews', 'Places', 'Comments', 'Friends'],
  endpoints: () => ({})
})
