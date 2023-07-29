import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppContextState } from '../../utils/types'

const initialState: AppContextState = {
  isSearchPopup: false,
  messageEditId: null,
  messageEdit: ''
}
const appSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isSearchPopup = !state.isSearchPopup
    },
    resetSearch: () => {
      return initialState
    },
    setMessageEditId: (state, action: PayloadAction<{ messageEditId: number | null; messageEdit: string }>) => {
      state.messageEditId = action.payload.messageEditId
      state.messageEdit = action.payload.messageEdit
    }
  }
})

export const { toggleSearch, resetSearch, setMessageEditId } = appSlice.actions
export default appSlice.reducer
