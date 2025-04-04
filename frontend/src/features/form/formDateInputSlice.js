import { createSlice } from "@reduxjs/toolkit";

export const DateinputSlice = createSlice({
    name: 'DateinputFields',
    initialState: {
        value: [
            {id:0,
            label: 'testdate1',
            required: false
            },
            {id:1,
                label: 'testdate2',
                required: false
                }
        ],
    },
    reducers:{
            addDateInput:(state, action)=>{
                const newobj = {
                    id: action.payload.id,
                    label:action.payload.label,
                    required: action.payload.required,
                    minDate: action.payload.minDate,
                    maxDate: action.payload.maxDate,

                }
                {state.value.push(newobj);}
            },
            removeDateInput:(state, selectedInput)=> {
                            state.value = state.value.filter(el => el.id !==  selectedInput.payload.id)
            }
    }
})

export const {addDateInput, removeDateInput } = DateinputSlice.actions

export const selectDateInputFields = (state) => state.DateinputFields.value

export default DateinputSlice.reducer

