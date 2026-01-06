import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";





export interface FormEntryState {
    form_id: string;
    form_version: number;
    name: string;
    values: Record<string, any>;
    validation: Record<string, any>;
    user_role: string;
    user_id: number | null;
}

const initialState: FormEntryState = {
    form_id: '',
    form_version: 1,
    name: '',
    values: [],
    validation: {},
    user_role: '',
    user_id: null,
}


const formEntrySlice = createSlice({
    name:'formEntry',
    initialState,
reducers: {
    setFormEntry(state, action){
        if(state.form_id){
            Object.assign(state, action.payload)
        }
    },
    }
});
// protected $fillable = [
//     'form_id', mandato dal frontend
//     'form_version',mandato dal frontend
//     'name', mandato dal frontend
//     'values',
//     'validation',
//     'user_role', mandato dal frontend
//     'user_id',
    
// ];




export const { setFormEntry} = formEntrySlice.actions;
export const selectFormEntry = (state:any) => state.formEntry;
export default formEntrySlice.reducer;
