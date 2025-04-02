import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

export const TextInputSlice = createSlice({
  name: 'TextFields',
  initialState: {
    value: [],
  },
  reducers: {
    addTextInput: (state, action) => {
      
      const newobj = {id: action.payload.id,
        label: action.payload.label,
        length: action.payload.length,
        required: action.payload.required
        
      }
      
  {state.value.push(newobj)}

       
    },
    removeTextInput: (state, selected) => {
   
       state.value = state.value.filter(el => el.id !== selected.payload.id)
      

      
    },
 
  },
})

export const { addTextInput, removeTextInput } = TextInputSlice.actions




export const selectTextInputFields = (state) => state.TextInputFields.value

export default TextInputSlice.reducer
