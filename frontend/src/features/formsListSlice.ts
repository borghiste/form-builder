import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {forms: [],
                        status:'idle', // 'succeeded | 'loading | 'failed
                        error: null
}

// FORM LIST THUNK
const fetchformsList = createAsyncThunk(
    'forms/fetchFormsList',
    async () => {
         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms`)
         if(!res.ok){
            throw new Error('error loading forms list');
           

         }
         const data = await res.json();

       
       
         return data
    }
)

const createNewForm = createAsyncThunk(
    'forms/createNewForm',
    async (newFormData) => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms`,
            {method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFormData)
            }
            
        )
        if(!res.error){
            throw new Error('error creating new form')
        }
        return await res.json()
    }
)

const deleteForm = createAsyncThunk<FormData, string>(
    'forms/deleteForm',
    async (formId) => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms/${formId}`,
            {method:'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formId)
            }
        )

        if(res.ok){
            console.log(res)
            return await res.json();
            
        }
    }
)

export const formsListSlice = createSlice({
    name:'forms',
    initialState,
    reducers: {
      
},
    extraReducers: (builder) => {
        builder.addCase(fetchformsList.fulfilled, (state, action) => {
            
            state.status = 'succeeded';
           
            const list = action.payload;


            state.forms =list;

            
        })

        builder.addCase(fetchformsList.pending, (state) => {
            state.status = 'loading';
        })

        builder.addCase(fetchformsList.rejected, (state) => {
            
            state.status = 'failed';
        })

        builder.addCase(deleteForm.fulfilled, (state) => {
            state.status = 'succeeded';
        })
        builder.addCase(createNewForm.fulfilled, (state, action) => {state.status = 'succeeded'
                                                            state.forms.push(action.payload)
        })
    
        
        
        
        builder.addCase(createNewForm.pending, (state) => {state.status ='loading'})
        
        builder.addCase(createNewForm.rejected, (state) => {state.status ='failed';
            
        })
    }})


    



export default formsListSlice.reducer;
export const selectList = (state) => state.forms;


export const selectForms = (state) => state.forms.forms;
export const selectFormsStatus = (state) => state.forms.status;
export const selectFormsError = (state) => state.forms.error;
export { fetchformsList, createNewForm, deleteForm }; 
