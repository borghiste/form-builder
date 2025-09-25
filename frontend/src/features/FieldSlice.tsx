import { createSlice } from "@reduxjs/toolkit";

interface FieldState {
    id: string | null;
    type: string | null;
    label: string | null;
    validations?: Record<string> | null; 
}

const initialState: FieldState = {
    id: null,
    type: null,
    label: null,
    validations: null,
}

const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        setField(state, action) {
            state = action.payload;
        },
        addValidations(state, action) {
            state.validations = action.payload;
        },
        setFieldType(state, action) {
            state.type = action.payload;
        },
        setFieldLabel(state, action) {
            state.label = action.payload;
        },
        setFieldId(state, action) {
            state.id = action.payload;
        },
    } 
});

export const {setField ,addValidations,setFieldLabel, setFieldType } = fieldSlice.actions;
export default fieldSlice.reducer;
export const selectField = (state: { field: FieldState }) => state.field;