import { createSlice } from "@reduxjs/toolkit";

export const formTitleSlice = createSlice({
    name: 'formTitle',
    initialState: {
        value: {},
    },
    reducers:{
        addFormTitle
    }
})