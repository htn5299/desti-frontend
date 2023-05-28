import { createSlice } from '@reduxjs/toolkit'
const initialState: { page: number } = {
  page: 1
}
const appSlice = createSlice({
  name: 'appContext',
  initialState,
  reducers: {
    setPage: (state) => {
      state.page = state.page + 1
    },
    setPagePrev: (state) => {
      state.page = state.page - 1
    },
    resetPage: (state) => {
      state.page = 1
    }
  }
})

export const { setPage, resetPage, setPagePrev } = appSlice.actions
export default appSlice.reducer
