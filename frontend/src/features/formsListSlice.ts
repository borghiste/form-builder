import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// ===== TYPES =====
export type FormField = {
  id: string;
  label: string;
  value?: string;
  type: string;
  validations?: { [key: string]: any };
};

export type FormData = {
  id: string;
  name: string;
  fields: FormField[];
};

export type FormListState = {
  forms: FormData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

// ===== INITIAL STATE =====
const initialState: FormListState = {
  forms: [],
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// Fetch list of forms
export const fetchFormsList = createAsyncThunk<FormData[]>(
  "forms/fetchFormsList",
  async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms`);
    if (!res.ok) {
      throw new Error("Error loading forms list");
    }
    return (await res.json()) as FormData[];
  }
);

// Create new form
export const createNewForm = createAsyncThunk<FormData, FormData>(
  "forms/createNewForm",
  async (newFormData) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFormData),
    });

    if (!res.ok) throw new Error("Error creating new form");

    return (await res.json()) as FormData;
  }
);

// Delete form
export const deleteForm = createAsyncThunk<string, string>(
  "forms/deleteForm",
  async (formId) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/forms/${formId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: formId }),
      }
    );

    if (!res.ok) throw new Error("Error deleting form");

    return formId; 
  }
);

// Get single form
export const getForm = createAsyncThunk<FormData, string>(
  "forms/getForm",
  async (formId) => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/forms/${formId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) throw new Error("Error fetching form");

    return (await res.json()) as FormData;
  }
);

// ===== SLICE =====
export const formsListSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- FETCH FORMS ---
    builder
      .addCase(fetchFormsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFormsList.fulfilled, (state, action: PayloadAction<FormData[]>) => {
        state.status = "succeeded";
        state.forms = action.payload;
      })
      .addCase(fetchFormsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch forms";
      });

    // --- CREATE FORM ---
    builder
      .addCase(createNewForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewForm.fulfilled, (state, action: PayloadAction<FormData>) => {
        state.status = "succeeded";
        state.forms.push(action.payload);
      })
      .addCase(createNewForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create form";
      });

    // --- DELETE FORM ---
    builder
      .addCase(deleteForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteForm.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        state.forms = state.forms.filter((f) => f.id !== action.payload);
      })
      .addCase(deleteForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete form";
      });

    // --- GET FORM ---
    builder
      .addCase(getForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getForm.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch form";
      });
  },
});

// ===== SELECTORS =====
export const selectFormsState = (state: { forms: FormListState }) => state.forms;
export const selectForms = (state: { forms: FormListState }) => state.forms.forms;
export const selectFormsStatus = (state: { forms: FormListState }) =>
  state.forms.status;
export const selectFormsError = (state: { forms: FormListState }) =>
  state.forms.error;

// ===== EXPORT REDUCER =====
export default formsListSlice.reducer;
