import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Coordinates } from '../../utils/types'
const initialState: Coordinates = {
  longitude: 106.65535788825068,
  latitude: 10.828187148975585
}
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction<Coordinates>) => {
      return { ...state, ...action.payload }
    }
  }
})
export const { updateLocation } = locationSlice.actions
export default locationSlice.reducer
