import { createSlice, nanoid } from '@reduxjs/toolkit'

export const formSlice = createSlice({
  name: 'Field',
  initialState: {
    value: [{id:1,
      label:'test'}, {id:2, label:'test2'}],
  },
  reducers: {
    addTextInput: (state) => {
      const newobj = {id: nanoid(),
        label:'test3'
      }
      
  {state.value.push(newobj)}

        //  state.value.push(newobj)
    },
    removeTextInput: (state, selected) => {
   
       state.value = state.value.filter(el => el.id !== selected.payload.id)
      

      
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { addTextInput, removeTextInput, incrementByAmount } = formSlice.actions



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectField = (state) => state.field.value

export default formSlice.reducer
