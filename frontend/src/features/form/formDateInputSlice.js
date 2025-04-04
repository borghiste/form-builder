import { createSlice } from "@reduxjs/toolkit";

export const DateinputSlice = createSlice({
    name: 'DateinputFields',
    initialState: {
        value: [
            {id:1,
            label: 'testdate1'
            },
            {id:2,
                label: 'testdate2'
                }
        ],
    },
    reducers:{
            addDateInput:(state)=>{
                const newobj = {
                    id: 3,
                    label:'test3'
                }
                {state.value.push(newobj);}
            }
    }
})

export const {addDateInput} = DateinputSlice.actions

export const selectDateInputFields = (state) => state.DateinputFields.value

export default DateinputSlice.reducer

