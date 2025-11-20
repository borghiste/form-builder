import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FieldState {
  id: string;
  type: string;
  label: string;
  validations?: Record<string, any> | null;
}

interface FieldsState {
  fields: FieldState[];
}

const initialState: FieldsState = {
  fields: [],
};

const fieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    addField(state, action: PayloadAction<FieldState>) {
      state.fields.push(action.payload);
    },
    updateField(state, action: PayloadAction<{ id: string; updates: Partial<FieldState> }>) {
      const field = state.fields.find(f => f.id === action.payload.id);
      if (field) Object.assign(field, action.payload.updates);
    },
    removeField(state, action: PayloadAction<string>) {
      state.fields = state.fields.filter(f => f.id !== action.payload);
    },
    setFields(state, action: PayloadAction<FieldState[]>) {
      state.fields = action.payload;
    },
  },
});

export const { addField, updateField, removeField, setFields } = fieldSlice.actions;
export default fieldSlice.reducer;
export const selectFields = (state: { fields: FieldsState }) => state.fields?.fields;


