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
})


export const selectDateInputFields = (state) => state.DateinputFields.value

export default DateinputSlice.reducer

