 import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 import { RootState } from "../app/store";

interface FieldState {
  id: string;
  label: string;
  type: string;
  required: boolean;
}

const initialState: FieldState =  {id: '',
  label: '',
  type: '',
  required: false
}

 const fieldSlice = createSlice({
  name:'field',
  initialState,
  reducers: {
    setField(state, action: PayloadAction<FieldState>) {
      return action.payload;
    }
    
  }
 })

 export const {setField} = fieldSlice.actions;
 export const selectField = (state: RootState) => state.field;
 export default fieldSlice.reducer;


