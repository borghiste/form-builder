import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
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
fields:formField[]
}

type formState = {status: string, form:formData | null, error: string
}

const initialState: formState = {status:'idle', // 'succeeded | 'loading | 'failed
                                form: {id:nanoid(), name:'', description:'', created_at:'', updated_at:'', fields:[{id:nanoid(), label:'submit', type:'button'}]},
                                }

const getForm = createAsyncThunk<formData, string>(
    'forms/getForm',
    async (formId: string) => {
        const res  = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms/${formId}`,
            {method:'GET',
                headers: {'Content-Type': 'application/json'},
            
            }
        )
        
       
        return await res.json() as formData

    }
)

const createForm = createAsyncThunk<formState, formData>(
    'forms/createForm',
    async (form) => {
        const res  = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms`,
            {method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
                
            }
        )
        if(res.ok){
        return res.json() as Promise<formData>;
        }

    })


const formSlice = createSlice({
    name:'form',
    initialState,
    reducers: {
        setFields(state, action) {
            state.form.fields = action.payload;
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
        builder.addCase(getForm.fulfilled, (state, action) => {
            

            state.status = 'succeeded';
            state.form = action.payload
         
        })

        builder.addCase(getForm.pending, (state) => {state.status = 'loading'})
        builder.addCase(getForm.rejected, (state) => {
            state.status= 'failed';
        })

        /* create form cases */
        builder.addCase(createForm.fulfilled, (state, action) => {
            state.status = 'succeeded';
            confirm.log('action',action)
            
        })
        builder.addCase(createForm.pending, (state) => {state.status = 'loading'
            console.log('loading...')
        })
    }
        
    })

    export default formSlice.reducer;

    export const selectForm = (state: RootState) => state.form.form;
    export const selectStatus = (state: RootState) => state.form.status;

export {getForm, createForm};
export const {addField, setFields, setFormName} = formSlice.actions



