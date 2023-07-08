import { createSlice } from '@reduxjs/toolkit'

export type AppContextState = { isSearchPopup: boolean }
const initialState: AppContextState = {
  isSearchPopup: false
}
const appSlice = createSlice({
  name: 'appContext',
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isSearchPopup = !state.isSearchPopup
    },
    resetSearch: () => {
      return initialState
    }
  }
})

export const { toggleSearch, resetSearch } = appSlice.actions
export default appSlice.reducer
