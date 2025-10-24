import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";


type formField = {
    id: string,
    label: string,
    value?: string,
    type: string,
    validations?: {[key:string]: any}
}

type formData = { id: string,
name: string,
description: string,
created_at: string,
updated_at: string,
form_fields:formField[]
}

type formState = {status: string, form:formData | null, error: string
}

const initialState: formState = {status:'idle', // 'succeeded | 'loading | 'failed
                                form: {id: '', name:'', description:'', created_at:'', updated_at:'', form_fields:[]},
                                }


const formSlice = createSlice({
    name:'form',
    initialState,
    reducers: {
        setForm(state, action: PayloadAction<FormData>){
            state.form = action.payload;
        }
        ,
        setFields(state, action) {
            state.form.form_fields = action.payload;
        },
        addField: (state, action) => {

            if(state.form){
           
            state.form?.fields.push(action.payload);
            }
        },
        setFormName(state, action) {
            if(state.form){
            state.form.name = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        


    }})

    export default formSlice.reducer;

    export const selectForm = (state: RootState) => state.form.form;
    export const selectStatus = (state: RootState) => state.form.status;

export const { setForm} = formSlice.actions;
export const {addField, setFields, setFormName} = formSlice.actions



