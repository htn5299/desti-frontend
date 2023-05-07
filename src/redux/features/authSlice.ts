import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { accessTokenState } from 'utils/types'

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: '', accessToken: '' },
  reducers: {
    setCredentials: (state, action: PayloadAction<accessTokenState>) => {
      state.email = action.payload.email
      state.accessToken = action.payload.accessToken
    },
    logOut: (state) => {
      state.email = ''
      state.accessToken = ''
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer

export const selectCurrentUser = (state: RootState) => state.auth.email
export const selectCurrentToken = (state: RootState) => state.auth.accessToken
