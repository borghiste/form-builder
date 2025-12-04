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
    selectField(state, action: PayloadAction){
      state.field = action.payload
    } 


  }
 })

 export const {selectField} = fieldSlice.actions;
 export const FieldState = (state: RootState) => state.field.field;
 export default fieldSlice.reducer;


