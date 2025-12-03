import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type formField = {
    id: string,
    label: string,
    value?: string,
    type: string,
    
    validations?: { [key: string]: any }
}

type formData = {
    id: string,
    name: string,
    description: string,
    created_at: string,
    updated_at: string,
    form_fields: formField[]
}

type formState = {
    status: string,
    form: formData | null,
    error: string
}

const initialState: formState = {
    status: 'idle',
    form: { id: '', name:'', description:'', created_at:'', updated_at:'', form_fields:[] },
    error: ''
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForm(state, action: PayloadAction<formData>) {
            if(state.form){
                Object.assign(state.form, action.payload)
            }
        },
        setFormFields(state, action: PayloadAction<formField[]>) {
            if(state.form){
                state.form.form_fields = action.payload;
            }
        },
        addField(state, action: PayloadAction<formField>) {
            if(state.form){
                state.form.form_fields.push(action.payload);
            }
        },

      

    },
        
})

export default formSlice.reducer;

export const selectForm = (state: RootState) => state.form.form;
export const selectStatus = (state: RootState) => state.form.status;
export const { setForm, addField, setFormFields } = formSlice.actions;
