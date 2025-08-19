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
        return await res.json()
    }
)

export const formsListSlice = createSlice({
    name:'forms',
    initialState,
    reducers: {
    //     addNewForm: (state, action) => {
    //             const {name, description, created_at, updated_at} = action.payload
    //             const newForm = {name: 'test',
    //                             description: 'des2',
    //                             created_at: '2025-01-01',
    //                             updated_at: '2025-02-02'
    //             }
    //             state.forms.push(newForm)
    // }
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

        builder.addCase(createNewForm.fulfilled, (state, action) => {state.status = 'succeeded'
                                                            state.forms.push(action.payload)
        })

        builder.addCase(createNewForm.pending, (state) => {state.status ='loading'})

        builder.addCase(createNewForm.rejected, (state) => {state.status ='failed';
                                                                
        })


    
}
})


export default formsListSlice.reducer;
export const selectList = (state) => state.forms;


export const selectForms = (state) => state.forms.forms;
export const selectFormsStatus = (state) => state.forms.status;
export const selectFormsError = (state) => state.forms.error;
export { fetchformsList, createNewForm }; // esporti i thunk
