import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// ===== TYPES =====

export type FormEntry<T = Record<string, any>> = {
    message: string;
    form_id: string;
    created_at: string;
    updated_at: string;
    id: string;
    data: T;
  };
  

  export type FormEntriesState<T = Record<string, any>> = {
    entries: FormEntry<T>[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
  };
  
  export type SubmitFormEntryPayload<T = Record<string, any>> = {
    form_id: string;
    data: T;
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

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/entries`)
  
  if (!res.ok) {
    throw new Error("Error loading forms list");
  }
  
  const entries = await res.json();

  return entries.map((entry: any) => ({
    ...entry,
    data: typeof entry.data === 'string'
      ? JSON.parse(entry.data)
      : entry.data,
  }));

})

// --- SUBMIT NEW ENTRY ---
export const submitNewEntry = createAsyncThunk<FormEntry, SubmitFormEntryPayload>('forms/entries/submit', async (formEntry) => {
  
  console.log('sending', formEntry)
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms/entries/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
   
     body: JSON.stringify(formEntry)
  })
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

      // --- SUBMIT ENTRY ---
      builder.addCase(submitNewEntry.fulfilled, (state,action) => {
        console.log(action.payload)
        state.status = 'succeeded';
        state.entries.push(action.payload)
      })
      builder.addCase(submitNewEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to submit form entry';
      })
      builder.addCase(submitNewEntry.pending, (state) => {
        state.status = 'loading';
      })
    }

    
   

})

// ===== SELECTORS =====
export const selectFormEntriesState = (state: any) => state.entries; // punta alla chiave corretta
export const selectEntries = (state: any) => state.entries.entries;
export const selectEntriesStatus = (state: any) => state.entries.status;


// ===== EXPORT REDUCER =====
export default formsEntriesSlice.reducer;
