import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {forms: [],
                        status:'idle', // 'succeeded | 'loading | 'failed
                        error: null
}


const fetchformsList = createAsyncThunk(
    'forms/fetchFormsList',
    async () => {
         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/formsList`)
         if(!res.ok){
            throw new Error('error loading forms list');
           

         }
         const data = await res.json();

       
       
         return data
    }
)

export const formsListSlice = createSlice({
    name:'forms',
    initialState,
    reducers: {addNewForm: (state, action) => {
                const newForm = {name: action.payload.name,
                                    description: 'des'
                }
                state.forms.push(newForm)
    }
},
    extraReducers: (builder) => {
        builder.addCase(fetchformsList.fulfilled, (state, action) => {
            
            state.status = 'succeeded';
            const list = action.payload;


            state.forms =list;

            
            
        })

        builder.addCase(fetchformsList.pending, (state) => {
            state.status = 'loading'
        })

        builder.addCase(fetchformsList.rejected, (state) => {
            state.status = 'failed'
        })

    
}
})


export default formsListSlice.reducer;
export const selectList = (state) => state.forms;
export const {addNewForm} = formsListSlice.actions

export { fetchformsList }