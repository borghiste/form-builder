import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type SubmissionState = {
  submission: FormData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: SubmissionState = {
  forms: [],
  status: "idle",
  error: null,
}


// SUBMIT FORMS
export const submitFormEntry = createAsyncThunk(
    'forms/submit',
    async () => {
        const res = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/forms/submit`,
            {method: 'POST',
                headers: { "Content-Type": "application/json"},
                // body: JSON.stringify(formEntry)
            }
        )
        if (!res.ok) throw new Error("Error submitting data");
        console.log(res)
        return res.json();
   
    }
)

// SLICE
export const formsListSlice = createSlice({
    name: "submission",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //
        builder.addCase(submitFormEntry.pending, (state) => {
            state.status = 'loading';

        })
        builder.addCase(submitFormEntry.fulfilled, (state) => {
            state.status = 'succeeded';
        })
    }
})