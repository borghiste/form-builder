import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// ===== TYPES =====

export type FormEntry<T = Record<string, any>> = {
    message: string;
    form_id: string;
    created_at: string;
    updated_at: string;
    id: string;
    data: T[];
  };
  

  export type FormEntriesState<T = Record<string, any>> = {
    entries: FormEntry<T>[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  

// ===== INITIAL STATE =====
const initialState: FormEntriesState = {
  entries: [],
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// --- FETCH ENTRIES ---

export const fetchFormEntries = createAsyncThunk<FormEntry<any>[]>('forms/entries', async () => {

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms/entries`)
  if (!res.ok) {
    throw new Error("Error loading forms list");
  }
  
 return await res.json()



})



// ===== SLICE =====

export const formsEntriesSlice = createSlice({
    name: 'formsEntries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // --- FETCH ENTRIES ---
        builder.addCase(fetchFormEntries.pending, (state) => {
          state.status = 'loading';
        })

        builder.addCase(fetchFormEntries.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.entries = action.payload
        })
    }

})

// ===== SELECTORS =====
export const selectFormEntriesState = (state: any) => state.entries; // punta alla chiave corretta
export const selectEntries = (state: any) => state.entries.entries;
export const selectEntriesStatus = (state: any) => state.entries.status;

// ===== EXPORT REDUCER =====
export default formsEntriesSlice.reducer;
