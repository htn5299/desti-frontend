import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { logOut, setCredentials } from '../features/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/api',
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.data === 401) {
    // send refresh token to get new access token
    try {
      console.log('sending refresh token')
      const refreshResult: any = await baseQuery('/refresh', api, extraOptions)
      if (refreshResult.data) {
        const email = (api.getState() as RootState).auth.email
        // store the new token
        api.dispatch(setCredentials({ accessToken: refreshResult.data.accessToken, email }))
        // retry the original query with new access token
        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(logOut())
      }
    } catch (error) {
      console.log('console_log: ', error)
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({})
})
