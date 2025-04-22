import { createSlice } from "@reduxjs/toolkit";

//THIS SLICE CONTAINS THE STATE OF THE DARK MODE OPTION
export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: false,
    },
    reducers: {
        switchToDarkMode: (state) => {state.value = true},
        switchtoLightMode: (state) => {state.value = false},
    },

})

export const {switchToDarkMode, switchtoLightMode} = themeSlice.actions


export const selectMode = (state) => state.theme.value
export default themeSlice.reducer