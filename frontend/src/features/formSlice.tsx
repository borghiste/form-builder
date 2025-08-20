import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type formField = {
    id: string,
    label: string,
    value?: string,
    type: string}

type formData = { id: string,
name: string,
description: string,
created_at: string,
updated_at: string,
field:formField[]
}

type formState = {status: string, form:formData | null, error: string
}

const initialState: formState = {status:'idle', // 'succeeded | 'loading | 'failed
                                form: null
                                }

const getForm = createAsyncThunk<formData, number>(
    'forms/getForm',
    async (formId: number) => {
        const res  = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms/${formId}`,
            {method:'GET',
                headers: {'Content-Type': 'application/json'},
            
            }
        )
        
        return await res.json() as formData
    }
)

const formSlice = createSlice({
    name:'form',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getForm.fulfilled, (state, action) => {
            state.status = 'succeeded';
            
            state.form = action.payload;
        })

        builder.addCase(getForm.pending, (state) => {state.status = 'loading'})
        builder.addCase(getForm.rejected, (state) => {
            state.status= 'failed';
        })
    }
        
    })

    export default formSlice.reducer;
export const selectForm = (state: RootState) => state.form;



