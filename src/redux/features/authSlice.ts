import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { AuthState } from 'utils/types'
const initialState: AuthState = {
  email: '',
  accessToken: '',
  refreshToken: ''
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.email = action.payload.email
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    setReAccessToken: (state, action: PayloadAction<Omit<AuthState, 'email' | 'refreshToken'>>) => {
      state.accessToken = action.payload.accessToken
    },
    logOut: (state) => {
      state.email = ''
      state.accessToken = ''
      state.refreshToken = ''
    }
  }
})

export const { setCredentials, logOut, setReAccessToken } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.email
export const selectCurrentToken = (state: RootState) => state.auth.accessToken
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken
