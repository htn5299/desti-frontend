import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserProfile } from '../../utils/types'
const initialState: UserProfile = {
  id: null,
  email: '',
  name: '',
  profile: {
    id: null,
    about: '',
    avatar: ''
  }
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<Partial<UserProfile>>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})
export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer
