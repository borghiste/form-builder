import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ValidationDrawerState {
    value: string | null
}

const initialState:ValidationDrawerState = { value: null  }

const validationsDrawerSlice = createSlice({
  name: 'validationsDrawer',
  initialState,
  reducers: {
    setvalidationsField(state, action: PayloadAction) {
        state.value = action.payload
    }
    
  },
})

export const {setvalidationsField } = validationsDrawerSlice.actions;
export default validationsDrawerSlice.reducer;
export const selectvalidationDrawer = (state) => state.validationsDrawer.value;